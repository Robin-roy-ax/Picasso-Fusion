"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Plus, ArrowUpRight } from "lucide-react";
import Image from "next/image";

// Types
interface DribbleItem {
  id: string;
  type: "image" | "video";
  src: string;
  poster?: string;
  title?: string;
  description?: string;
  hasContent: boolean;
}

interface DribbleProps {
  items?: DribbleItem[];
  heading?: string;
  subheading?: string;
  ctaText?: string;
  ctaHref?: string;
  autoScrollSpeed?: number;
  className?: string;
}

// Default Dribble items based on the Framer design
const defaultItems: DribbleItem[] = [
  {
    id: "1",
    type: "video",
    src: "https://cdn.midjourney.com/video/1b234a9d-363b-4c17-9504-fd0981d5784b/0.mp4",
    poster: "https://framerusercontent.com/images/Njesde3H8PS7LKfFaJYuFVTJClQ.png?width=928&height=1232",
    hasContent: false,
  },
  {
    id: "2",
    type: "video",
    src: "https://cdn.midjourney.com/video/1eb1a294-a817-45ab-ba4b-99a715b49847/1.mp4",
    poster: "https://framerusercontent.com/images/DhFEb3IvXG3A5fMMXAF23SMh7BE.png?width=1856&height=2464",
    title: "Visual Identity Lab",
    description: "Material-driven identity systems—palette, type, textures, and signature.",
    hasContent: true,
  },
  {
    id: "3",
    type: "video",
    src: "https://cdn.midjourney.com/video/fe888f29-960b-4fa1-9071-d330430cc71c/1.mp4",
    poster: "https://framerusercontent.com/images/TmJp1UlxaH6Q7m979H4ocTamno.png?width=2912&height=1632",
    title: "Covers",
    description: "We delivered over 250 editorial designs this year",
    hasContent: true,
  },
  {
    id: "4",
    type: "video",
    src: "https://cdn.midjourney.com/video/c9411a5d-0197-493b-bff3-21e3beb667a6/1.mp4",
    poster: "https://framerusercontent.com/images/C1XrefkZs3oleqAfwQpG5KNdSp4.png?width=928&height=1232",
    title: "Foam Serum Launch",
    description: "Bubbly physics + product CGI used across hero, ads, and socials.",
    hasContent: true,
  },
  {
    id: "5",
    type: "image",
    src: "https://framerusercontent.com/images/0T6KhsyzX1usH6DnQDcGTTg.png?width=904&height=1200",
    hasContent: false,
  },
  {
    id: "6",
    type: "video",
    src: "https://cdn.midjourney.com/video/2437f125-6100-4a91-be6c-f95f8a052f45/0.mp4",
    poster: "https://framerusercontent.com/images/zgHb0OyId7kdxJCv7WwCEWI.png?width=2048&height=2048",
    title: "Modular Framer Websites",
    description: "Component-driven builds with responsive grids and subtle motion.",
    hasContent: true,
  },
  {
    id: "7",
    type: "image",
    src: "https://framerusercontent.com/images/CT2LDoAyk7L4ZdPnhd1Ol3W3dM.png?width=904&height=1200",
    hasContent: false,
  },
];

