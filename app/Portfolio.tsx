"use client";

/* eslint-disable @next/next/no-img-element */

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { HlsVideo } from "./components/HlsVideo";
import { Lightbox } from "./components/Lightbox";
import { LoadingScreen } from "./components/LoadingScreen";

const EASE = [0.25, 0.1, 0.25, 1] as const;

const roles = ["Creative", "Designer", "UX Enthusiast"];

const projects = [
  {
    title: "FINCA Bank",
    category: "UX Research · Product Design · Mobile App · Desktop",
    src: "/images/finca.webp",
    alt: "Red sports car speeding through a dimly lit tunnel",
    span: "md:col-span-7",
    ratio: "aspect-[16/11]",
  },
  {
    title: "Bishkek Petroleum",
    category: "Landing Page · WEB · Branding",
    src: "/images/bishkekpetroleum.webp",
    alt: "Monolithic concrete building rising against a black sky",
    span: "md:col-span-5",
    ratio: "aspect-[4/3] md:aspect-auto",
  },
  {
    title: "TOP - Football",
    category: "Mobile App · UX/UI Design",
    src: "/images/topfootball.webp",
    alt: "Low-key monochrome portrait emerging from deep shadow",
    span: "md:col-span-5",
    ratio: "aspect-[4/3] md:aspect-auto",
  },
  {
    title: "APAP University",
    category: "Landing Page · WEB · Branding",
    src: "/images/apap.webp",
    alt: "Gradient business cards arranged on a wooden surface",
    span: "md:col-span-7",
    ratio: "aspect-[16/11]",
  },
];

const career = [
  {
    company: "FINCA Bank",
    role: "UX Researcher & Middle Product Designer",
    period: "2026 — current",
    icon: "/icons/Finca.png",
  },

  {
    company: "Project-Based Work",
    role: "Independent Designer, Branding & Product Design",
    period: "2025",
    icon: "/icons/deep.png",
  },
  
  {
    company: "Oracle Digital",
    role: "UX/UI Designer",
    period: "2024",
    icon: "/icons/oracle.png",
  },
];

const aboutPartners = [
  {
    name: "Bishkek Petroleum",
    logo: "/icons/bishkek-petroleum.png",
    fallback: "BP",
  },
  {
    name: "Bay Tash Group",
    logo: "/icons/ay-tash-group.png",
    fallback: "BT",
  },
  {
    name: "Selected Kyrgyz partner",
    logo: "/icons/kyrgyz-partner.png",
    fallback: "KG",
  },
];

const tools = [
  {
    name: "Figma",
    detail: "general design tool",
    icon: "/icons/figma.png",
  },
  {
    name: "Higgsfield",
    detail: "visual generations",
    icon: "/icons/higgsfield.png",
  },
  {
    name: "ChatGPT + Gemini",
    detail: "research & ideation",
    icon: "/icons/chat.png",
  },
  {
    name: "Adobe After Effects",
    detail: "product motion",
    icon: "/icons/ae.png",
  },
  {
    name: "Codex",
    detail: "coding + agentic work",
    icon: "/icons/codex.png",
  },
  {
    name: "Notion",
    detail: "project management",
    icon: "/icons/notion.png",
  },
];

const explorations = [
  {
    title: "Credit Finca",
    src: "/images/credot.webp",
    alt: "Translucent blue glass curves catching soft light",
    rotation: -4,
  },
  {
    title: "Light Trails",
    src: "/images/exploration-light-trails.jpg",
    alt: "Multicolored neon trails sweeping across black",
    rotation: 3,
  },
  {
    title: "Liquid Study",
    src: "/images/exploration-liquid-study.jpg",
    alt: "Blue and yellow oil forming fluid macro patterns",
    rotation: 5,
  },
  {
    title: "Color Geometry",
    src: "/images/exploration-color-geometry.jpg",
    alt: "Color-blocked architectural steps beneath a blue sky",
    rotation: -3,
  },
  {
    title: "Iridescent Fold",
    src: "/images/exploration-iridescent-fold.jpg",
    alt: "Dark holographic fabric reflecting rainbow highlights",
    rotation: -5,
  },
  {
    title: "Dune Study",
    src: "/images/exploration-dune-study.jpg",
    alt: "Aerial view of pink sand dunes shaped by wind",
    rotation: 4,
  },
];

