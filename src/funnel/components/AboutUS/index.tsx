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

import { urlFor } from "@/sanity/lib/image";
import { ABOUT_PAGE_QUERYResult } from "@/sanity.types";

interface AboutUsProps {
    data?: ABOUT_PAGE_QUERYResult;
}

export default function AboutUs({ data }: AboutUsProps) {
  const content = data?.hero ? {
      hero: {
          title: data.hero.title || "Innovate,",
          titleHighlight: data.hero.titleHighlight || "Elevate & Design.",
          description: data.hero.description || "Unlock your creative potential with us, offering limitless possibilities to transform your concepts into stunning realities."
      },
      heroImage: data.hero.heroImage ? urlFor(data.hero.heroImage).url() : "https://framerusercontent.com/images/IjRP7RIug6UNzqeHbNO5WxD3FDk.jpg",
      overview: {
          text: data.overview?.text || "Picasso Fusion delivers high quality, personalized designs through a simple credit based system. Our team turns your ideas into impactful visuals across every design need. Fast, flexible, and seamless in elevating your brand with ease."
      },
      sections: data.sections || [],
      stats: data.stats || [],
      team: {
          title: data.team?.title || "Meet Our",
          titleHighlight: data.team?.titleHighlight || "Team",
          description: data.team?.description || "Discover the Exceptional Talent Shaping Picasso Fusion's Innovative Solutions and Remarkable Achievements",
          members: data.team?.members || []
      }
  } : null;

    if (!content) {
        // Fallback to existing layout if maps fail, or just use hardcoded mapped structure above
        // For simplicity, we are mapping "content" to match the shape expected by sub-components or updating sub-components interactively.
        // Actually, let's update sub-components to take props directly.
    }

  return (
    <section id="about" className={styles.section}>
      <HeroSection heroData={content?.hero} />
      <HeroImage imageUrl={content?.heroImage} />
      <OverviewSection text={content?.overview.text} />
      
      {/* Dynamic Sections mapped from Sanity */}
      {content?.sections && content.sections.length > 0 ? (
          content.sections.map((sec, idx) => (
             <SectionRow key={idx} title={sec.title || ""} description={sec.description || ""} />
          ))
      ) : (
          <>
            <SectionRow title="Top-Notch Equipment" description="We leverage cutting-edge tools and technology..." />
            <SectionRow title="Dedicated Team" description="Our team of skilled professionals..." />
            <SectionRow title="Pioneering the Path in Design" description="We are at the forefront of design trends..." />
          </>
      )}

      <NumbersSection stats={content?.stats} />
      <TeamSection team={content?.team} />
    </section>
  );
}

function HeroSection({ heroData }: { heroData?: any }) {
    const title = heroData?.title || "Innovate,";
    const highlight = heroData?.titleHighlight || "Elevate & Design.";
    const description = heroData?.description || "Unlock your creative potential with us...";

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.7 }}
      className={styles.heroContainer}
    >
      <h2 className={styles.heroTitle}>
        {title}{" "}
        <span className={styles.heroTitleItalic}>
          {highlight}
        </span>
      </h2>

      <p className={styles.heroDescription}>{description}</p>
    </motion.div>
  );
}

function HeroImage({ imageUrl }: { imageUrl?: string }) {
  const src = imageUrl || "https://framerusercontent.com/images/IjRP7RIug6UNzqeHbNO5WxD3FDk.jpg";
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.8 }}
      className={styles.heroImageContainer}
    >
      <div className={styles.heroImageWrapper}>
        <Image
          src={src}
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

function OverviewSection({ text }: { text?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.7 }}
      className={styles.overviewContainer}
    >
      <p className={styles.overviewText}>{text}</p>
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

function NumbersSection({ stats: propStats }: { stats?: any[] }) {
  const displayStats = propStats && propStats.length > 0 ? propStats : stats;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.7 }}
      className={styles.sectionRow}
    >
      <div className={styles.sectionLeft}>
        <h3 className={styles.sectionTitle}>In Numbers</h3>
      </div>

      <div className={styles.numbersGrid}>
        {displayStats.map((stat, idx) => (
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

function TeamSection({ team }: { team?: any }) {
  const title = team?.title || "Meet Our";
  const highlight = team?.titleHighlight || "Team";
  const description = team?.description || "Discover the Exceptional Talent...";
  const members = team?.members || [];

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className={styles.teamContainer}
      >
        <h2 className={styles.teamTitle}>
          {title}{" "}
          <span className={styles.heroTitleItalic}>
            {highlight}
          </span>
        </h2>

        <p className={styles.teamDescription}>{description}</p>
      </motion.div>

      <TeamGrid members={members} />
    </>
  );
}

function TeamGrid({ members }: { members: any[] }) {
  const displayMembers = members && members.length > 0 ? members.map((m:any) => ({
      name: m.name,
      role: m.role,
      description: m.description,
      image: m.image ? urlFor(m.image).url() : ""
  })) : teamMembers;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className={styles.teamGrid}
    >
      {displayMembers.map((member, idx) => (
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