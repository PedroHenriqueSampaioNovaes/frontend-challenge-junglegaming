import { Link } from '@tanstack/react-router';

import BgMobile from '../../assets/BgMobile';

import HouseSvg from '@/assets/icons/HouseSvg';
import ScannerSvg from '@/assets/icons/ScannerSvg';
import HeartSvg from '@/assets/icons/HeartSvg';
import CartSvg from '@/assets/icons/CartSvg';
import UserSvg from '@/assets/icons/UserSvg';

const iconClass = 'size-6';

export function HeaderMobile() {
  return (
    <nav
      aria-label="Navegação principal"
      className="fixed inset-x-0 bottom-0 z-50 h-23.5 md:hidden"
    >
      <BgMobile
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 size-full shadow-[0,-10px,30px,rgba(10,6,4,0.45)]"
      />
      <button
        type="button"
        aria-label="Escanear"
        className="absolute left-1/2 -top-10 flex size-16.5 -translate-x-1/2 items-center justify-center rounded-full bg-linear-to-b from-primary/40 to-primary text-text-primary outline-offset-4 focus-visible:outline-2 focus-visible:outline-text-primary"
      >
        <ScannerSvg
          className={`${iconClass} text-text-secondary`}
          aria-hidden="true"
        />
      </button>

      <div className="relative flex h-full items-center">
        <ul className="flex flex-1 items-center justify-around">
          <li>
            <Link
              to="/"
              activeOptions={{ exact: true }}
              aria-label="Início"
              className="flex p-2 text-text-secondary data-[status=active]:text-text-accent focus-visible:outline-2 focus-visible:outline-text-primary"
            >
              <HouseSvg className={iconClass} aria-hidden="true" />
            </Link>
          </li>
          <li>
            <Link
              to="/"
              aria-label="Favoritos"
              className="flex p-2 text-text-secondary focus-visible:outline-2 focus-visible:outline-text-primary"
            >
              <HeartSvg className={iconClass} aria-hidden="true" />
            </Link>
          </li>
        </ul>

        <div className="w-28 shrink-0" aria-hidden="true" />

        <ul className="flex flex-1 items-center justify-around">
          <li>
            <Link
              to="/"
              aria-label="Carrinho"
              className="flex p-2 text-text-secondary focus-visible:outline-2 focus-visible:outline-text-primary"
            >
              <CartSvg className={iconClass} aria-hidden="true" />
            </Link>
          </li>
          <li>
            <Link
              to="/"
              aria-label="Perfil"
              className="flex p-2 text-text-secondary focus-visible:outline-2 focus-visible:outline-text-primary"
            >
              <UserSvg className={iconClass} aria-hidden="true" />
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
