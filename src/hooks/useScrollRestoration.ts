"use client";

import { useEffect } from "react";

export function useScrollRestoration() {
  useEffect(() => {
    // Save scroll position before page unload
    const saveScrollPosition = () => {
      sessionStorage.setItem("scrollPosition", window.scrollY.toString());
    };

    // Restore scroll position on load
    const restoreScrollPosition = () => {
      const savedPosition = sessionStorage.getItem("scrollPosition");
      if (savedPosition) {
        window.scrollTo(0, parseInt(savedPosition, 10));
      }
    };

    // Restore position when component mounts
    restoreScrollPosition();

    // Save position before page unloads
    window.addEventListener("beforeunload", saveScrollPosition);

    return () => {
      window.removeEventListener("beforeunload", saveScrollPosition);
    };
  }, []);
}
