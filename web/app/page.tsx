import { generateMetadata } from '@/utils/generateMetadata';
import Footer from '@/components/layout/footer/Footer';
import Header from '@/components/layout/header/Header';
import MainPage from '@/components/Pages/MainPage';

export const metadata = generateMetadata({
  title: 'Meety.xyz',
  description: 'Commenmorate your meetups and let it live forever on the base chain!',
  images: 'themes.png',
  pathname: '',
});

/**
 * Server component, which imports the Home component (client component that has 'use client' in it)
 * https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts
 * https://nextjs.org/docs/pages/building-your-application/upgrading/app-router-migration#step-4-migrating-pages
 * https://nextjs.org/docs/app/building-your-application/rendering/client-components
 */
export default function Page() {
  return (
    <>
      <Header />
      <main className="container mx-auto flex flex-col py-4 text-black">
        <MainPage />
      </main>
      <Footer />
    </>
  );
}
