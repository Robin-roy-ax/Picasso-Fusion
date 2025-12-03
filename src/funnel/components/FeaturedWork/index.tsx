'use client';

import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useRef, useEffect, useState } from 'react';
import { Project, projects } from './data';
import styles from './style.module.css';
import ViewProjectCursor from "@/funnel/components/common/MousePointer";
import { debounce, rafThrottle } from "@/utils/performance";

export default function FeaturedWork() {
  const [isMobile, setIsMobile] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setIsClient(true);
    
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    
    // Debounce resize handler
    const debouncedResize = debounce(checkMobile, 150);
    window.addEventListener('resize', debouncedResize, { passive: true });
    
    return () => window.removeEventListener('resize', debouncedResize);
  }, []);

  useEffect(() => {
    const handleMouseMove = rafThrottle((e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    });

    if (!isMobile) {
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isMobile]);

  if (!isClient) {
    return null;
  }

  if (isMobile) {
    return <MobileFeaturedWork projects={projects} />;
  }

  return (
    <>
      <DesktopFeaturedWork 
        projects={projects} 
        setCursorVisible={setCursorVisible}
      />
      <ViewProjectCursor visible={cursorVisible} mousePos={mousePos} />
    </>
  );
}

interface DesktopFeaturedWorkProps {
  projects: Project[];
  setCursorVisible: (visible: boolean) => void;
}

function DesktopFeaturedWork({ projects, setCursorVisible }: DesktopFeaturedWorkProps) {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ 
    target: targetRef,
    offset: ["start start", "end end"]
  });

  return (
    <section ref={targetRef} className={styles.desktopSection} id="work">
      <div className={styles.stickyContainer}>
        <div className={styles.workContainer}>
          <Header />
          <HorizontalScroll 
            scrollYProgress={scrollYProgress} 
            projects={projects}
            setCursorVisible={setCursorVisible}
          />
          <SeeMoreButton />
        </div>
      </div>
      <div className={styles.scrollTrigger} id="scroll-trigger" />
    </section>
  );
}

function MobileFeaturedWork({ projects }: { projects: Project[] }) {
  return (
    <section className={styles.mobileSection} id="work">
      <div className={styles.mobileWorkContainer}>
        <MobileHeader />
        <div className={styles.mobileProjectsContainer}>
          {projects.map((project, index) => (
            <MobileProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
        <MobileSeeMoreButton />
      </div>
    </section>
  );
}

function Header() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className={styles.headerContainer}
    >
      <div className={styles.headerLeft}>
        <h2 className={styles.mainTitle}>
          Featured{' '}
          <span className={styles.titleItalic}>Work</span>
        </h2>
      </div>
      
      <div className={styles.headerRight}>
        <p className={styles.description}>
          Dive into a world of creativity and inspiration with our Dribble.
          Explore our work and imagine the possibilities for your brand.
        </p>
      </div>
    </motion.div>
  );
}

function MobileHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className={styles.mobileHeaderContainer}
    >
      <div>
        <h2 className={styles.mobileMainTitle}>
          Featured{' '}
          <span className={styles.titleItalic}>Work</span>
        </h2>
      </div>
      
      <div>
        <p className={styles.mobileDescription}>
          Dive into a world of creativity and inspiration with our Dribble.
          Explore our work and imagine the possibilities for your brand.
        </p>
      </div>
    </motion.div>
  );
}

interface HorizontalScrollProps {
  scrollYProgress: MotionValue<number>;
  projects: Project[];
  setCursorVisible: (visible: boolean) => void;
}

function HorizontalScroll({ scrollYProgress, projects, setCursorVisible }: HorizontalScrollProps) {
  const x = useTransform(scrollYProgress, [0, 1], ["-10%", "-160%"]);

  return (
    <div className={styles.horizontalScrollContainer}>
      <motion.div className={styles.projectsWrapper} style={{ x }}>
        {projects.map((project, index) => (
          <ProjectCard 
            key={project.id} 
            project={project} 
            index={index}
            setCursorVisible={setCursorVisible}
          />
        ))}
      </motion.div>
    </div>
  );
}

interface ProjectCardProps {
  project: Project;
  index: number;
  setCursorVisible?: (visible: boolean) => void;
}

function ProjectCard({ project, index, setCursorVisible }: ProjectCardProps) {
  const handleMouseEnter = () => {
    if (setCursorVisible) {
      setCursorVisible(true);
      document.body.style.cursor = 'none';
    }
  };

  const handleMouseLeave = () => {
    if (setCursorVisible) {
      setCursorVisible(false);
      document.body.style.cursor = 'auto';
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 100 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "0px 0px 0px 0px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={styles.projectCard}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link href={project.route} className={styles.projectLink}>
        <div className={styles.imageContainer}>
          <motion.div
            className={styles.imageWrapper}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.4 }}
          >
            <motion.div
              className={styles.imageInner}
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.6 }}
            >
              <div className={styles.imageInner}>
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className={styles.image}
                  sizes="750px"
                />
              </div>
            </motion.div>

            <div className={styles.gradientOverlay} />

            <div className={styles.contentOverlay}>
              <div className={styles.tagsContainer}>
                {project.tags.map((tag, tagIndex) => (
                  <div key={tagIndex} className={styles.tag}>
                    <span className={styles.tagText}>{tag}</span>
                  </div>
                ))}
              </div>

              <div>
                <h3 className={styles.projectTitle}>{project.title}</h3>
                <p className={styles.projectDescription}>{project.description}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </Link>
    </motion.div>
  );
}

function MobileProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -100px 0px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={styles.mobileProjectCard}
    >
      <Link href={project.route} className={styles.projectLink}>
        <div className={styles.mobileImageContainer}>
          <div className={styles.mobileImageWrapper}>
            <div className={styles.imageInner}>
              <div className={styles.imageInner}>
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className={styles.image}
                  sizes="(max-width: 768px) 100vw, 500px"
                />
              </div>
            </div>

            <div className={styles.gradientOverlay} />

            <div className={styles.mobileContentOverlay}>
              <div className={styles.mobileTagsContainer}>
                {project.tags.map((tag, tagIndex) => (
                  <div key={tagIndex} className={styles.mobileTag}>
                    <span className={styles.mobileTagText}>{tag}</span>
                  </div>
                ))}
              </div>

              <div>
                <h3 className={styles.mobileProjectTitle}>{project.title}</h3>
                <p className={styles.mobileProjectDescription}>{project.description}</p>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

function SeeMoreButton() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className={styles.buttonContainer}
    >
      <Link href="/work" className={styles.button}>
        <span className={styles.buttonText}>See more of our work</span>
      </Link>
    </motion.div>
  );
}

function MobileSeeMoreButton() {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className={styles.buttonContainer}
    >
      <Link 
        href="/work" 
        className={styles.mobileButton}
        onTouchStart={() => setIsPressed(true)}
        onTouchEnd={() => setIsPressed(false)}
        style={{
          backgroundColor: isPressed ? 'rgba(204, 213, 232, 0.1)' : 'rgba(204, 213, 232, 0)'
        }}
      >
        <span className={styles.mobileButtonText}>See more of our work</span>
      </Link>
    </motion.div>
  );
}