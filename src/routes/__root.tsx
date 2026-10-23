import { Outlet, createRootRoute } from '@tanstack/react-router';

export const Route = createRootRoute({
  component: () => <Outlet />,
  notFoundComponent: () => <p>Página não encontrada</p>,
});
