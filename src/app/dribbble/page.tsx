"use client";

import { useEffect } from "react";
import Hero from "@/funnel/components/Hero/page";
import About from "@/funnel/components/About/page";
import Dribbble from "@/funnel/components/Dribbble/page";
import Testimonials from "@/funnel/components/Testimonials/page";
import Benefits from "@/funnel/components/Benefits/page";
import Process from "@/funnel/components/Process/page";
import Pricing from "@/funnel/components/Pricing/index";

export default function DribbblePage() {
  useEffect(() => {
    // Scroll to dribbble section after page renders
    const scrollToSection = () => {
      const section = document.getElementById("dribbble");
      if (section) {
        // Get header height for offset
        const header = document.querySelector("header");
        const headerHeight = header?.offsetHeight || 80;
        
        // Scroll with offset for header
        const elementPosition = section.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
        return true;
      }
      return false;
    };

    // Try after a short delay to ensure DOM is ready
    const timer = setTimeout(() => {
      if (!scrollToSection()) {
        // Retry if element not found
        setTimeout(scrollToSection, 200);
      }
    }, 100);

    return () => clearTimeout(timer);
  }, []);

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
