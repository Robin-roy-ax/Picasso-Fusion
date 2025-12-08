import Hero from "@/funnel/components/Hero/page";
export const dynamic = "force-dynamic";
import About from "@/funnel/components/About/page";
import Dribbble from "@/funnel/components/Dribbble/page";

import Testimonials from "@/funnel/components/Testimonials/page";
import Benefits from "@/funnel/components/Benefits/page";
import Process from "@/funnel/components/Process/page";
import Pricing from "@/funnel/components/Pricing/index";
import ScrollHandler from "@/components/ScrollHandler";

export default function PricingPage() {
  return (
    <>
      <ScrollHandler targetId="pricing" />
      <Hero />
      <About />
      <Dribbble />
      <Benefits />
      <Process />
      <Testimonials />
      <Pricing variant="compare" />
    </>
  );
}
