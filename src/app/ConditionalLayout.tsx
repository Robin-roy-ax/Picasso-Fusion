"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/funnel/components/Navbar/page";
import Footer from "@/funnel/components/Footer/page";
import FaqPage from "@/funnel/components/FaqPage/page";
import GradualBlur from "@/funnel/components/common/GradualBlur";

export default function ConditionalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isStudioRoute = pathname?.startsWith("/studio");

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
