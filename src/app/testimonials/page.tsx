import dynamicImport from "next/dynamic";
import Hero from "@/funnel/components/Hero/page";
import About from "@/funnel/components/About/page";
import Dribbble from "@/funnel/components/Dribbble/page";
import Benefits from "@/funnel/components/Benefits/page";
import Process from "@/funnel/components/Process/page";
import Testimonials from "@/funnel/components/Testimonials/page";
import ScrollHandler from "@/components/ScrollHandler";

// Lazy load sections below the target
const Pricing = dynamicImport(() => import("@/funnel/components/Pricing/index"), { ssr: true });

export const dynamic = "force-dynamic";

export default function TestimonialsPage() {
  return (
    <>
      <ScrollHandler targetId="testimonials" />
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
