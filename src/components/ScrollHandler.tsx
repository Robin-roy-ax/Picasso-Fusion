"use client";

import { useEffect } from "react";

interface ScrollHandlerProps {
  targetId: string;
}

export default function ScrollHandler({ targetId }: ScrollHandlerProps) {
  useEffect(() => {
    const scrollToSection = () => {
      const section = document.getElementById(targetId);
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
  }, [targetId]);

  return null;
}
