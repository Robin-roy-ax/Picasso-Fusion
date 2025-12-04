"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { Instrument_Serif } from "next/font/google";
import { useEffect } from "react";
import { getCalApi } from "@calcom/embed-react";

import {
  HERO_SUBTITLE,
  HERO_MAIN_HEADING,
  HERO_DESCRIPTION,
  HERO_BUTTONS,
  AVATAR_IMAGES,
  CLIENT_COUNT_TEXT,
  SCROLL_DOWN_TEXT,
  HERO_ANIMATIONS,
  CSS_TOKENS
} from "./data";
import styles from "./style.module.css";

const instrumentSerif = Instrument_Serif({ subsets: ["latin"], weight: ["400"] });

export default function Hero() {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: "cal" });
      cal("ui", {
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
  }, []);

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
        {HERO_SUBTITLE}
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
        {HERO_MAIN_HEADING.part1}{" "}
        <span
          style={{
            fontFamily: "Instrument_Serif",
            fontStyle: "italic",
            fontWeight: 500,
            letterSpacing: "0.01em",
            color: "#fff",
          }}
        >
          {HERO_MAIN_HEADING.part1Italic}
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
          {HERO_MAIN_HEADING.part2}
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
          {HERO_MAIN_HEADING.part2Italic}
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
        {HERO_DESCRIPTION}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: HERO_ANIMATIONS.buttons.delay }}
        className="flex flex-col sm:flex-row gap-4 mt-8"
      >

        <motion.button
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: HERO_ANIMATIONS.button1.delay }}
          data-cal-link="robin-roy-ax/30min"
          data-cal-config='{"layout":"month_view"}'
          className="relative px-6 py-3 rounded-full bg-white text-black font-medium hover:bg-blue-600 hover:text-white transition-all duration-300 shadow-md cursor-pointer"
        >
          {HERO_BUTTONS.primary}
        </motion.button>

        <motion.a
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: HERO_ANIMATIONS.button2.delay }}
          href="#pricing"
          className={styles.heroButtonSecondary}
        >
          {HERO_BUTTONS.secondary}
        </motion.a>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: HERO_ANIMATIONS.avatars.delay }}
        className="flex flex-col items-center mt-12"
      >
        <div className="flex -space-x-4 mb-2">
          {AVATAR_IMAGES.map((src, i) => (
            <div
              key={i}
              className="relative w-10 h-10 rounded-full border-2 border-white/60 overflow-hidden shadow-md
                 transition-all duration-300 ease-out hover:scale-110 hover:-translate-y-1 hover:shadow-lg"
            >
              <Image
                src={src}
                alt={`Client ${i + 1}`}
                width={40}
                height={40}
                className="w-full h-full object-cover"
                priority={i < 3}
              />
            </div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: HERO_ANIMATIONS.avatarText.delay }}
          className="text-white font-medium"
        >
          {CLIENT_COUNT_TEXT.number}{" "}
          <span className="text-gray-400">{CLIENT_COUNT_TEXT.description}</span>
        </motion.p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: HERO_ANIMATIONS.scrollText.delay }}
        className={`${styles.heroScrollText} ${styles.scrollPop} ${styles.scrollInvite}`}
      >
        <span className={styles.scrollInviteText}>{SCROLL_DOWN_TEXT}</span>
      </motion.div>
    </motion.section>
  );
}
