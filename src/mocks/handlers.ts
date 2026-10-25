import { delay, http, HttpResponse } from 'msw';

import type { NftListResponse, NftSort } from '@/features/nfts/types';

import { nftFixtures } from './fixtures/nfts';

const DEFAULT_PAGE_SIZE = 12;
const MAX_PAGE_SIZE = 48;
const SCALE = 18;

/** Decimal string -> bigint scaled by 1e18, so ETH comparisons keep precision. */
function toUnits(value: string): bigint {
  const [whole, fraction = ''] = value.split('.');
  return BigInt(whole + fraction.padEnd(SCALE, '0').slice(0, SCALE));
}

const isDecimal = (value: string | null): value is string =>
  value !== null && /^\d+(\.\d+)?$/.test(value);

const sorters: Record<
  NftSort,
  (a: (typeof nftFixtures)[number], b: (typeof nftFixtures)[number]) => number
> = {
  recent: (a, b) => b.listedAt.localeCompare(a.listedAt),
  'price-asc': (a, b) => Number(toUnits(a.price) - toUnits(b.price)),
  'price-desc': (a, b) => Number(toUnits(b.price) - toUnits(a.price)),
};

export const handlers = [
  http.get('/api/nfts', async ({ request }) => {
    const url = new URL(request.url);
    const query = url.searchParams;

    await delay(300);

    const search = query.get('search')?.trim().toLowerCase();
    const collection = query.get('collection');
    const networks = query.get('networks')?.split(',').filter(Boolean) ?? [];
    const minPrice = query.get('minPrice');
    const maxPrice = query.get('maxPrice');
    const sortParam = query.get('sort') ?? 'recent';

    if (!(sortParam in sorters)) {
      return HttpResponse.json(
        { code: 'validation_error', message: 'Ordenação inválida.' },
        { status: 400 },
      );
    }
    if (
      (minPrice !== null && !isDecimal(minPrice)) ||
      (maxPrice !== null && !isDecimal(maxPrice))
    ) {
      return HttpResponse.json(
        { code: 'validation_error', message: 'Faixa de preço inválida.' },
        { status: 400 },
      );
    }

    const page = Math.max(1, Number(query.get('page')) || 1);
    const pageSize = Math.min(
      MAX_PAGE_SIZE,
      Math.max(1, Number(query.get('pageSize')) || DEFAULT_PAGE_SIZE),
    );

    const min = minPrice ? toUnits(minPrice) : null;
    const max = maxPrice ? toUnits(maxPrice) : null;

    const filtered = nftFixtures
      .filter((nft) => !search || nft.name.toLowerCase().includes(search))
      .filter((nft) => !collection || nft.collection === collection)
      .filter((nft) => !networks.length || networks.includes(nft.network))
      .filter((nft) => min === null || toUnits(nft.price) >= min)
      .filter((nft) => max === null || toUnits(nft.price) <= max)
      .sort(sorters[sortParam as NftSort]);

    const total = filtered.length;
    const totalPages = Math.max(1, Math.ceil(total / pageSize));
    const start = (page - 1) * pageSize;

    const body: NftListResponse = {
      items: filtered.slice(start, start + pageSize),
      total,
      page,
      pageSize,
      totalPages,
    };

    return HttpResponse.json(body);
  }),
];
