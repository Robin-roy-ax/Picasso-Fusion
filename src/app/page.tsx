import type { Metadata } from "next";
import Hero from "@/funnel/components/Hero/page";
import About from "@/funnel/components/About/page";


import Testimonials from "@/funnel/components/Testimonials/page";
import Service from "@/funnel/components/Benefits/page";
import Benefit from "@/funnel/components/Process/page";
import Pricing from "@/funnel/components/Pricing/index";
import Dribbble from "@/funnel/components/Dribbble/page";


export const metadata: Metadata = {
  title: "Home",
  description: "Welcome to Picasso Fusion. Create, explore, and innovate with our digital art platform.",
  alternates: {
    canonical: "https://picasso-fusion.vercel.app",
  },
};

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Dribbble />
      <Service />
      <Benefit />
      <Testimonials />
      <Pricing />
      
    </>
  );
}