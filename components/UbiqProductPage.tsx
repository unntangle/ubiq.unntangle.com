'use client';

import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import {
    ArrowRight, Check,
    Brain, Radar, Sparkles, SlidersHorizontal,
    Box, MousePointerClick, Compass, LayoutGrid,
    Activity, Wrench, Gauge, Headset,
    BrainCircuit, HeartPulse,
    type LucideIcon,
} from 'lucide-react';
import styles from './UbiqProductPage.module.css';

/* ============================================================
 * uBIQ — dedicated product page (Senz · Twin · Care+).
 *
 * One theme-able component drives all three pages. Each product
 * carries its own accent colour + a signature animated visual tied
 * to what it does:
 *   Senz  — a radar "intelligence core" that senses & learns
 *   Twin  — a live isometric 3D space with rooms lighting up
 *   Care+ — animated health gauges + a heartbeat monitor
 * Brand-consistent, restrained, real imagery.
 * ============================================================ */

export type ProductKey = 'senz' | 'twin' | 'care';

const ease = [0.16, 1, 0.3, 1] as const;

function Reveal({ children, delay = 0, className }: { children: React.ReactNode; delay?: number; className?: string }) {
    return (
        <motion.div
            className={className}
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-70px' }}
            transition={{ duration: 0.65, delay, ease }}
        >
            {children}
        </motion.div>
    );
}

/* ============================================================
 * SIGNATURE VISUALS
 * ============================================================ */

