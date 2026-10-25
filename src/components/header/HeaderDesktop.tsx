import { Link } from '@tanstack/react-router';

import CartSvg from '@/assets/icons/CartSvg';
import LogoutSvg from '@/assets/icons/LogoutSvg';
import SearchSvg from '@/assets/icons/SearchSvg';

const navItems = [
  { label: 'Início', to: '/' },
  { label: 'Mercado', to: '/mercado' },
  { label: 'Criadores', to: '/criadores' },
  { label: 'Aprenda', to: '/aprenda' },
] as const;

const focusClass =
  'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-text-primary';

export default function HeaderDesktop() {
  return (
    <header className="hidden bg-lnk pt-6 md:block">
      <div className="relative mx-auto h-11 max-w-376 flex items-center justify-between gap-6 after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-bottom after:scale-y-30 after:bg-primary">
        <Link
          to="/"
          aria-label="Kurio, página inicial"
          className={`flex w-40 items-center justify-self-start py-1 text-sm font-bold tracking-[15%] text-text-primary ${focusClass}`}
        >
          KURIO
        </Link>

        <nav aria-label="Navegação principal" className="flex">
          <ul className="flex gap-12">
            {navItems.map(({ label, to }) => (
              <li key={to} className="flex">
                <Link
                  to={to}
                  activeOptions={{ exact: true, includeSearch: false }}
                  className={`group relative flex items-center pb-5 tracking-wide text-text-primary data-[status=active]:font-bold data-[status=active]:text-text-accent ${focusClass} hover:text-primary-light transition`}
                >
                  {label}
                  <span
                    aria-hidden="true"
                    className="absolute bottom-0 h-0.75 w-full bg-transparent group-data-[status=active]:bg-primary"
                  ></span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="self-start flex items-center gap-9">
          <button
            type="button"
            aria-label="Buscar"
            className={`flex cursor-pointer text-text-primary ${focusClass} p-2`}
          >
            <SearchSvg className="size-5" aria-hidden="true" />
          </button>

          <Link
            to="/"
            aria-label="Carrinho, 6 itens"
            className={`relative flex text-text-primary ${focusClass}`}
          >
            <CartSvg className="size-6" aria-hidden="true" />
            <span
              aria-hidden="true"
              className="absolute -top-1 -right-2 flex size-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-lnk border-2 border-lnk box-content"
            >
              6
            </span>
          </Link>

          <Link
            to="/"
            className={`flex items-center gap-2 rounded-md bg-primary px-3 py-1.5 font-medium tracking-wide text-lnk hover:bg-primary-light ${focusClass} transition`}
          >
            <LogoutSvg className="size-5" aria-hidden="true" />
            Entrar
          </Link>
        </div>
      </div>
    </header>
  );
}
