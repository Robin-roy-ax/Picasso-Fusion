"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { stats, teamMembers, content } from "./data";
import { Stat, TeamMember } from "./data";
import styles from "./style.module.css";

interface CounterProps {
  target: number;
  suffix?: string;
}

function Counter({ target, suffix }: CounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;

    let start = 0;
    const duration = 1500;
    const increment = target / (duration / 20);

    const counter = setInterval(() => {
      start += increment;
      if (start >= target) {
        start = target;
        clearInterval(counter);
      }
      setCount(Math.floor(start));
    }, 20);

    return () => clearInterval(counter);
  }, [inView, target]);

  return (
    <div ref={ref} className={styles.statValue}>
      {count}
      {suffix}
    </div>
  );
}

function HeroSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.7 }}
      className={styles.heroContainer}
    >
      <h2 className={styles.heroTitle}>
        {content.hero.title}{" "}
        <span className={styles.heroTitleItalic}>
          {content.hero.titleHighlight}
        </span>
      </h2>

      <p className={styles.heroDescription}>{content.hero.description}</p>
    </motion.div>
  );
}

function HeroImage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.8 }}
      className={styles.heroImageContainer}
    >
      <div className={styles.heroImageWrapper}>
        <Image
          src={content.heroImage}
          alt="Creative Studio Image"
          fill
          sizes="100vw"
          priority
          className={styles.heroImage}
        />
      </div>
    </motion.div>
  );
}

function OverviewSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.7 }}
      className={styles.overviewContainer}
    >
      <p className={styles.overviewText}>{content.overview.text}</p>
    </motion.div>
  );
}

interface SectionRowProps {
  title: string;
  description: string;
}

function SectionRow({ title, description }: SectionRowProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.7 }}
      className={styles.sectionRow}
    >
      <div className={styles.sectionLeft}>
        <h3 className={styles.sectionTitle}>{title}</h3>
      </div>
      <div className={styles.sectionRight}>
        <p className={styles.sectionDescription}>{description}</p>
      </div>
    </motion.div>
  );
}

function NumbersSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.7 }}
      className={styles.sectionRow}
    >
      <div className={styles.sectionLeft}>
        <h3 className={styles.sectionTitle}>{content.numbers.title}</h3>
      </div>

      <div className={styles.numbersGrid}>
        {stats.map((stat, idx) => (
          <StatItem key={idx} stat={stat} />
        ))}
      </div>
    </motion.div>
  );
}

interface StatItemProps {
  stat: Stat;
}

function StatItem({ stat }: StatItemProps) {
  return (
    <div className={styles.statItem}>
      <Counter target={stat.value} suffix={stat.suffix} />
      <p className={styles.statLabel}>{stat.label}</p>
    </div>
  );
}

function TeamSection() {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className={styles.teamContainer}
      >
        <h2 className={styles.teamTitle}>
          {content.team.title}{" "}
          <span className={styles.heroTitleItalic}>
            {content.team.titleHighlight}
          </span>
        </h2>

        <p className={styles.teamDescription}>{content.team.description}</p>
      </motion.div>

      <TeamGrid />
    </>
  );
}

function TeamGrid() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className={styles.teamGrid}
    >
      {teamMembers.map((member, idx) => (
        <TeamCard key={idx} member={member} />
      ))}
    </motion.div>
  );
}

interface TeamCardProps {
  member: TeamMember;
}

function TeamCard({ member }: TeamCardProps) {
  return (
    <div className={styles.teamCard}>
      <div className={styles.teamCardImageWrapper}>
        <Image
          src={member.image}
          alt={member.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className={styles.teamCardImage}
        />
        <div className={styles.teamCardGradient}></div>
      </div>

      <div className={styles.teamCardInfo}>
        <h4 className={styles.teamCardName}>{member.name}</h4>
        <p className={styles.teamCardRole}>{member.role}</p>
      </div>

      <div className={styles.teamCardDescription}>
        <p className={styles.teamCardDescriptionText}>{member.description}</p>
      </div>
    </div>
  );
}

export default function AboutUs() {
  return (
    <section id="about" className={styles.section}>
      <HeroSection />
      <HeroImage />
      <OverviewSection />
      <SectionRow
        title={content.mission.title}
        description={content.mission.description}
      />
      <SectionRow
        title={content.approach.title}
        description={content.approach.description}
      />
     <SectionRow
        title={content.pioneer.title}
        description={content.pioneer.description}
      />
      <NumbersSection />
      <TeamSection />
    </section>
  );
}