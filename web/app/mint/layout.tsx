import { Suspense } from 'react';

/** Root layout to define the structure of every page
 * https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts
 */
export default function MintLayout({ children }: { children: React.ReactNode }) {
  return <Suspense>{children}</Suspense>;
}
