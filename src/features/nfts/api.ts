import { api } from '@/lib/api';

import { nftListResponseSchema } from './schemas';
import type { NftListParams, NftListResponse } from './types';

export async function fetchNfts(
  params: NftListParams,
  signal?: AbortSignal,
): Promise<NftListResponse> {
  const { networks, ...rest } = params;
  const { data } = await api.get<unknown>('/nfts', {
    params: {
      ...rest,
      networks: networks?.length ? networks.join(',') : undefined,
    },
    signal,
  });
  return nftListResponseSchema.parse(data);
}
