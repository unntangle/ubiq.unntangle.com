'use client';

import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import {
    Home, Lightbulb, Thermometer, Blinds, Volume2, ShieldCheck,
    Zap, Wifi, Building2, ArrowRight, Check, type LucideIcon,
} from 'lucide-react';
import styles from './UbiqSolutionsPage.module.css';

/* ============================================================
 * uBIQ - Solutions page.
 * Every solution from the nav, grouped, each with its own image,
 * integrated technologies and a UNIQUE motion motif. Section ids
 * match the nav dropdown deep-links (/solutions#<slug>).
 * ============================================================ */

type AnimKey =
    | 'hub' | 'glow' | 'climate' | 'shade' | 'eq'
    | 'scan' | 'energy' | 'wifi' | 'windows';

type Solution = {
    slug: string;
    icon: LucideIcon;
    title: string;
    desc: string;
    img: string;
    features: string[];
    tech: string[];
    anim: AnimKey;
};

type Group = { id: string; name: string; intro: string; solutions: Solution[] };

const groups: Group[] = [
    {
        id: 'living-intelligence',
        name: 'Living Intelligence',
        intro: 'The everyday layer — light, comfort, shade and whole-home automation tuned to how you actually live.',
        solutions: [
            {
                slug: 'smart-home-automation',
                icon: Home,
                title: 'Smart Home Automation',
                desc: 'A complete connected-living ecosystem designed around your lifestyle — every system, from one intuitive experience that anticipates rather than waits.',
                img: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1100&q=72',
                features: ['Unified whole-home control', 'Scene & routine automation', 'Voice, app & touch'],
                tech: ['KNX', 'Crestron', 'Control4', 'Matter'],
                anim: 'hub',
            },
            {
                slug: 'lighting-intelligence',
                icon: Lightbulb,
                title: 'Lighting Intelligence',
                desc: 'Personalised lighting scenes and daylight-aware illumination that shift with the time of day, the room and the moment.',
                img: 'https://images.unsplash.com/photo-1739083168122-f1f59db99e78?auto=format&fit=crop&w=1100&q=72',
                features: ['Circadian & tunable white', 'Scene-based control', 'Daylight harvesting'],
                tech: ['Lutron', 'DALI', 'Philips Hue', 'Casambi'],
                anim: 'glow',
            },
            {
                slug: 'climate-automation',
                icon: Thermometer,
                title: 'Climate Automation',
                desc: 'Adaptive temperature, humidity and air quality that respond to occupancy, weather and routine — comfort that manages itself.',
                img: 'https://images.unsplash.com/photo-1545259741-2ea3ebf61fa3?auto=format&fit=crop&w=1100&q=72',
                features: ['Room-by-room zoning', 'Occupancy-aware comfort', 'Air-quality response'],
                tech: ['Daikin', 'Mitsubishi', 'Nest', 'Ecobee'],
                anim: 'climate',
            },
            {
                slug: 'smart-curtains-shades',
                icon: Blinds,
                title: 'Smart Curtains & Shades',
                desc: 'Automated shading that responds to light, privacy and routine — opening to the morning and settling the space at night.',
                img: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=1100&q=72',
                features: ['Sun-tracking automation', 'Privacy & glare control', 'Whisper-quiet motors'],
                tech: ['Lutron Shades', 'Somfy', 'Zigbee'],
                anim: 'shade',
            },
        ],
    },
    {
        id: 'media-security',
        name: 'Media & Security',
        intro: 'Immersive entertainment and intelligent protection — the experiences and peace of mind that define a space.',
        solutions: [
            {
                slug: 'audio-entertainment',
                icon: Volume2,
                title: 'Audio & Entertainment',
                desc: 'Cinema, multi-room music and immersive entertainment environments that follow you through the space at a single tap or word.',
                img: 'https://images.unsplash.com/photo-1593784991251-92ded75ea290?auto=format&fit=crop&w=1100&q=72',
                features: ['Reference home cinema', 'Multi-room audio', 'Immersive sound design'],
                tech: ['Sonos', 'Dolby Atmos', 'Denon', 'Bowers & Wilkins'],
                anim: 'eq',
            },
            {
                slug: 'security-access',
                icon: ShieldCheck,
                title: 'Security & Access Intelligence',
                desc: 'Connected protection and intelligent access — cameras, locks, intercoms and sensors unified into one calm, watchful view.',
                img: 'https://images.unsplash.com/photo-1633194883650-df448a10d554?auto=format&fit=crop&w=1100&q=72',
                features: ['Unified surveillance', 'Smart access & locks', 'Intelligent alerts'],
                tech: ['Hikvision', 'Axis', 'Yale', 'DoorBird'],
                anim: 'scan',
            },
        ],
    },
    {
        id: 'infrastructure-scale',
        name: 'Infrastructure & Scale',
        intro: 'The backbone — energy, networks and enterprise-grade automation that make everything else dependable.',
        solutions: [
            {
                slug: 'energy-intelligence',
                icon: Zap,
                title: 'Energy Intelligence',
                desc: 'Smart monitoring and optimised consumption across the whole property — cleaner, leaner energy with solar, storage and EV ready.',
                img: 'https://images.unsplash.com/photo-1679356505858-bf4129177392?auto=format&fit=crop&w=1100&q=72',
                features: ['Real-time monitoring', 'Solar & storage ready', 'EV charging integration'],
                tech: ['Smart metering', 'Solar', 'Battery', 'EV charging'],
                anim: 'energy',
            },
            {
                slug: 'networking-connectivity',
                icon: Wifi,
                title: 'Networking & Connectivity',
                desc: 'Reliable, enterprise-grade infrastructure and structured cabling — the quiet backbone every connected device depends on.',
                img: 'https://images.unsplash.com/photo-1530546171585-cc042ea5d7ab?auto=format&fit=crop&w=1100&q=72',
                features: ['Enterprise-grade Wi-Fi', 'Structured cabling', 'Seamless roaming'],
                tech: ['Ubiquiti UniFi', 'Cisco', 'Aruba'],
                anim: 'wifi',
            },
            {
                slug: 'commercial-automation',
                icon: Building2,
                title: 'Commercial Automation',
                desc: 'Future-ready offices, hospitality and enterprise environments — automation that scales across floors, sites and teams.',
                img: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1100&q=72',
                features: ['Scalable building control', 'Workplace & guest experiences', 'Centralised management'],
                tech: ['Crestron', 'KNX', 'Enterprise AV'],
                anim: 'windows',
            },
        ],
    },
];

