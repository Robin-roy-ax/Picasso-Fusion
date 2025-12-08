"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { benefits as defaultBenefits, Benefit } from "./data";
import styles from "./style.module.css";
import { PROCESS_QUERYResult } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";

interface ProcessProps {
  data?: {
      section?: {
          heading?: string;
          headingHighlight?: string;
          subHeading?: string;
          subHeadingHighlight?: string;
          description?: string;
      };
      items?: any[];
  };
}

export default function Process({ data }: ProcessProps) {
  const { section, items: fetchedItems } = data || {};

  const heading = section?.heading || "Smooth";
  const headingHighlight = section?.headingHighlight || "Process,";
  const subHeading = section?.subHeading || "Stunning";
  const subHeadingHighlight = section?.subHeadingHighlight || "Outcomes";
  const description = section?.description || "At Picasso Fusion, our refined process ensures efficiency, clarity, and exceptional results. From concept to final delivery, we guide you with transparency and precision, turning your vision into impactful, polished designs.";

  const benefits = fetchedItems && fetchedItems.length > 0 ? fetchedItems.map(item => ({
    title: item.title || "",
    description: item.description || "",
    image: item.image ? urlFor(item.image).url() : "",
  })) : defaultBenefits;

  return (
    <section id="process" className={styles.section}>
      <motion.div
        className={styles.container}
        initial={{ opacity: 1, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <div className={styles.header}>
          <h2 className={styles.title}>
            {heading}<span>{" "}</span>
            <span className="italic font-[400] font-[Instrument_Serif]">
              {headingHighlight}
            </span>
            <br />
            {subHeading}{" "}
            <span className="italic font-[400] font-[Instrument_Serif]">
              {subHeadingHighlight}
            </span>
          </h2>
          <p className={styles.description}>
            {description}
          </p>
        </div>

        <div className={styles.gridContainer}>
          <motion.div
            className={`${styles.grid} ${styles.firstRow}`}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
          >
            {benefits.slice(0, 3).map((benefit, index) => (
              <BenefitCard key={index} benefit={benefit} index={index} />
            ))}
          </motion.div>

          <motion.div
            className={`${styles.grid} ${styles.secondRow}`}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
          >
            {benefits.slice(3).map((benefit, index) => (
              <BenefitCard key={index + 3} benefit={benefit} index={index + 3} />
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

function BenefitCard({
  benefit,
  index,
}: {
  benefit: Benefit;
  index: number;
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 1, y: 40 },
        visible: { opacity: 1, y: 0 },
      }}
      className={`${styles.card} ${
        index === 2 ? styles.thirdCard : ""
      }`}
    >
      <div
        className={styles.imageWrapper}
      >
        {benefit.image ? (
          <Image
            src={benefit.image}
            alt={benefit.title}
            width={300}
            height={300}
            className="object-contain transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
            No Image
          </div>
        )}
      </div>

      <motion.div
        initial={{ opacity: 1, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
        className={styles.cardText}
      >
        <h3 className={styles.cardTitle}>{benefit.title}</h3>
        <p className={styles.cardDesc}>{benefit.description}</p>
      </motion.div>

      <div className={styles.overlay} />
    </motion.div>
  );
}