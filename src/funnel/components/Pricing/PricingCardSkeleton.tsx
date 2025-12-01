"use client";

import React from "react";
import { motion } from "framer-motion";

export default function PricingCardSkeleton({ highlight = false }: { highlight?: boolean }) {
  return (
    <motion.div
      className={`relative w-full flex flex-col p-6 sm:p-8 rounded-2xl shadow-[0_4px_10px_-2px_#64718f60] overflow-hidden border
        ${highlight
          ? "bg-[radial-gradient(150%_100%_at_100%_0,_#1e387b_0%,_#0a1329_100%)] text-white border-indigo-500/20"
          : "bg-[radial-gradient(100%_75%_at_0_0,_#94a1b5_0%,_#f5f6fa_100%)] text-slate-800 border-slate-200"
        }`}
    >
      {/* Shimmer */}
      <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
        <div className="shimmer h-full w-full" />
      </div>

      <style jsx>{`
        .shimmer {
          background: linear-gradient(
            100deg,
            ${highlight 
              ? "rgba(120,140,255,0) 0%, rgba(180, 200, 255, 0.35) 50%, rgba(255, 255, 255, 0) 100%"
              : "rgba(255,255,255,0) 0%, rgba(255, 255, 255, 0.6) 50%, rgba(255, 255, 255, 0) 100%"
            }
          );
          transform: translateX(-100%);
          animation: shimmerMove 2s infinite;
        }

        @keyframes shimmerMove {
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>

      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className={`h-6 w-32 rounded-md ${highlight ? "bg-indigo-300/30" : "bg-slate-300"}`} />
        <div className={`h-6 w-20 rounded-full ${highlight ? "bg-indigo-300/30" : "bg-slate-300"}`} />
      </div>

      {/* Price */}
      <div className={`h-10 w-40 rounded-md mb-3 ${highlight ? "bg-indigo-300/30" : "bg-slate-300"}`} />
      <div className={`h-4 w-56 rounded-md mb-6 ${highlight ? "bg-indigo-300/30" : "bg-slate-300"}`} />

      {/* Button */}
      <div className={`h-12 w-full rounded-xl mb-3 ${highlight ? "bg-indigo-300/30" : "bg-slate-300"}`} />
      <div className={`h-4 w-40 rounded-md mx-auto ${highlight ? "bg-indigo-300/30" : "bg-slate-300"}`} />

      <hr className={`my-6 ${highlight ? "border-slate-300" : "border-slate-300"}`} />

      {/* Features */}
      <div className="space-y-4">
        <div>
          <div className={`h-4 w-28 rounded-md mb-3 ${highlight ? "bg-indigo-300/30" : "bg-slate-300"}`} />
          <div className="space-y-2 min-h-[185px]">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className={`h-4 w-4 rounded-full ${highlight ? "bg-indigo-300/30" : "bg-slate-300"}`} />
                <div className={`h-4 w-48 rounded-md ${highlight ? "bg-indigo-300/30" : "bg-slate-300"}`} />
              </div>
            ))}
          </div>
        </div>

        {/* Expandable section skeleton - only button placeholder */}
        <div className="pt-2">
          <div className={`h-10 w-full rounded-lg ${highlight ? "bg-indigo-300/30" : "bg-slate-300"}`} />
        </div>
      </div>
    </motion.div>
  );
}
