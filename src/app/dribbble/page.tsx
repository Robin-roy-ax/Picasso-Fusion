import dynamicImport from "next/dynamic";
import Hero from "@/funnel/components/Hero/page";
import About from "@/funnel/components/About/page";
import Dribbble from "@/funnel/components/Dribbble/page";
import { sanityFetch } from "@/sanity/lib/live";
import ScrollHandler from "@/components/ScrollHandler";

// Lazy load sections below the target
const Testimonials = dynamicImport(() => import("@/funnel/components/Testimonials/page"), { ssr: true });
const Benefits = dynamicImport(() => import("@/funnel/components/Benefits/page"), { ssr: true });
const Process = dynamicImport(() => import("@/funnel/components/Process/page"), { ssr: true });
const Pricing = dynamicImport(() => import("@/funnel/components/Pricing/index"), { ssr: true });

export const dynamic = "force-dynamic";

export default function DribbblePage() {
  return (
    <>
      <ScrollHandler targetId="dribbble" />
      <Hero />
      <About />
      <Dribbble />
      <Benefits />
      <Process />
      <Testimonials />
      <Pricing />
    </>
  );
}
