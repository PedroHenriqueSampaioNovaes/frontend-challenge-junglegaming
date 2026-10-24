import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/aprenda')({
  component: Aprenda,
});

function Aprenda() {
  return <h1 className="sr-only">Aprenda</h1>;
}
