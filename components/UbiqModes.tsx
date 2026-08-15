'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Sunrise, Briefcase, ShieldCheck, Moon, type LucideIcon } from 'lucide-react';
import styles from './UbiqModes.module.css';

/* ============================================================
 * uBIQ Future Living - "a space that moves with your day".
 *
 * Reimagined as an interactive day-timeline: the four modes live
 * along a sunrise -> night gradient track. Selecting a stop (or
 * letting it auto-cycle) reveals a stage with a time-of-day
 * "scene orb" and the mode's details.
 * ============================================================ */

type Mode = {
    icon: LucideIcon;
    time: string;
    mode: string;
    line: string;
    note: string;
    hue1: string;
    hue2: string;
    dot: string;
    lightIcon?: boolean; // white icon on dark (night) orb
};

const modes: Mode[] = [
    {
        icon: Sunrise,
        time: '7:00 AM',
        mode: 'Morning Mode',
        line: 'Space wakes with you.',
        note: 'Lights warm, blinds rise and climate eases in — gently, as you stir.',
        hue1: '#ffe6c2',
        hue2: '#ffb27a',
        dot: '#e0892f',
    },
    {
        icon: Briefcase,
        time: '10:30 AM',
        mode: 'Work Mode',
        line: 'Environment adapts.',
        note: 'Focus lighting, the right temperature, distractions quietly muted.',
        hue1: '#dcebff',
        hue2: '#93b8f0',
        dot: '#3b82f6',
    },
    {
        icon: ShieldCheck,
        time: '2:00 PM',
        mode: 'Away Mode',
        line: 'Home protects itself.',
        note: 'Security arms, energy drops, and the space watches over itself.',
        hue1: '#e9edf2',
        hue2: '#bcc4d0',
        dot: '#6b7480',
    },
    {
        icon: Moon,
        time: '10:30 PM',
        mode: 'Night Mode',
        line: 'Comfort, optimised.',
        note: 'Pathways softly lit, doors secured, everything settling for rest.',
        hue1: '#3a3f6e',
        hue2: '#171a36',
        dot: '#8b7bf2',
        lightIcon: true,
    },
];

const REVEAL = { once: true, margin: '-70px 0px' };
const ease = [0.16, 1, 0.3, 1] as const;

const stageVariants: Variants = {
    enter: { opacity: 0, y: 16 },
    center: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
    exit: { opacity: 0, y: -12, transition: { duration: 0.3, ease } },
};

export default function UbiqModes() {
    const [active, setActive] = useState(0);
    const paused = useRef(false);

    useEffect(() => {
        const id = setInterval(() => {
            if (!paused.current) setActive((a) => (a + 1) % modes.length);
        }, 4200);
        return () => clearInterval(id);
    }, []);

    const m = modes[active];
    const Icon = m.icon;

    return (
        <section
            id="experiences"
            className={styles.section}
            onMouseEnter={() => (paused.current = true)}
            onMouseLeave={() => (paused.current = false)}
        >
            <div className={styles.inner}>
                <motion.div
                    className={styles.header}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={REVEAL}
                    transition={{ duration: 0.6 }}
                >
                    <span className={styles.eyebrow}>Future Living</span>
                    <h2 className={styles.title}>A space that moves with your day</h2>
                </motion.div>

                {/* ---- day timeline rail ---- */}
                <motion.div
                    className={styles.rail}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={REVEAL}
                    transition={{ duration: 0.6, delay: 0.1 }}
                >
                    <div className={styles.railLine} aria-hidden="true" />
                    <div className={styles.stops}>
                        {modes.map((md, i) => {
                            const StopIcon = md.icon;
                            const isActive = i === active;
                            return (
                                <button
                                    key={md.mode}
                                    type="button"
                                    className={`${styles.stop} ${isActive ? styles.stopActive : ''}`}
                                    onClick={() => setActive(i)}
                                    aria-label={`${md.mode} — ${md.time}`}
                                    aria-pressed={isActive}
                                    style={{ ['--dot' as string]: md.dot }}
                                >
                                    <span className={styles.dot}>
                                        <StopIcon size={18} strokeWidth={1.8} />
                                    </span>
                                    <span className={styles.stopTime}>{md.time}</span>
                                    <span className={styles.stopName}>{md.mode.replace(' Mode', '')}</span>
                                </button>
                            );
                        })}
                    </div>
                </motion.div>

                {/* ---- stage ---- */}
                <motion.div
                    className={styles.stage}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={REVEAL}
                    transition={{ duration: 0.6, delay: 0.18 }}
                >
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={active}
                            className={styles.stageInner}
                            variants={stageVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                        >
                            <div className={styles.stageText}>
                                <span className={styles.stageMode} style={{ color: m.dot }}>
                                    {m.mode} · {m.time}
                                </span>
                                <h3 className={styles.stageLine}>{m.line}</h3>
                                <p className={styles.stageNote}>{m.note}</p>
                            </div>

                            <div
                                className={styles.orbWrap}
                                style={{
                                    ['--hue1' as string]: m.hue1,
                                    ['--hue2' as string]: m.hue2,
                                }}
                            >
                                <span className={styles.orbHalo} aria-hidden="true" />
                                <span className={styles.orb}>
                                    <Icon
                                        size={58}
                                        strokeWidth={1.5}
                                        color={m.lightIcon ? '#ffffff' : '#2b3138'}
                                    />
                                </span>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    );
}
