"use client";

import React, { useState, useEffect } from "react";
import { throttle } from "@/utils/performance";

interface GradualBlurProps {
  position?: "top" | "bottom" | "left" | "right";
  height?: string;
  width?: string;
  className?: string;
  zIndex?: number;
  fixed?: boolean;
  hideAtBottom?: boolean;
  hideThreshold?: number;
}

export default function GradualBlur({
  position = "bottom",
  height = "100%",
  width = "100%",
  className = "",
  zIndex = 1000,
  fixed = false,
  hideAtBottom = true,
  hideThreshold = 100,
}: GradualBlurProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (!hideAtBottom || !fixed) return;

    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;

      const distanceFromBottom = documentHeight - (scrollTop + windowHeight);

      if (distanceFromBottom <= hideThreshold) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };

    handleScroll();
    

    const throttledScroll = throttle(handleScroll, 100);
    
    window.addEventListener("scroll", throttledScroll, { passive: true });
    window.addEventListener("resize", throttledScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", throttledScroll);
      window.removeEventListener("resize", throttledScroll);
    };
  }, [hideAtBottom, hideThreshold, fixed]);

  const positionStyles: Record<string, React.CSSProperties> = {
    bottom: {
      bottom: 0,
      left: 0,
      right: 0,
    },
    top: {
      top: 0,
      left: 0,
      right: 0,
    },
    left: {
      left: 0,
      top: 0,
      bottom: 0,
    },
    right: {
      right: 0,
      top: 0,
      bottom: 0,
    },
  };

  const maskImages: Record<string, string[]> = {
    bottom: [
      "linear-gradient(to bottom, transparent 0%, black 20%, black 40%, transparent 60%)",
      "linear-gradient(to bottom, transparent 20%, black 40%, black 60%, transparent 80%)",
      "linear-gradient(to bottom, transparent 40%, black 60%, black 80%, transparent 100%)",
      "linear-gradient(to bottom, transparent 60%, black 80%, black 100%)",
      "linear-gradient(to bottom, transparent 80%, black 100%)",
    ],
    top: [
      "linear-gradient(to top, transparent 0%, black 20%, black 40%, transparent 60%)",
      "linear-gradient(to top, transparent 20%, black 40%, black 60%, transparent 80%)",
      "linear-gradient(to top, transparent 40%, black 60%, black 80%, transparent 100%)",
      "linear-gradient(to top, transparent 60%, black 80%, black 100%)",
      "linear-gradient(to top, transparent 80%, black 100%)",
    ],
    left: [
      "linear-gradient(to left, transparent 0%, black 20%, black 40%, transparent 60%)",
      "linear-gradient(to left, transparent 20%, black 40%, black 60%, transparent 80%)",
      "linear-gradient(to left, transparent 40%, black 60%, black 80%, transparent 100%)",
      "linear-gradient(to left, transparent 60%, black 80%, black 100%)",
      "linear-gradient(to left, transparent 80%, black 100%)",
    ],
    right: [
      "linear-gradient(to right, transparent 0%, black 20%, black 40%, transparent 60%)",
      "linear-gradient(to right, transparent 20%, black 40%, black 60%, transparent 80%)",
      "linear-gradient(to right, transparent 40%, black 60%, black 80%, transparent 100%)",
      "linear-gradient(to right, transparent 60%, black 80%, black 100%)",
      "linear-gradient(to right, transparent 80%, black 100%)",
    ],
  };

  const blurAmounts = [0.083, 0.166, 0.377, 0.749, 1.0];

  return (
    <div
      className={`gradual-blur gradual-blur-parent ${className}`}
      style={{
        position: fixed ? "fixed" : "absolute",
        pointerEvents: "none",
        opacity: isVisible ? 1 : 0,
        zIndex,
        height,
        width,
        ...positionStyles[position],
        transition: "opacity 0.3s ease-in-out",
      }}
    >
      <div
        className="gradual-blur-inner"
        style={{ position: "relative", width: "100%", height: "100%" }}
      >
        {maskImages[position].map((maskImage, index) => (
          <div
            key={index}
            style={{
              position: "absolute",
              inset: 0,
              maskImage,
              WebkitMaskImage: maskImage,
              backdropFilter: `blur(${blurAmounts[index]}rem)`,
              WebkitBackdropFilter: `blur(${blurAmounts[index]}rem)`,
              opacity: 1,
            }}
          />
        ))}
      </div>
    </div>
  );
}
