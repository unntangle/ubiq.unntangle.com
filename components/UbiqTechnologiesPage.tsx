'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ArrowRight, Check, Cpu, Lightbulb, Mic, Clapperboard,
    ShieldCheck, Network, Thermometer, Leaf, Radio,
    Speaker, Wifi, Share2,
    type LucideIcon,
} from 'lucide-react';
import styles from './UbiqTechnologiesPage.module.css';

/* ============================================================
 * uBIQ — Technologies page.
 * Vendor-independent integrator: lists every technology discipline
 * and the platforms / devices / protocols uBIQ designs with.
 * Brand purple accents, real imagery, animated category cards and
 * a continuous technology marquee.
 * ============================================================ */

const ease = [0.16, 1, 0.3, 1] as const;

function Reveal({ children, delay = 0, className }: { children: React.ReactNode; delay?: number; className?: string }) {
    return (
        <motion.div
            className={className}
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-70px' }}
            transition={{ duration: 0.6, delay, ease }}
        >
            {children}
        </motion.div>
    );
}

type Cat = { icon: LucideIcon; group: string; blurb: string; items: string[] };

const categories: Cat[] = [
    { icon: Cpu, group: 'Automation Platforms', blurb: 'Core control systems that orchestrate every connected device into one experience.', items: ['Crestron', 'Control4', 'KNX', 'Lutron', 'Savant', 'Schneider Electric Wiser', 'Legrand MyHOME', 'ABB i-bus KNX', 'Siemens KNX', 'Gira Smart Home', 'Basalte', 'RTI Control', 'Fibaro'] },
    { icon: Lightbulb, group: 'Lighting Intelligence', blurb: 'Tunable, scene-driven lighting from the leading control ecosystems.', items: ['Lutron HomeWorks', 'DALI Lighting', 'Philips Hue', 'Casambi', 'DMX Lighting Control', 'Human Centric Lighting'] },
    { icon: Mic, group: 'Voice & AI Assistants', blurb: 'Natural voice and AI control across the major assistant platforms.', items: ['Amazon Alexa', 'Google Assistant', 'Apple HomeKit', 'Siri Integration', 'Josh.ai', 'Voice Control Systems'] },
    { icon: Clapperboard, group: 'AV & Entertainment', blurb: 'Reference-grade cinema, audio and multi-room entertainment.', items: ['Dolby Atmos', 'Sony', 'Samsung', 'LG', 'Bose', 'Sonos', 'Bang & Olufsen', 'Bowers & Wilkins', 'KEF', 'Denon', 'Marantz', 'Yamaha', 'McIntosh', 'JBL Synthesis', 'Kaleidescape'] },
    { icon: ShieldCheck, group: 'Security & Surveillance', blurb: 'Connected protection, access and intelligent monitoring.', items: ['Hikvision', 'Axis Communications', 'Bosch Security', 'Honeywell Security', 'Yale Smart Locks', 'DoorBird', 'Video Door Phones', 'Biometric Access'] },
    { icon: Network, group: 'Networking Infrastructure', blurb: 'Enterprise-grade connectivity that powers everything above it.', items: ['Ubiquiti UniFi', 'Cisco', 'Aruba Networks', 'Ruckus Networks', 'TP-Link Omada', 'Enterprise WiFi', 'Structured Cabling'] },
    { icon: Thermometer, group: 'Climate & Comfort', blurb: 'Adaptive HVAC and climate control for effortless comfort.', items: ['Daikin', 'Mitsubishi Electric', 'Honeywell', 'Nest', 'Ecobee', 'HVAC Integration'] },
    { icon: Leaf, group: 'Energy & Sustainability', blurb: 'Monitoring and optimisation for cleaner, leaner energy use.', items: ['Smart Energy Monitoring', 'Solar Integration', 'Battery Storage Integration', 'EV Charging Integration', 'Energy Analytics'] },
    { icon: Radio, group: 'Protocols & Connectivity', blurb: 'The open standards that let every layer talk to each other seamlessly.', items: ['KNX', 'Matter', 'Zigbee', 'Z-Wave', 'Thread', 'Bluetooth Mesh', 'WiFi', 'MQTT', 'IoT Integration'] },
];

