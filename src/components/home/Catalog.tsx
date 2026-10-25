import { useState } from 'react';

import CatalogFiltersDrawer from '@/components/home/CatalogFiltersDrawer';
import CatalogSidebar from '@/components/home/CatalogSidebar';
import NftCard from '@/components/home/NftCard';

import type { NftSort } from '@/features/nfts/types';

import { useCatalogFilters } from '@/hooks/useCatalogFilters';
import { useNfts } from '@/hooks/useNfts';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const tabs = ['Todos os NFTs', 'Novos lançamentos', 'Em alta'] as const;

const sortOptions = [
  { value: 'recent', label: 'Listados recentemente' },
  { value: 'price-asc', label: 'Menor preço' },
  { value: 'price-desc', label: 'Maior preço' },
] as const;

const PAGE_SIZE = 9;

const focusClass =
  'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-text-primary';

export default function Catalog() {
  const [tab, setTab] = useState<string>(tabs[0]);
  const [sort, setSort] = useState<NftSort>(sortOptions[0].value);
  const filters = useCatalogFilters();

  const { data, isPending, isError, isFetching, refetch } = useNfts({
    collection: filters.collection ?? undefined,
    networks: filters.selectedNetworks,
    minPrice: filters.appliedPrice[0].toFixed(2),
    maxPrice: filters.appliedPrice[1].toFixed(2),
    sort,
    page: 1,
    pageSize: PAGE_SIZE,
  });

  return (
    <section
      id="catalogo"
      aria-labelledby="catalog-title"
      className="mt-4 md:mt-24 md:grid md:grid-cols-[15.5rem_minmax(0,1fr)] md:items-start md:gap-x-9.75"
    >
      <h2 id="catalog-title" className="sr-only">
        Catálogo de NFTs
      </h2>

      <CatalogSidebar filters={filters} />

      <div className="flex flex-col gap-5.5">
        <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-3">
          <div role="group" aria-label="Listagem" className="flex gap-4.5">
            {tabs.map((label) => {
              const active = label === tab;
              return (
                <button
                  key={label}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setTab(label)}
                  className={`cursor-pointer border-b-2 text-xs leading-4.5 font-medium whitespace-nowrap transition-colors ${focusClass} ${active ? 'border-primary text-text-accent' : 'border-transparent text-text-primary hover:text-primary-light'}`}
                >
                  {label}
                </button>
              );
            })}
          </div>

          <div className="flex w-full items-center justify-between gap-4 md:w-auto">
            <CatalogFiltersDrawer filters={filters} />
            <div className="flex items-center gap-1.5 text-xs text-text-primary">
              <span id="sort-label" className="max-sm:sr-only">
                Ordenar por:
              </span>
              <Select
                value={sort}
                onValueChange={(value) => value && setSort(value as NftSort)}
                items={sortOptions}
              >
                <SelectTrigger
                  aria-labelledby="sort-label"
                  className={`w-auto cursor-pointer gap-1 rounded-none border-0 bg-transparent p-0 text-xs text-text-primary hover:bg-transparent focus-visible:ring-0 data-[size=default]:h-auto dark:bg-transparent dark:hover:bg-transparent [&_svg]:text-text-primary ${focusClass}`}
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent
                  align="end"
                  alignItemWithTrigger={false}
                  className="min-w-52"
                >
                  {sortOptions.map(({ value, label }) => (
                    <SelectItem
                      key={value}
                      value={value}
                      className="rounded-sm text-xs"
                    >
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {isPending ? (
          <p role="status" className="text-sm text-text-primary">
            Carregando NFTs…
          </p>
        ) : isError ? (
          <div role="alert" className="flex flex-col items-start gap-3">
            <p className="text-sm text-text-primary">
              Não foi possível carregar os NFTs.
            </p>
            <button
              type="button"
              onClick={() => refetch()}
              className={`cursor-pointer text-sm font-medium text-text-accent underline ${focusClass}`}
            >
              Tentar novamente
            </button>
          </div>
        ) : data.items.length === 0 ? (
          <p role="status" className="text-sm text-text-primary">
            Nenhum NFT encontrado para os filtros selecionados.
          </p>
        ) : (
          <ul
            aria-busy={isFetching}
            className="grid grid-cols-2 gap-x-8.5 gap-y-18 md:grid-cols-[repeat(auto-fit,minmax(12.5rem,15.625rem))]"
          >
            {data.items.map((nft) => (
              <li key={nft.id}>
                <NftCard nft={nft} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
