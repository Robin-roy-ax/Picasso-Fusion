"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";


export function useRouteTransition() {
  const pathname = usePathname();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [previousPathname, setPreviousPathname] = useState<string | null>(null);

  useEffect(() => {
    if (previousPathname !== null && previousPathname !== pathname) {
      setIsTransitioning(true);

      const timer = setTimeout(() => {
        setIsTransitioning(false);
      }, 100);

      return () => clearTimeout(timer);
    }

    setPreviousPathname(pathname);
  }, [pathname, previousPathname]);

  return isTransitioning;
}

export function useReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return prefersReducedMotion;
}
