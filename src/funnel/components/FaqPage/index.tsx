"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { faqs as defaultFaqs } from "./data";
import styles from "./style.module.css";
import { ChevronDown } from "lucide-react";
import { PortableText } from "next-sanity";
import { FAQ_LIST_QUERYResult } from "@/sanity.types";

// Define types locally if not available
type FaqSectionConfig = {
    title?: string;
    titleHighlight?: string;
    description?: string;
};
// Re-using the query result type for the items part roughly, or defining custom
type FaqItem = {
    question?: string;
    answer?: any;
};

interface FAQSectionProps {
  data?: {
      section?: FaqSectionConfig;
      items?: FaqItem[];
  };
}

export default function FAQSection({ data }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const { section, items: fetchedItems } = data || {};
  
  const title = section?.title || "Your Questions,";
  const titleHighlight = section?.titleHighlight || "Simplified";
  const description = section?.description || "Explore our FAQ section for clear answers to common questions about how Picasso Fusion works, its features, and how to get the most out of our design platform.";

  const faqs = fetchedItems && fetchedItems.length > 0 ? fetchedItems.map(item => ({
    question: item.question || "",
    answer: item.answer || [],
    isPortableText: Array.isArray(item.answer)
  })) : defaultFaqs.map(item => ({ ...item, isPortableText: false }));

  return (
    <motion.section
      className={styles.section}
      initial={{ opacity: 1, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className={styles.header}>
        <motion.h2
          className={styles.title}
          initial={{ opacity: 1, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {title}{" "}
          <span>{titleHighlight}</span>
        </motion.h2>
        <motion.p
          className={styles.description}
          initial={{ opacity: 1, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {description}
        </motion.p>
      </div>

      <div className={styles.faqContainer}>
        {faqs.map((faq, i) => {
          const isOpen = openIndex === i;
          return (
            <motion.div 
              key={i} 
              className={styles.faqItem}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <motion.button
                className={styles.question}
                onClick={() => setOpenIndex(isOpen ? null : i)}
                whileTap={{ scale: 0.98 }}
              >
                <span>{faq.question}</span>
                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="w-6 h-6" />
                </motion.div>
              </motion.button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    className={styles.answer}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {faq.isPortableText ? (
                      <PortableText value={faq.answer as any} />
                    ) : (
                      faq.answer as string
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
}
