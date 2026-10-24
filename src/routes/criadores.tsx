import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/criadores')({
  component: Criadores,
});

function Criadores() {
  return <h1 className="sr-only">Criadores</h1>;
}
