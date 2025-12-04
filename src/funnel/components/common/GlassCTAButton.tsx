"use client";

import React, { useState, type ElementType } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const GlassCTAButton: React.FC<{
  href: string;
  text: string;
  className?: string;
  style?: React.CSSProperties;
  hoverBgColor?: string;
  initialBgColor?: string;
  initialTextColor?: string;
  hoverTextColor?: string;
  rootClassName?: string;
  asChild?: boolean;
}> = ({ 
  href, 
  text, 
  className, 
  style,
  hoverBgColor = "rgba(0, 0, 0, 0.85)",
  initialBgColor = "rgba(255,255,255,0.12)",
  initialTextColor = "#000000ff",
  hoverTextColor = "#ffffffff",
  rootClassName,
  asChild = false,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const Root: ElementType = asChild ? motion.span : motion.a;

  return (
    <Root
      {...(!asChild ? { href, target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`relative inline-flex items-center cursor-pointer select-none ${rootClassName}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
    >
      {/* Button Container */}
      <motion.div
        className={`relative flex items-center gap-3 px-5 py-2.5 rounded-full overflow-hidden ${className}`}
        style={{
          background: initialBgColor,
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          border: "1px solid rgba(0, 0, 0, 0.25)",
          boxShadow: isHovered
            ? "0 8px 24px rgba(0,0,0,0.15)"
            : "0 4px 12px rgba(0,0,0,0.08)",
          ...style,
        }}
        animate={{
          scale: isHovered ? 1.03 : 1,
        }}
        transition={{ duration: 0.25 }}
      >
        {/* SLIDE-IN BACKGROUND */}
        <motion.div
          className="absolute inset-0 rounded-full"
          initial={{ x: "-100%" }}
          animate={{ x: isHovered ? "0%" : "-100%" }}
          transition={{
            duration: 0.45,
            ease: [0.23, 1, 0.32, 1],
          }}
          style={{
            background: hoverBgColor,
          }}
        />

        {/* TEXT */}
        <span
          className="relative z-10 font-medium text-base tracking-wide whitespace-nowrap"
          style={{
            color: isHovered ? hoverTextColor : initialTextColor,
            transition: "color 0.35s ease",
          }}
        >
          {text}
        </span>

        {/* ICON CONTAINER */}
        <motion.span
          className="relative z-10 inline-flex items-center justify-center w-9 h-9 rounded-full"
          style={{
            background: "rgba(255,255,255,0.25)",
            border: "1px solid rgba(0, 0, 0, 0.4)",
            backdropFilter: "blur(10px)",
          }}
          animate={{
            x: isHovered ? 3 : 0,
            y: isHovered ? -2 : 0,
            rotate: isHovered ? 45 : 0,
            background: isHovered
              ? "rgba(255, 255, 255, 1)"
              : "rgba(0, 0, 0, 1)",
          }}
          transition={{ duration: 0.3 }}
        >
          <ArrowUpRight
            className="w-5 h-5 transition-colors duration-300"
            style={{ color: isHovered ? initialTextColor : hoverTextColor }}
          />
        </motion.span>
      </motion.div>
    </Root>
  );
};

export default GlassCTAButton;
