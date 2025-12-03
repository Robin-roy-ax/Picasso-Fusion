"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { projects } from "./data";
import ViewProjectCursor from "@/funnel/components/common/MousePointer";
import styles from "./style.module.css";
import { rafThrottle } from "@/utils/performance";

export default function WorkSection() {
  const [cursorVisible, setCursorVisible] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = rafThrottle((e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    });
    
    if (cursorVisible) window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [cursorVisible]);

  return (
    <section id="work" className={styles.workSection}>
      <AnimatePresence>
        {cursorVisible && (
          <ViewProjectCursor visible={cursorVisible} mousePos={mousePos} />
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className={styles.header}
      >
        <h2 className={styles.heading}>
          Our Finest{" "}
          <span className={styles.headingItalic}>Works</span>
        </h2>
        <p className={styles.subtext}>
          Discover our curated selection of standout projects. Each one
          represents our dedication to creativity and excellence.
        </p>
      </motion.div>

      <div className={styles.grid}>
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            className={styles.projectCard}
          >
            <Link
              href={project.href}
              className={styles.imageWrapper}
              onMouseEnter={() => setCursorVisible(true)}
              onMouseLeave={() => setCursorVisible(false)}
            >
              <div className={styles.imageContainer}>
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className={styles.image}
                />
              </div>
            </Link>

            <div className={styles.projectContent}>
              <h3 className={styles.projectTitle}>{project.title}</h3>
              <div className={styles.tags}>
                {project.tags.map((tag, i) => (
                  <span key={i} className={styles.tag}>
                    {tag}
                  </span>
                ))}
              </div>
              <p className={styles.projectDescription}>
                {project.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
