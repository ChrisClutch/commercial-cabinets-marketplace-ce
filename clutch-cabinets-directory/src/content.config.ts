import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const num = z.number().nonnegative().nullable().optional();

const shops = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/shops' }),
  schema: z.object({
    name: z.string(),
    slug: z.string().regex(/^[a-z0-9-]+$/, 'Use lowercase letters, numbers and dashes only'),
    city: z.string(),
    state: z.string().default('OR'),
    serviceArea: z.string(),
    specialties: z.array(z.string()).default([]),
    projectSizes: z.array(z.enum(['residential', 'light-commercial', 'commercial'])).min(1),
    capacity: z
      .object({
        unitsPerMonth: num,
        cncAutomated: z.boolean().nullable().optional(),
        commercialProjectsCompleted: num,
        maxProjectUnits: num,
        leadTimeWeeks: num,
      })
      .default({}),
    phone: z.string().optional().default(''),
    email: z.string().optional().default(''),
    website: z.string().optional().default(''),
    logo: z.string().optional().default(''),
    featured: z.boolean().default(false),
    operator: z.boolean().default(false),
    description: z.string().default(''),
  }),
});

export const collections = { shops };
