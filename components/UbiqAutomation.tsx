'use client';

import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import { Lightbulb, Thermometer, ShieldCheck, Volume2, Wifi, Leaf, ArrowRight, type LucideIcon } from 'lucide-react';
import styles from './UbiqAutomation.module.css';

/* ============================================================
 * uBIQ - Home automation domains (image-led).
 * Shows what uBIQ actually automates across a home/space, with
 * real imagery and the technologies integrated in each domain.
 * ============================================================ */

type Domain = {
    icon: LucideIcon;
    title: string;
    desc: string;
    img: string;
    tech: string[];
};

const domains: Domain[] = [
    {
        icon: Lightbulb,
        title: 'Lighting Intelligence',
        desc: 'Tunable scenes, daylight-aware dimming and circadian lighting that shifts with the time of day and the room in use.',
        img: 'https://images.unsplash.com/photo-1739083168122-f1f59db99e78?auto=format&fit=crop&w=900&q=70',
        tech: ['KNX', 'Lutron', 'DALI', 'Philips Hue'],
    },
    {
        icon: Thermometer,
        title: 'Climate & Comfort',
        desc: 'Room-by-room temperature, humidity and air quality that adapt to occupancy, weather and your daily routine.',
        img: 'https://images.unsplash.com/photo-1545259741-2ea3ebf61fa3?auto=format&fit=crop&w=900&q=70',
        tech: ['Daikin', 'Mitsubishi', 'Nest', 'Ecobee'],
    },
    {
        icon: ShieldCheck,
        title: 'Security & Access',
        desc: 'Cameras, smart locks, intercoms and sensors unified into one view, with intelligent alerts and effortless access.',
        img: 'https://images.unsplash.com/photo-1633194883650-df448a10d554?auto=format&fit=crop&w=900&q=70',
        tech: ['Hikvision', 'Axis', 'Yale', 'DoorBird'],
    },
    {
        icon: Volume2,
        title: 'Audio, Video & Cinema',
        desc: 'Multi-room audio and reference-grade home cinema that follow you through the space at a single tap or word.',
        img: 'https://images.unsplash.com/photo-1558089687-f282ffcbc126?auto=format&fit=crop&w=900&q=70',
        tech: ['Sonos', 'Denon', 'Dolby Atmos', 'Bowers & Wilkins'],
    },
    {
        icon: Wifi,
        title: 'Networking & Connectivity',
        desc: 'Enterprise-grade Wi-Fi and structured cabling - the reliable backbone every connected device quietly depends on.',
        img: 'https://images.unsplash.com/photo-1530546171585-cc042ea5d7ab?auto=format&fit=crop&w=900&q=70',
        tech: ['Ubiquiti UniFi', 'Cisco', 'Aruba', 'Enterprise WiFi'],
    },
    {
        icon: Leaf,
        title: 'Energy & Whole-Home',
        desc: 'Smart metering, solar, storage and EV charging - orchestrated across the whole property for cleaner, leaner energy.',
        img: 'https://images.unsplash.com/photo-1679356505858-bf4129177392?auto=format&fit=crop&w=900&q=70',
        tech: ['Solar', 'Battery storage', 'EV charging', 'Smart metering'],
    },
];

const REVEAL = { once: true, margin: '-70px 0px' };
const container: Variants = { hidden: {}, visible: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } } };
const item: Variants = {
    hidden: { opacity: 0, y: 22 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as const } },
};

export default function UbiqAutomation() {
    return (
        <section id="automation" className={styles.section}>
            <div className={styles.inner}>
                <motion.div
                    className={styles.head}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={REVEAL}
                    transition={{ duration: 0.6 }}
                >
                    <span className={styles.eyebrow}>Home Automation</span>
                    <h2 className={styles.title}>
                        Everything in your home, <span className={styles.accent}>working as one.</span>
                    </h2>
                    <p className={styles.sub}>
                        uBIQ brings lighting, climate, security, entertainment, networking and energy under a single
                        intelligence layer - so the technologies you choose stop being separate gadgets and start
                        behaving like one coordinated, intuitive home.
                    </p>
                </motion.div>

                <motion.div
                    className={styles.grid}
                    variants={container}
                    initial="hidden"
                    whileInView="visible"
                    viewport={REVEAL}
                >
                    {domains.map((d) => {
                        const Icon = d.icon;
                        return (
                            <motion.article key={d.title} className={styles.card} variants={item}>
                                <div className={styles.media} style={{ backgroundImage: `url(${d.img})` }}>
                                    <span className={styles.mediaIcon}><Icon size={20} strokeWidth={1.8} /></span>
                                </div>
                                <div className={styles.body}>
                                    <h3 className={styles.cardTitle}>{d.title}</h3>
                                    <p className={styles.cardText}>{d.desc}</p>
                                    <div className={styles.tags}>
                                        {d.tech.map((t) => (
                                            <span key={t} className={styles.tag}>{t}</span>
                                        ))}
                                    </div>
                                </div>
                            </motion.article>
                        );
                    })}
                </motion.div>

                <motion.div
                    className={styles.foot}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={REVEAL}
                    transition={{ duration: 0.6, delay: 0.1 }}
                >
                    <Link href="/contact" className={styles.footCta}>
                        Plan your automation <ArrowRight size={16} />
                    </Link>
                    <Link href="#technology" className={styles.footLink}>
                        See the technologies we integrate
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
