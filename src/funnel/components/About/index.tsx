"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ABOUT_ANIMATIONS, ABOUT_TEXT, ABOUT_BUTTON_TEXT } from "./data";
import styles from "./style.module.css";
import GlassCTAButton from "../common/GlassCTAButton";
import { ABOUT_QUERYResult } from "@/sanity.types";

interface AboutProps {
  data?: ABOUT_QUERYResult;
}

export default function About({ data }: AboutProps) {
  const { mainText = ABOUT_TEXT.main, buttonText = ABOUT_BUTTON_TEXT } = (data || {});

  return (
    <section className={styles.aboutSection}>
      <motion.div
        className={styles.aboutTextBlock}
        initial={ABOUT_ANIMATIONS.textBlock.initial}
        animate={ABOUT_ANIMATIONS.textBlock.animate}
        transition={{ duration: ABOUT_ANIMATIONS.textBlock.duration }}
      >
        <h1 className={styles.aboutMainHeading}>
          <span className={styles.aboutTextNormal}>{mainText?.part1}</span>{" "}
          <span className={`${styles.aboutTextNormal} ${styles.aboutTextGradient}`}>
            {mainText?.part2}
          </span>{" "}
          <span className={styles.aboutTextNormal}>{mainText?.part3}</span>{" "}
          <span className={`${styles.aboutTextNormal} ${styles.aboutTextGradient}`}>
            {mainText?.part4}
          </span>{" "}
          <span className={styles.aboutTextNormal}>{mainText?.part5}</span>{" "}
          <span className={`${styles.aboutTextNormal} ${styles.aboutTextGradient}`}>
            {mainText?.part6}
          </span>{" "}
          <span className={styles.aboutTextNormal}>{mainText?.part7}</span>
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
          <GlassCTAButton asChild href="/about" text={buttonText || "Discover more about us"} />
        </Link>
      </motion.div>
    </section>
  );
}
