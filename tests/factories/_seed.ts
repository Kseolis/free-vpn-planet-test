import { faker } from '@faker-js/faker';

/**
 * Determinism contract — see docs/CONSTRAINTS.md §2.4.
 * Default SEED=1234. Seed is applied once at import time.
 * Import this module at the top of every *.factory.ts file.
 */
const seed = process.env.SEED ? Number(process.env.SEED) : 1234;
faker.seed(seed);

export const FAKER_SEED = seed;

/**
 * Synthetic-only email domain (RFC 6761 reserved TLD — guaranteed never to resolve).
 * Used by every factory that emits an email. See docs/CONSTRAINTS.md §2.4.
 */
export const SYNTHETIC_EMAIL_DOMAIN = 'example.test';
