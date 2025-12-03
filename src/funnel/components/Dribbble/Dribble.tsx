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
    type: "image",
    src: "/videos/1.jpg",
    poster: "/videos/1.jpg",
    title: "lorel ipsum dolor sit amet",
    description: "lorel ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
    hasContent: true,
  },
  {
    id: "2",
    type: "video",
    src: "/videos/28.mp4",
    poster: "/videos/28.mp4",
    title: "Modular Framer Websites",
    description: "Component-driven builds with responsive grids and subtle motion.",
    hasContent: true,
  },
  {
    id: "3",
    type: "image",
    src: "/videos/3.jpg",
    poster: "/videos/3.jpg",
    title: "Covers",
    description: "We delivered over 250 editorial designs this year",
    hasContent: true,
  },
  {
    id: "4",
    type: "video",
    src: "/videos/27.mp4",
    poster: "/videos/27.mp4",
    title: "Modular Framer Websites",
    description: "Component-driven builds with responsive grids and subtle motion.",
    hasContent: true,
  },
  {
    id: "5",
    type: "image",
    src: "/videos/5.jpg",
    poster: "/videos/5.jpg",
    title: "Visual Identity Lab",
    description: "Material-driven identity systems—palette, type, textures, and signature.",
    hasContent: true,
  },
  {
    id: "6",
    type: "video",
    src: "/videos/26.mp4",
    poster: "/videos/26.mp4",
    title: "Modular Framer Websites",
    description: "Component-driven builds with responsive grids and subtle motion.",
    hasContent: true,
  },
  {
    id: "7",
    type: "image",
    src: "/videos/7.jpg",
    poster: "/videos/7.jpg",
    title: "Promotional creative for luxury perfume brand",
    description: "An immersive luxury scene showcasing product sophistication with nature",
    hasContent: true,
  },
  {
    id: "8",
    type: "video",
    src: "/videos/22.mp4",
    poster: "/videos/22.mp4",
    title: "Modular Framer Websites",
    description: "Component-driven builds with responsive grids and subtle motion.",
    hasContent: true,
  },
  {
    id: "9",
    type: "image",
    src: "/videos/9.jpg",
    poster: "/videos/9.jpg",
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
    type: "image",
    src: "/videos/11.jpg",
    poster: "/videos/11.jpg",
    title: "Modular Framer Websites",
    description: "Component-driven builds with responsive grids and subtle motion.",
    hasContent: true,
  },
  {
    id: "12",
    type: "video",
    src: "/videos/18.mp4",
    poster: "/videos/18.mp4",
    title: "Modular Framer Websites",
    description: "Component-driven builds with responsive grids and subtle motion.",
    hasContent: true,
    
  },
  {
    id: "13",
    type: "image",
    src: "/videos/13.jpg",
    poster: "/videos/13.jpg",
    title: "Modular Framer Websites",
    description: "Component-driven builds with responsive grids and subtle motion.",
    hasContent: true,
  },
  {
    id: "14",
    type: "image",
    src: "/videos/14.jpg",
    poster: "/videos/14.jpg",
    title: "Modular Framer Websites",
    description: "Component-driven builds with responsive grids and subtle motion.",
    hasContent: true,
  },
  {
    id: "15",
    type: "image",
    src: "/videos/15.jpg",
    poster: "/videos/15.jpg",
    title: "Modular Framer Websites",
    description: "Component-driven builds with responsive grids and subtle motion.",
    hasContent: true,
  },
  {
    id: "16",
    type: "image",
    src: "/videos/16.jpg",
    poster: "/videos/16.jpg",
    title: "Modular Framer Websites",
    description: "Component-driven builds with responsive grids and subtle motion.",
    hasContent: true,
  },
  {
    id: "17",
    type: "image",
    src: "/videos/17.jpg",
    poster: "/videos/17.jpg",
    title: "Modular Framer Websites",
    description: "Component-driven builds with responsive grids and subtle motion.",
    hasContent: true,
  },
  {
    id: "18",
    type: "image",
    src: "/videos/24.jpg",
    poster: "/videos/24.jpg",
    title: "Modular Framer Websites",
    description: "Component-driven builds with responsive grids and subtle motion.",
    hasContent: true,
  },
  {
    id: "19",
    type: "image",
    src: "/videos/12.jpg",
    poster: "/videos/12.jpg",
    title: "Modular Framer Websites",
    description: "Component-driven builds with responsive grids and subtle motion.",
    hasContent: true,
  },
  {
    id: "20",
    type: "image",
    src: "/videos/10.jpg",
    poster: "/videos/10.jpg",
    title: "Modular Framer Websites",
    description: "Component-driven builds with responsive grids and subtle motion.",
    hasContent: true,
  },
  {
    id: "21",
    type: "image",
    src: "/videos/8.jpg",
    poster: "/videos/8.jpg",
    title: "Modular Framer Websites",
    description: "Component-driven builds with responsive grids and subtle motion.",
    hasContent: true,
  },
  {
    id: "22",
    type: "image",
    src: "/videos/6.jpg",
    poster: "/videos/6.jpg",
    title: "Seafood Concept Creative",
    description: "A visually rich concept that elevates a simple dish into an expressive narrative.",
    hasContent: true,
  },
  {
    id: "23",
    type: "image",
    src: "/videos/4.jpg",
    poster: "/videos/4.jpg",
    title: "Foam Serum Launch",
    description: "Bubbly physics + product CGI used across hero, ads, and socials.",
    hasContent: true,
  },
  {
    id: "24",
    type: "image",
    src: "/videos/2.jpg",
    poster: "/videos/2.jpg",
    title: "Visual Identity Lab",
    description: "Material-driven identity systems—palette, type, textures, and signature.",
    hasContent: true,
  },
];




