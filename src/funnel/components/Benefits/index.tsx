"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { services as defaultServices } from "./data";
import styles from "./style.module.css";
import { BENEFITS_QUERYResult } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";

interface BenefitsProps {
  id?: string;
  data?: BENEFITS_QUERYResult;
}

export default function Benefits({ id = "benefits", data }: BenefitsProps) {
  const services = data && data.length > 0 ? data.map(item => ({
    title: item.title || "",
    description: item.description || "",
    image: item.image ? urlFor(item.image).url() : "",
  })) : defaultServices;

  return (
    <section id={id} className={styles.section}>
      <div className={styles.container}>
        <motion.h2
          initial={{ opacity: 1, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className={styles.heading}
        >
          Membership{" "}
          <span>benefits</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 1, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className={styles.description}
        >
          Unlock creativity with our exclusive design membership.
          Streamline your journey with expert designers delivering quality, flexibility, and results that elevate your brand.
        </motion.p>

        <section>
          <motion.div
            className={styles.grid}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              visible: { transition: { staggerChildren: 0.2 } },
            }}
          >
            {services.map((service, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 1, y: 50 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className={styles.card}
              >
                <div className={styles.overlay} />

                <div className={styles.cardImage}>
                  {service.image ? (
                    <Image
                      src={service.image}
                      alt={service.title}
                      width={400}
                      height={400}
                      className="object-contain"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
                      No Image
                    </div>
                  )}
                </div>

                <motion.div
                  initial={{ opacity: 1, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  viewport={{ once: true }}
                  className={styles.text}
                >
                  <motion.h3
                    initial={{ opacity: 1, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className={styles.cardTitle}
                  >
                    {service.title}
                  </motion.h3>

                  <motion.p
                    initial={{ opacity: 1, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.7,
                      ease: "easeOut",
                      delay: 0.1,
                    }}
                    viewport={{ once: true }}
                    className={styles.cardDesc}
                  >
                    {service.description}
                  </motion.p>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </section>
      </div>
    </section>
  );
}
