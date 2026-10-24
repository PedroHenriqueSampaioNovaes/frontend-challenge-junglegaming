import { createFileRoute } from '@tanstack/react-router';

import HeaderDesktop from '../components/header/HeaderDesktop';
import HeaderMobile from '../components/header/HeaderMobile';
import Hero from '@/components/home/Hero';

export const Route = createFileRoute('/')({
  component: Home,
});

function Home() {
  return (
    <div className="container">
      <HeaderDesktop />
      <HeaderMobile />
      <Hero />
    </div>
  );
}