/* Senz — isometric living room being sensed */
function SenzRoom() {
    const O: [number, number] = [218, 150];
    const U = 26, V = 13, W = 22;
    const iso = (x: number, y: number, z = 0): [number, number] => [O[0] + U * x - U * y, O[1] + V * x + V * y - W * z];
    const pts = (a: [number, number][]) => a.map((p) => `${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ');
    const box = (x0: number, y0: number, x1: number, y1: number, z0: number, z1: number, top: string, left: string, right: string) => (
        <>
            <polygon points={pts([iso(x0, y0, z1), iso(x1, y0, z1), iso(x1, y1, z1), iso(x0, y1, z1)])} fill={top} />
            <polygon points={pts([iso(x0, y1, z0), iso(x1, y1, z0), iso(x1, y1, z1), iso(x0, y1, z1)])} fill={left} />
            <polygon points={pts([iso(x1, y0, z0), iso(x1, y1, z0), iso(x1, y1, z1), iso(x1, y0, z1)])} fill={right} />
        </>
    );
    const head = iso(3.9, 1.45, 1.0);
    const lampTop = iso(5.08, 3.58, 1.7);
    const ripC = iso(3.2, 2.7, 0.02);
    const sensorC = iso(2.2, 2.2, 3.2);
    const leafC = iso(1.1, 4.35, 0.65);

    return (
        <div className={`${styles.sigWrap} ${styles.roomSig}`}>
            <div className={styles.roomScene}>
                <svg viewBox="0 0 440 348" className={styles.roomSvg} role="img" aria-label="An isometric living room being sensed">
                    <defs>
                        <linearGradient id="senzSky" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0" stopColor="#d6ecff" />
                            <stop offset="1" stopColor="#eef7ff" />
                        </linearGradient>
                    </defs>

                    {/* floor + walls */}
                    <polygon points={pts([iso(0, 0), iso(6, 0), iso(6, 6), iso(0, 6)])} fill="#eef3fb" />
                    <polygon points={pts([iso(0, 0, 0), iso(6, 0, 0), iso(6, 0, 3), iso(0, 0, 3)])} fill="#dde6f3" />
                    <polygon points={pts([iso(0, 0, 0), iso(0, 6, 0), iso(0, 6, 3), iso(0, 0, 3)])} fill="#e7eef9" />

                    {/* window on left wall */}
                    <polygon points={pts([iso(0, 1.4, 0.8), iso(0, 3.9, 0.8), iso(0, 3.9, 2.5), iso(0, 1.4, 2.5)])} fill="#ffffff" />
                    <polygon points={pts([iso(0, 1.6, 1.0), iso(0, 3.7, 1.0), iso(0, 3.7, 2.3), iso(0, 1.6, 2.3)])} fill="url(#senzSky)" />
                    <polygon points={pts([iso(0, 2.6, 1.0), iso(0, 2.72, 1.0), iso(0, 2.72, 2.3), iso(0, 2.6, 2.3)])} fill="#ffffff" />
                    <polygon points={pts([iso(0, 1.6, 1.62), iso(0, 3.7, 1.62), iso(0, 3.7, 1.74), iso(0, 1.6, 1.74)])} fill="#ffffff" />

                    {/* art on right wall */}
                    <polygon points={pts([iso(3.3, 0, 1.2), iso(4.8, 0, 1.2), iso(4.8, 0, 2.5), iso(3.3, 0, 2.5)])} fill="#ffffff" />
                    <polygon points={pts([iso(3.45, 0, 1.35), iso(4.65, 0, 1.35), iso(4.65, 0, 2.35), iso(3.45, 0, 2.35)])} fill="var(--accentSoft)" />

                    {/* rug */}
                    <polygon points={pts([iso(1.1, 1.7), iso(4.9, 1.7), iso(4.9, 4.9), iso(1.1, 4.9)])} fill="var(--accentSoft)" />

                    {/* sofa: back, seat, arms */}
                    {box(2.6, 0.6, 5.2, 1.05, 0.45, 1.35, '#c6d2e7', '#aebbd5', '#9eadc9')}
                    {box(2.6, 0.6, 5.2, 2.25, 0, 0.5, '#d2ddef', '#bcc9e0', '#aab9d2')}
                    {box(2.6, 0.6, 3.0, 2.25, 0.5, 1.0, '#cad6ea', '#b4c2da', '#a4b3cd')}
                    {box(4.8, 0.6, 5.2, 2.25, 0.5, 1.0, '#cad6ea', '#b4c2da', '#a4b3cd')}

                    {/* person sitting */}
                    <rect x={head[0] - 15} y={head[1] + 2} width="30" height="30" rx="13" fill="var(--accent)" />
                    <circle cx={head[0]} cy={head[1] - 4} r="12" fill="#e7b48f" />

                    {/* coffee table */}
                    {box(2.9, 2.9, 4.5, 4.1, 0, 0.32, '#dcc7a0', '#c7ad80', '#b89a6c')}

                    {/* plant */}
                    {box(0.7, 4.0, 1.5, 4.8, 0, 0.55, '#e0a771', '#cf9560', '#bd8552')}
                    <ellipse cx={leafC[0] - 7} cy={leafC[1] - 17} rx="7" ry="15" fill="#3bb079" transform={`rotate(-22 ${leafC[0] - 7} ${leafC[1] - 17})`} />
                    <ellipse cx={leafC[0] + 7} cy={leafC[1] - 17} rx="7" ry="15" fill="#57c98c" transform={`rotate(22 ${leafC[0] + 7} ${leafC[1] - 17})`} />
                    <ellipse cx={leafC[0]} cy={leafC[1] - 23} rx="6" ry="16" fill="#46bd82" />

                    {/* floor lamp */}
                    <circle className={styles.lampHalo} cx={lampTop[0]} cy={lampTop[1] - 6} r="28" fill="#ffd166" />
                    {box(5.0, 3.5, 5.16, 3.66, 0, 1.7, '#9aa3b0', '#878f9c', '#767e8a')}
                    {box(4.78, 3.28, 5.4, 3.9, 1.5, 1.92, '#ffe6ad', '#f4d489', '#e7c578')}

                    {/* motion-sensing ripples on the floor */}
                    <ellipse className={`${styles.svgRipple} ${styles.svgRipple1}`} cx={ripC[0]} cy={ripC[1]} rx="26" ry="13" fill="none" stroke="var(--accent)" strokeWidth="2" />
                    <ellipse className={`${styles.svgRipple} ${styles.svgRipple2}`} cx={ripC[0]} cy={ripC[1]} rx="26" ry="13" fill="none" stroke="var(--accent)" strokeWidth="2" />
                    <ellipse className={`${styles.svgRipple} ${styles.svgRipple3}`} cx={ripC[0]} cy={ripC[1]} rx="26" ry="13" fill="none" stroke="var(--accent)" strokeWidth="2" />

                    {/* ceiling sensor */}
                    <rect x={sensorC[0] - 12} y={sensorC[1] - 5} width="24" height="9" rx="4" fill="var(--accent)" />
                    <circle cx={sensorC[0]} cy={sensorC[1]} r="3" fill="#fff" />
                </svg>
            </div>
            <span className={`${styles.roomChip} ${styles.roomChipA}`}><span className={styles.roomChipDot} />Living room · occupied</span>
            <span className={`${styles.roomChip} ${styles.roomChipB}`}>Motion sensed</span>
            <span className={`${styles.roomChip} ${styles.roomChipC}`}>Adapting lighting</span>
        </div>
    );
}

/* Twin — live isometric space */
function TwinSpace() {
    const rooms = [0, 1, 2, 3, 4, 5];
    const active = [0, 2, 5];
    return (
        <div className={styles.sigWrap}>
            <div className={styles.twinScene}>
                <div className={styles.twinPlane}>
                    {rooms.map((r) => (
                        <span
                            key={r}
                            className={`${styles.twinRoom} ${active.includes(r) ? styles.twinRoomOn : ''}`}
                            style={{ animationDelay: `${r * 0.45}s` }}
                        />
                    ))}
                </div>
            </div>
            <span className={`${styles.twinChip} ${styles.twinChip1}`}>Living · 22°</span>
            <span className={`${styles.twinChip} ${styles.twinChip2}`}>Lights · 40%</span>
            <span className={`${styles.twinChip} ${styles.twinChip3}`}>All secured</span>
        </div>
    );
}

/* Care+ — health gauges + heartbeat */
function Gauge2({ value, label, suffix }: { value: number; label: string; suffix: string }) {
    const ref = useRef<SVGCircleElement>(null);
    const inView = useInView(ref, { once: true, margin: '-40px' });
    const R = 32;
    const C = 2 * Math.PI * R;
    const offset = C * (1 - value / 100);
    return (
        <div className={styles.gauge}>
            <svg viewBox="0 0 80 80" className={styles.gaugeSvg}>
                <circle cx="40" cy="40" r={R} className={styles.gaugeTrack} />
                <motion.circle
                    ref={ref}
                    cx="40" cy="40" r={R}
                    className={styles.gaugeFill}
                    strokeDasharray={C}
                    initial={{ strokeDashoffset: C }}
                    animate={inView ? { strokeDashoffset: offset } : {}}
                    transition={{ duration: 1.3, ease }}
                />
            </svg>
            <span className={styles.gaugeVal}>{value}{suffix}</span>
            <span className={styles.gaugeLabel}>{label}</span>
        </div>
    );
}

function CareMonitor() {
    return (
        <div className={styles.sigWrap}>
            <div className={styles.carePanel}>
                <div className={styles.careTop}>
                    <span className={styles.careStatus}>
                        <span className={styles.careStatusDot} />
                        All systems healthy
                    </span>
                    <span className={styles.careLive}>live</span>
                </div>
                <div className={styles.careGauges}>
                    <Gauge2 value={98} label="Devices" suffix="%" />
                    <Gauge2 value={86} label="Energy" suffix="%" />
                    <Gauge2 value={99} label="Uptime" suffix=".9%" />
                </div>
                <div className={styles.careEkgWrap}>
                    <svg viewBox="0 0 320 60" preserveAspectRatio="none" className={styles.careEkg} aria-hidden="true">
                        <path d="M0 30 H70 L82 30 L90 12 L100 48 L110 30 L122 30 L150 30 L162 30 L170 16 L180 44 L190 30 H260 L272 30 L280 20 L288 40 L296 30 H320" className={styles.careEkgLine} />
                    </svg>
                </div>
            </div>
        </div>
    );
}

function Signature({ k }: { k: ProductKey }) {
    if (k === 'senz') return <SenzRoom />;
    if (k === 'twin') return <TwinSpace />;
    return <CareMonitor />;
}

/* ============================================================
 * PRODUCT CONFIG
 * ============================================================ */
type Feature = { icon: LucideIcon; title: string; text: string };
type Step = { n: string; t: string };
type Showcase = { img: string; alt: string; kicker: string; title: string; text: string; points: string[] };
type Stat = { v: string; l: string };
type Product = {
    key: ProductKey;
    mark: string;
    eyebrow: string;
    accent: string; grad: string; soft: string; tint: string;
    titleLead: string; titleAccent: string;
    lead: string;
    heroSpecs: string[];
    statement: string;
    features: Feature[];
    steps: Step[];
    showcase: Showcase[];
    stats: Stat[];
};

const PRODUCTS: Record<ProductKey, Product> = {
    senz: {
        key: 'senz',
        mark: 'Senz',
        eyebrow: 'Adaptive Intelligence Layer',
        accent: '#2f7df6',
        grad: 'linear-gradient(120deg, #2f7df6 0%, #22c7e0 100%)',
        soft: 'rgba(47, 125, 246, 0.12)',
        tint: '#f1f7ff',
        titleLead: 'The brain that ',
        titleAccent: 'learns how you live.',
        lead: 'Senz is uBIQ\u2019s behavioural intelligence engine. It senses occupancy, light, climate and habit, learns your routines, and quietly adapts your space \u2014 before you ask.',
        heroSpecs: ['Learns in days', '24/7 sensing', 'Zero commands'],
        statement: 'Traditional automation waits for a command. Senz is the layer that understands intent \u2014 turning a controllable space into one that anticipates the people inside it.',
        features: [
            { icon: Radar, title: 'Behaviour-based automation', text: 'Scenes that trigger from how you actually move through a space, not rigid schedules you have to maintain.' },
            { icon: Brain, title: 'Occupancy intelligence', text: 'Knows which rooms are in use and by whom, so light, climate and energy follow people in real time.' },
            { icon: Sparkles, title: 'Lifestyle scenes', text: 'Morning, focus, evening and away states compose themselves from your patterns and refine over time.' },
            { icon: SlidersHorizontal, title: 'Adaptive environments', text: 'Lighting and climate tune continuously to time of day, weather and routine \u2014 silently, in the background.' },
        ],
        steps: [
            { n: 'Sense', t: 'Fuses occupancy, light, climate and habit signals across the whole space, continuously.' },
            { n: 'Learn', t: 'Builds a private model of your rhythms \u2014 when you wake, work, wind down and leave.' },
            { n: 'Predict', t: 'Anticipates the next moment before it arrives, with confidence that grows daily.' },
            { n: 'Adapt', t: 'Shapes the environment around you automatically \u2014 no app, no command, no friction.' },
        ],
        showcase: [
            {
                img: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1100&q=72',
                alt: 'Connected smart living space',
                kicker: 'Anticipation, not reaction',
                title: 'A space that meets you halfway',
                text: 'Senz watches the quiet signals a home gives off and acts on them, so the right scene is already set when you walk in.',
                points: ['Walks-in-ready scenes', 'Energy that follows people', 'Refines itself daily'],
            },
            {
                img: 'https://images.unsplash.com/photo-1739083168122-f1f59db99e78?auto=format&fit=crop&w=1100&q=72',
                alt: 'Adaptive lighting in a modern room',
                kicker: 'Invisible by design',
                title: 'Intelligence you feel, never fight',
                text: 'No dashboards to babysit. Senz keeps comfort, mood and efficiency in balance while staying completely out of the way.',
                points: ['Context- and intent-aware', 'Privacy-first modelling', 'Works with your existing systems'],
            },
        ],
        stats: [
            { v: '4', l: 'live signals fused continuously' },
            { v: '<1wk', l: 'to learn a household rhythm' },
            { v: '0', l: 'commands needed once trained' },
        ],
    },
    twin: {
        key: 'twin',
        mark: 'Twin',
        eyebrow: 'Digital Experience Layer',
        accent: '#f97316',
        grad: 'linear-gradient(120deg, #fbbf24 0%, #f97316 100%)',
        soft: 'rgba(249, 115, 22, 0.12)',
        tint: '#fff6ec',
        titleLead: 'Your entire space, ',
        titleAccent: 'alive in 3D.',
        lead: 'Twin is an interactive digital representation of your space \u2014 every room, device and system visualised and controllable in real time, from anywhere in the world.',
        heroSpecs: ['Live room status', 'Control from anywhere', 'AR on the roadmap'],
        statement: 'Twin turns a floor plan into a living model. See exactly what is on, who is where and how energy is flowing \u2014 then touch a room to change it.',
        features: [
            { icon: Box, title: '3D space visualisation', text: 'A faithful digital twin of your property \u2014 floors, rooms and devices rendered as one explorable model.' },
            { icon: MousePointerClick, title: 'Interactive smart controls', text: 'Tap any room to adjust lighting, climate, media or security right from the model \u2014 no menu hunting.' },
            { icon: Compass, title: 'Digital walkthroughs', text: 'Move through the space remotely, review live status room by room, and share guided views with your team.' },
            { icon: LayoutGrid, title: 'Future space planning', text: 'Model changes before you build them \u2014 test layouts, zones and automations against the real twin first.' },
        ],
        steps: [
            { n: 'Scan', t: 'We capture your space and its connected systems into an accurate spatial model.' },
            { n: 'Model', t: 'Rooms, devices and zones become interactive objects in a single 3D twin.' },
            { n: 'Sync', t: 'The twin mirrors reality live \u2014 every status change reflected the instant it happens.' },
            { n: 'Control', t: 'Reach into any room from the model and command it, on site or from across the world.' },
        ],
        showcase: [
            {
                img: 'https://images.unsplash.com/photo-1650682009477-52fd77302b78?auto=format&fit=crop&w=1100&q=72',
                alt: 'Tablet showing a smart home control dashboard',
                kicker: 'One model, total clarity',
                title: 'See the whole space at a glance',
                text: 'Room-wise live status, energy and assets visualised together \u2014 so the state of your entire environment is obvious in seconds.',
                points: ['Room-wise live status', 'Energy & asset visualisation', 'Anywhere access'],
            },
            {
                img: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1100&q=72',
                alt: 'Modern workspace interior',
                kicker: 'Plan before you build',
                title: 'Test the future against the twin',
                text: 'Prototype new zones, scenes and layouts on the digital model first, then push them to the real space with confidence.',
                points: ['Scenario planning', 'Guided walkthroughs', 'AR experiences on the roadmap'],
            },
        ],
        stats: [
            { v: '1:1', l: 'digital mirror of the real space' },
            { v: 'Live', l: 'status synced room by room' },
            { v: '360°', l: 'remote visibility & control' },
        ],
    },
    care: {
        key: 'care',
        mark: 'Care+',
        eyebrow: 'Smart Ownership Program',
        accent: '#0fae8e',
        grad: 'linear-gradient(120deg, #0fae8e 0%, #34c6bd 100%)',
        soft: 'rgba(15, 174, 142, 0.12)',
        tint: '#f0fbf8',
        titleLead: 'Care that keeps your space ',
        titleAccent: 'at its best.',
        lead: 'Care+ continuously monitors device health, predicts issues before they surface, and keeps your intelligent environment optimised for years \u2014 backed by priority human support.',
        heroSpecs: ['24/7 monitoring', 'Predictive alerts', 'Priority support'],
        statement: 'A connected space is only as good as the years after handover. Care+ is the program that keeps every system healthy, efficient and improving \u2014 quietly, before you notice a problem.',
        features: [
            { icon: Activity, title: 'Device health monitoring', text: 'Every connected device watched in real time, with health surfaced long before a fault becomes a failure.' },
            { icon: Wrench, title: 'Predictive maintenance', text: 'Patterns flag the part that is about to drift, so we fix it on a planned visit \u2014 not an emergency call-out.' },
            { icon: Gauge, title: 'Energy insights & optimisation', text: 'Continuous tuning trims consumption across lighting, climate and appliances without touching comfort.' },
            { icon: Headset, title: 'Remote diagnostics & priority support', text: 'Most issues resolved remotely in minutes; when a visit is needed, you go to the front of the queue.' },
        ],
        steps: [
            { n: 'Monitor', t: 'Always-on telemetry tracks the health of every device and system in your space.' },
            { n: 'Detect', t: 'Anomalies and drift are caught early \u2014 long before they reach you as a problem.' },
            { n: 'Optimise', t: 'Energy, scenes and performance are tuned continuously to keep everything at its best.' },
            { n: 'Support', t: 'Remote fixes in minutes, planned maintenance, and priority humans when you need them.' },
        ],
        showcase: [
            {
                img: 'https://images.unsplash.com/photo-1545259742-b4fd8fea67e4?auto=format&fit=crop&w=1100&q=72',
                alt: 'Smart thermostat on a wall',
                kicker: 'Always watching, never intrusive',
                title: 'Problems solved before they reach you',
                text: 'Care+ catches the early signs \u2014 a sensor drifting, a device ageing \u2014 and acts on a planned visit, so your space simply keeps working.',
                points: ['24/7 health checks', 'Predictive maintenance', 'Planned, not panicked'],
            },
            {
                img: 'https://images.unsplash.com/photo-1633194883650-df448a10d554?auto=format&fit=crop&w=1100&q=72',
                alt: 'Connected security and monitoring system',
                kicker: 'Ownership, handled',
                title: 'A space that gets better every year',
                text: 'Energy optimisation, technology upgrades and priority support keep your investment current long after install.',
                points: ['Energy insights & optimisation', 'Technology upgrades', 'Priority support'],
            },
        ],
        stats: [
            { v: '24/7', l: 'continuous health monitoring' },
            { v: '99.9%', l: 'system uptime target' },
            { v: '1st', l: 'in line for priority support' },
        ],
    },
};

const CROSS: Record<ProductKey, { icon: LucideIcon; mark: string; tag: string; href: string }> = {
    senz: { icon: BrainCircuit, mark: 'Senz', tag: 'The adaptive intelligence layer', href: '/senz' },
    twin: { icon: Box, mark: 'Twin', tag: 'The live 3D digital twin', href: '/twin' },
    care: { icon: HeartPulse, mark: 'Care+', tag: 'The lifelong ownership program', href: '/care-plus' },
};

/* ============================================================
 * PAGE
 * ============================================================ */
export default function UbiqProductPage({ product }: { product: ProductKey }) {
    const cfg = PRODUCTS[product];
    const others = (Object.keys(CROSS) as ProductKey[]).filter((k) => k !== product);

    return (
        <div
            className={styles.page}
            style={{
                ['--accent']: cfg.accent,
                ['--accentGrad']: cfg.grad,
                ['--accentSoft']: cfg.soft,
                ['--tint']: cfg.tint,
            } as React.CSSProperties}
        >
            {/* ---------------- HERO ---------------- */}
            <section className={`${styles.section} ${styles.hero}`}>
                <div className={styles.heroGlow} aria-hidden="true" />
                <div className={styles.heroGrid} aria-hidden="true" />
                <div className={`${styles.inner} ${styles.heroInner}`}>
                    <div className={styles.heroCopy}>
                        <Reveal delay={0.05}>
                            <h1 className={styles.heroTitle}>
                                <span className={styles.wordmark}><span className={styles.wordmarkU}>uBIQ</span> <span className={styles.wordmarkMark}>{cfg.mark}</span><span className={styles.wordmarkPulse} aria-hidden="true" /></span>
                                <span className={styles.heroTitleMain}>
                                    {cfg.titleLead}<span className={styles.accentText}>{cfg.titleAccent}</span>
                                </span>
                            </h1>
                        </Reveal>
                        <Reveal delay={0.12}>
                            <p className={styles.heroLead}>{cfg.lead}</p>
                        </Reveal>
                        <Reveal delay={0.18}>
                            <div className={styles.heroActions}>
                                <Link href="/contact" className={styles.primaryCta}>
                                    Book Experience <ArrowRight size={16} />
                                </Link>
                                <Link href="/#platforms" className={styles.secondaryCta}>
                                    Explore the ecosystem
                                </Link>
                            </div>
                        </Reveal>
                        <Reveal delay={0.24}>
                            <div className={styles.heroSpecs}>
                                {cfg.heroSpecs.map((s) => (
                                    <span key={s} className={styles.heroSpec}><span className={styles.heroSpecDot} />{s}</span>
                                ))}
                            </div>
                        </Reveal>
                    </div>

                    <Reveal delay={0.15} className={styles.heroVisual}>
                        <Signature k={cfg.key} />
                    </Reveal>
                </div>
            </section>

            {/* ---------------- STATEMENT ---------------- */}
            <section className={`${styles.section} ${styles.statementSection}`}>
                <div className={styles.inner}>
                    <Reveal>
                        <p className={styles.statement}>{cfg.statement}</p>
                    </Reveal>
                </div>
            </section>

            {/* ---------------- FEATURES ---------------- */}
            <section className={`${styles.section} ${styles.features}`}>
                <div className={styles.inner}>
                    <Reveal>
                        <div className={styles.head}>
                            <span className={styles.tag}>What it does</span>
                            <h2 className={styles.h2}>Built to do the thinking for you.</h2>
                        </div>
                    </Reveal>
                    <div className={styles.featureGrid}>
                        {cfg.features.map((f, i) => {
                            const Icon = f.icon;
                            return (
                                <Reveal key={f.title} delay={i * 0.06}>
                                    <div className={styles.featureCard}>
                                        <span className={styles.featureIcon}><Icon size={22} strokeWidth={1.7} /></span>
                                        <h3 className={styles.featureTitle}>{f.title}</h3>
                                        <p className={styles.featureText}>{f.text}</p>
                                    </div>
                                </Reveal>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ---------------- HOW IT WORKS ---------------- */}
            <section className={`${styles.section} ${styles.how}`}>
                <div className={styles.howGlow} aria-hidden="true" />
                <div className={styles.inner}>
                    <Reveal>
                        <div className={styles.head}>
                            <span className={`${styles.tag} ${styles.tagLight}`}>How it works</span>
                            <h2 className={`${styles.h2} ${styles.h2Light}`}>From signal to seamless.</h2>
                        </div>
                    </Reveal>
                    <div className={styles.steps}>
                        <span className={styles.stepLine} aria-hidden="true" />
                        {cfg.steps.map((s, i) => (
                            <Reveal key={s.n} delay={i * 0.08} className={styles.stepCol}>
                                <span className={styles.stepNode}>{String(i + 1).padStart(2, '0')}</span>
                                <h3 className={styles.stepName}>{s.n}</h3>
                                <p className={styles.stepText}>{s.t}</p>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ---------------- SHOWCASE (real images) ---------------- */}
            <section className={`${styles.section} ${styles.showcase}`}>
                <div className={styles.inner}>
                    {cfg.showcase.map((s, i) => (
                        <div key={s.title} className={`${styles.showRow} ${i % 2 === 1 ? styles.showRowRev : ''}`}>
                            <Reveal className={styles.showMediaWrap}>
                                <div className={styles.showMedia}>
                                    <Image
                                        src={s.img}
                                        alt={s.alt}
                                        fill
                                        sizes="(max-width: 900px) 100vw, 50vw"
                                        className={styles.showImg}
                                        unoptimized
                                    />
                                    <span className={styles.showMediaGlow} aria-hidden="true" />
                                </div>
                            </Reveal>
                            <Reveal delay={0.1} className={styles.showText}>
                                <span className={styles.showKicker}>{s.kicker}</span>
                                <h3 className={styles.showTitle}>{s.title}</h3>
                                <p className={styles.showBody}>{s.text}</p>
                                <ul className={styles.showList}>
                                    {s.points.map((p) => (
                                        <li key={p}><Check size={15} strokeWidth={2.6} className={styles.showCheck} />{p}</li>
                                    ))}
                                </ul>
                            </Reveal>
                        </div>
                    ))}
                </div>
            </section>

            {/* ---------------- STATS ---------------- */}
            <section className={`${styles.section} ${styles.statsSection}`}>
                <div className={styles.inner}>
                    <Reveal>
                        <div className={styles.statRow}>
                            {cfg.stats.map((st) => (
                                <div key={st.l} className={styles.statItem}>
                                    <span className={styles.statVal}>{st.v}</span>
                                    <span className={styles.statLabel}>{st.l}</span>
                                </div>
                            ))}
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* ---------------- ECOSYSTEM CROSS-LINKS ---------------- */}
            <section className={`${styles.section} ${styles.eco}`}>
                <div className={styles.inner}>
                    <Reveal>
                        <div className={styles.head}>
                            <span className={styles.tag}>The ecosystem</span>
                            <h2 className={styles.h2}>Three layers, one intelligence.</h2>
                        </div>
                    </Reveal>
                    <div className={styles.ecoGrid}>
                        {others.map((k, i) => {
                            const o = CROSS[k];
                            const Icon = o.icon;
                            return (
                                <Reveal key={k} delay={i * 0.08}>
                                    <Link href={o.href} className={styles.ecoCard}>
                                        <span className={styles.ecoIcon}><Icon size={22} strokeWidth={1.7} /></span>
                                        <h3 className={styles.ecoName}>uBIQ <span>{o.mark}</span></h3>
                                        <p className={styles.ecoTag}>{o.tag}</p>
                                        <span className={styles.ecoLink}>Explore {o.mark} <ArrowRight size={15} /></span>
                                    </Link>
                                </Reveal>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ---------------- CTA ---------------- */}
            <section className={`${styles.section} ${styles.ctaSection}`}>
                <div className={styles.inner}>
                    <Reveal>
                        <div className={styles.ctaBand}>
                            <div className={styles.ctaGlow} aria-hidden="true" />
                            <div className={styles.ctaContent}>
                                <h2 className={styles.ctaTitle}>
                                    Bring <span className={styles.accentText}>uBIQ {cfg.mark}</span> into your space.
                                </h2>
                                <p className={styles.ctaText}>
                                    Tell us about your home, workplace or project and we&apos;ll show you what an intelligent space feels like — no pressure, no jargon.
                                </p>
                                <div className={styles.heroActions}>
                                    <Link href="/contact" className={styles.primaryCta}>Book Experience <ArrowRight size={16} /></Link>
                                    <Link href="/" className={styles.secondaryCta}>Back to uBIQ</Link>
                                </div>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </section>
        </div>
    );
}
