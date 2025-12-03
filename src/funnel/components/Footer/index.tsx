"use client";

import { motion } from "framer-motion";
import { menuLinks, socialLinks } from "./data";
import styles from "./style.module.css";
import { useEffect, useState } from "react";
import { getCalApi } from "@calcom/embed-react";
import Link from "next/link";

export default function HomeSection() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
      (async function () {
        const cal = await getCalApi({ namespace: "cal" });
        cal("ui", {
          hideEventTypeDetails: false,
          layout: "month_view",
        });
      })();
    }, []);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setMessage("Please enter a valid email");
      return;
    }

    setIsLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          name: email.split("@")[0],
          list_uuids: ["df21996e-9d98-48a2-b766-c2b9c4dc7e8b"],
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Successfully subscribed! Please check your email to confirm.");
        setEmail("");
      } else {
        setMessage(data.message || "Subscription failed. Please try again.");
      }
    } catch (error) {
      console.error("Subscription error:", error);
      setMessage("An error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className={styles.main}>
      <motion.div
        className={styles.hero}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className={styles.heroCard}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>
              Your Next Big Idea <br />
              <span>Starts Here</span>
            </h1>
            <p className={styles.heroText}>
              From concept to final design, we collaborate closely to bring your vision to life with clarity, creativity, and purpose.
            </p>
            <a
              data-cal-link="robin-roy-ax/30min"
              data-cal-config='{"layout":"month_view"}'
              className={styles.heroButton}
            >
              Schedule a call
            </a>
          </div>
        </div>
      </motion.div>

      <footer className={styles.footer}>
        <div className={styles.footerContainer}>
          <div className={styles.footerLeft}>
            <h3
              style={{
                fontFamily: '"Inter", sans-serif',
                fontSize: "40px",
                fontWeight: 500,
                letterSpacing: "-0.05em",
                lineHeight: "1.2em",
                color: "#28334d",
                margin: 0,
              }}
            >
              Subscribe to our newsletter
            </h3>

            <form onSubmit={handleSubscribe} className="w-full max-w-md mt-4">
              <div className="flex items-center gap-3 w-full">
                <input
                  type="email"
                  placeholder="name@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                  className="bg-[#f5f6fa] text-[#28334d] px-5 py-3 rounded-full w-full outline-none focus:ring-2 focus:ring-[#dde3ee] placeholder-[#8592b1] text-base transition-all duration-200 disabled:opacity-50"
                />
                <button 
                  type="submit"
                  disabled={isLoading}
                  className="bg-[#000000] text-white px-6 py-3 rounded-full text-base font-medium transition-all duration-200 hover:bg-[#3c3c3c] disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                >
                  {isLoading ? "Subscribing..." : "Subscribe"}
                </button>
              </div>
              {message && (
                <p className={`mt-3 text-sm ${message.includes("Success") ? "text-green-600" : "text-red-600"}`}>
                  {message}
                </p>
              )}
            </form>
          </div>

          <div className={styles.footerRight}>
            <div className={styles.footerMenu}>
              <h4 className={styles.footerTitle}>Menu</h4>
              <ul className="flex flex-col gap-3 items-start list-none m-0 p-0">
                {menuLinks.map((link, idx) => (
                  <li key={idx}>
                    <Link
                      href={link.href}
                      className="text-[#8592b1] hover:text-[#bababaed] transition-all duration-200 text-[16px]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.footerSocial}>
              <h4 className={styles.footerTitle}>Follow Us</h4>
              <ul className="flex flex-col gap-3 items-center list-none m-0 p-0">
                {socialLinks.map((social, idx) => (
                  <li key={idx}>
                    <Link
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#8592b1] hover:text-[#bababaed] transition-all duration-200 text-[16px]"
                    >
                      {social.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.footerButton}>
              <Link
                href="/#hero"
                className="bg-black hover:bg-[#3c3c3c] text-white w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300 shadow-lg"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="12" y1="19" x2="12" y2="5" />
                  <polyline points="5 12 12 5 19 12" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
        <div className={styles.footerBottom}>
          <p>© Picasso Fusion 2025. All rights reserved</p>
          <p>Our Design, Your Vision</p>
        </div>
      </footer>
    </main>
  );
}
