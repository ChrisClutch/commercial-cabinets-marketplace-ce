// Cloudflare Worker: serves the static site (from ./dist via the ASSETS binding)
// and handles the few dynamic routes:
//   POST /api/form      → quote + listing-update forms → email to you
//   GET  /api/auth      → start GitHub login for the /admin CMS
//   GET  /api/callback  → finish GitHub login
import { EmailMessage } from 'cloudflare:email';

const FORMS = {
  quote: {
    subject: (f) => `Quote request: ${f['project-type'] || 'project'} (${f['market'] || f['project-size'] || 'unspecified'}) from ${f.name}`,
    required: ['name', 'email', 'project-size', 'project-type', 'location'],
  },
  'listing-update': {
    subject: (f) => `Listing update request: ${f.shop} from ${f.name}`,
    required: ['shop', 'name', 'email', 'changes'],
  },
};
const MAX_FIELD = 5000;

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    try {
      if (url.pathname === '/api/form' && request.method === 'POST') return await handleForm(request, env, url);
      if (url.pathname === '/api/auth') return handleAuth(env, url);
      if (url.pathname === '/api/callback') return await handleCallback(request, env, url);
    } catch (err) {
      console.error(err);
      return errorPage('Something went wrong on our end. Please try again, or email us directly.', 500);
    }
    // Everything else is a static file.
    return env.ASSETS.fetch(request);
  },
};

// ---------- Forms ----------
async function handleForm(request, env, url) {
  const data = await request.formData();
  const formName = String(data.get('form-name') || '');
  const form = FORMS[formName];
  if (!form) return errorPage('Unknown form.', 400);

  // Honeypot: bots fill hidden fields. Pretend success so they don't retry.
  if (data.get('bot-field')) return redirect(url, '/thanks');

  // Optional Cloudflare Turnstile check (only if a secret is configured).
  if (env.TURNSTILE_SECRET) {
    const ok = await verifyTurnstile(env.TURNSTILE_SECRET, data.get('cf-turnstile-response'), request.headers.get('CF-Connecting-IP'));
    if (!ok) return errorPage('The spam check failed. Please go back and try again.', 400);
  }

  const fields = {};
  for (const [k, v] of data.entries()) {
    if (['form-name', 'bot-field', 'cf-turnstile-response'].includes(k) || typeof v !== 'string') continue;
    fields[k] = v.slice(0, MAX_FIELD).trim();
  }
  const missing = form.required.filter((k) => !fields[k]);
  if (missing.length) return errorPage(`Please go back and fill in: ${missing.join(', ')}.`, 400);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) return errorPage('Please go back and enter a valid email address.', 400);

  const subject = form.subject(fields);
  const body =
    `New ${formName} submission from ${url.host}\n` +
    `Received: ${new Date().toISOString()}\n\n` +
    Object.entries(fields).map(([k, v]) => `${k}: ${v || '-'}`).join('\n') +
    `\n\nReply to this email to respond to ${fields.name} directly.\n`;

  // Optional backup copy in KV (bind a namespace as SUBMISSIONS to turn on).
  if (env.SUBMISSIONS) {
    await env.SUBMISSIONS.put(`${formName}:${Date.now()}:${crypto.randomUUID()}`, JSON.stringify({ formName, fields, at: new Date().toISOString() }));
  }

  if (env.FORM_EMAIL) {
    const raw = buildMime({ from: env.FORM_FROM, fromName: env.FORM_FROM_NAME || 'Directory forms', to: env.FORM_TO, replyTo: fields.email, subject, body });
    await env.FORM_EMAIL.send(new EmailMessage(env.FORM_FROM, env.FORM_TO, raw));
  } else if (env.ALLOW_NO_EMAIL === 'true') {
    console.log('[dev] email binding not configured; submission:\n' + subject + '\n' + body);
  } else {
    throw new Error('FORM_EMAIL binding is not configured');
  }
  return redirect(url, '/thanks');
}

async function verifyTurnstile(secret, token, ip) {
  if (!token) return false;
  const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    body: new URLSearchParams({ secret, response: String(token), ...(ip ? { remoteip: ip } : {}) }),
  });
  return (await res.json()).success === true;
}

