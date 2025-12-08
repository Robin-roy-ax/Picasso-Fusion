"use client";

import { useEffect } from "react";

export default function ScrollRestoration() {
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    const saveScrollPosition = () => {
      sessionStorage.setItem("scrollPosition", window.scrollY.toString());
    };

    const clearScrollPosition = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a');
      
      if (link && (link.getAttribute('href') === '/' || link.getAttribute('href') === '#hero')) {
        sessionStorage.removeItem("scrollPosition");
      }
    };

    const savedPosition = sessionStorage.getItem("scrollPosition");
    if (savedPosition) {
      requestAnimationFrame(() => {
        window.scrollTo({
          top: parseInt(savedPosition, 10),
          behavior: "instant" as ScrollBehavior,
        });
      });
    }

    window.addEventListener("beforeunload", saveScrollPosition);
    document.addEventListener("click", clearScrollPosition);

    return () => {
      window.removeEventListener("beforeunload", saveScrollPosition);
      document.removeEventListener("click", clearScrollPosition);
    };
  }, []);

  return null;
}
