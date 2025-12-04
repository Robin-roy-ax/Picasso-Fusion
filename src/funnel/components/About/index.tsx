"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ABOUT_TEXT, ABOUT_BUTTON_TEXT, ABOUT_ANIMATIONS } from "./data";
import styles from "./style.module.css";
import GlassCTAButton from "../common/GlassCTAButton";

export default function About() {
  return (
    <section className={styles.aboutSection}>
      <motion.div
        className={styles.aboutTextBlock}
        initial={ABOUT_ANIMATIONS.textBlock.initial}
        animate={ABOUT_ANIMATIONS.textBlock.animate}
        transition={{ duration: ABOUT_ANIMATIONS.textBlock.duration }}
      >
        <h1 className={styles.aboutMainHeading}>
          <span className={styles.aboutTextNormal}>{ABOUT_TEXT.main.part1}</span>{" "}
          <span className={`${styles.aboutTextNormal} ${styles.aboutTextGradient}`}>
            {ABOUT_TEXT.main.part2}
          </span>{" "}
          <span className={styles.aboutTextNormal}>{ABOUT_TEXT.main.part3}</span>{" "}
          <span className={`${styles.aboutTextNormal} ${styles.aboutTextGradient}`}>
            {ABOUT_TEXT.main.part4}
          </span>{" "}
          <span className={styles.aboutTextNormal}>{ABOUT_TEXT.main.part5}</span>{" "}
          <span className={`${styles.aboutTextNormal} ${styles.aboutTextGradient}`}>
            {ABOUT_TEXT.main.part6}
          </span>{" "}
          <span className={styles.aboutTextNormal}>{ABOUT_TEXT.main.part7}</span>
        </h1>
      </motion.div>

      <motion.div
        initial={ABOUT_ANIMATIONS.button.initial}
        animate={ABOUT_ANIMATIONS.button.animate}
        transition={{
          delay: ABOUT_ANIMATIONS.button.delay,
          duration: ABOUT_ANIMATIONS.button.duration
        }}
      >
        <Link href="/about">
          <GlassCTAButton asChild href="/about" text={ABOUT_BUTTON_TEXT} />
        </Link>
      </motion.div>
    </section>
  );
}