const oneLine = (s) => String(s ?? '').replace(/[\r\n]+/g, ' ').trim();
const encodeHeader = (s) => (/^[\x20-\x7e]*$/.test(s) ? s : `=?UTF-8?B?${b64(s)}?=`);
function b64(s) {
  const bytes = new TextEncoder().encode(s);
  let bin = '';
  for (const b of bytes) bin += String.fromCharCode(b);
  return btoa(bin);
}

export function buildMime({ from, fromName, to, replyTo, subject, body }) {
  const domain = String(from).split('@')[1] || 'localhost';
  const wrapped = b64(body).replace(/.{1,76}/g, '$&\r\n');
  return [
    `From: ${encodeHeader(oneLine(fromName))} <${oneLine(from)}>`,
    `To: <${oneLine(to)}>`,
    `Reply-To: <${oneLine(replyTo)}>`,
    `Subject: ${encodeHeader(oneLine(subject))}`,
    `Date: ${new Date().toUTCString()}`,
    `Message-ID: <${crypto.randomUUID()}@${domain}>`,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: base64',
    '',
    wrapped,
  ].join('\r\n');
}

function redirect(url, path) {
  return Response.redirect(new URL(path, url.origin).href, 303);
}

function errorPage(message, status) {
  const esc = message.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
  return new Response(
    `<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Form error</title>` +
      `<body style="font-family:system-ui,sans-serif;max-width:640px;margin:48px auto;padding:0 16px;color:#1d2125">` +
      `<h1>We couldn't send that</h1><p>${esc}</p><p><a href="javascript:history.back()">Go back</a></p></body></html>`,
    { status, headers: { 'Content-Type': 'text/html; charset=utf-8' } },
  );
}

// ---------- Decap CMS GitHub login ----------
function handleAuth(env, url) {
  if (!env.GITHUB_CLIENT_ID) return errorPage('Admin login is not configured yet (GITHUB_CLIENT_ID missing).', 500);
  const state = crypto.randomUUID();
  const gh = new URL('https://github.com/login/oauth/authorize');
  gh.searchParams.set('client_id', env.GITHUB_CLIENT_ID);
  gh.searchParams.set('redirect_uri', `${url.origin}/api/callback`);
  gh.searchParams.set('scope', 'repo,user');
  gh.searchParams.set('state', state);
  return new Response(null, {
    status: 302,
    headers: {
      Location: gh.href,
      'Set-Cookie': `cms_oauth_state=${state}; Path=/api; HttpOnly; Secure; SameSite=Lax; Max-Age=600`,
    },
  });
}

async function handleCallback(request, env, url) {
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');
  const cookie = (request.headers.get('Cookie') || '').match(/(?:^|;\s*)cms_oauth_state=([^;]+)/)?.[1];
  if (!code || !state || state !== cookie) return cmsResult(url, 'error', { message: 'Login expired or invalid. Close this window and try again.' });

  const res = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json', 'User-Agent': 'cabinet-directory-cms' },
    body: JSON.stringify({ client_id: env.GITHUB_CLIENT_ID, client_secret: env.GITHUB_CLIENT_SECRET, code, redirect_uri: `${url.origin}/api/callback` }),
  });
  const json = await res.json();
  if (!json.access_token) return cmsResult(url, 'error', { message: json.error_description || 'GitHub login failed.' });
  return cmsResult(url, 'success', { token: json.access_token, provider: 'github' });
}

// Decap's popup handshake: tell the opener we're ready, then post the result back to it (same origin only).
function cmsResult(url, status, content) {
  const payload = JSON.stringify(`authorization:github:${status}:${JSON.stringify(content)}`);
  const origin = JSON.stringify(url.origin);
  return new Response(
    `<!doctype html><html><body><p>${status === 'success' ? 'Logged in. You can close this window.' : 'Login failed. You can close this window.'}</p><script>
(function () {
  function receive(e) {
    if (e.origin !== ${origin}) return;
    window.opener.postMessage(${payload}, e.origin);
    window.removeEventListener('message', receive);
  }
  window.addEventListener('message', receive);
  window.opener && window.opener.postMessage('authorizing:github', ${origin});
})();
</script></body></html>`,
    {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Set-Cookie': 'cms_oauth_state=; Path=/api; HttpOnly; Secure; SameSite=Lax; Max-Age=0',
        'Cache-Control': 'no-store',
      },
    },
  );
}
