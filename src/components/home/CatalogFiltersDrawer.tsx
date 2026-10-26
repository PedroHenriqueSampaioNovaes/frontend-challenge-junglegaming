import { useEffect } from 'react';

import { CatalogFilterSections } from '@/components/home/CatalogSidebar';
import { catalogFiltersDrawer } from '@/components/ui/catalog-filters-drawer-handle';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';

export default function CatalogFiltersDrawer() {
  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 48rem)');
    const closeOnDesktop = (event: MediaQueryListEvent) => {
      if (event.matches) catalogFiltersDrawer.close();
    };
    desktop.addEventListener('change', closeOnDesktop);
    return () => desktop.removeEventListener('change', closeOnDesktop);
  }, []);

  return (
    <Sheet handle={catalogFiltersDrawer}>
      <SheetContent side="left" className="gap-0">
        <SheetHeader className="px-4 pt-3.5 pb-4">
          <SheetTitle>Filtros</SheetTitle>
          <SheetDescription className="sr-only">
            Refine o catálogo por coleção, faixa de preço e rede.
          </SheetDescription>
        </SheetHeader>
        <div className="overflow-y-auto px-4 pb-4">
          <CatalogFilterSections
            onApply={() => catalogFiltersDrawer.close()}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}
