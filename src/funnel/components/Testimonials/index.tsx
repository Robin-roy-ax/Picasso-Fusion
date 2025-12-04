"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";
import { useEffect, useState, useCallback } from "react";
import {
  TESTIMONIALS_DATA,
  TESTIMONIALS_TEXT,
  TESTIMONIALS_ANIMATIONS,
  Testimonial
} from "./data";
import styles from "./style.module.css";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";

const cardVariants: Variants = {
  hidden: { 
    opacity: TESTIMONIALS_ANIMATIONS.card.initial.opacity, 
    y: TESTIMONIALS_ANIMATIONS.card.initial.y 
  },
  visible: (custom: number) => ({
    opacity: TESTIMONIALS_ANIMATIONS.card.animate.opacity,
    y: TESTIMONIALS_ANIMATIONS.card.animate.y,
    transition: {
      duration: TESTIMONIALS_ANIMATIONS.card.duration,
      delay: custom,
      ease: TESTIMONIALS_ANIMATIONS.card.ease,
    },
  }),
};

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(TESTIMONIALS_DATA);
  const [isFetching, setIsFetching] = useState(false);

  const fetchTestimonials = useCallback(async () => {
    if (isFetching) return; // Prevent duplicate fetches
    
    setIsFetching(true);
    const query = `*[_type == "testimonial"]{
      quote,
      name,
      title,
      image
    }`;
    try {
      const data = await client.fetch(query);
      if (data && data.length > 0) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const mappedData = data.map((item: any) => ({
          ...item,
          image: item.image ? urlFor(item.image).url() : "",
        }));
        setTestimonials(mappedData);
      }
    } catch (error) {
      console.error("Failed to fetch testimonials:", error);
    } finally {
      setIsFetching(false);
    }
  }, [isFetching]);

  useEffect(() => {
    fetchTestimonials();
  }, [fetchTestimonials]);

  return (
    <section id="testimonials" className={styles.testimonialsSection}>
      <div className={styles.testimonialsContainer}>
        <motion.div
          initial={TESTIMONIALS_ANIMATIONS.header.initial}
          whileInView={TESTIMONIALS_ANIMATIONS.header.animate}
          transition={{ 
            duration: TESTIMONIALS_ANIMATIONS.header.duration, 
            ease: "easeOut" 
          }}
          viewport={{ once: true }}
          className={styles.testimonialsHeader}
        >
          <h2 className={styles.testimonialsTitle}>
            {TESTIMONIALS_TEXT.title.part1}
            <br />
            <span className={styles.testimonialsTitleItalic}>
              {TESTIMONIALS_TEXT.title.part2}
            </span>
          </h2>

          <p className={styles.testimonialsDescription}>
            {TESTIMONIALS_TEXT.description.text}
            <span className={styles.descriptionHighlight}>
              {TESTIMONIALS_TEXT.description.highlight}
            </span>
            {TESTIMONIALS_TEXT.description.continuation}
          </p>
        </motion.div>

        <div className={styles.testimonialsGrid}>
          {testimonials.map((testimonial, index) => {
            const column = index % 3;
            let delay = 0;

            if (column === 1) delay = 0.3;
            else delay = 0.1;

            return (
              <motion.div
                key={index}
                className={styles.testimonialCard}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={delay}
              >
                <div className={styles.overlay} />
                <p className={styles.testimonialQuote}>
                  {`"${testimonial.quote}"`}
                </p>

                <div className={styles.testimonialFooter}>
                  <div className={styles.testimonialImageContainer}>
                    {testimonial.image && (
                      <Image
                        src={testimonial.image}
                        alt={testimonial.name}
                        fill
                        className={styles.testimonialImage}
                        sizes="56px"
                      />
                    )}
                  </div>
                  <div className={styles.testimonialInfo}>
                    <p className={styles.testimonialName}>
                      {testimonial.name}
                    </p>
                    <p className={styles.testimonialTitle}>
                      {testimonial.title}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
