import { useSearch } from '@tanstack/react-router';
import { createContext, useMemo, useState, type ReactNode } from 'react';

import type {
  CollectionLabel,
  NetworkLabel,
} from '@/features/nfts/catalogFilters';
import type { NftSort } from '@/features/nfts/types';

export type CatalogFiltersContext = {
  search: string;
  collection: CollectionLabel | null;
  selectedNetworks: NetworkLabel[];
  price: number[];
  setPrice: (value: number[]) => void;
  appliedPrice: number[];
  sort: NftSort;
};

export const CatalogFiltersContext =
  createContext<CatalogFiltersContext | null>(null);

export function CatalogFiltersProvider({ children }: { children: ReactNode }) {
  const {
    search = '',
    collection = null,
    networks,
    minPrice,
    maxPrice,
    sort,
  } = useSearch({
    from: '/',
  });

  const appliedPrice = useMemo(
    () => [minPrice, maxPrice],
    [minPrice, maxPrice],
  );

  const [price, setPrice] = useState(appliedPrice);
  const [lastApplied, setLastApplied] = useState(appliedPrice);

  // Reset the slider draft when the URL changes (e.g. browser back/forward).
  if (lastApplied !== appliedPrice) {
    setLastApplied(appliedPrice);
    setPrice(appliedPrice);
  }

  const value = useMemo<CatalogFiltersContext>(
    () => ({
      search,
      collection,
      selectedNetworks: networks,
      price,
      setPrice,
      appliedPrice,
      sort,
    }),
    [search, collection, networks, price, appliedPrice, sort],
  );

  return (
    <CatalogFiltersContext.Provider value={value}>
      {children}
    </CatalogFiltersContext.Provider>
  );
}