/* Per-solution animated motif (purely decorative). */
function Motif({ k }: { k: AnimKey }) {
    switch (k) {
        case 'hub':
            return (
                <span className={`${styles.motif} ${styles.mHub}`} aria-hidden="true">
                    <i /><i /><i /><b />
                </span>
            );
        case 'glow':
            return <span className={`${styles.motif} ${styles.mGlow}`} aria-hidden="true" />;
        case 'climate':
            return <span className={`${styles.motif} ${styles.mClimate}`} aria-hidden="true" />;
        case 'shade':
            return <span className={`${styles.motif} ${styles.mShade}`} aria-hidden="true" />;
        case 'eq':
            return (
                <span className={`${styles.motif} ${styles.mEq}`} aria-hidden="true">
                    <i /><i /><i /><i /><i /><i /><i />
                </span>
            );
        case 'scan':
            return <span className={`${styles.motif} ${styles.mScan}`} aria-hidden="true" />;
        case 'energy':
            return (
                <span className={`${styles.motif} ${styles.mEnergy}`} aria-hidden="true">
                    <svg viewBox="0 0 200 200" preserveAspectRatio="xMidYMid meet">
                        <path className={styles.energyTrack} d="M20 150 H80 L100 60 L120 150 H180" />
                        <path className={styles.energyFlow} d="M20 150 H80 L100 60 L120 150 H180" />
                    </svg>
                    <b />
                </span>
            );
        case 'wifi':
            return (
                <span className={`${styles.motif} ${styles.mWifi}`} aria-hidden="true">
                    <i /><i /><i /><b />
                </span>
            );
        case 'windows':
            return (
                <span className={`${styles.motif} ${styles.mWindows}`} aria-hidden="true">
                    {Array.from({ length: 12 }).map((_, i) => <i key={i} />)}
                </span>
            );
        default:
            return null;
    }
}

const REVEAL = { once: true, margin: '-80px 0px' };
const ease = [0.16, 1, 0.3, 1] as const;
const fadeText: Variants = {
    hidden: { opacity: 0, y: 26 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
};
const fadeVisual: Variants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.7, ease } },
};

