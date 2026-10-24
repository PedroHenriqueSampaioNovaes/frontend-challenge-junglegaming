import { createFileRoute } from '@tanstack/react-router';
import { HeaderMobile } from '../components/header/HeaderMobile';

export const Route = createFileRoute('/')({
  component: Home,
});

function Home() {
  return (
    <>
      <header>
        <h1>NFT Marketplace</h1>
      </header>
      <HeaderMobile />
    </>
  );
}
