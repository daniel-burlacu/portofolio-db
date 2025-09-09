// src/data/reviews.ts
export type ReviewImage = { src: string; caption?: string };
export type ReviewKey =
  'govstack' | 'inspectorseppo' | 'xerox' |
  'crypto_ws' | 'crypto_ws_hands_on';

const CRYPTO_WS1: ReviewImage = {
  src: '/reviews/CryptoWorkshops/WS1.png',
  caption: 'Workshop — Crypto in Illicit Political Financing',
};
const CRYPTO_WS2: ReviewImage = {
  src: '/reviews/CryptoWorkshops/WS2.png',
  caption: 'Workshop — Crypto in Illicit Political Financing (hands-on)',
};

export const REVIEWS: Record<ReviewKey, ReviewImage[]> = {
  govstack: Array.from({ length: 7 }, (_, i) => ({ src: `/reviews/Govstack/${i + 1}.png` })),
  inspectorseppo: Array.from({ length: 7 }, (_, i) => ({ src: `/reviews/InspectorSeppo/${i + 1}.png` })),
  xerox: [{ src: '/reviews/Xerox/review.png' }],
  crypto_ws: [CRYPTO_WS1],            // one image only
  crypto_ws_hands_on: [CRYPTO_WS2],   // one image only
};

// title → images resolver (case-insensitive)
export function getReviewsForTitle(title: string): ReviewImage[] | undefined {
  const t = title.toLowerCase();
  if (t.includes('govstack')) return REVIEWS.govstack;
  if (t.includes('inspector') || t.includes('seppo')) return REVIEWS.inspectorseppo;
  if (t.includes('xerox')) return REVIEWS.xerox;

  if (t.includes('crypto') && t.includes('workshop')) {
    // hands-on gets WS2; otherwise WS1
    if (t.includes('hands-on') || t.includes('hands on')) return REVIEWS.crypto_ws_hands_on;
    return REVIEWS.crypto_ws;
  }

  return undefined;
}
