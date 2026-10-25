import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { fetchNfts } from '@/features/nfts/api';
import { nftKeys } from '@/features/nfts/queries';
import type { NftListParams } from '@/features/nfts/types';

export function useNfts(params: NftListParams) {
  return useQuery({
    queryKey: nftKeys.list(params),
    queryFn: ({ signal }) => fetchNfts(params, signal),
    placeholderData: keepPreviousData,
  });
}
