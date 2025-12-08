"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MENU_ITEMS as defaultMenuItems, CTA_BUTTON_TEXT, LOGO_IMAGE } from "./data";
import styles from "./style.module.css";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { throttle } from "@/utils/performance";
import { NAVBAR_QUERYResult } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";

interface NavbarProps {
  data?: NAVBAR_QUERYResult;
}

export default function Navbar({ data }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [inHero, setInHero] = useState(true);
  const [navbarVisible, setNavbarVisible] = useState(true);
  const pathname = usePathname();
  const isProjectPage = pathname?.startsWith("/projects/");

  const menuItems = data?.items?.map(item => ({
    id: item.id || item.label || "",
    label: item.label || "",
    href: item.href || "/"
  })) || defaultMenuItems;

  const logoSrc = data?.logo?.image ? urlFor(data.logo.image).url() : LOGO_IMAGE;
  const ctaText = data?.ctaText || CTA_BUTTON_TEXT;

  useEffect(() => {
    const isSectionPage = ["/benefits", "/process", "/testimonials", "/pricing", "/dribbble", "/"].includes(pathname);
    
    if (!isSectionPage) {
      setInHero(false);
      return;
    }

    const handleScroll = () => {
      const hero = document.getElementById("hero");
      if (!hero) {
        setInHero(false);
        return;
      }
      setInHero(hero.getBoundingClientRect().bottom > 0);

      const workSection = document.getElementById("dribbble");
      const footerSection = document.querySelector("footer");

      let shouldHide = false;

      if (workSection) {
        const workRect = workSection.getBoundingClientRect();
        if (workRect.top <= 0 && workRect.bottom > window.innerHeight * 0.5) {
          shouldHide = true;
        }
      }

      if (footerSection) {
        const footerRect = footerSection.getBoundingClientRect();
        if (footerRect.top >= 0 && footerRect.top < window.innerHeight) {
          shouldHide = true;
        }
      }

      setNavbarVisible(!shouldHide);
    };

    const throttledScroll = throttle(handleScroll, 100);

    window.addEventListener("scroll", throttledScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", throttledScroll);
  }, [pathname, isProjectPage]);

  const menuColor = inHero ? "#fff" : "#000";
  const navbarClass = inHero ? styles.navbarHero : styles.navbarDefault;
  const logoClass = inHero ? styles.logoSectionHero : styles.logoSectionDefault;
  const desktopBtnClass = inHero
    ? `${styles.desktopButton} ${styles.heroButton}`
    : `${styles.desktopButton} ${styles.defaultButton}`;

  const visibilityClass = navbarVisible ? styles.navbarVisible : styles.navbarHidden;

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, id?: string) => {
    setMobileOpen(false);
    
    if (pathname === href) {
      e.preventDefault();
      if (id) {
        const element = document.getElementById(id);
        if (element) {
          // Get header height for offset
          const header = document.querySelector("nav");
          const headerHeight = header?.offsetHeight || 80;
          
          // Scroll with offset for header
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          });
        }
      } else if (href === "/") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  return (
    <nav className={`${styles.navbar} ${navbarClass} ${visibilityClass} ${mobileOpen ? styles.navbarExpanded : ''}`}>
      <div className={styles.navbarTop}>
        <Link
          href="/"
          onClick={(e) => handleNavClick(e, "/")}
          className={`${styles.logoSection} ${logoClass}`}
          scroll={pathname !== "/"}
        >
          <Image src={logoSrc} alt="Logo" width={100} height={100} className="object-contain" />
        </Link>

        <div className={styles.desktopMenu}>
          {menuItems.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className={styles.menuLink}
              style={{ color: menuColor }}
              onClick={(e) => handleNavClick(e, item.href, item.id)}
              scroll={item.href === "/about"}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className={styles.rightSection}>
          <div
            className={`${styles.desktopButtonSection} ${
              inHero
                ? styles.desktopButtonSectionHero
                : styles.desktopButtonSectionDefault
            }`}
          >
            <a
              href="https://app.picassofusion.com/login?_gl=1*18t62o4*_ga*OTE2MzM2MzI1LjE3NjI0MDgyNzg.*_ga_8S104JGWHM*czE3NjM3MDI3MzAkbzgkZzAkdDE3NjM3MDI3MzAkajYwJGwwJGgw"
              target="_blank"
              rel="noopener noreferrer"
              className={desktopBtnClass}
            >
              {ctaText}
            </a>
          </div>

          <button
            aria-label="Toggle menu"
            className={styles.mobileHamburger}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <span
              className={`${styles.hamburgerLine} ${
                mobileOpen ? styles.hamburgerLineOpen1 : ""
              }`}
            />
            <span
              className={`${styles.hamburgerLine} ${
                mobileOpen ? styles.hamburgerLineOpen2 : ""
              }`}
            />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={styles.mobileMenuExpanded}
          >
            <div className={styles.mobileMenuDivider} />
            
            <div className={styles.mobileMenuLinks}>
              {menuItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href, item.id)}
                    className={styles.mobileMenuItem}
                    scroll={item.href === "/about"}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </div>

            <motion.a
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              href="https://app.picassofusion.com/login?_gl=1*18t62o4*_ga*OTE2MzM2MzI1LjE3NjI0MDgyNzg.*_ga_8S104JGWHM*czE3NjM3MDI3MzAkbzgkZzAkdDE3NjM3MDI3MzAkajYwJGwwJGgw"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.mobileMenuCTA}
            >
              {ctaText}
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}