export default function UbiqSolutionsPage() {
    return (
        <>
            {/* ---------------- HERO ---------------- */}
            <section className={`${styles.section} ${styles.hero}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src="/uBIQ/solutions-hero.webp"
                    alt=""
                    aria-hidden="true"
                    className={styles.heroImage}
                />
                <span className={styles.heroScrim} aria-hidden="true" />

                <div className={styles.heroContent}>
                    <motion.span
                        className={styles.eyebrow}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        Solutions
                    </motion.span>
                    <motion.h1
                        className={styles.heroTitle}
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.08 }}
                    >
                        Intelligent solutions for{' '}
                        <span className={styles.heroAccent}>every part of your space</span>.
                    </motion.h1>
                    <motion.p
                        className={styles.heroLead}
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.16 }}
                    >
                        From lighting and climate to security, energy and enterprise-scale automation —
                        each solution designed, integrated and unified into one intelligent experience.
                    </motion.p>
                </div>
            </section>

            {/* ---------------- GROUPS ---------------- */}
            {groups.map((group, groupIndex) => {
                const groupStartIndex = groups
                    .slice(0, groupIndex)
                    .reduce((total, previousGroup) => total + previousGroup.solutions.length, 0);

                return (
                <section key={group.id} id={group.id} className={styles.group}>
                    <div className={styles.inner}>
                        <motion.div
                            className={styles.groupHead}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={REVEAL}
                            transition={{ duration: 0.6 }}
                        >
                            <span className={styles.groupKicker}>{group.name}</span>
                            <p className={styles.groupIntro}>{group.intro}</p>
                        </motion.div>

                        {group.solutions.map((s, solutionIndex) => {
                            const idx = groupStartIndex + solutionIndex;
                            const Icon = s.icon;
                            const reverse = idx % 2 === 1;
                            return (
                                <div
                                    key={s.slug}
                                    id={s.slug}
                                    className={`${styles.row} ${reverse ? styles.reverse : ''}`}
                                >
                                    <motion.div
                                        className={styles.rowText}
                                        variants={fadeText}
                                        initial="hidden"
                                        whileInView="visible"
                                        viewport={REVEAL}
                                    >
                                        <span className={styles.rowIcon}><Icon size={22} strokeWidth={1.8} /></span>
                                        <span className={styles.rowKicker}>{group.name}</span>
                                        <h2 className={styles.rowTitle}>{s.title}</h2>
                                        <p className={styles.rowDesc}>{s.desc}</p>
                                        <ul className={styles.rowFeatures}>
                                            {s.features.map((f) => (
                                                <li key={f}><Check size={15} strokeWidth={2.4} className={styles.check} />{f}</li>
                                            ))}
                                        </ul>
                                        <div className={styles.rowTech}>
                                            {s.tech.map((t) => <span key={t} className={styles.techTag}>{t}</span>)}
                                        </div>
                                        <Link href="/contact" className={styles.rowCta}>
                                            Plan this solution <ArrowRight size={16} />
                                        </Link>
                                    </motion.div>

                                    <motion.div
                                        className={styles.visual}
                                        variants={fadeVisual}
                                        initial="hidden"
                                        whileInView="visible"
                                        viewport={REVEAL}
                                    >
                                        <span className={styles.visualImg} style={{ backgroundImage: `url(${s.img})` }} />
                                        <Motif k={s.anim} />
                                    </motion.div>
                                </div>
                            );
                        })}
                    </div>
                </section>
                );
            })}

            {/* ---------------- CTA ---------------- */}
            <section className={`${styles.section} ${styles.ctaSection}`}>
                <motion.div
                    className={styles.ctaBand}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={REVEAL}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className={styles.ctaTitle}>Not sure where to start?</h2>
                    <p className={styles.ctaText}>
                        Tell us about your space and we&apos;ll propose a system designed around how
                        you actually live and work — across any mix of these solutions.
                    </p>
                    <div className={styles.ctaActions}>
                        <Link href="/contact" className={styles.ctaPrimary}>Book a consultation <ArrowRight size={16} /></Link>
                        <Link href="/#platforms" className={styles.ctaSecondary}>Explore the ecosystem</Link>
                    </div>
                </motion.div>
            </section>
        </>
    );
}
