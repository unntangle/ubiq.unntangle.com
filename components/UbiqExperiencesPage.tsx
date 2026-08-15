'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ArrowRight, Home, Building2, Hotel, Sparkles, Castle,
    Briefcase, Presentation, MapPin, Quote,
    type LucideIcon,
} from 'lucide-react';
import styles from './UbiqExperiencesPage.module.css';

/* ============================================================
 * uBIQ — Experiences page.
 * Intelligent environments shaped to how people live, work and host.
 * Residential + Commercial & Hospitality experiences, with animated
 * showcase imagery (fresh Unsplash photography, unique to this page).
 * ============================================================ */

const ease = [0.16, 1, 0.3, 1] as const;

function Reveal({ children, delay = 0, className }: { children: React.ReactNode; delay?: number; className?: string }) {
    return (
        <motion.div
            className={className}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-70px' }}
            transition={{ duration: 0.6, delay, ease }}
        >
            {children}
        </motion.div>
    );
}

type Experience = {
    icon: LucideIcon;
    family: 'Residential' | 'Commercial & Hospitality';
    title: string;
    tagline: string;
    desc: string;
    img: string;
    highlights: string[];
};

const experiences: Experience[] = [
    {
        icon: Home, family: 'Residential', title: 'Luxury Homes', tagline: 'Whole-home intelligence',
        desc: 'Lighting, climate, shading, audio and security unified into one beautifully simple experience that anticipates how you live.',
        img: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&w=1100&q=72',
        highlights: ['Unified single-touch control', 'Scenes for every moment', 'Discreet architectural integration'],
    },
    {
        icon: Castle, family: 'Residential', title: 'Premium Villas', tagline: 'Estate-scale automation',
        desc: 'Effortless control across sprawling grounds — from gates and pools to multi-wing climate and cinema, all from one interface.',
        img: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1100&q=72',
        highlights: ['Multi-zone orchestration', 'Outdoor & landscape control', 'Guest & staff access modes'],
    },
    {
        icon: Building2, family: 'Residential', title: 'Smart Apartments', tagline: 'Connected living, per unit',
        desc: 'Premium automation scaled across residences — repeatable, reliable and developer-ready, with a refined resident experience.',
        img: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1100&q=72',
        highlights: ['Repeatable unit templates', 'Resident mobile app', 'Building-wide management'],
    },
    {
        icon: Briefcase, family: 'Commercial & Hospitality', title: 'Future-ready Offices', tagline: 'Productive workplaces',
        desc: 'Adaptive lighting, climate and AV that respond to occupancy and schedule — efficient spaces that help people do their best work.',
        img: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1100&q=72',
        highlights: ['Occupancy-aware automation', 'One-tap meeting rooms', 'Energy & usage analytics'],
    },
    {
        icon: Hotel, family: 'Commercial & Hospitality', title: 'Hotels & Hospitality', tagline: 'Guest experiences that delight',
        desc: 'Rooms that greet guests by name, set the mood and remember preferences — hospitality that feels personal and effortless.',
        img: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1100&q=72',
        highlights: ['Personalised room scenes', 'In-room voice & tablet control', 'Back-of-house efficiency'],
    },
    {
        icon: Presentation, family: 'Commercial & Hospitality', title: 'Experience Centres', tagline: 'Immersive showcases',
        desc: 'Interactive, sensor-driven environments that captivate visitors and tell your brand story through light, sound and motion.',
        img: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1100&q=72',
        highlights: ['Sensor-triggered storytelling', 'Synchronised AV & lighting', 'Memorable brand moments'],
    },
];

const families = ['All', 'Residential', 'Commercial & Hospitality'] as const;
type Family = (typeof families)[number];

