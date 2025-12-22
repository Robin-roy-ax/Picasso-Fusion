"use client";
import React from "react";
import styles from "./ticker.module.css";

// Logoipsum logos in white color
const LOGOS = [
  { id: 1, src: "Eve.svg", alt: "Eventzilla" },
  { id: 2, src: "facilGo.svg", alt: "FacilGo" },
  { id: 3, src: "star.svg", alt: "Star Health" },
  { id: 4, src: "solveCube.svg", alt: "SolveCube" }
];

export default function Ticker() {
  // 1. Create a "base set" that is wide enough to cover most screens.
  // We repeat the 4 logos 10 times -> 40 items. 
  const baseLogos = Array(8).fill(LOGOS).flat();

  // 2. We need TWO copies of this base set to achieve the seamless Loop effect.
  // One is viewed, the other is sliding in. When we reach -50%, we reset to 0.
  const seamlessLogos = [...baseLogos, ...baseLogos];

  return (
    <div>
      <p className={styles.trustedByHeading}>Trusted by the brands</p>
      <div className={styles.tickerContainer}>
        <div className={styles.tickerWrapper}>
          <div className={styles.tickerTrack}>
            {seamlessLogos.map((logo, index) => (
              <div key={`${logo.id}-${index}`} className={styles.tickerItem}>
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className={`${styles.logo} ${logo.src === "star.svg" ? styles.starLogo : ""}`}
                />
              </div>
            ))}
          </div>
        </div>
        {/* Side fade overlays */}
        <div className={styles.fadeLeft} />
        <div className={styles.fadeRight} />
      </div>
    </div>
  );
}