import type { Metadata } from "next";
export const dynamic = "force-dynamic";
import dynamicImport from "next/dynamic";
import Hero from "@/funnel/components/Hero/page";
import About from "@/funnel/components/About/page";

// Lazy load below-fold components for better performance
const Testimonials = dynamicImport(() => import("@/funnel/components/Testimonials/page"), { ssr: true });
const Pricing = dynamicImport(() => import("@/funnel/components/Pricing/page"), { ssr: true });
const Dribbble = dynamicImport(() => import("@/funnel/components/Dribbble/page"), { ssr: true });
const Process = dynamicImport(() => import("@/funnel/components/Process/page"), { ssr: true });
const Benefits = dynamicImport(() => import("@/funnel/components/Benefits/page"), { ssr: true });


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
