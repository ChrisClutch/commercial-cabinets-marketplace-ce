// forgeStore.ts — shared state between the admin dashboard and the /information page.
// Currently backed by localStorage so changes persist on the same browser/device.
// TODO: Replace localStorage calls with API calls when backend is connected.

// ── Bathroom Code ──────────────────────────────────────────────────────────────

export function getBathroomCode(): string {
  return localStorage.getItem('forge_bathroom_code') ?? ''
}

export function setBathroomCode(code: string): void {
  localStorage.setItem('forge_bathroom_code', code)
}

// ── Community Messages ─────────────────────────────────────────────────────────

export type MessageStatus = 'pending' | 'approved' | 'denied'

export type CommunityMessage = {
  id: string
  name: string
  message: string
  image?: string
  submittedAt: string
  status: MessageStatus
}

const DEFAULT_MESSAGES: CommunityMessage[] = [
  {
    id: '1',
    name: 'Sarah M.',
    message: "Absolutely love the new Women's Collective floor! The atmosphere is incredible and every vendor has been so welcoming.",
    submittedAt: '2026-05-06T14:23:00',
    status: 'pending',
  },
  {
    id: '2',
    name: 'James T.',
    message: 'Had the best coffee from Ground Floor this morning. Already planning my next visit!',
    submittedAt: '2026-05-05T09:11:00',
    status: 'pending',
  },
  {
    id: '3',
    name: 'Anonymous',
    message: 'The restrooms on the second floor are genuinely an experience. Salem has never seen anything like this.',
    submittedAt: '2026-05-04T17:45:00',
    status: 'approved',
  },
]

export function getMessages(): CommunityMessage[] {
  try {
    const raw = localStorage.getItem('forge_community_messages')
    return raw ? (JSON.parse(raw) as CommunityMessage[]) : DEFAULT_MESSAGES
  } catch {
    return DEFAULT_MESSAGES
  }
}

export function saveMessages(messages: CommunityMessage[]): void {
  localStorage.setItem('forge_community_messages', JSON.stringify(messages))
}
