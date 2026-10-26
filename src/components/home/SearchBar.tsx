import { useEffect, useRef, useState, type SyntheticEvent } from 'react';

import FilterSvg from '@/assets/icons/FilterSvg';
import SearchSvg from '@/assets/icons/SearchSvg';

import { Button } from '@/components/ui/button';
import { catalogFiltersDrawer } from '@/components/ui/catalog-filters-drawer-handle';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group';
import { SheetTrigger } from '@/components/ui/sheet';

import { SEARCH_MAX_LENGTH } from '@/features/nfts/catalogSearch';
import { useCatalogFilters } from '@/hooks/useCatalogFilters';
import { cn } from '@/lib/utils';

const SEARCH_DEBOUNCE_MS = 300;

export default function SearchBar({ className }: { className?: string }) {
  const { search, setSearch } = useCatalogFilters();
  const inputRef = useRef<HTMLInputElement>(null);

  const [draft, setDraft] = useState(search);
  const [sent, setSent] = useState(search);
  const [seen, setSeen] = useState(search);

  if (seen !== search) {
    setSeen(search);
    if (search !== sent) {
      setDraft(search);
      setSent(search);
    }
  }

  const term = draft.trim();

  useEffect(() => {
    if (term === sent) return;
    const timer = setTimeout(() => {
      setSent(term);
      setSearch(term);
    }, SEARCH_DEBOUNCE_MS);
    return () => clearTimeout(timer);
  }, [term, sent, setSearch]);

  const handleSubmit = (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (term !== sent) {
      setSent(term);
      setSearch(term);
    }
    // Dismiss the mobile keyboard so the results are visible.
    inputRef.current?.blur();
  };

  return (
    <form
      role="search"
      onSubmit={handleSubmit}
      className={cn('flex items-center gap-2', className)}
    >
      <InputGroup className="h-11 rounded-lg border-transparent bg-surface-card has-[[data-slot=input-group-control]:focus-visible]:border-primary has-[[data-slot=input-group-control]:focus-visible]:ring-primary/40 dark:bg-surface-card">
        <InputGroupAddon className="pr-0.5 pl-2.5">
          <SearchSvg className="size-5.5 text-secondary" aria-hidden="true" />
        </InputGroupAddon>
        <InputGroupInput
          ref={inputRef}
          type="search"
          name="search"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          maxLength={SEARCH_MAX_LENGTH}
          autoComplete="off"
          enterKeyHint="search"
          aria-label="Explorar coleções"
          placeholder="Explorar coleções"
          className="h-full text-[0.85rem] font-semibold text-text-primary placeholder:text-secondary"
        />
      </InputGroup>

      <SheetTrigger
        handle={catalogFiltersDrawer}
        render={
          <Button
            type="button"
            aria-label="Filtros"
            className="size-11 rounded-xl bg-transparent bg-clip-border bg-linear-to-br/srgb from-primary/60 to-primary text-lnk hover:bg-transparent hover:from-primary/80 hover:to-primary-light focus-visible:border-text-primary focus-visible:ring-text-primary/40"
          />
        }
      >
        <FilterSvg className="size-5.5" aria-hidden="true" />
      </SheetTrigger>
    </form>
  );
}
