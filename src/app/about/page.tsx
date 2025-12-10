import type { Metadata } from "next";
export const dynamic = "force-dynamic";
import AboutUs from "@/funnel/components/AboutUS/page";

export const metadata: Metadata = {
  title: "About Us - Meet the Picasso Fusion Team | Design Experts",
  description: "Learn more about Picasso Fusion and our mission to empower businesses with unlimited design services. Meet our team of expert designers.",
  keywords: ["about picasso fusion", "design team", "creative agency", "design experts", "our story"],
  alternates: {
    canonical: "https://picasso-fusion.vercel.app/about",
  },
  openGraph: {
    title: "About Us - Meet the Picasso Fusion Team",
    description: "Learn more about Picasso Fusion and our mission to empower businesses with unlimited design services.",
    url: "https://picasso-fusion.vercel.app/about",
    type: "website",
  },
};

export default function AboutPage() {
  return <AboutUs />;
}
