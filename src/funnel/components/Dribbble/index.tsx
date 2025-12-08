"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import GlassCTAButton from "../common/GlassCTAButton";
import styles from "./style.module.css";
import { defaultItems, type DribbleItem } from "./data";
import Image from "next/image";

interface DribbleProps {
  items?: DribbleItem[];
  heading?: string;
  subheading?: string;
  ctaText?: string;
  ctaHref?: string;
  autoScrollSpeed?: number;
  className?: string;
}

const DribbleCard: React.FC<{
  item: DribbleItem;
  index: number;
}> = ({ item, index }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldPlay, setShouldPlay] = useState(false);

  useEffect(() => {
    if (item.type === "video") {
      const delay = Math.min(index * 50, 2000);
      const timer = setTimeout(() => {
        setShouldPlay(true);
      }, delay);
      return () => clearTimeout(timer);
    } else {
      setShouldPlay(true);
    }
  }, [item.type, index]);

  useEffect(() => {
    if (shouldPlay && videoRef.current && item.type === "video") {
      const ric = (window as typeof window & {
        requestIdleCallback?: (cb: () => void, opts?: { timeout?: number }) => number;
      }).requestIdleCallback;
      if (ric) {
        ric(() => {
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
      className={`${styles.card} relative flex-shrink-0 h-full rounded-xl overflow-hidden cursor-pointer group`}
      transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
    >
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
            className={`w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110 ${styles.media}`}
          />
        ) : (
          <Image
            src={item.src}
            alt={item.title || "Dribble item"}
            loading={index < 6 ? "eager" : "lazy"}
            className={`object-cover object-center transition-transform duration-700 group-hover:scale-110 ${styles.media}`}
            fill
            sizes="300px"
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent transition-all duration-500 group-hover:from-black/80" />
      </div>

      {item.hasContent && (
        <>
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

import { WORKS_QUERYResult } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";

// Define types locally if not available from generated types yet
type WorkItem = any; // Placeholder
type WorkSection = {
  heading?: string;
  description?: string;
  ctaText?: string;
  ctaUrl?: string;
};

export const Dribble: React.FC<DribbleProps & { data?: { section?: WorkSection; items?: WorkItem[] } }> = ({
  items = defaultItems,
  data,
  heading: defaultHeading = "Our Creative Showcase",
  ctaText: defaultCtaText = "Explore Visuals",
  ctaHref: defaultCtaHref = "https://dribbble.com/PicassoFusion",
  autoScrollSpeed = 80,
  className = "",
}) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [translateX, setTranslateX] = useState(0);
  const [isHoveringCarousel, setIsHoveringCarousel] = useState(false);
  const animationFrameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);

  const { section, items: fetchedItems } = data || {};

  const heading = section?.heading || defaultHeading;
  const description = section?.description || "See how we transform imagination into visuals through design and creativity.";
  const ctaText = section?.ctaText || defaultCtaText;
  const ctaHref = section?.ctaUrl || defaultCtaHref;

  // Map Sanity data to DribbleItem if available
  const mappedItems: DribbleItem[] = (fetchedItems && fetchedItems.length > 0) ? fetchedItems.map((work: any) => {
     // @ts-ignore
     const videoUrl = work.video?.asset?.url;
     return {
        id: work._id,
        type: (work.video ? "video" : "image") as "video" | "image",
        src: videoUrl || (work.mainImage ? urlFor(work.mainImage).url() : ""),
        poster: work.mainImage ? urlFor(work.mainImage).url() : undefined,
        title: work.title || "",
        description: work.description || "",
        hasContent: true
     };
  }).filter((item: any) => item.src !== "") : items;

  const totalItems = mappedItems.length;
  const extendedItems = totalItems > 0 ? [...mappedItems, ...mappedItems] : [];

  const cardWidth = 300;
  const gapPx = 15;
  const cardScrollWidth = cardWidth + gapPx;
  const singleSetWidth = totalItems * cardScrollWidth;

  const animate = useCallback(
    (currentTime: number) => {
      if (lastTimeRef.current === null) {
        lastTimeRef.current = currentTime;
      }

      const deltaTime = (currentTime - (lastTimeRef.current ?? currentTime)) / 1000;
      lastTimeRef.current = currentTime;

      setTranslateX((prev) => {
        let newTranslateX = prev - autoScrollSpeed * deltaTime;
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
      <div className="max-w-7xl mx-auto px-6 pt-12 md:pt-16 pb-2 md:pb-4 flex flex-col items-center text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-[#343e56] font-medium leading-[1.05em] tracking-[-0.05em] text-[40px] md:text-[60px] lg:text-[80px] xl:text-[100px] mb-2"
        >
          {heading.split(" ").slice(0, -1).join(" ")}{" "}
          <span className={`${styles.serif} italic font-normal tracking-normal`}>
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
          {description}
        </motion.p>
      </div>

      <div
        className="relative w-full h-[350px] md:h-[420px] lg:h-[480px]"
        onMouseEnter={handleCarouselMouseEnter}
        onMouseLeave={handleCarouselMouseLeave}
      >
        <div className="overflow-hidden h-full px-4">
          <div
            ref={trackRef}
            className={`flex gap-[15px] h-full ${styles.track}`}
            style={{ transform: `translateX(${translateX}px)` }}
          >
            {extendedItems.map((item, index) => (
              <DribbleCard key={`${item.id}-${index}`} item={item} index={index} />
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-center pt-10 pb-6">
        <GlassCTAButton href={ctaHref} text={ctaText} />
      </div>
    </section>
  );
};

export default Dribble;

