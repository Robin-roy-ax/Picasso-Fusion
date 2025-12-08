"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import PricingCard from "./PricingCard";
import PricingCardSkeleton from "./PricingCardSkeleton";
import { fetchPricingPlans, PricingPlan } from "./data";
import styles from "./style.module.css";
import { getCalApi } from "@calcom/embed-react";

import { PRICING_QUERYResult } from "@/sanity.types";

interface PricingSectionProps {
  variant?: "default" | "compare";
  data?: PRICING_QUERYResult;
}

export default function PricingSection({ variant = "default", data }: PricingSectionProps) {
  const [pricingPlans, setPricingPlans] = useState<PricingPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedCards, setExpandedCards] = useState<number[]>([]);

  const { heading, subtitle, plans: sanityPlans } = data || {};

  useEffect(() => {
    async function loadPlans() {
      if (sanityPlans && sanityPlans.length > 0) {
        // Use plans from Sanity if available
        // Need to map Sanity plan shape to component PricingPlan shape
        const mappedPlans = sanityPlans.map((p: any) => {
             // Transform Sanity array-based subFeatures back to object map for component
             const subFeaturesMap: any = {};
             if (p.subFeatures && Array.isArray(p.subFeatures)) {
                 p.subFeatures.forEach((cat: any) => {
                     const features: any = {};
                     if (cat.features && Array.isArray(cat.features)) {
                         cat.features.forEach((f: any) => {
                             // parse "true"/"false" strings back to boolean if needed, though component handles string
                             features[f.label] = f.value === "true" ? true : f.value === "false" ? false : f.value;
                         });
                     }
                     subFeaturesMap[cat.name] = features;
                 });
             }

             return {
                ...p,
                // Ensure defaults for potentially missing fields
                features: p.features || [],
                subFeatures: subFeaturesMap
             };
        });
        setPricingPlans(mappedPlans);
        setLoading(false);
      } else {
        // Fallback to fetching from API
        const plans = await fetchPricingPlans();
        setPricingPlans(plans);
        setLoading(false);
      }
    }
    loadPlans();
  }, [sanityPlans]);

  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: "cal" });
      cal("ui", {
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
  }, []);

  const handleToggleExpand = useCallback((index: number) => {
    setExpandedCards(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  }, []);

  const headerTitle =
    variant === "compare" ? "Compare & Choose Your Plan" : (heading || "Transparent Pricing"); // Use Sanity heading

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
          {/* Custom rendering based on if it matches default strict patterns, otherwise just the string */}
          {headerTitle.includes("Compare") ? (
            <div>
              Compare & Choose{" "}
              <br />
              <span className={styles.titleSerif}>
               Your Plan
              </span>
            </div>
          ) : headerTitle === "Flexible Plans Tailored to Your Needs" ? (
             <div>
              Flexible Plans Tailored to{" "}
              <span className={styles.titleSerif}>
                <br />
                Your Needs
              </span>
            </div>
          ) : (
            // Render plain heading from Sanity if customized
            <span className={styles.titleSerif}>{headerTitle}</span>
          )}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
          className={styles.pricingSubtitle}
        >
          {subtitle ? subtitle : (
            <>
            Find the plan that fits your needs best with no surprises and
            <br className={styles.subtitleBreak} />
            No hidden fees.
            </>
          )}
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