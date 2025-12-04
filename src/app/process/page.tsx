"use client";

import { useEffect } from "react";
import Hero from "@/funnel/components/Hero/page";
import About from "@/funnel/components/About/page";
import Dribbble from "@/funnel/components/Dribbble/page";

import Testimonials from "@/funnel/components/Testimonials/page";
import Benefits from "@/funnel/components/Benefits/page";
import Process from "@/funnel/components/Process/page";
import Pricing from "@/funnel/components/Pricing/index";

export default function ProcessPage() {
  useEffect(() => {
    const scrollToSection = () => {
      const section = document.getElementById("process");
      if (section) {
        const header = document.querySelector("header");
        const headerHeight = header?.offsetHeight || 80;
        
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

    const timer = setTimeout(() => {
      if (!scrollToSection()) {
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
