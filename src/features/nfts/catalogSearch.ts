import { z } from 'zod';

import { collections, networks, PRICE_MAX, PRICE_MIN } from './catalogFilters';
import type { NftSort } from './types';

const sorts = [
  'recent',
  'price-asc',
  'price-desc',
] as const satisfies readonly NftSort[];

const price = (fallback: number) =>
  z.number().min(PRICE_MIN).max(PRICE_MAX).default(fallback).catch(fallback);

/**
 * Catalog filters kept in the URL. Invalid values fall back to the default
 * instead of breaking the page, so hand-edited links are always safe.
 */
export const catalogSearchSchema = z
  .object({
    collection: z
      .literal(collections.map(({ label }) => label))
      .optional()
      .catch(undefined),
    networks: z
      .array(z.literal(networks.map(({ label }) => label)))
      .default([])
      .catch([]),
    minPrice: price(PRICE_MIN),
    maxPrice: price(PRICE_MAX),
    sort: z.enum(sorts).default('recent').catch('recent'),
  })
  .transform((search) =>
    search.minPrice <= search.maxPrice
      ? search
      : { ...search, minPrice: PRICE_MIN, maxPrice: PRICE_MAX },
  );

export type CatalogSearch = z.output<typeof catalogSearchSchema>;

export const catalogSearchDefaults = {
  networks: [],
  minPrice: PRICE_MIN,
  maxPrice: PRICE_MAX,
  sort: 'recent',
} satisfies Partial<CatalogSearch>;
