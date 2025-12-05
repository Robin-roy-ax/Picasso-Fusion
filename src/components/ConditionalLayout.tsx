'use client';

import { usePathname } from 'next/navigation';
import Navbar from '@/funnel/components/Navbar/index';
import Footer from '@/funnel/components/Footer/index';
import FaqPage from '@/funnel/components/FaqPage';
import GradualBlur from '@/funnel/components/common/GradualBlur';

export default function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isStudioRoute = pathname?.startsWith('/studio');

  if (isStudioRoute) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      {children}
      <FaqPage />
      <Footer />
      <GradualBlur position="bottom" height="100px" zIndex={999} fixed />
    </>
  );
}
