export const collections = [
  { label: 'Arte digital', count: 33 },
  { label: 'Fotografia', count: 12 },
  { label: 'Música', count: 65 },
  { label: 'Arte 3D', count: 39 },
  { label: 'Colecionáveis', count: 23 },
  { label: 'Generativa', count: 17 },
  { label: 'Jogos', count: 19 },
  { label: 'Assinaturas', count: 13 },
  { label: 'Utilidade', count: 18 },
] as const;

export const networks = [
  { label: 'Ethereum', count: 119 },
  { label: 'Polygon', count: 78 },
  { label: 'Solana', count: 86 },
] as const;

export type CollectionLabel = (typeof collections)[number]['label'];
export type NetworkLabel = (typeof networks)[number]['label'];

export const PRICE_MIN = 0.01;
export const PRICE_MAX = 16;
export const DEFAULT_PRICE = [PRICE_MIN, PRICE_MAX];

export const formatPrice = (value: number) =>
  value.toFixed(2).replace('.', ',');