// Card Component
const DribbleCard: React.FC<{
  item: DribbleItem;
  isHovered: boolean;
  onHover: (id: string | null) => void;
  index: number;
}> = ({ item, isHovered, onHover, index }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldPlay, setShouldPlay] = useState(false);

  // Stagger video initialization to prevent all videos loading at once
  useEffect(() => {
    if (item.type === "video") {
      // Stagger by 50ms per item to spread out the load
      const delay = Math.min(index * 50, 2000); // Max 2 second delay
      
      const timer = setTimeout(() => {
        setShouldPlay(true);
      }, delay);

      return () => clearTimeout(timer);
    } else {
      setShouldPlay(true);
    }
  }, [item.type, index]);

  // Play video when ready
  useEffect(() => {
    if (shouldPlay && videoRef.current && item.type === "video") {
      // Use requestIdleCallback to play during idle time
      if ('requestIdleCallback' in window) {
        requestIdleCallback(() => {
          videoRef.current?.play().catch(() => {});
        }, { timeout: 500 });
      } else {
        requestAnimationFrame(() => {
          videoRef.current?.play().catch(() => {});
        });
      }
    }
  }, [shouldPlay, item.type]);

  return (
    <motion.div
      className="relative flex-shrink-0 h-full rounded-xl overflow-hidden cursor-pointer group"
      style={{ 
        width: "300px",
        contentVisibility: 'auto', // Browser optimizes off-screen rendering
        containIntrinsicSize: '300px 480px' // Placeholder size for layout
      }}
      onMouseEnter={() => onHover(item.id)}
      onMouseLeave={() => onHover(null)}
      transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
    >
      {/* Media Content */}
      <div className="relative w-full h-full bg-gray-100">
        {item.type === "video" ? (
          <video
            ref={videoRef}
            src={shouldPlay ? item.src : undefined}
            poster={item.poster}
            loop
            muted
            playsInline
            preload={shouldPlay ? "auto" : "none"}
            className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
            style={{ 
              willChange: 'transform',
              transform: 'translateZ(0)',
              backfaceVisibility: 'hidden'
            }}
          />
        ) : (
          <img
            src={item.src}
            alt={item.title || "Dribble item"}
            loading={index < 6 ? "eager" : "lazy"} // First 6 items load immediately
            decoding="async"
            className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
            style={{ 
              willChange: 'transform',
              transform: 'translateZ(0)',
              backfaceVisibility: 'hidden'
            }}
          />
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent transition-all duration-500 group-hover:from-black/80" />
      </div>

      {/* Content Overlay */}
      {item.hasContent && (
        <>
          {/* Description Overlay */}
          <div className="absolute flex flex-col inset-0 bg-gradient-to-b from-transparent to-black opacity-0 transition-all duration-500 p-6 justify-end group-hover:opacity-100">
            <motion.h3
              className="text-xl font-bold mb-1"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              {item.title}
            </motion.h3>
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
  // Reduced from 3 to 2 copies for better performance (still infinite)
  const extendedItems = [...items, ...items];

  const cardWidth = 300;
  const gapPx = 15;
  const cardScrollWidth = cardWidth + gapPx;
  const singleSetWidth = totalItems * cardScrollWidth;

  const animate = useCallback(
    (currentTime: number) => {
      if (lastTimeRef.current === null) {
        lastTimeRef.current = currentTime;
      }

      const deltaTime = (currentTime - lastTimeRef.current) / 1000;
      lastTimeRef.current = currentTime;

      setTranslateX((prev) => {
        let newTranslateX = prev - autoScrollSpeed * deltaTime;
        // Adjusted for 2 copies instead of 3
        const loopPoint = -singleSetWidth;
        if (newTranslateX < loopPoint) {
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
              willChange: 'transform'
            }}
          >
            {extendedItems.map((item, index) => (
              <DribbleCard
                key={`${item.id}-${index}`}
                item={item}
                isHovered={hoveredId === `${item.id}-${index}`}
                onHover={(id) => setHoveredId(id ? `${item.id}-${index}` : null)}
                index={index}
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