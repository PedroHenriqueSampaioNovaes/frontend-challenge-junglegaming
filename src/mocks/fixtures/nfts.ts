import nftImage1 from '@/assets/nfts/nft-image-1-desktop.png';
import nftImage2 from '@/assets/nfts/nft-image-2.png';
import nftImage3 from '@/assets/nfts/nft-image-3.png';
import nftImage4 from '@/assets/nfts/nft-image-4.png';

import type { Nft } from '@/features/nfts/types';

const images = [nftImage1, nftImage2, nftImage3, nftImage4];

const collections = [
  'Arte digital',
  'Fotografia',
  'Música',
  'Arte 3D',
  'Colecionáveis',
  'Generativa',
  'Jogos',
  'Assinaturas',
  'Utilidade',
];

const collectionImages = new Map(
  collections.map((collection, index) => [
    collection,
    images[index % images.length],
  ]),
);

const networks = ['Ethereum', 'Polygon', 'Solana'];

const adjectives = [
  'Emerald',
  'Sage',
  'Neon',
  'Cosmic',
  'Violet',
  'Ivory',
  'Amber',
  'Cobalt',
  'Crimson',
  'Onyx',
];

const nouns = ['Ape', 'Nomad', 'Vessel', 'Bloom', 'Baron', 'Specter', 'Relic'];

// Deterministic PRNG so every load (and every test) sees the same catalog.
function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const toCents = (cents: number) => (cents / 100).toFixed(2);

function buildNfts(total: number): Nft[] {
  const random = mulberry32(42);
  const baseDate = Date.UTC(2026, 0, 1);

  return Array.from({ length: total }, (_, index) => {
    const adjective = adjectives[Math.floor(random() * adjectives.length)];
    const noun = nouns[Math.floor(random() * nouns.length)];
    const number = String(Math.floor(random() * 999) + 1).padStart(3, '0');
    const priceCents = Math.floor(random() * 1500) + 10; // 0.10 – 15.09 ETH
    const discounted = random() < 0.2;
    const collection = collections[index % collections.length];

    return {
      id: `${adjective}-${noun}-${number}-${index}`.toLowerCase(),
      name: `${adjective} ${noun} #${number}`,
      price: toCents(priceCents),
      previousPrice: discounted
        ? toCents(Math.round(priceCents * 1.15))
        : undefined,
      image: collectionImages.get(collection)!,
      collection,
      network: networks[Math.floor(random() * networks.length)],
      listedAt: new Date(baseDate + index * 3_600_000).toISOString(),
    };
  });
}

export const nftFixtures: Nft[] = buildNfts(72);
