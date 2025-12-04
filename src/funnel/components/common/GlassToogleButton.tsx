"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";

interface GlassToggleButtonProps {
  expanded: boolean;
  onClick: () => void;
  highlight?: boolean; 
}

export default function GlassToggleButton({
  expanded,
  onClick,
  highlight = false,
}: GlassToggleButtonProps) {
  const [hovered, setHovered] = useState(false);

  const cardText = highlight ? "white" : "#1d2029";

  return (
    <motion.button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative w-full rounded-xl py-3 px-4 flex items-center justify-between font-semibold"
      style={{
        color: cardText,
        background: highlight
          ? "rgba(255,255,255,0.08)"
          : "rgba(255,255,255,0.25)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        border: highlight
          ? "1px solid rgba(255,255,255,0.25)"
          : "1px solid rgba(0,0,0,0.12)",
      }}
      animate={{
        scale: hovered ? 1.015 : 1,
        boxShadow: hovered
          ? "0 8px 20px rgba(0,0,0,0.15)"
          : "0 2px 8px rgba(0,0,0,0.07)",
      }}
      transition={{ type: "spring", stiffness: 240, damping: 20 }}
    >

      <span>{expanded ? "Hide All Features" : "Show All Features"}</span>


      <motion.div
        animate={{ rotate: expanded ? 0 : 0 }}
        transition={{ duration: 0.25 }}
      >
        {expanded ? (
          <ChevronUp className="w-5 h-5" style={{ color: cardText }} />
        ) : (
          <ChevronDown className="w-5 h-5" style={{ color: cardText }} />
        )}
      </motion.div>
    </motion.button>
  );
}