const totalTech = categories.reduce((n, c) => n + c.items.length, 0);
const marquee = categories.flatMap((c) => c.items);

/* One representative image per discipline (rendered grayscale for the monochrome look). */
const catImages = [
    'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=640&q=70', // Automation
    'https://images.unsplash.com/photo-1739083168122-f1f59db99e78?auto=format&fit=crop&w=640&q=70', // Lighting
    'https://images.unsplash.com/photo-1512446816042-444d641267d4?auto=format&fit=crop&w=640&q=70', // Voice & AI
    'https://images.unsplash.com/photo-1593784991251-92ded75ea290?auto=format&fit=crop&w=640&q=70', // AV & Entertainment
    'https://images.unsplash.com/photo-1633194883650-df448a10d554?auto=format&fit=crop&w=640&q=70', // Security
    'https://images.unsplash.com/photo-1650682009477-52fd77302b78?auto=format&fit=crop&w=640&q=70', // Networking
    'https://images.unsplash.com/photo-1545259742-b4fd8fea67e4?auto=format&fit=crop&w=640&q=70',   // Climate
    'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=640&q=70', // Energy
    'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=640&q=70',   // Protocols
];

const heroImages = [
    { src: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=900&q=72', alt: 'Smart home control hub' },
    { src: 'https://images.unsplash.com/photo-1650682009477-52fd77302b78?auto=format&fit=crop&w=700&q=72', alt: 'Connected control dashboard' },
    { src: 'https://images.unsplash.com/photo-1633194883650-df448a10d554?auto=format&fit=crop&w=700&q=72', alt: 'Connected security and monitoring' },
];

/* Connection-line endpoints in the 500×500 viz space (center 250,250). */
const lines: [number, number][] = [
    [450, 250], [391, 391], [250, 450], [109, 391],
    [50, 250], [109, 109], [250, 50], [391, 109],
];

/* Interactive discipline explorer — index rail + animated detail panel. */
function CategoryExplorer() {
    const [active, setActive] = useState(0);
    const cat = categories[active];
    const Icon = cat.icon;
    return (
        <div className={styles.explorer}>
            <div className={styles.rail} role="tablist" aria-label="Technology disciplines">
                {categories.map((c, i) => (
                    <button
                        key={c.group}
                        type="button"
                        role="tab"
                        aria-selected={active === i}
                        className={`${styles.railItem} ${active === i ? styles.railItemActive : ''}`}
                        onMouseEnter={() => setActive(i)}
                        onFocus={() => setActive(i)}
                        onClick={() => setActive(i)}
                    >
                        {active === i && (
                            <motion.span layoutId="railBar" className={styles.railBar} transition={{ type: 'spring', stiffness: 420, damping: 34 }} />
                        )}
                        <span className={styles.railIndex}>{String(i + 1).padStart(2, '0')}</span>
                        <span className={styles.railName}>{c.group}</span>
                        <span className={styles.railCount}>{c.items.length}</span>
                    </button>
                ))}
            </div>

            <div className={styles.panel}>
                <div className={styles.panelMain}>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={active}
                            className={styles.panelInner}
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -12 }}
                            transition={{ duration: 0.38, ease }}
                        >
                            <span className={styles.panelKicker}>Discipline {String(active + 1).padStart(2, '0')} / {String(categories.length).padStart(2, '0')}</span>
                            <h3 className={styles.panelName}>{cat.group}</h3>
                            <p className={styles.panelBlurb}>{cat.blurb}</p>
                            <div className={styles.panelChips}>
                                {cat.items.map((it, n) => (
                                    <motion.span
                                        key={it}
                                        className={styles.panelChip}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3, delay: 0.12 + n * 0.025, ease }}
                                    >
                                        {it}
                                    </motion.span>
                                ))}
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                <div className={styles.panelMedia}>
                    <AnimatePresence>
                        <motion.div
                            key={active}
                            className={styles.panelMediaImg}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.6, ease }}
                        >
                            <Image src={catImages[active]} alt={cat.group} fill sizes="320px" className={styles.mediaImg} unoptimized />
                        </motion.div>
                    </AnimatePresence>
                    <span className={styles.mediaOverlay} aria-hidden="true" />
                    <span className={styles.mediaIcon}><Icon size={22} strokeWidth={1.8} /></span>
                    <span className={styles.mediaCount}>{cat.items.length} integrations</span>
                </div>
            </div>
        </div>
    );
}

