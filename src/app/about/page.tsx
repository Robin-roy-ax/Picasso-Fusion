import type { Metadata } from "next";
export const dynamic = "force-dynamic";
import AboutUs from "@/funnel/components/AboutUS/page";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn more about Picasso Fusion and our mission to empower digital artists.",
  alternates: {
    canonical: "https://picasso-fusion.vercel.app/about",
  },
};

export default function AboutPage() {
  return <AboutUs />;
}
