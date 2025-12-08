"use client";

import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { useCursor } from "@/funnel/components/common/CursorContext";
import { rafThrottle } from "@/utils/performance";

const CustomCursor = () => {
  const { isCustomCursorActive } = useCursor();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, { stiffness: 300, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 300, damping: 20 });

  useEffect(() => {
    const moveCursor = rafThrottle((e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    });
    
    window.addEventListener("mousemove", moveCursor, { passive: true });
    return () => window.removeEventListener("mousemove", moveCursor);
  }, [mouseX, mouseY]);

  return (
    <AnimatePresence>
      {isCustomCursorActive && (
        <motion.div
          className="fixed top-[0px] left-[0px] w-3 h-3 rounded-full pointer-events-none z-[9999] 
                     mix-blend-difference bg-white transition-opacity duration-300"
          style={{
            x: smoothX,
            y: smoothY,
            translateX: "-50%",
            translateY: "-50%",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
      )}
    </AnimatePresence>
  );
};

export default CustomCursor;
