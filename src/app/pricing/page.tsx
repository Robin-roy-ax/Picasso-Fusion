import Hero from "@/funnel/components/Hero/page";
import About from "@/funnel/components/About/page";
import Dribbble from "@/funnel/components/Dribbble/page";
import Benefits from "@/funnel/components/Benefits/page";
import Process from "@/funnel/components/Process/page";
import Testimonials from "@/funnel/components/Testimonials/page";
import Pricing from "@/funnel/components/Pricing/index";
import ScrollHandler from "@/components/ScrollHandler";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Pricing Plans - Flexible Design Subscriptions | Picasso Fusion",
  description: "Choose from our flexible pricing plans for unlimited design services. Get predictable monthly costs with expert designers at your fingertips.",
  keywords: ["design pricing", "design subscription", "unlimited design plans", "monthly design service", "design membership cost"],
  alternates: {
    canonical: "https://picasso-fusion.vercel.app/pricing",
  },
  openGraph: {
    title: "Pricing Plans - Flexible Design Subscriptions | Picasso Fusion",
    description: "Choose from our flexible pricing plans for unlimited design services.",
    url: "https://picasso-fusion.vercel.app/pricing",
    type: "website",
  },
};

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