export default function UbiqTechnologiesPage() {
    return (
        <div className={styles.page}>
            {/* ---------------- HERO ---------------- */}
            <section className={`${styles.section} ${styles.hero}`}>
                <div className={styles.heroGlow} aria-hidden="true" />
                <div className={styles.heroGrid} aria-hidden="true" />
                <div className={`${styles.inner} ${styles.heroInner}`}>
                    <div className={styles.heroCopy}>
                        <Reveal><span className={styles.eyebrow}>Technology Ecosystem</span></Reveal>
                        <Reveal delay={0.05}>
                            <h1 className={styles.h1}>
                                The world&apos;s best technologies, <span className={styles.accent}>woven into one.</span>
                            </h1>
                        </Reveal>
                        <Reveal delay={0.12}>
                            <p className={styles.lead}>
                                uBIQ is a vendor-independent integrator. We design with and unify {totalTech}+ leading
                                platforms, devices and protocols across {categories.length} disciplines into a single
                                intelligent experience.
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
                                <div className={styles.stat}><span className={styles.statNum}>{categories.length}</span><span className={styles.statLabel}>disciplines</span></div>
                                <div className={styles.stat}><span className={styles.statNum}>{totalTech}+</span><span className={styles.statLabel}>technologies</span></div>
                                <div className={styles.stat}><span className={styles.statNum}>100%</span><span className={styles.statLabel}>vendor-independent</span></div>
                            </div>
                        </Reveal>
                    </div>

                    <Reveal delay={0.15} className={styles.heroMedia}>
                        <div className={styles.viz}>
                            <div className={styles.vizGlow} aria-hidden="true" />

                            {/* rotating orbit rings */}
                            <div className={`${styles.ring} ${styles.ringOuter}`} aria-hidden="true" />
                            <div className={`${styles.ring} ${styles.ringInner}`} aria-hidden="true" />

                            {/* converging connection lines */}
                            <svg className={styles.lines} viewBox="0 0 500 500" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
                                {lines.map((p, i) => (
                                    <line key={i} x1="250" y1="250" x2={p[0]} y2={p[1]} className={styles.line} style={{ animationDelay: `${i * 0.32}s` }} />
                                ))}
                            </svg>

                            {/* glowing core */}
                            <div className={styles.corePulse} aria-hidden="true" />
                            <div className={styles.corePulse2} aria-hidden="true" />
                            <div className={styles.core}>
                                <Image src={heroImages[0].src} alt={heroImages[0].alt} fill sizes="180px" className={styles.img} unoptimized />
                                <span className={styles.coreTint} aria-hidden="true" />
                                <span className={styles.coreTag}>uBIQ</span>
                            </div>

                            {/* orbiting technology nodes */}
                            <div className={`${styles.node} ${styles.n1}`}><span className={styles.nodePill}><Radio size={14} strokeWidth={2} />KNX</span></div>
                            <div className={`${styles.node} ${styles.n2}`}><span className={styles.nodeImg}><Image src={heroImages[1].src} alt={heroImages[1].alt} fill sizes="80px" className={styles.img} unoptimized /></span></div>
                            <div className={`${styles.node} ${styles.n3}`}><span className={styles.nodePill}><Speaker size={14} strokeWidth={2} />Sonos</span></div>
                            <div className={`${styles.node} ${styles.n4}`}><span className={styles.nodePill}><Lightbulb size={14} strokeWidth={2} />Lutron</span></div>
                            <div className={`${styles.node} ${styles.n5}`}><span className={styles.nodePill}><Wifi size={14} strokeWidth={2} />UniFi</span></div>
                            <div className={`${styles.node} ${styles.n6}`}><span className={styles.nodeImg}><Image src={heroImages[2].src} alt={heroImages[2].alt} fill sizes="80px" className={styles.img} unoptimized /></span></div>
                            <div className={`${styles.node} ${styles.n7}`}><span className={styles.nodePill}><Share2 size={14} strokeWidth={2} />Matter</span></div>
                            <div className={`${styles.node} ${styles.n8}`}><span className={styles.nodePill}><Cpu size={14} strokeWidth={2} />Crestron</span></div>

                            {/* drifting accent dots */}
                            <span className={`${styles.dot} ${styles.dot1}`} aria-hidden="true" />
                            <span className={`${styles.dot} ${styles.dot2}`} aria-hidden="true" />
                            <span className={`${styles.dot} ${styles.dot3}`} aria-hidden="true" />

                            {/* floating count chip */}
                            <span className={styles.vizChip}><span className={styles.vizChipDot} />{totalTech}+ integrations</span>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* ---------------- MARQUEE ---------------- */}
            <div className={styles.marquee} aria-hidden="true">
                <div className={styles.marqueeTrack}>
                    {[...marquee, ...marquee].map((m, i) => (
                        <span key={i} className={styles.marqueeItem}>{m}<span className={styles.marqueeDot} /></span>
                    ))}
                </div>
            </div>

            {/* ---------------- STATEMENT ---------------- */}
            <section className={`${styles.section} ${styles.statementSection}`}>
                <div className={styles.inner}>
                    <Reveal>
                        <p className={styles.statement}>
                            We don&apos;t sell boxes. We choose the right system for each space and make them work as one
                            — KNX, Matter, Crestron, Lutron and dozens more, orchestrated by the uBIQ intelligence layer.
                        </p>
                    </Reveal>
                </div>
            </section>

            {/* ---------------- CATEGORIES ---------------- */}
            <section className={`${styles.section} ${styles.cats}`}>
                <div className={styles.inner}>
                    <Reveal>
                        <div className={styles.head}>
                            <span className={styles.tag}>What we integrate</span>
                            <h2 className={styles.h2}>Every layer of the connected space.</h2>
                        </div>
                    </Reveal>
                    <Reveal delay={0.1}>
                        <CategoryExplorer />
                    </Reveal>
                </div>
            </section>

            {/* ---------------- VENDOR-INDEPENDENT NOTE ---------------- */}
            <section className={`${styles.section} ${styles.note}`}>
                <div className={styles.noteGlow} aria-hidden="true" />
                <div className={styles.inner}>
                    <Reveal>
                        <div className={styles.noteInner}>
                            <span className={`${styles.tag} ${styles.tagLight}`}>Vendor-independent</span>
                            <h2 className={styles.h2Light}>Not a reseller. Not a manufacturer.</h2>
                            <p className={styles.noteText}>
                                uBIQ designs with and integrates these technologies on behalf of our clients — free to
                                choose the best system for every space, never locked to a single brand. Don&apos;t see
                                your platform? We add new integrations on request.
                            </p>
                            <div className={styles.noteChecks}>
                                {['Best-fit systems per space', 'No brand lock-in', 'New integrations on request'].map((p) => (
                                    <span key={p} className={styles.noteCheck}><Check size={15} strokeWidth={2.6} />{p}</span>
                                ))}
                            </div>
                            <Link href="/contact" className={styles.noteCta}>Talk to us <ArrowRight size={16} /></Link>
                        </div>
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
                                <h2 className={styles.ctaTitle}>Let&apos;s build your <span className={styles.accent}>intelligent space.</span></h2>
                                <p className={styles.ctaText}>
                                    Tell us what you have or what you&apos;re planning — we&apos;ll design the right blend of
                                    technologies and unify them into one seamless experience.
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
