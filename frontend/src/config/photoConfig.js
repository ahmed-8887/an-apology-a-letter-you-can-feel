/**
 * Centralized Private Photo Configuration
 * ARCHITECTURE & SECURITY NOTICE:
 * - The GitHub repository is public, so personal photo binaries must NEVER be committed to Git.
 * - This file contains only structured metadata and private photo keys (references).
 * - Real personal photos will be uploaded directly to private storage outside Git.
 * - The frontend retrieves images securely through the Netlify functions backend proxy endpoint: /api/photo/:key
 * - The photo storage remains 100% private.
 */

export const PHOTO_MEMORIES_CONFIG = [
  {
    id: 'memory-01',
    imageKey: 'memories/photo-01.jpg',
    date: '[MEMORY_01_DATE]',
    title: 'The Quiet Moments',
    caption: 'The ordinary, quiet conversations where we could just be ourselves without pretense.',
    placeholderLabel: 'PHOTO_01',
    aspectRatio: '4/3',
    personalNote: 'A moment I still think about and appreciate.'
  },
  {
    id: 'memory-02',
    imageKey: 'memories/photo-02.jpg',
    date: '[MEMORY_02_DATE]',
    title: 'Your Kindness',
    caption: "The grace and patience you showed me in moments when I probably didn't make it easy.",
    placeholderLabel: 'PHOTO_02',
    aspectRatio: '4/3',
    personalNote: 'You deserved that same patience in return.'
  },
  {
    id: 'memory-03',
    imageKey: 'memories/photo-03.jpg',
    date: '[MEMORY_03_DATE]',
    title: 'What I Value',
    caption: 'The little things I took for granted then, but appreciate and respect deeply now.',
    placeholderLabel: 'PHOTO_03',
    aspectRatio: '4/3',
    personalNote: 'Thank you for the good memories.'
  }
];

/**
 * Returns the secure, controlled endpoint for retrieving a private photo.
 * In development or when the image is not yet uploaded, components gracefully
 * display the elegant blur placeholder.
 */
export function getPrivatePhotoUrl(imageKey) {
  if (!imageKey) return null;
  return `/api/photo/${imageKey}`;
}
