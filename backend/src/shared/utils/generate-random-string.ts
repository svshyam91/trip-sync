import { randomBytes } from 'crypto';

/* This function generates a random trip ID */
export function generateRandomString(): string {
  return randomBytes(6).toString('base64url').toUpperCase();
}