const stats = [
  { value: "3+", label: "Years Experience" },
  { value: "15+", label: "Projects Done" },
  { value: "99%", label: "Satisfied Clients" },
];

const socialLinks = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/arnoo-erkinbekov-4bb126301" },
  { label: "Telegram", href: "https://t.me/kruuj" },
];

type LightboxItem = { src: string; alt: string; title: string };

function SectionHeader({
  eyebrow,
  title,
  italic,
  description,
  action,
}: {
  eyebrow: string;
  title: string;
  italic: string;
  description: string;
  action: string;
}) {
  return (
    <motion.div
      className="mb-10 flex items-end justify-between gap-8 md:mb-14"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: EASE }}
      viewport={{ once: true, margin: "-100px" }}
    >
      <div>
        <div className="mb-5 flex items-center gap-3">
          <span className="h-px w-8 bg-stroke" />
          <p className="text-xs uppercase tracking-[0.3em] text-muted">{eyebrow}</p>
        </div>
        <h2 className="text-4xl font-medium tracking-[-0.04em] text-text-primary sm:text-5xl md:text-6xl">
          {title} <em className="font-display font-normal">{italic}</em>
        </h2>
        <p className="mt-4 max-w-xl text-sm leading-6 text-muted md:text-base">{description}</p>
      </div>
      <a className="gradient-btn gradient-btn--outline hidden shrink-0 md:inline-flex" href="#contact">
        {action}<span aria-hidden="true">↗</span>
      </a>
    </motion.div>
  );
}

