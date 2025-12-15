import dynamicImport from "next/dynamic";
import Hero from "@/funnel/components/Hero/page";
import About from "@/funnel/components/About/page";
import Dribbble from "@/funnel/components/Dribbble/page";
import Benefits from "@/funnel/components/Benefits/page";
import ScrollHandler from "@/components/ScrollHandler";

// Lazy load sections below the target
const Testimonials = dynamicImport(() => import("@/funnel/components/Testimonials/page"), { ssr: true });
const Process = dynamicImport(() => import("@/funnel/components/Process/page"), { ssr: true });
const Pricing = dynamicImport(() => import("@/funnel/components/Pricing/index"), { ssr: true });

export const dynamic = "force-dynamic";

export default function BenefitsPage() {
  return (
    <>
      <ScrollHandler targetId="benefits" />
      <Hero />
      <About />
      <Dribbble />
      <div id="benefits" className="bg-[white] pt-66 md:pt-60">
        <Benefits id="benefits-content" />
      </div>
      <Process />
      <Testimonials />
      <Pricing />
    </>
  );
}