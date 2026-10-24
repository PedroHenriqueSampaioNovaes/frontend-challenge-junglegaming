import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/mercado')({
  component: Mercado,
});

function Mercado() {
  return <h1 className="sr-only">Mercado</h1>;
}