function Navbar({ active }: { active: string }) {
  const [scrolled, setScrolled] = useState(false);
  const items = [
    { label: "Home", href: "#home", id: "home" },
    { label: "Work", href: "#work", id: "work" },
    { label: "About Me", href: "#about", id: "about" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-4 md:px-4 md:pt-6">
      <nav
        aria-label="Primary navigation"
        className={
          "inline-flex max-w-full items-center rounded-full border border-white/10 bg-surface/90 p-2 backdrop-blur-md transition-shadow duration-300 " +
          (scrolled ? "shadow-md shadow-black/30" : "")
        }
      >
        <a className="logo-ring group" href="#home" aria-label="Erkinbekov Arnoo, home">
          <span className="flex h-full w-full items-center justify-center rounded-full bg-bg font-display text-[13px] italic transition-transform group-hover:scale-110">
            EA
          </span>
        </a>
        <span className="mx-1 hidden h-5 w-px bg-stroke sm:block" aria-hidden="true" />
        {items.map((item) => (
          <a
            key={item.id}
            href={item.href}
            aria-current={active === item.id ? "page" : undefined}
            className={
              "rounded-full px-2.5 py-1.5 text-[11px] transition-colors sm:px-4 sm:py-2 sm:text-sm " +
              (active === item.id
                ? "bg-stroke/60 text-text-primary"
                : "text-muted hover:bg-stroke/50 hover:text-text-primary")
            }
          >
            {item.label}
          </a>
        ))}
        <span className="mx-1 hidden h-5 w-px bg-stroke sm:block" aria-hidden="true" />
        <a className="say-hi" href="https://t.me/kruuj" target="_blank" rel="noreferrer">
          <span>Contact Me</span><span aria-hidden="true">.✦ ݁˖</span>
        </a>
      </nav>
    </header>
  );
}

function Portfolio() {
  const [isLoading, setIsLoading] = useState(true);
  const [roleIndex, setRoleIndex] = useState(0);
  const [activeSection, setActiveSection] = useState("home");
  const [lightboxItem, setLightboxItem] = useState<LightboxItem | null>(null);
  const [heroVideoReady, setHeroVideoReady] = useState(false);
  const [footerVideoReady, setFooterVideoReady] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const explorationRef = useRef<HTMLElement>(null);
  const explorationContentRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLElement>(null);

  const finishLoading = useCallback(() => setIsLoading(false), []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setRoleIndex((current) => (current + 1) % roles.length);
    }, 2000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const saveData = (
      navigator as Navigator & { connection?: { saveData?: boolean } }
    ).connection?.saveData;

    if (reducedMotion || saveData) return;

    const timer = window.setTimeout(() => setHeroVideoReady(true), 250);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const sections = ["home", "work", "resume"]
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActiveSection(visible.target.id);
      },
      { rootMargin: "-35% 0px -55%", threshold: [0, 0.1, 0.4] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!footerRef.current || footerVideoReady) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setFooterVideoReady(true);
          observer.disconnect();
        }
      },
      { rootMargin: "900px" },
    );
    observer.observe(footerRef.current);
    return () => observer.disconnect();
  }, [footerVideoReady]);

  useEffect(() => {
    if (isLoading || !rootRef.current) return;

    let disposed = false;
    let cleanup: (() => void) | undefined;

    const setupAnimations = async () => {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);

      if (disposed || !rootRef.current) return;

      gsap.registerPlugin(ScrollTrigger);
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      const context = gsap.context(() => {
        if (reducedMotion) {
          gsap.set([".name-reveal", ".blur-in"], { opacity: 1, y: 0, filter: "blur(0px)" });
          return;
        }

        const heroTimeline = gsap.timeline({ defaults: { ease: "power3.out" } });
        heroTimeline
          .fromTo(
            ".name-reveal",
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: 1.2, delay: 0.1 },
          )
          .fromTo(
            ".blur-in",
            { opacity: 0, filter: "blur(10px)", y: 20 },
            { opacity: 1, filter: "blur(0px)", y: 0, duration: 1, stagger: 0.1 },
            "-=0.75",
          );

        if (explorationRef.current && explorationContentRef.current) {
          ScrollTrigger.create({
            trigger: explorationRef.current,
            start: "top top",
            end: "bottom bottom",
            pin: explorationContentRef.current,
            pinSpacing: false,
          });

          const columns = explorationRef.current.querySelectorAll<HTMLElement>("[data-parallax-column]");
          if (columns[0]) {
            gsap.fromTo(
              columns[0],
              { yPercent: 12 },
              {
                yPercent: -22,
                ease: "none",
                scrollTrigger: {
                  trigger: explorationRef.current,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: 1,
                },
              },
            );
          }
          if (columns[1]) {
            gsap.fromTo(
              columns[1],
              { yPercent: -2 },
              {
                yPercent: -34,
                ease: "none",
                scrollTrigger: {
                  trigger: explorationRef.current,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: 1.2,
                },
              },
            );
          }
        }

        if (marqueeRef.current) {
          gsap.to(marqueeRef.current, {
            xPercent: -50,
            duration: 40,
            ease: "none",
            repeat: -1,
          });
        }
      }, rootRef);

      const refresh = window.setTimeout(() => ScrollTrigger.refresh(), 100);
      void document.fonts?.ready.then(() => {
        if (!disposed) ScrollTrigger.refresh();
      });

      cleanup = () => {
        window.clearTimeout(refresh);
        context.revert();
      };
    };

    void setupAnimations();

    return () => {
      disposed = true;
      cleanup?.();
    };
  }, [isLoading]);

  return (
    <div ref={rootRef} className="min-h-screen bg-bg text-text-primary">
      <AnimatePresence>{isLoading && <LoadingScreen onComplete={finishLoading} />}</AnimatePresence>
      <Navbar active={activeSection} />

      <motion.main
        animate={{ opacity: isLoading ? 0 : 1 }}
        initial={{ opacity: 0 }}
        transition={{ duration: 0.65, ease: EASE }}
        aria-hidden={isLoading}
      >
        <section ref={heroRef} id="home" className="relative flex min-h-screen items-center justify-center overflow-hidden">
          {heroVideoReady && (
            <video
              className="absolute left-1/2 top-[40%] h-full min-h-full w-full min-w-full -translate-x-1/2 -translate-y-1/2 scale-120 object-cover"
              src="/videos/fly.mp4"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-hidden="true"
              tabIndex={-1}
            />
          )}

          <div className="absolute inset-0 bg-black/55" aria-hidden="true" />
          <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-bg to-transparent" aria-hidden="true" />

          <div className="translate-y-16 md:translate-y-16 relative z-10 mx-auto flex max-w-5xl flex-col items-center px-6 py-32 text-center">
            <p className="blur-in mb-8 inline-flex items-center justify-center rounded-[18px] border border-white/20 bg-white/2 px-4 py-2.5 text-xs font-medium uppercase tracking-[0.28em] text-white/80 shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_8px_24px_rgba(0,0,0,0.12)] backdrop-blur-sm backdrop-saturate-100">
  Collection &apos;26 </p>
            <h1 className="name-reveal mb-6 font-display text-6xl italic leading-[0.9] tracking-tight text-text-primary sm:text-7xl md:text-8xl lg:text-9xl">
              Erkinbekov Arnoo
            </h1>
            <p className="blur-in mb-5 text-base font-light text-muted md:text-xl">
              A{" "}
              <span key={roleIndex} className="inline-block animate-role-fade-in font-display text-xl italic text-text-primary md:text-2xl">
                {roles[roleIndex]}
              </span>{" "}
              lives in Kyrgyzstan.
            </p>
            <p className="blur-in mb-12 max-w-md text-sm leading-6 text-muted md:text-base md:leading-7">
              Designing seamless digital interactions by focusing on the unique nuances which bring systems to life.
            </p>
            <div className="blur-in flex flex-wrap items-center justify-center gap-4">
              <a className="gradient-btn gradient-btn--solid" href="/Arnoo UXUI Resume.pdf" download="Arnoo UXUI Resume.pdf">
                CV / Resume <span aria-hidden="true">↓</span>
              </a>
              <a className="gradient-btn gradient-btn--outline" href="#contact">
                Reach out... <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>

          <div className="absolute bottom-7 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3" aria-hidden="true">
            <span className="text-[10px] uppercase tracking-[0.2em] text-muted">Scroll</span>
            <span className="relative h-10 w-px overflow-hidden bg-stroke">
              <span className="animate-scroll-down absolute inset-x-0 h-4 bg-text-primary" />
            </span>
          </div>
        </section>

        <section id="work" className="scroll-mt-20 bg-bg py-12 md:py-16">
          <div className="mx-auto max-w-[1200px] px-6 md:px-10 lg:px-16">
            <SectionHeader
              eyebrow="Selected Work"
              title="Featured"
              italic="projects"
              description="A selection of projects I&apos;ve worked on, from concept to launch."
              action="View all work"
            />

            <div className="grid grid-cols-1 gap-5 md:grid-cols-12 md:gap-6">
              {projects.map((project, index) => (
                <motion.article
                  key={project.title}
                  className={"group relative overflow-hidden rounded-3xl border border-stroke bg-surface " + project.span + " " + project.ratio}
                  initial={{ opacity: 0, y: 34 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.08, ease: EASE }}
                  viewport={{ once: true, margin: "-80px" }}
                >
                  <img
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 group-focus-within:scale-105"
                    src={project.src}
                    alt={project.alt}
                    loading="lazy"
                  />
                  <div className="halftone absolute inset-0" aria-hidden="true" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" aria-hidden="true" />
                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6 md:p-7">
                    <div className="transition-opacity duration-300 group-hover:opacity-0 group-focus-within:opacity-0">
                      <p className="text-lg font-medium text-white md:text-xl">{project.title}</p>
                      <p className="mt-1 text-xs uppercase tracking-[0.18em] text-white/55">{project.category}</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="absolute inset-0 flex cursor-pointer items-center justify-center bg-bg/70 opacity-0 backdrop-blur-lg transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100"
                    onClick={() => setLightboxItem(project)}
                    aria-label={"View " + project.title}
                  >
                    <span className="animated-gradient-border rounded-full bg-white px-5 py-3 text-sm text-black shadow-xl">
                      View — <em className="font-display">{project.title}</em>
                    </span>
                  </button>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="scroll-mt-24 overflow-hidden bg-bg py-16 md:py-24">
          <div className="mx-auto max-w-[1200px] px-6 md:px-10 lg:px-16">
            <SectionHeader
              eyebrow="About Me"
              title="Who"
              italic="am I?"
              description="Product designer with a background in communication design, building products and the systems that help them scale."
              action="Let&apos;s talk"
            />

            <div className="grid items-stretch gap-6 lg:grid-cols-[0.92fr_1.08fr] lg:gap-8">

 <motion.figure
  className="about-portrait group relative min-h-[430px] overflow-hidden rounded-3xl border border-stroke bg-surface sm:min-h-[520px]"
  initial={{ opacity: 0, x: -36 }}
  whileInView={{ opacity: 1, x: 0 }}
  whileHover={{ y: -6 }}
  transition={{ duration: 0.9, ease: EASE }}
  viewport={{ once: true, margin: "-80px" }}
>
  <img
    className="absolute inset-0 h-full w-full object-cover object-center transition duration-1000 ease-out group-hover:scale-[1.04] group-hover:saturate-125"
    src="/images/exploration-iridescent-fold.webp"
    alt="Abstract iridescent fabric artwork"
    loading="lazy"
  />

  <div
    className="halftone absolute inset-0 opacity-30"
    aria-hidden="true"
  />
</motion.figure>
              <motion.div
                className="flex flex-col rounded-3xl border border-stroke bg-surface/30 p-6 sm:p-8 lg:p-10"
                initial={{ opacity: 0, x: 36 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.9, delay: 0.08, ease: EASE }}
                viewport={{ once: true, margin: "-80px" }}
              >
                <div className="flex items-center gap-5">
                  <h3 className="shrink-0 text-4xl font-medium tracking-[-0.04em] text-text-primary sm:text-5xl">Arnoo</h3>
                  <span className="h-px flex-1 bg-stroke" aria-hidden="true" />
                </div>
                <p className="mt-7 font-display text-3xl italic leading-[1.05] text-text-primary sm:text-4xl lg:text-[2.75rem]">
                  UX Researcher &amp; Product Designer
                </p>
                <div className="mt-7 space-y-2 text-sm leading-6 text-muted sm:text-base">
                  <p>Focused on context, aesthetics and clarity.</p>
                  <p>Powered by a deep love for design, movement and thoughtful systems.</p>
                </div>
                <blockquote className="about-quote mt-auto pt-9 font-display text-xl leading-[1.35] text-text-primary/85 sm:text-2xl">
                  I also had the opportunity to work with major Kyrgyz businesses & companies.
                </blockquote>
                <ul className="mt-6 flex items-center -space-x-2" aria-label="Selected client collaborations">
                  {aboutPartners.map((partner, index) => (
                    <motion.li
                      key={partner.name}
                      className="relative first:ml-0"
                      aria-label={partner.name}
                      title={partner.name}
                      whileHover={{ y: -5, rotate: index === 1 ? -4 : index === 2 ? 4 : 0, zIndex: 10 }}
                      transition={{ duration: 0.25, ease: EASE }}
                    >
                      <span className="relative flex h-12 w-12 overflow-hidden rounded-full border-2 border-[#2b2e33] bg-[#121417] shadow-lg shadow-black/30 sm:h-14 sm:w-14">
                        <span className="absolute inset-0 grid place-items-center text-[10px] font-semibold uppercase tracking-[-0.03em] text-white/70" aria-hidden="true">
                          {partner.fallback}
                        </span>
                        <img
                          className="relative h-full w-full object-cover"
                          src={partner.logo}
                          alt=""
                          loading="lazy"
                          onError={(event) => {
                            event.currentTarget.style.display = "none";
                          }}
                        />
                      </span>
                    </motion.li>
                  ))}
                </ul>

              </motion.div>
            </div>

            <div className="mt-14 md:mt-20">
              <motion.div
                className="mb-5 flex items-center gap-4"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: EASE }}
                viewport={{ once: true, margin: "-60px" }}
              >
                <span className="h-px w-8 bg-stroke" aria-hidden="true" />
                <h3 className="text-xs uppercase tracking-[0.3em] text-muted">Recent career</h3>
              </motion.div>

              <div className="divide-y divide-stroke border-y border-stroke">
                {career.map((item, index) => (
                  <motion.article
                    key={item.company}
                    className="about-career-row group grid gap-4 py-5 sm:grid-cols-[auto_1fr_auto] sm:items-center sm:gap-6"
                    initial={{ opacity: 0, y: 22 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: index * 0.08, ease: EASE }}
                    viewport={{ once: true, margin: "-60px" }}
                  >
                    <span className="about-mark overflow-hidden" aria-hidden="true"> <img className="h-full w-full object-cover" src={item.icon} alt=""  /></span>
                    <div className="min-w-0">
                      <p className="font-display text-2xl leading-tight text-text-primary sm:text-3xl">
                        {item.company}<span className="text-muted">, {item.role}</span>
                      </p>
                    </div>
                    <p className="pl-[4.75rem] text-sm uppercase tracking-[0.12em] text-muted sm:pl-0 sm:text-right">{item.period}</p>
                  </motion.article>
                ))}
              </div>
            </div>

<div className="mt-14 md:mt-20">
  <motion.div
    className="mb-5 flex items-center gap-4"
    initial={{ opacity: 0, y: 18 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7, ease: EASE }}
    viewport={{ once: true, margin: "-60px" }}
  >
    <span className="h-px w-8 bg-stroke" aria-hidden="true" />
    <h3 className="text-xs uppercase tracking-[0.3em] text-muted">
      Education
    </h3>
  </motion.div>

  <motion.article
    className="about-career-row group grid gap-4 border-y border-stroke py-5 sm:grid-cols-[auto_1fr_auto] sm:items-center sm:gap-6"
    initial={{ opacity: 0, y: 22 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.75, ease: EASE }}
    viewport={{ once: true, margin: "-60px" }}
  >
<span className="about-mark overflow-hidden" aria-hidden="true">
  <img
    className="h-full w-full object-cover"
    src="/icons/google.png"
    alt=""
  />
</span>

    <p className="font-display text-2xl text-text-primary sm:text-3xl">
      Google UX Design Certificate
    </p>

    <p className="pl-[4.75rem] text-sm uppercase tracking-[0.12em] text-muted sm:pl-0 sm:text-right">
      2024
    </p>
  </motion.article>
</div>

            <div className="mt-14 md:mt-20">
              <motion.div
                className="mb-7 flex items-center gap-4"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: EASE }}
                viewport={{ once: true, margin: "-60px" }}
              >
                <span className="h-px w-8 bg-stroke" aria-hidden="true" />
                <h3 className="text-xs uppercase tracking-[0.3em] text-muted">Tools I like to use</h3>
              </motion.div>

              <div className="grid gap-3 sm:grid-cols-2">
                {tools.map((tool, index) => (
                  <motion.article
                    key={tool.name}
                    className="about-tool-card group flex items-center gap-4 rounded-2xl border border-stroke bg-surface/25 p-4 sm:p-5"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.65, delay: (index % 2) * 0.07, ease: EASE }}
                    viewport={{ once: true, margin: "-50px" }}
                  >
                    <span className="about-tool-mark overflow-hidden" aria-hidden="true"> <img className="h-full w-full object-cover" src={tool.icon} alt=""/></span>
                    <div>
                      <p className="font-display text-xl text-text-primary sm:text-2xl">{tool.name}</p>
                      <p className="mt-0.5 text-sm text-muted">{tool.detail}</p>
                    </div>
                  </motion.article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section ref={explorationRef} id="explorations" className="explorations relative min-h-[300vh] overflow-hidden bg-bg">
          <div ref={explorationContentRef} className="relative z-10 flex h-screen items-center justify-center px-6 text-center">
            <div className="max-w-xl">
              <div className="mb-5 flex items-center justify-center gap-3">
                <span className="h-px w-8 bg-stroke" />
                <p className="text-xs uppercase tracking-[0.3em] text-muted">Explorations</p>
                <span className="h-px w-8 bg-stroke" />
              </div>
              <h2 className="text-4xl font-medium tracking-[-0.04em] sm:text-5xl md:text-7xl">
                Visual <em className="font-display font-normal">playground</em>
              </h2>
              <p className="mx-auto mt-5 max-w-md text-sm leading-6 text-muted md:text-base">
                Uncommissioned studies, happy accidents, and ideas made simply to see where they lead.
              </p>
              <a className="gradient-btn gradient-btn--outline mt-8" href="https://www.linkedin.com/in/arnoo-erkinbekov-4bb126301" target="_blank" rel="noreferrer">
                Linkedin <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>

          <div className="pointer-events-none absolute inset-0 z-20 mx-auto grid w-full max-w-[1400px] grid-cols-2 gap-8 px-5 md:gap-40 md:px-12">
            <div data-parallax-column className="flex flex-col items-start gap-[34vh] pt-[38vh] md:pt-[30vh]">
              {explorations.filter((_, index) => index % 2 === 0).map((item) => (
                <button
                  key={item.title}
                  type="button"
                  className="exploration-card pointer-events-auto relative aspect-square w-full max-w-[320px] cursor-zoom-in overflow-hidden rounded-3xl border border-white/10 bg-surface shadow-2xl shadow-black/40"
                  style={{ transform: "rotate(" + item.rotation + "deg)" }}
                  onClick={() => setLightboxItem(item)}
                  aria-label={"Open " + item.title + " in lightbox"}
                >
                  <img className="h-full w-full object-cover transition-transform duration-700 hover:scale-105" src={item.src} alt={item.alt} loading="lazy" />
                  <span className="absolute bottom-3 left-3 rounded-full bg-black/55 px-3 py-1.5 text-[10px] uppercase tracking-[0.16em] text-white backdrop-blur-md">{item.title}</span>
                </button>
              ))}
            </div>
            <div data-parallax-column className="flex flex-col items-end gap-[34vh] pt-[74vh] md:pt-[62vh]">
              {explorations.filter((_, index) => index % 2 === 1).map((item) => (
                <button
                  key={item.title}
                  type="button"
                  className="exploration-card pointer-events-auto relative aspect-square w-full max-w-[320px] cursor-zoom-in overflow-hidden rounded-3xl border border-white/10 bg-surface shadow-2xl shadow-black/40"
                  style={{ transform: "rotate(" + item.rotation + "deg)" }}
                  onClick={() => setLightboxItem(item)}
                  aria-label={"Open " + item.title + " in lightbox"}
                >
                  <img className="h-full w-full object-cover transition-transform duration-700 hover:scale-105" src={item.src} alt={item.alt} loading="lazy" />
                  <span className="absolute bottom-3 left-3 rounded-full bg-black/55 px-3 py-1.5 text-[10px] uppercase tracking-[0.16em] text-white backdrop-blur-md">{item.title}</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section id="resume" className="scroll-mt-24 bg-bg py-16 md:py-24">
          <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-px overflow-hidden rounded-3xl border border-stroke bg-stroke sm:grid-cols-3">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="bg-bg px-6 py-12 text-center md:py-16"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.12, ease: EASE }}
                viewport={{ once: true, margin: "-80px" }}
              >
                <p className="font-display text-6xl italic tracking-tight text-text-primary md:text-7xl lg:text-8xl">{stat.value}</p>
                <p className="mt-4 text-xs uppercase tracking-[0.22em] text-muted">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <footer ref={footerRef} id="contact" className="relative overflow-hidden bg-bg pb-8 pt-16 md:pb-12 md:pt-20">
          {footerVideoReady && (
            <HlsVideo flip className="absolute inset-0 h-full w-full object-cover opacity-75" />
          )}
          <div className="absolute inset-0 bg-black/60" aria-hidden="true" />
          <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-bg to-transparent" aria-hidden="true" />

          <div className="relative z-10 overflow-hidden border-y border-white/10 py-5 md:py-7" aria-hidden="true">
            <div ref={marqueeRef} className="flex w-max whitespace-nowrap will-change-transform">
              {[0, 1].map((group) => (
                <div key={group} className="flex shrink-0">
                  {Array.from({ length: 10 }).map((_, index) => (
                    <span key={index} className="font-display text-5xl italic tracking-tight text-white/85 md:text-7xl lg:text-8xl">
                      Building the future <span className="mx-5 text-[#89AACC]">•</span>
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className="relative z-10 mx-auto flex max-w-[1200px] flex-col items-center px-6 pb-20 pt-24 text-center md:px-10 md:pb-28 md:pt-32">
            <p className="mb-5 text-xs uppercase tracking-[0.3em] text-white/45">Have something in mind?</p>
            <h2 className="max-w-4xl text-5xl font-medium leading-[0.95] tracking-[-0.05em] text-white sm:text-6xl md:text-8xl">
              Let&apos;s make it <em className="font-display font-normal">real.</em>
            </h2>
            <a className="gradient-btn gradient-btn--glass mt-10" href="https://t.me/kruuj" target="_blank" rel="noreferrer">
              Telegram <span aria-hidden="true">➤</span>
            </a>
          </div>

          <div className="relative z-10 mx-auto flex max-w-[1200px] flex-col items-center justify-between gap-6 border-t border-white/10 px-6 pt-8 text-xs text-white/55 sm:flex-row md:px-10">
            <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 sm:justify-start">
              {socialLinks.map((link) => (
                <a key={link.label} className="transition-colors hover:text-white" href={link.href} target="_blank" rel="noreferrer">
                  {link.label}
                </a>
              ))}
            </div>
            <div className="flex items-center gap-2.5 uppercase tracking-[0.16em]">
              <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-50" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
              </span>
              Available for projects
            </div>
          </div>
        </footer>
      </motion.main>

      <Lightbox item={lightboxItem} onClose={() => setLightboxItem(null)} />
    </div>
  );
}

export default Portfolio;
