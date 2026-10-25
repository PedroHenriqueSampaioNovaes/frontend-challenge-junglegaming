import { z } from 'zod';

import type { Nft, NftListResponse } from './types';

const nftSchema = z.object({
  id: z.string(),
  name: z.string(),
  price: z.string(),
  previousPrice: z.string().optional(),
  image: z.string(),
  collection: z.string(),
  network: z.string(),
  listedAt: z.string(),
}) satisfies z.ZodType<Nft>;

export const nftListResponseSchema = z.object({
  items: z.array(nftSchema),
  total: z.number(),
  page: z.number(),
  pageSize: z.number(),
  totalPages: z.number(),
}) satisfies z.ZodType<NftListResponse>;
