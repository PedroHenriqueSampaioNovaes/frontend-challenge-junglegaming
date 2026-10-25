import { useState } from 'react';

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

export const PRICE_MIN = 0.01;
export const PRICE_MAX = 16;
const DEFAULT_PRICE = [PRICE_MIN, 16];

export const formatPrice = (value: number) =>
  value.toFixed(2).replace('.', ',');

export function useCatalogFilters() {
  const [collection, setCollection] = useState<string | null>(null);
  const [selectedNetworks, setSelectedNetworks] = useState<string[]>([]);
  // `price` is the slider draft; `appliedPrice` is what the catalog queries.
  const [price, setPrice] = useState<number[]>(DEFAULT_PRICE);
  const [appliedPrice, setAppliedPrice] = useState<number[]>(DEFAULT_PRICE);

  const applyPrice = () => setAppliedPrice(price);

  const toggleCollection = (label: string) =>
    setCollection((current) => (current === label ? null : label));

  const toggleNetwork =(label: string) =>
    setSelectedNetworks((current) =>
      current.includes(label)
        ? current.filter((item) => item !== label)
        : [...current, label],
    );

  return {
    collection,
    toggleCollection,
    selectedNetworks,
    toggleNetwork,
    price,
    setPrice,
    appliedPrice,
    applyPrice,
  };
}

export type CatalogFiltersState = ReturnType<typeof useCatalogFilters>;
