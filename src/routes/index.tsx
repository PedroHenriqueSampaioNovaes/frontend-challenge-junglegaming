import { createFileRoute, stripSearchParams } from '@tanstack/react-router';

import HeaderDesktop from '../components/header/HeaderDesktop';
import HeaderMobile from '../components/header/HeaderMobile';
import Hero from '@/components/home/Hero';
import Catalog from '@/components/home/Catalog';

import { CatalogFiltersProvider } from '@/contexts/CatalogFiltersContext';
import {
  catalogSearchDefaults,
  catalogSearchSchema,
} from '@/features/nfts/catalogSearch';

export const Route = createFileRoute('/')({
  validateSearch: catalogSearchSchema,
  search: { middlewares: [stripSearchParams(catalogSearchDefaults)] },
  component: Home,
});

function Home() {
  return (
    <CatalogFiltersProvider>
      <div className="container max-md:pb-[calc(var(--nav-mobile-height)+1.5rem)]">
        <HeaderDesktop />
        <HeaderMobile />
        <Hero />
        <Catalog />
      </div>
    </CatalogFiltersProvider>
  );
}
