import { useEffect, useState } from 'react';
import { SlidersHorizontalIcon } from 'lucide-react';

import { CatalogFilterSections } from '@/components/home/CatalogSidebar';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

export default function CatalogFiltersDrawer() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 48rem)');
    const closeOnDesktop = (event: MediaQueryListEvent) => {
      if (event.matches) setOpen(false);
    };
    desktop.addEventListener('change', closeOnDesktop);
    return () => desktop.removeEventListener('change', closeOnDesktop);
  }, []);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className="flex h-8 cursor-pointer items-center gap-2 rounded-sm bg-surface-card px-3 text-xs font-medium text-text-primary transition-colors hover:bg-surface-raised focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-text-primary md:hidden">
        <SlidersHorizontalIcon className="size-4" aria-hidden="true" />
        Filtros
      </SheetTrigger>
      <SheetContent side="left" className="gap-0">
        <SheetHeader className="px-4 pt-3.5 pb-4">
          <SheetTitle>Filtros</SheetTitle>
          <SheetDescription className="sr-only">
            Refine o catálogo por coleção, faixa de preço e rede.
          </SheetDescription>
        </SheetHeader>
        <div className="overflow-y-auto px-4 pb-4">
          <CatalogFilterSections onApply={() => setOpen(false)} />
        </div>
      </SheetContent>
    </Sheet>
  );
}
