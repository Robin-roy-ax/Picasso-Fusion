"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Instrument_Serif } from "next/font/google";
import { getCalApi } from "@calcom/embed-react";
import { urlFor } from "@/sanity/lib/image";

import {
  HERO_ANIMATIONS,
  CSS_TOKENS,
  HERO_SUBTITLE,
  HERO_MAIN_HEADING,
  HERO_DESCRIPTION,
  HERO_BUTTONS,
  AVATAR_IMAGES,
  CLIENT_COUNT_TEXT,
  SCROLL_DOWN_TEXT
} from "./data";
import styles from "./style.module.css";
import { HERO_QUERYResult } from "@/sanity.types";

const instrumentSerif = Instrument_Serif({ subsets: ["latin"], weight: ["400"] });

interface HeroProps {
  data?: HERO_QUERYResult;
}

export default function Hero({ data }: HeroProps) {
  const [calLoaded, setCalLoaded] = React.useState(false);

  const loadCalScript = React.useCallback(() => {
    if (calLoaded) return;
    setCalLoaded(true);
    
    (async function () {
      const cal = await getCalApi({ namespace: "cal" });
      cal("ui", {
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
  }, [calLoaded]);

  const {
    subtitle = HERO_SUBTITLE,
    mainHeading = { 
      part1: HERO_MAIN_HEADING.part1, 
      part1Italic: HERO_MAIN_HEADING.part1Italic, 
      part2: HERO_MAIN_HEADING.part2, 
      part2Italic: HERO_MAIN_HEADING.part2Italic 
    },
    description = HERO_DESCRIPTION,
    buttons = {
      primary: HERO_BUTTONS.primary,
      secondary: HERO_BUTTONS.secondary
    },
    avatars = AVATAR_IMAGES,
    clientCount = {
      number: CLIENT_COUNT_TEXT.number,
      description: CLIENT_COUNT_TEXT.description
    },
    scrollText = SCROLL_DOWN_TEXT
  } = (data || {});

  return (
    <motion.section
      id="hero"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: HERO_ANIMATIONS.container.duration }}
      className={styles.heroSection}
    >
      <div className={styles.heroDividerLines}>
        <div className={`${styles.dividerLine} ${styles.dividerLineLeft}`} />
        <div className={`${styles.dividerLine} ${styles.dividerLineCenter}`} />
        <div className={`${styles.dividerLine} ${styles.dividerLineRight}`} />
      </div>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: HERO_ANIMATIONS.subtitle.duration }}
        className={styles.heroSubtitle}
      >
        {subtitle}
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: HERO_ANIMATIONS.mainHeading.duration }}
        className={styles.heroMainHeading}
        style={{
          color: CSS_TOKENS.primaryColor,
          textAlign: "center",
          fontFamily: "Inter, sans-serif",
          fontWeight: 600,
          letterSpacing: "0em",
        }}
      >
        {mainHeading?.part1}{" "}
        <span
          style={{
            fontFamily: "Instrument_Serif",
            fontStyle: "italic",
            fontWeight: 500,
            letterSpacing: "0.01em",
            color: "#fff",
          }}
        >
          {mainHeading?.part1Italic}
        </span>
        <br />
        <span
          className={`${styles.heroHeadingItalic} ${instrumentSerif.className}`}
          style={{
            color: CSS_TOKENS.primaryColor,
            fontFamily: "Inter, sans-serif",
            fontWeight: 600,
          }}
        >
          {mainHeading?.part2}
        </span>{" "}
        <span
          className={styles.heroHeadingNormal}
          style={{
            fontFamily: "Instrument_Serif",
            fontStyle: "italic",
            fontWeight: 500,
            letterSpacing: "0.01em",
            color: "#fff",
          }}
        >
          {mainHeading?.part2Italic}
        </span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: HERO_ANIMATIONS.description.duration,
          delay: HERO_ANIMATIONS.description.delay,
        }}
        className={styles.heroDescription}
      >
        {description}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: HERO_ANIMATIONS.buttons.delay }}
        className="flex flex-col sm:flex-row gap-4 mt-8"
      >

        <motion.a
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: HERO_ANIMATIONS.button1.delay }}
          data-cal-link="robin-roy-ax/30min"
          data-cal-config='{"layout":"month_view"}'
          href="https://cal.com/robin-roy-ax/30min"
          onClick={(e) => {
            // Ensure Cal.com script is loaded before opening modal
            if (calLoaded) {
              e.preventDefault();
            } else {
              loadCalScript();
            }
          }}
          onMouseEnter={loadCalScript}
          onFocus={loadCalScript}
          className="relative px-6 py-3 rounded-full bg-white text-black font-medium hover:bg-blue-600 hover:text-white transition-all duration-300 shadow-md cursor-pointer text-center"
        >
          {buttons?.primary}
        </motion.a>

        <motion.a
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: HERO_ANIMATIONS.button2.delay }}
          href="/pricing"
          className={styles.heroButtonSecondary}
        >
          {buttons?.secondary}
        </motion.a>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: HERO_ANIMATIONS.avatars.delay }}
        className="flex flex-col items-center mt-12"
      >
        <div className="flex -space-x-4 mb-2">
          {avatars?.map((item: any, i: number) => {
            // Handle both legacy string images and new Sanity image objects
            const isString = typeof item === 'string';
            const imageUrl = isString ? item : (item?.asset ? urlFor(item).url() : "");
            const altText = isString ? `Client ${i + 1}` : (item?.alt || `Client ${i + 1}`);
            
             return (
            <div
              key={i}
              className="relative w-10 h-10 rounded-full border-2 border-white/60 overflow-hidden shadow-md
                 transition-all duration-300 ease-out hover:scale-110 hover:-translate-y-1 hover:shadow-lg"
            >
              <Image
                src={imageUrl}
                alt={altText}
                width={40}
                height={40}
                className="w-full h-full object-cover"
                priority={i < 3}
              />
            </div>
          )})}
        </div>

        <motion.p
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: HERO_ANIMATIONS.avatarText.delay }}
          className="text-white font-medium"
        >
          {clientCount?.number}{" "}
          <span className="text-gray-400">{clientCount?.description}</span>
        </motion.p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: HERO_ANIMATIONS.scrollText.delay }}
        className={`${styles.heroScrollText} ${styles.scrollPop} ${styles.scrollInvite}`}
      >
        <span className={styles.scrollInviteText}>{scrollText}</span>
      </motion.div>
    </motion.section>
  );
}