const heroImages = [
    { src: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=72', alt: 'Modern living space' },
    { src: 'https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=700&q=72', alt: 'Bright connected interior' },
    { src: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=700&q=72', alt: 'Hospitality suite' },
];

const stats = [
    { num: '6', label: 'experience types' },
    { num: '2,500+', label: 'spaces shaped' },
    { num: '1', label: 'seamless interface' },
];

const journey = [
    { n: '01', title: 'Discover', desc: 'We learn how you live, work or host — your routines, spaces and ambitions.' },
    { n: '02', title: 'Design', desc: 'A tailored blueprint of scenes, zones and technologies, mapped to your space.' },
    { n: '03', title: 'Integrate', desc: 'Best-fit systems installed and unified by the uBIQ intelligence layer.' },
    { n: '04', title: 'Evolve', desc: 'Continuous tuning and Care+ support so the experience improves over time.' },
];

function ExperienceCard({ exp, index }: { exp: Experience; index: number }) {
    const Icon = exp.icon;
    const flip = index % 2 === 1;
    return (
        <Reveal>
            <div className={`${styles.showcase} ${flip ? styles.showcaseFlip : ''}`}>
                <div className={styles.showcaseMedia}>
                    <Image src={exp.img} alt={exp.title} fill sizes="(max-width: 900px) 100vw, 50vw" className={styles.showcaseImg} unoptimized />
                    <span className={styles.showcaseFamily}>{exp.family}</span>
                </div>
                <div className={styles.showcaseBody}>
                    <span className={styles.showcaseIcon}><Icon size={24} strokeWidth={1.7} /></span>
                    <span className={styles.showcaseTagline}>{exp.tagline}</span>
                    <h3 className={styles.showcaseTitle}>{exp.title}</h3>
                    <p className={styles.showcaseDesc}>{exp.desc}</p>
                    <ul className={styles.showcaseList}>
                        {exp.highlights.map((h) => (
                            <li key={h} className={styles.showcaseItem}><Sparkles size={15} strokeWidth={2} />{h}</li>
                        ))}
                    </ul>
                    <Link href="/contact" className={styles.showcaseLink}>Book this experience <ArrowRight size={15} /></Link>
                </div>
            </div>
        </Reveal>
    );
}

export default function UbiqExperiencesPage() {
    const [filter, setFilter] = useState<Family>('All');
    const shown = experiences.filter((e) => filter === 'All' || e.family === filter);

    return (
        <div className={styles.page}>
            {/* ---------------- HERO ---------------- */}
            <section className={`${styles.section} ${styles.hero}`}>
                <div className={styles.heroGlow} aria-hidden="true" />
                <div className={styles.heroGrid} aria-hidden="true" />
                <div className={`${styles.inner} ${styles.heroInner}`}>
                    <div className={styles.heroCopy}>
                        <Reveal><span className={styles.eyebrow}>Experiences</span></Reveal>
                        <Reveal delay={0.05}>
                            <h1 className={styles.h1}>Designed for every <span className={styles.accent}>space you live in.</span></h1>
                        </Reveal>
                        <Reveal delay={0.12}>
                            <p className={styles.lead}>
                                From private homes to hotels and workplaces, uBIQ shapes intelligent environments around how
                                people live, work and host — beautiful, intuitive and entirely unified.
                            </p>
                        </Reveal>
                        <Reveal delay={0.18}>
                            <div className={styles.actions}>
                                <Link href="/contact" className={styles.primary}>Book Experience <ArrowRight size={16} /></Link>
                                <Link href="/solutions" className={styles.secondary}>Explore solutions</Link>
                            </div>
                        </Reveal>
                        <Reveal delay={0.24}>
                            <div className={styles.heroStats}>
                                {stats.map((s) => (
                                    <div key={s.label} className={styles.stat}>
                                        <span className={styles.statNum}>{s.num}</span>
                                        <span className={styles.statLabel}>{s.label}</span>
                                    </div>
                                ))}
                            </div>
                        </Reveal>
                    </div>

                    <Reveal delay={0.15} className={styles.heroMedia}>
                        <div className={styles.bento}>
                            <div className={`${styles.bentoImg} ${styles.bentoMain}`}>
                                <Image src={heroImages[0].src} alt={heroImages[0].alt} fill sizes="(max-width: 900px) 100vw, 38vw" className={styles.img} unoptimized />
                            </div>
                            <div className={`${styles.bentoImg} ${styles.bentoB}`}>
                                <Image src={heroImages[1].src} alt={heroImages[1].alt} fill sizes="(max-width: 900px) 50vw, 19vw" className={styles.img} unoptimized />
                            </div>
                            <div className={`${styles.bentoImg} ${styles.bentoC}`}>
                                <Image src={heroImages[2].src} alt={heroImages[2].alt} fill sizes="(max-width: 900px) 50vw, 19vw" className={styles.img} unoptimized />
                            </div>
                            <span className={styles.bentoChip}><MapPin size={14} />Homes · Hotels · Offices</span>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* ---------------- STATEMENT ---------------- */}
            <section className={`${styles.section} ${styles.statementSection}`}>
                <div className={styles.inner}>
                    <Reveal>
                        <p className={styles.statement}>
                            Technology should disappear into the experience. We design spaces that simply
                            <span className={styles.accentSoft}> understand the people inside them</span> — and respond.
                        </p>
                    </Reveal>
                </div>
            </section>

            {/* ---------------- SHOWCASES (filterable) ---------------- */}
            <section className={`${styles.section} ${styles.spaces}`}>
                <div className={styles.inner}>
                    <Reveal>
                        <div className={styles.head}>
                            <span className={styles.tag}>Where we work</span>
                            <h2 className={styles.h2}>Every kind of space, intelligently alive.</h2>
                        </div>
                    </Reveal>

                    <Reveal delay={0.06}>
                        <div className={styles.filters} role="tablist" aria-label="Filter experiences">
                            {families.map((f) => (
                                <button
                                    key={f}
                                    type="button"
                                    role="tab"
                                    aria-selected={filter === f}
                                    className={`${styles.filter} ${filter === f ? styles.filterActive : ''}`}
                                    onClick={() => setFilter(f)}
                                >
                                    {filter === f && <motion.span layoutId="filterPill" className={styles.filterPill} transition={{ type: 'spring', stiffness: 420, damping: 34 }} />}
                                    <span className={styles.filterLabel}>{f}</span>
                                </button>
                            ))}
                        </div>
                    </Reveal>

                    <motion.div layout className={styles.showcaseList2}>
                        <AnimatePresence mode="popLayout">
                            {shown.map((exp, i) => (
                                <motion.div
                                    key={exp.title}
                                    layout
                                    initial={{ opacity: 0, y: 24 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -16 }}
                                    transition={{ duration: 0.4, ease }}
                                >
                                    <ExperienceCard exp={exp} index={i} />
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </section>

            {/* ---------------- JOURNEY ---------------- */}
            <section className={`${styles.section} ${styles.journey}`}>
                <div className={styles.journeyGlow} aria-hidden="true" />
                <div className={styles.inner}>
                    <Reveal>
                        <div className={styles.head}>
                            <span className={`${styles.tag} ${styles.tagLight}`}>How it comes together</span>
                            <h2 className={styles.h2Light}>From first conversation to a living space.</h2>
                        </div>
                    </Reveal>
                    <div className={styles.journeyGrid}>
                        {journey.map((j, i) => (
                            <Reveal key={j.n} delay={i * 0.08}>
                                <div className={styles.journeyCard}>
                                    <span className={styles.journeyNum}>{j.n}</span>
                                    <h3 className={styles.journeyTitle}>{j.title}</h3>
                                    <p className={styles.journeyDesc}>{j.desc}</p>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ---------------- QUOTE ---------------- */}
            <section className={`${styles.section} ${styles.quoteSection}`}>
                <div className={styles.inner}>
                    <Reveal>
                        <figure className={styles.quoteFig}>
                            <Quote className={styles.quoteMark} size={48} strokeWidth={1.5} aria-hidden="true" />
                            <blockquote className={styles.quote}>
                                The space just knows. Lights, music, climate — it all happens before we think to ask.
                                It stopped feeling like technology and started feeling like home.
                            </blockquote>
                            <figcaption className={styles.quoteBy}>A uBIQ residence owner</figcaption>
                        </figure>
                    </Reveal>
                </div>
            </section>

            {/* ---------------- CTA ---------------- */}
            <section className={`${styles.section} ${styles.ctaSection}`}>
                <div className={styles.inner}>
                    <Reveal>
                        <div className={styles.ctaBand}>
                            <div className={styles.ctaGlow} aria-hidden="true" />
                            <div className={styles.ctaContent}>
                                <h2 className={styles.ctaTitle}>Imagine your space, <span className={styles.accent}>intelligently alive.</span></h2>
                                <p className={styles.ctaText}>
                                    Tell us about the space you live in, work in or host in — we&apos;ll design an experience
                                    shaped entirely around it.
                                </p>
                                <div className={styles.actions}>
                                    <Link href="/contact" className={styles.primary}>Book Experience <ArrowRight size={16} /></Link>
                                    <Link href="/" className={styles.secondary}>Back to uBIQ</Link>
                                </div>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </section>
        </div>
    );
}