// Card Component
const DribbleCard: React.FC<{
  item: DribbleItem;
  isHovered: boolean;
  onHover: (id: string | null) => void;
}> = ({ item, isHovered, onHover }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      if (isHovered) {
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    }
  }, [isHovered]);

  return (
    <motion.div
      className="relative flex-shrink-0 h-full rounded-xl overflow-hidden cursor-pointer group"
      style={{ width: "calc(22.222% - 8px)" }}
      onMouseEnter={() => onHover(item.id)}
      onMouseLeave={() => onHover(null)}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
    >
      {/* Media Content */}
      {item.type === "video" ? (
        <video
          ref={videoRef}
          src={item.src}
          poster={item.poster}
          loop
          muted
          playsInline
          className="w-full h-full object-cover rounded-xl"
        />
      ) : (
        <Image
          src={item.src}
          alt={item.title || "Dribble item"}
          className="w-full h-full object-cover rounded-xl"
        />
      )}

      {/* Content Overlay */}
      {item.hasContent && (
        <>
          {/* Gradient Overlay */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-[#1d2029] via-transparent to-transparent rounded-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />

          {/* Title and Description */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 p-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
          >
            <div className="space-y-2">
              <h3 className="text-white font-medium text-lg leading-tight">
                {item.title}
              </h3>
              <p className="text-[#f2f4f7] text-sm opacity-80 leading-relaxed">
                {item.description}
              </p>
            </div>
          </motion.div>

          {/* Plus Icon */}
          <motion.div
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.8 }}
            transition={{ duration: 0.3 }}
          >
            <Plus className="w-5 h-5 text-white" />
          </motion.div>
        </>
      )}

      {/* Non-content hover effect */}
      {!item.hasContent && (
        <motion.div
          className="absolute inset-0 bg-black/20 rounded-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </motion.div>
  );
};

// Navigation Button Component
const NavButton: React.FC<{
  direction: "left" | "right";
  onClick: () => void;
}> = ({ direction, onClick }) => (
  <motion.button
    onClick={onClick}
    className={`absolute top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-[#1d2029]/90 backdrop-blur-sm flex items-center justify-center text-white shadow-xl border border-white/10 cursor-pointer ${
      direction === "left" ? "left-4" : "right-4"
    }`}
    whileHover={{ scale: 1.1, backgroundColor: "rgba(29, 32, 41, 1)" }}
    whileTap={{ scale: 0.95 }}
    transition={{ duration: 0.2 }}
  >
    {direction === "left" ? (
      <ChevronLeft className="w-6 h-6" />
    ) : (
      <ChevronRight className="w-6 h-6" />
    )}
  </motion.button>
);

// Main Carousel Component
export const Dribble: React.FC<DribbleProps> = ({
  items = defaultItems,
  heading = "Dribbble Shots",
  ctaText = "View Shots",
  ctaHref = "https://dribbble.com/PicassoFusion",
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);

  // Triple items for seamless infinite scroll
  const extendedItems = [...items, ...items, ...items];
  const totalItems = items.length;

  // Navigation handlers - infinite chain scroll
  const handleNav = (direction: "left" | "right") => {
    setIsTransitioning(true);
    
    setScrollPosition((prev) => {
      if (direction === "right") {
        return prev + 1;
      } else {
        return prev - 1;
      }
    });
  };

  // Handle seamless wrap-around after transition completes
  useEffect(() => {
    if (!isTransitioning) return;
    
    const timer = setTimeout(() => {
      setIsTransitioning(false);
      
      // Silently reset position to middle set if we've gone too far
      if (scrollPosition >= totalItems) {
        setScrollPosition(scrollPosition - totalItems);
      } else if (scrollPosition < -totalItems) {
        setScrollPosition(scrollPosition + totalItems);
      }
      
      // Re-enable transitions after reset
      requestAnimationFrame(() => {
        setIsTransitioning(true);
      });
    }, 500);

    return () => clearTimeout(timer);
  }, [scrollPosition, totalItems, isTransitioning]);

  return (
    <section className={`w-full overflow-hidden bg-white ${className}`}>
      {/* Header Section */}
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-semibold text-[#1d2029] leading-[1.1] max-w-xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          >
            {heading}
          </motion.h1>

          <motion.a
            href={ctaHref}
            className="group inline-flex items-center gap-3 text-[#1d2029] font-medium text-lg hover:opacity-70 transition-opacity"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
          >
            <span>{ctaText}</span>
            <motion.span
              className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-current"
              whileHover={{ scale: 1.1, rotate: 45 }}
              transition={{ duration: 0.2 }}
            >
              <ArrowUpRight className="w-4 h-4" />
            </motion.span>
          </motion.a>
        </div>
      </div>

      {/* Carousel Section */}
      <div className="relative w-full h-[350px] md:h-[420px] lg:h-[480px]">
        {/* Navigation Buttons - always enabled for infinite scroll */}
        <NavButton direction="left" onClick={() => handleNav("left")} />
        <NavButton direction="right" onClick={() => handleNav("right")} />

        {/* Carousel Track */}
        <div className="overflow-hidden h-full px-4">
          <motion.div
            ref={containerRef}
            className="flex gap-[10px] h-full"
            animate={{ x: `calc(-${(totalItems + scrollPosition) * (100 / 5)}% - ${(totalItems + scrollPosition) * 10}px)` }}
            transition={isTransitioning ? { duration: 0.5, ease: [0.23, 1, 0.32, 1] } : { duration: 0 }}
          >
            {extendedItems.map((item, index) => (
              <DribbleCard
                key={`${item.id}-${index}`}
                item={item}
                isHovered={hoveredId === `${item.id}-${index}`}
                onHover={(id) => setHoveredId(id ? `${item.id}-${index}` : null)}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Dribble;