import Hero from "@/funnel/components/Hero/page";
import About from "@/funnel/components/About/page";
import Dribbble from "@/funnel/components/Dribbble/page";

import Testimonials from "@/funnel/components/Testimonials/page";
import Benefits from "@/funnel/components/Benefits/page";
import Process from "@/funnel/components/Process/page";
import Pricing from "@/funnel/components/Pricing/index";
import ScrollHandler from "@/components/ScrollHandler";

export const dynamic = "force-dynamic";

export default function ProcessPage() {
  return (
    <>
      <ScrollHandler targetId="process" />
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
