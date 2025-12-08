'use client';

import { usePathname } from 'next/navigation';
import Navbar from '@/funnel/components/Navbar/index';
import Footer from '@/funnel/components/Footer/index';
import FaqPage from '@/funnel/components/FaqPage/index';
import GradualBlur from '@/funnel/components/common/GradualBlur';

export default function ConditionalLayout({ 
  children,
  navbarData,
  footerData,
  faqData
}: { 
  children: React.ReactNode,
  navbarData?: any,
  footerData?: any,
  faqData?: any
}) {
  const pathname = usePathname();
  const isStudioRoute = pathname?.startsWith('/studio');

  if (isStudioRoute) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar data={navbarData} />
      {children}
      <FaqPage data={faqData} />
      <Footer data={footerData} />
      <GradualBlur position="bottom" height="100px" zIndex={999} fixed />
    </>
  );
}
