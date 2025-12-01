"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";

import GlassCTAButton from "../common/GlassCTAButton";

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

// Default Dribble items
const defaultItems: DribbleItem[] = [
  {
    id: "1",
    type: "video",
    src: "/videos/heels gif mockup.mp4",
    poster: "/videos/heels gif mockup.mp4",
    title: "lorel ipsum dolor sit amet",
    description: "lorel ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
    hasContent: true,
  },
  {
    id: "2",
    type: "video",
    src: "/videos/18.mp4",
    poster: "/videos/18.mp4",
    title: "Visual Identity Lab",
    description: "Material-driven identity systems—palette, type, textures, and signature.",
    hasContent: true,
  },
  {
    id: "3",
    type: "video",
    src: "/videos/Bed Gif Mockup.mp4",
    poster: "/videos/Bed Gif Mockup.mp4",
    title: "Covers",
    description: "We delivered over 250 editorial designs this year",
    hasContent: true,
  },
  {
    id: "4",
    type: "video",
    src: "/videos/Cone Ice Cream Mockup.mp4",
    poster: "/videos/Cone Ice Cream Mockup.mp4",
    title: "Foam Serum Launch",
    description: "Bubbly physics + product CGI used across hero, ads, and socials.",
    hasContent: true,
  },
  {
    id: "5",
    type: "video",
    src: "/videos/F Soda Mockup.mp4",
    poster: "/videos/F Soda Mockup.mp4",
    title: "Visual Identity Lab",
    description: "Material-driven identity systems—palette, type, textures, and signature.",
    hasContent: true,
  },
  {
    id: "6",
    type: "image",
    src: "/videos/1.jpg",
    poster: "/videos/1.jpg",
    title: "Modular Framer Websites",
    description: "Component-driven builds with responsive grids and subtle motion.",
    hasContent: true,
  },
  {
    id: "7",
    type: "video",
    src: "/videos/Shoe gif mockup.mp4",
    poster: "/videos/Shoe gif mockup.mp4",
    title: "Modular Framer Websites",
    description: "Component-driven builds with responsive grids and subtle motion.",
    hasContent: true,
  },
  {
    id: "8",
    type: "video",
    src: "/videos/19.mp4",
    poster: "/videos/19.mp4",
    title: "Modular Framer Websites",
    description: "Component-driven builds with responsive grids and subtle motion.",
    hasContent: true,
  },
  {
    id: "9",
    type: "video",
    src: "/videos/20.mp4",
    poster: "/videos/20.mp4",
    title: "Modular Framer Websites",
    description: "Component-driven builds with responsive grids and subtle motion.",
    hasContent: true,
  },
  {
    id: "10",
    type: "video",
    src: "/videos/21.mp4",
    poster: "/videos/21.mp4",
    title: "Modular Framer Websites",
    description: "Component-driven builds with responsive grids and subtle motion.",
    hasContent: true,
  },
  {
    id: "11",
    type: "video",
    src: "/videos/22.mp4",
    poster: "/videos/22.mp4",
    title: "Modular Framer Websites",
    description: "Component-driven builds with responsive grids and subtle motion.",
    hasContent: true,
  },
  {
    id: "12",
    type: "video",
    src: "/videos/23.mp4",
    poster: "/videos/23.mp4",
    title: "Modular Framer Websites",
    description: "Component-driven builds with responsive grids and subtle motion.",
    hasContent: true,
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
    if (videoRef.current && item.type === "video") {
      videoRef.current.play().catch(() => {});
    }
  }, [item.type]);

  return (
    <motion.div
      className="relative flex-shrink-0 h-full rounded-xl overflow-hidden cursor-pointer group"
      style={{ width: "300px" }}
      onMouseEnter={() => onHover(item.id)}
      onMouseLeave={() => onHover(null)}
      transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
    >
      {/* Media Content */}
      <div className="relative w-full h-full">
        {item.type === "video" ? (
          <video
            ref={videoRef}
            src={item.src}
            poster={item.poster}
            loop
            muted
            playsInline
            autoPlay
            className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <img
            src={item.src}
            alt={item.title || "Dribble item"}
            className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
          />
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent transition-all duration-500 group-hover:from-black/80" />
      </div>

      {/* Content Overlay */}
      {item.hasContent && (
        <>
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <motion.h3
              className="text-xl font-bold mb-1"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              {item.title}
            </motion.h3>
            <p className="text-sm text-gray-200 opacity-80">
              {item.description ? "Design & Development" : "Visual Design"}
            </p>
          </div>

          {/* Description Overlay */}
          <div className="absolute inset-0 backdrop-blur-md bg-black/40 opacity-0 transition-opacity duration-500 p-6 flex items-center group-hover:opacity-100">
            <p className="text-white/90 text-base leading-relaxed">
              {item.description}
            </p>
          </div>
        </>
      )}
    </motion.div>
  );
};

// Main Carousel Component
export const Dribble: React.FC<DribbleProps> = ({
  items = defaultItems,
  heading = "Our Creative Showcase",
  ctaText = "Explore Visuals",
  ctaHref = "https://dribbble.com/PicassoFusion",
  autoScrollSpeed = 80,
  className = "",
}) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [translateX, setTranslateX] = useState(0);
  const [isHoveringCarousel, setIsHoveringCarousel] = useState(false);
  const animationFrameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);

  const totalItems = items.length;
  const extendedItems = [...items, ...items, ...items];

  const cardWidth = 300;
  const gapPx = 15;
  const cardScrollWidth = cardWidth + gapPx;
  const singleSetWidth = totalItems * cardScrollWidth;

  useEffect(() => {
    setTranslateX(-singleSetWidth);
  }, [singleSetWidth]);

  const animate = useCallback(
    (currentTime: number) => {
      if (lastTimeRef.current === null) {
        lastTimeRef.current = currentTime;
      }

      const deltaTime = (currentTime - lastTimeRef.current) / 1000;
      lastTimeRef.current = currentTime;

      setTranslateX((prev) => {
        let newTranslateX = prev - autoScrollSpeed * deltaTime;
        const middleSetEnd = -2 * singleSetWidth;
        if (newTranslateX < middleSetEnd) {
          newTranslateX = newTranslateX + singleSetWidth;
        }
        return newTranslateX;
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    },
    [autoScrollSpeed, singleSetWidth]
  );

  useEffect(() => {
    if (!isHoveringCarousel) {
      lastTimeRef.current = null;
      animationFrameRef.current = requestAnimationFrame(animate);
    } else {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isHoveringCarousel, animate]);

  const handleCarouselMouseEnter = useCallback(() => {
    setIsHoveringCarousel(true);
  }, []);

  const handleCarouselMouseLeave = useCallback(() => {
    setIsHoveringCarousel(false);
  }, []);

  return (
    <section id="dribbble" className={`w-full bg-white ${className}`}>
      {/* Header Section */}
      <div className="max-w-7xl mx-auto px-6 pt-12 md:pt-16 pb-2 md:pb-4 flex flex-col items-center text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-[#343e56] font-medium leading-[1.05em] tracking-[-0.05em] text-[40px] md:text-[60px] lg:text-[80px] xl:text-[100px] mb-2"
        >
          {heading.split(" ").slice(0, -1).join(" ")}{" "}
          <span
            style={{ fontFamily: '"Instrument Serif", serif' }}
            className="italic font-normal tracking-normal"
          >
            {heading.split(" ").slice(-1)}
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          viewport={{ once: true }}
          className="text-[#6f80a8] text-lg leading-7 max-w-3xl mx-auto mb-6"
        >
          See how we transform imagination into visuals through design and creativity.
        </motion.p>


      </div>

      {/* Carousel Section */}
      <div
        className="relative w-full h-[350px] md:h-[420px] lg:h-[480px]"
        onMouseEnter={handleCarouselMouseEnter}
        onMouseLeave={handleCarouselMouseLeave}
      >
        <div className="overflow-hidden h-full px-4">
          <div
            ref={trackRef}
            className="flex gap-[15px] h-full"
            style={{
              transform: `translateX(${translateX}px)`,
            }}
          >
            {extendedItems.map((item, index) => (
              <DribbleCard
                key={`${item.id}-${index}`}
                item={item}
                isHovered={hoveredId === `${item.id}-${index}`}
                onHover={(id) => setHoveredId(id ? `${item.id}-${index}` : null)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Button Section */}
      <div className="flex justify-center pt-10 pb-6">
        <GlassCTAButton href={ctaHref} text={ctaText} />
      </div>
    </section>
  );
};

export default Dribble;