'use client';

import { motion, Variants } from 'framer-motion';
import { Brain, Box, HeartPulse, Check } from 'lucide-react';
import styles from './UbiqPillars.module.css';

/* ============================================================
 * uBIQ — Three proprietary pillars.
 *
 * Senz (the brain), Twin (the digital layer), Care+ (the lifelong
 * companion). Framed as uBIQ's intelligence framework. Roadmap-stage
 * capabilities (AR, predictive maintenance) are labelled honestly.
 * ============================================================ */

const pillars = [
    {
        icon: <Brain size={22} strokeWidth={1.8} />,
        img: 'https://images.unsplash.com/photo-1519558260268-cde7e03a0152?auto=format&fit=crop&w=900&q=70',
        role: 'The Brain',
        name: 'Senz',
        concept: 'AI behavioural intelligence engine',
        features: [
            'Learns routines & behaviour',
            'Anticipates what you need',
            'Adaptive lighting & climate',
            'Context- and intent-aware',
        ],
        message: 'Your space learns you.',
    },
    {
        icon: <Box size={22} strokeWidth={1.8} />,
        img: 'https://images.unsplash.com/photo-1650682009477-52fd77302b78?auto=format&fit=crop&w=900&q=70',
        role: 'The Digital Layer',
        name: 'Twin',
        concept: '3D digital twin experience platform',
        features: [
            'Interactive 3D of your space',
            'Room-wise live status',
            'Energy & asset visualisation',
            'AR experiences — on the roadmap',
        ],
        message: 'Your entire space. Alive digitally.',
    },
    {
        icon: <HeartPulse size={22} strokeWidth={1.8} />,
        img: 'https://images.unsplash.com/photo-1545259742-b4fd8fea67e4?auto=format&fit=crop&w=900&q=70',
        role: 'The Lifelong Companion',
        name: 'Care+',
        concept: 'Intelligent monitoring & predictive care',
        features: [
            'Device health monitoring',
            'Predictive maintenance',
            'Energy insights & optimisation',
            'Remote diagnostics & priority support',
        ],
        message: 'Your space gets better every day.',
    },
];

const REVEAL = { once: true, margin: '-70px 0px' };
const container: Variants = { hidden: {}, visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } } };
const item: Variants = {
    hidden: { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } },
};

export default function UbiqPillars() {
    return (
        <section id="platforms" className={styles.section}>
            <div className={styles.inner}>
                <motion.div
                    className={styles.header}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={REVEAL}
                    transition={{ duration: 0.6 }}
                >
                    <span className={styles.eyebrow}>The <span style={{ textTransform: 'none' }}>uBIQ</span> Platform</span>
                    <h2 className={styles.title}>Three layers of intelligence</h2>
                    <p className={styles.subtitle}>
                        The brain that learns, the digital twin that visualises, and the care
                        that keeps your space improving long after handover.
                    </p>
                </motion.div>

                <motion.div
                    className={styles.grid}
                    variants={container}
                    initial="hidden"
                    whileInView="visible"
                    viewport={REVEAL}
                >
                    {pillars.map((p) => (
                        <motion.div key={p.name} className={styles.card} variants={item}>
                            <div className={styles.media} style={{ backgroundImage: `url(${p.img})` }}>
                                <span className={styles.mediaIcon}>{p.icon}</span>
                            </div>

                            <div className={styles.body}>
                                <span className={styles.role}>{p.role}</span>
                                <h3 className={styles.name}>
                                    <span className={styles.nameU}>uBIQ</span>{' '}
                                    <span className={styles.nameWord}>{p.name}</span>
                                </h3>
                                <p className={styles.concept}>{p.concept}</p>

                                <ul className={styles.features}>
                                    {p.features.map((f) => (
                                        <li key={f} className={styles.feature}>
                                            <Check size={15} strokeWidth={2.4} className={styles.check} />
                                            {f}
                                        </li>
                                    ))}
                                </ul>

                                <p className={styles.message}>{p.message}</p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
