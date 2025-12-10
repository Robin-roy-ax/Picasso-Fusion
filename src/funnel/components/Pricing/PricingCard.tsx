"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X } from "lucide-react";
import { SubFeatures } from "./data";
import GlassToggleButton from "../common/GlassToogleButton";
import { getCalApi } from "@calcom/embed-react";

import GlassCTAButton from "../common/GlassCTAButton";

type PricingCardProps = {
  title: string;
  price: number;
  period: string;
  description: string;
  features: string[];
  credits: number;
  addOns: number;
  subFeatures: SubFeatures;
  buttonLabel: string;
  secondaryButton: string;
  highlight?: boolean;
  badge?: string;
  isExpanded: boolean;
  onToggleExpand: () => void;
};

export default function PricingCard({
  title,
  price,
  period,
  description,
  features,
  credits,
  addOns,
  subFeatures,
  buttonLabel,
  secondaryButton,
  highlight = false,
  badge,
  isExpanded,
  onToggleExpand,
}: PricingCardProps) {
  const [calLoaded, setCalLoaded] = React.useState(false);

  const loadCalScript = React.useCallback(() => {
    if (calLoaded) return;
    setCalLoaded(true);
    
    (async function () {
      const cal = await getCalApi({ namespace: "cal" });
      cal("ui", {
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
  }, [calLoaded]);

  const hasSubFeatures = Object.keys(subFeatures).length > 0;
  
  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 200 }}
      className={`group relative flex w-full flex-col overflow-hidden rounded-2xl shadow-[0_4px_10px_-2px_#64718f60]
        p-6 sm:p-8 text-left transition-shadow duration-700 ease-in-out
        ${highlight
          ? "bg-[radial-gradient(150%_100%_at_100%_0,_#1e387b_0%,_#0a1329_100%)] text-white z-30 hover:shadow-[0_25px_50px_rgba(0,0,0,0.5)] border border-indigo-500/20"
          : "bg-[radial-gradient(100%_75%_at_0_0,_#94a1b5_0%,_#f5f6fa_100%)] text-slate-800 border-slate-200 z-20 hover:shadow-[0_25px_50px_rgba(0,0,0,0.3)]"
        }`}
    >

      <div className={`absolute inset-0 bg-gradient-to-tr opacity-0 transition-opacity duration-700 ease-in-out group-hover:opacity-100 pointer-events-none ${
        highlight 
          ? "from-indigo-400/20 to-transparent" 
          : "from-blue-600/10 to-transparent"
      }`} />

      <div>
        <div className="flex items-start justify-between gap-3 mb-2">
          <h3 className="text-lg font-semibold sm:text-xl">{title}</h3>
          <div 
            className={`px-3 py-1 rounded-full text-xs font-bold ${
              highlight 
                ? "text-black" 
                : "bg-slate-800 text-white"
            }`}
            style={highlight ? {
              background: "linear-gradient(325deg, rgb(254, 214, 255) 7.34456%, rgb(155, 140, 250) 38.4923%, rgb(143, 225, 255) 77.5623%, rgb(135, 255, 227) 86.824%)",
              boxShadow: "rgba(205, 169, 255, 0.73) 0px 0.796192px 0.796192px -0.9375px, rgba(205, 169, 255, 0.69) 0px 2.41451px 2.41451px -1.875px, rgba(205, 169, 255, 0.592) 0px 6.38265px 6.38265px -2.8125px, rgba(205, 169, 255, 0.25) 0px 20px 20px -3.75px"
            } : undefined}
          >
            {credits} Credits
          </div>
        </div>
        <p className="text-4xl font-bold sm:text-5xl">
          ${price}
          <span className="text-base sm:text-lg font-medium">{period}</span>
        </p>
        <p className="mt-3 text-sm opacity-80 sm:text-base">{description}</p>
      </div>

      <div className="mt-6 sm:mt-8">
        <div className="w-full flex justify-center">
          <GlassCTAButton
            href="https://app.picassofusion.com/login?_gl=1*18t62o4*_ga*OTE2MzM2MzI1LjE3NjI0MDgyNzg.*_ga_8S104JGWHM*czE3NjM3MDI3MzAkbzgkZzAkdDE3NjM3MDI3MzAkajYwJGwwJGgw"
            text={buttonLabel}
            rootClassName="w-full"
            className="w-full justify-between !py-1 sm:!py-2 !text-base sm:!text-lg"
            initialBgColor={highlight ? "white" : undefined}
            hoverBgColor={highlight ? "#1d52e5" : undefined}
            initialTextColor={highlight ? "black" : undefined}
            hoverTextColor={highlight ? "white" : undefined}
          />
        </div>

        <a
          data-cal-link="robin-roy-ax/30min"
          data-cal-config='{"layout":"month_view"}'
          href="https://cal.com/robin-roy-ax/30min"
          onClick={(e) => {
            // Ensure Cal.com script is loaded before opening modal
            if (calLoaded) {
              e.preventDefault();
            } else {
              loadCalScript();
            }
          }}
          onMouseEnter={loadCalScript}
          onFocus={loadCalScript}
          target="_blank"
          rel="noopener noreferrer"
          className={`mt-3 w-full py-2 text-sm underline underline-offset-4 transition sm:text-base cursor-pointer block text-center
            ${highlight ? "font-bold text-indigo-200 hover:text-indigo-100" : "font-bold text-slate-500 hover:text-slate-700"}
          `}
        >
          {secondaryButton}
        </a>

      </div>

      <hr
        className={`my-5 sm:my-6 ${highlight ? "border-gray-500" : "border-slate-300"}`}
      />

      <div className="space-y-4">
        <div>
          <h4 className={`text-sm font-bold mb-3 ${highlight ? "text-gray-200" : "text-gray-700"}`}>
            Main Features
          </h4>
          <ul className="space-y-2 text-sm sm:text-base min-h-[185px]">
            {features.map((feature, i) => (
              <li key={i} className={`flex items-start gap-3 font-semibold ${highlight ? "text-gray-300" : "text-gray-600"}`}>
                <Check
                  className={`w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 mt-0.5 ${
                    highlight ? "text-white" : "text-gray-800"
                  }`}
                />
                <span className="leading-relaxed">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {hasSubFeatures && (
          <div className="pt-2">
            <GlassToggleButton
              expanded={isExpanded}
              onClick={onToggleExpand}
              highlight={highlight}
            />


            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="space-y-3 pt-4">
                    {Object.entries(subFeatures).map(([category, categoryFeatures]) => (
                      <div key={category}>
                        <h4 className={`text-md font-bold mb-2 uppercase tracking-wide ${
                          highlight ? "text-gray-300" : "text-gray-600"
                        }`}>
                          {category}
                        </h4>
                        <ul className="grid grid-cols-1 gap-1.5 text-sm sm:text-md">
                          {Object.entries(categoryFeatures).map(([featureName, featureValue]) => {
                            const isEnabled = featureValue === true || (typeof featureValue === 'string' && featureValue.toLowerCase().includes('up to'));
                            const displayValue = typeof featureValue === 'string' ? featureValue : featureName;
                            
                            return (
                              <li key={featureName} className={`flex items-center gap-2 ${
                                highlight ? "text-gray-400" : "text-gray-500"
                              }`}>
                                {isEnabled ? (
                                  <Check className={`w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0 ${
                                    highlight ? "text-gray-500" : "text-gray-700"
                                  }`} />
                                ) : (
                                  <X className={`w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0 ${
                                    highlight ? "text-red-400" : "text-red-500"
                                  }`} />
                                )}
                                <span className={!isEnabled ? "opacity-50" : ""}>
                                  {typeof featureValue === 'string' ? displayValue : featureName}
                                </span>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    ))}

                    <div className={`pt-3 mt-3 border-t ${highlight ? "border-gray-600" : "border-slate-300"}`}>
                      <p className={`text-xs sm:text-sm font-semibold ${highlight ? "text-gray-300" : "text-gray-600"}`}>
                        <span className={`${highlight ? "text-white" : "text-gray-800"}`}>Up to {addOns}</span> Add-on Credits can be added
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </motion.div>
  );
}