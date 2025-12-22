"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Instrument_Serif } from "next/font/google";
import { getCalApi } from "@calcom/embed-react";
import { urlFor } from "@/sanity/lib/image";
import { useRouteTransition, useReducedMotion } from "@/hooks/useRouteTransition";

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
import Ticker from "./Ticker";

const instrumentSerif = Instrument_Serif({ subsets: ["latin"], weight: ["400"] });

interface HeroProps {
  data?: HERO_QUERYResult;
}

export default function Hero({ data }: HeroProps) {
  const [calLoaded, setCalLoaded] = React.useState(false);
  const isTransitioning = useRouteTransition();
  const prefersReducedMotion = useReducedMotion();

  // Skip or simplify animations during route transitions or if user prefers reduced motion
  const shouldAnimate = !isTransitioning && !prefersReducedMotion;

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

  const handleScrollDown = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.section
      id="hero"
      initial={shouldAnimate ? { opacity: 0 } : { opacity: 1 }}
      animate={{ opacity: 1 }}
      transition={{ duration: shouldAnimate ? HERO_ANIMATIONS.container.duration : 0.1 }}
      className={styles.heroSection}
    >
      <div className={styles.heroDividerLines}>
        <div className={`${styles.dividerLine} ${styles.dividerLineLeft}`} />
        <div className={`${styles.dividerLine} ${styles.dividerLineCenter}`} />
        <div className={`${styles.dividerLine} ${styles.dividerLineRight}`} />
      </div>

      <motion.p
        initial={shouldAnimate ? { opacity: 0, y: 20 } : { opacity: 1 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: shouldAnimate ? HERO_ANIMATIONS.subtitle.duration : 0 }}
        className={styles.heroSubtitle}
      >
        {subtitle}
      </motion.p>

      <motion.h1
        initial={shouldAnimate ? { opacity: 0, y: 40 } : { opacity: 1 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: shouldAnimate ? HERO_ANIMATIONS.mainHeading.duration : 0 }}
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
        initial={{ opacity: shouldAnimate ? 0 : 1 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: shouldAnimate ? HERO_ANIMATIONS.description.duration : 0,
          delay: shouldAnimate ? HERO_ANIMATIONS.description.delay : 0,
        }}
        className={styles.heroDescription}
      >
        {description}
      </motion.p>

      <motion.div
        initial={shouldAnimate ? { opacity: 0, y: 40 } : { opacity: 1 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: shouldAnimate ? HERO_ANIMATIONS.buttons.delay : 0 }}
        className="flex flex-col sm:flex-row gap-4 mt-8"
      >

        <motion.a
          initial={shouldAnimate ? { opacity: 0, y: 40 } : { opacity: 1 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: shouldAnimate ? HERO_ANIMATIONS.button1.delay : 0 }}
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
          initial={shouldAnimate ? { opacity: 0, y: 40 } : { opacity: 1 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: shouldAnimate ? HERO_ANIMATIONS.button2.delay : 0 }}
          href="/pricing"
          className={styles.heroButtonSecondary}
        >
          {buttons?.secondary}
        </motion.a>
      </motion.div>

      <motion.div
        initial={shouldAnimate ? { opacity: 0, y: 20 } : { opacity: 1 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: shouldAnimate ? HERO_ANIMATIONS.avatars.delay : 0 }}
        className="mt-12"
      >
        <Ticker />
      </motion.div>

      <motion.div
        initial={shouldAnimate ? { opacity: 0, y: 20 } : { opacity: 1 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: shouldAnimate ? HERO_ANIMATIONS.scrollText.delay : 0 }}
        className={`${styles.heroScrollText} ${styles.scrollPop} ${styles.scrollInvite}`}
        onClick={handleScrollDown}
      >
        <span className={styles.scrollInviteText}>{scrollText}</span>
      </motion.div>
    </motion.section>
  );
}
