import Hero from "@/funnel/components/Hero/page";
import About from "@/funnel/components/About/page";
import Dribbble from "@/funnel/components/Dribbble/page";
import Testimonials from "@/funnel/components/Testimonials/page";
import Benefits from "@/funnel/components/Benefits/page";
import Process from "@/funnel/components/Process/page";
import Pricing from "@/funnel/components/Pricing/index";
import ScrollHandler from "@/components/ScrollHandler";

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