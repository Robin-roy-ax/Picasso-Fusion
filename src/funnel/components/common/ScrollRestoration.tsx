"use client";

import { useEffect } from "react";

export default function ScrollRestoration() {
  useEffect(() => {
    // Disable Next.js automatic scroll restoration
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    // Save scroll position before page unload
    const saveScrollPosition = () => {
      sessionStorage.setItem("scrollPosition", window.scrollY.toString());
    };

    // Clear scroll position when navigating to home
    const clearScrollPosition = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a');
      
      if (link && (link.getAttribute('href') === '/' || link.getAttribute('href') === '#hero')) {
        sessionStorage.removeItem("scrollPosition");
      }
    };

    // Restore scroll position on load
    const savedPosition = sessionStorage.getItem("scrollPosition");
    if (savedPosition) {
      // Use requestAnimationFrame to ensure DOM is ready
      requestAnimationFrame(() => {
        window.scrollTo({
          top: parseInt(savedPosition, 10),
          behavior: "instant" as ScrollBehavior,
        });
      });
    }

    // Save position before page unloads
    window.addEventListener("beforeunload", saveScrollPosition);
    // Clear position when clicking home/logo
    document.addEventListener("click", clearScrollPosition);

    return () => {
      window.removeEventListener("beforeunload", saveScrollPosition);
      document.removeEventListener("click", clearScrollPosition);
    };
  }, []);

  return null;
}
