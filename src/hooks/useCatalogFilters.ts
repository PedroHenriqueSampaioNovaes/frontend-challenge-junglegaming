import { useNavigate } from '@tanstack/react-router';
import { useContext } from 'react';

import { CatalogFiltersContext } from '@/contexts/CatalogFiltersContext';
import type {
  CollectionLabel,
  NetworkLabel,
} from '@/features/nfts/catalogFilters';
import type { NftSort } from '@/features/nfts/types';

/** The slider emits float32 noise (e.g. 0.009999999776); keep the URL clean. */
const roundPrice = (value: number) => Math.round(value * 100) / 100;

export function useCatalogFilters() {
  const context = useContext(CatalogFiltersContext);
  const navigate = useNavigate({ from: '/' });

  if (!context) {
    throw new Error(
      'useCatalogFilters deve ser usado dentro de CatalogFiltersProvider',
    );
  }

  // Every filter change is a history entry; keep the scroll where it is.
  const toggleCollection = (label: CollectionLabel) =>
    navigate({
      search: (prev) => ({
        ...prev,
        collection: prev.collection === label ? undefined : label,
      }),
      resetScroll: false,
    });

  const toggleNetwork = (label: NetworkLabel) =>
    navigate({
      search: (prev) => ({
        ...prev,
        networks: prev.networks.includes(label)
          ? prev.networks.filter((item) => item !== label)
          : [...prev.networks, label],
      }),
      resetScroll: false,
    });

  const applyPrice = () =>
    navigate({
      search: (prev) => ({
        ...prev,
        minPrice: roundPrice(context.price[0]),
        maxPrice: roundPrice(context.price[1]),
      }),
      resetScroll: false,
    });

  const setSort = (sort: NftSort) =>
    navigate({
      search: (prev) => ({ ...prev, sort }),
      resetScroll: false,
    });

  return { ...context, toggleCollection, toggleNetwork, applyPrice, setSort };
}
