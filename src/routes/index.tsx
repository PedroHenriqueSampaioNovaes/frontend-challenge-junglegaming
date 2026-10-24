import { createFileRoute } from '@tanstack/react-router';
import HeaderDesktop from '../components/header/HeaderDesktop';
import HeaderMobile from '../components/header/HeaderMobile';

export const Route = createFileRoute('/')({
  component: Home,
});

function Home() {
  return (
    <>
      <HeaderDesktop />
      <h1 className="sr-only">NFT Marketplace</h1>
      <HeaderMobile />
    </>
  );
}
