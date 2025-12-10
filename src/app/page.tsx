import type { Metadata } from "next";
export const dynamic = "force-dynamic";
import Hero from "@/funnel/components/Hero/page";
import About from "@/funnel/components/About/page";
import Testimonials from "@/funnel/components/Testimonials/page";
import Pricing from "@/funnel/components/Pricing/page";
import Dribbble from "@/funnel/components/Dribbble/page";
import Process from "@/funnel/components/Process/page";
import Benefits from "@/funnel/components/Benefits/page";


export const metadata: Metadata = {
  title: "Picasso Fusion - Transform Your Ideas into Stunning Designs",
  description: "Welcome to Picasso Fusion. Get unlimited design services with expert designers. Create, explore, and innovate with our subscription-based design platform.",
  keywords: ["digital art", "design membership", "unlimited design", "design subscription", "creative platform", "graphic design services"],
  alternates: {
    canonical: "https://picasso-fusion.vercel.app",
  },
  openGraph: {
    title: "Picasso Fusion - Transform Your Ideas into Stunning Designs",
    description: "Get unlimited design services with expert designers. Subscription-based design platform for all your creative needs.",
    url: "https://picasso-fusion.vercel.app",
    type: "website",
  },
};

export default function Home() {
  return (
    <>
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
