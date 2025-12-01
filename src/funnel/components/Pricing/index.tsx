"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import PricingCard from "./PricingCard";
import PricingCardSkeleton from "./PricingCardSkeleton";
import { fetchPricingPlans, PricingPlan } from "./data";
import styles from "./style.module.css";
import { getCalApi } from "@calcom/embed-react";

interface PricingSectionProps {
  variant?: "default" | "compare";
}

export default function PricingSection({ variant = "default" }: PricingSectionProps) {
  const [pricingPlans, setPricingPlans] = useState<PricingPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedCards, setExpandedCards] = useState<number[]>([]);

  useEffect(() => {
    async function loadPlans() {
      const plans = await fetchPricingPlans();
      setPricingPlans(plans);
      setLoading(false);
    }
    loadPlans();
  }, []);

  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: "cal" });
      cal("ui", {
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
  }, []);

  const handleToggleExpand = (index: number) => {
    setExpandedCards(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index) // Close if already open
        : [...prev, index] // Add to open cards without closing others
    );
  };

  const headerTitle =
    variant === "compare" ? "Compare & Choose Your Plan" : "Transparent Pricing";

  return (
    <section id="pricing" className={styles.pricingSection}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className={styles.pricingContainer}
      >
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className={styles.pricingTitle}
        >
          {headerTitle.includes("Compare") ? (
            <div>
              Compare & Choose{" "}
              <br />
              <span className={styles.titleSerif}>
               Your Plan
              </span>
            </div>
          ) : (
            <div>
              Flexible Plans Tailored to{" "}
              <span className={styles.titleSerif}>
                <br />
                Your Needs
              </span>
            </div>
          )}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
          className={styles.pricingSubtitle}
        >
          Find the plan that fits your needs best with no surprises and
          <br className={styles.subtitleBreak} />
          No hidden fees.
        </motion.p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className={`${styles.pricingGrid} !items-start`}
      >
        {loading ? (
          <>
            <PricingCardSkeleton highlight={false} />
            <PricingCardSkeleton highlight={true} />
            <PricingCardSkeleton highlight={false} />
          </>
        ) : pricingPlans.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <p className="text-lg text-gray-600">No pricing plans available</p>
          </div>
        ) : (
          pricingPlans.map((plan, idx) => (
            <PricingCard
              key={idx}
              {...plan}
              isExpanded={expandedCards.includes(idx)}
              onToggleExpand={() => handleToggleExpand(idx)}
            />
          ))
        )}
      </motion.div>
    </section>
  );
}