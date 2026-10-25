import { useId } from 'react';

import {
  collections,
  formatPrice,
  networks,
  PRICE_MAX,
  PRICE_MIN,
  type CatalogFiltersState,
} from '@/hooks/useCatalogFilters';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';

const focusClass =
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-text-primary';

type CatalogFilterSectionsProps = {
  filters: CatalogFiltersState;
  onApply?: () => void;
};

export function CatalogFilterSections({
  filters,
  onApply,
}: CatalogFilterSectionsProps) {
  const id = useId();
  const {
    collection,
    toggleCollection,
    selectedNetworks,
    toggleNetwork,
    price,
    setPrice,
    applyPrice,
  } = filters;

  return (
    <div className="flex flex-col gap-7.5">
      <section
        aria-labelledby={`${id}-collections`}
        className="flex flex-col gap-1.5"
      >
        <h2
          id={`${id}-collections`}
          className="text-lg leading-5 font-bold text-foreground"
        >
          Coleções
        </h2>
        <ul>
          {collections.map(({ label, count }) => {
            const active = label === collection;
            return (
              <li key={label}>
                <button
                  type="button"
                  aria-pressed={active}
                  onClick={() => toggleCollection(label)}
                  className={`flex h-8 w-full cursor-pointer items-center justify-between px-2.5 text-xs transition-colors hover:text-primary-light ${focusClass} ${active ? 'text-text-accent' : 'text-text-secondary'}`}
                >
                  {label}
                  <span
                    className={`font-bold ${active ? 'text-text-accent' : 'text-text-secondary'}`}
                  >
                    ({count})
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </section>

      <section
        aria-labelledby={`${id}-price`}
        className="flex flex-col gap-1.5"
      >
        <h2
          id={`${id}-price`}
          className="text-lg leading-5 font-bold text-foreground"
        >
          Faixa de preço
        </h2>
        <div className="flex flex-col gap-2.5 pl-2.5">
          <Slider
            getThumbAriaLabel={(index) =>
              index === 0 ? 'Preço mínimo' : 'Preço máximo'
            }
            getThumbAriaValueText={(_, value) => `${formatPrice(value)} ETH`}
            min={PRICE_MIN}
            max={PRICE_MAX}
            step={0.01}
            value={price}
            onValueChange={(value) => setPrice(value as number[])}
          />
          <p className="text-sm leading-4 text-foreground">
            Preço: {formatPrice(price[0])} - {formatPrice(price[1])} ETH
          </p>
          <Button
            type="button"
            onClick={() => {
              applyPrice();
              onApply?.();
            }}
            className={`w-fit rounded-sm px-3 py-2 font-bold text-lnk hover:bg-primary-light ${focusClass} cursor-pointer`}
          >
            Aplicar
          </Button>
        </div>
      </section>

      <section
        aria-labelledby={`${id}-network`}
        className="flex flex-col gap-1.5"
      >
        <h2
          id={`${id}-network`}
          className="text-lg leading-5 font-bold text-foreground"
        >
          Rede
        </h2>
        <ul>
          {networks.map(({ label, count }) => {
            const active = selectedNetworks.includes(label);
            return (
              <li key={label}>
                <button
                  type="button"
                  aria-pressed={active}
                  onClick={() => toggleNetwork(label)}
                  className={`flex h-8 w-full cursor-pointer items-center justify-between pl-2.5 text-xs transition-colors hover:text-primary-light ${focusClass} ${active ? 'text-text-accent' : 'text-text-secondary'}`}
                >
                  {label}
                  <span>({count})</span>
                </button>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}

export default function CatalogSidebar({
  filters,
}: Pick<CatalogFilterSectionsProps, 'filters'>) {
  return (
    <aside
      aria-label="Filtros do catálogo"
      className="hidden self-start rounded-sm bg-surface-card px-4 pt-3.5 pb-4 md:block"
    >
      <CatalogFilterSections filters={filters} />
    </aside>
  );
}
