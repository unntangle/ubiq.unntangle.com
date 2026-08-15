'use client';

import { CSSProperties } from 'react';
import { motion, Variants } from 'framer-motion';
import UbiqNodeField from '@/components/UbiqNodeField';
import styles from './UbiqTech.module.css';

/* uBIQ Technology Ecosystem — intelligence layer ON proven standards. */

const platforms = ['KNX', 'Matter', 'Crestron', 'Control4', 'Lutron', 'Savant', 'Zigbee', 'Z-Wave', 'Thread', 'Apple HomeKit', 'Google Home', 'Amazon Alexa', 'Dolby Atmos', 'Sonos', 'Hikvision', 'Ubiquiti UniFi', 'DALI', 'Philips Hue'];

const REVEAL = { once: true, margin: '-70px 0px' };
const container: Variants = { hidden: {}, visible: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } } };
const chip: Variants = {
    hidden: { opacity: 0, y: 14 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] as const } },
};

export default function UbiqTech() {
    return (
        <section id="technology" className={styles.section}>
            <UbiqNodeField />
            <div className={styles.glow} aria-hidden="true" />
            <div className={styles.inner}>
                <motion.span
                    className={styles.eyebrow}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={REVEAL}
                    transition={{ duration: 0.6 }}
                >
                    Technology Ecosystem
                </motion.span>

                <motion.h2
                    className={styles.statement}
                    initial={{ opacity: 0, y: 22 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={REVEAL}
                    transition={{ duration: 0.6, delay: 0.05 }}
                >
                    We don&apos;t replace proven technology.{' '}
                    <span className={styles.accent}>We make it intelligent.</span>
                </motion.h2>

                <motion.p
                    className={styles.sub}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={REVEAL}
                    transition={{ duration: 0.6, delay: 0.12 }}
                >
                    uBIQ is an intelligence layer, not another box on the wall. We design with and
                    integrate the world&apos;s leading platforms and open standards &mdash; from KNX, Matter
                    and Crestron to Lutron, Sonos and Hikvision &mdash; so everything works as one.
                </motion.p>

                <motion.div
                    className={styles.chips}
                    variants={container}
                    initial="hidden"
                    whileInView="visible"
                    viewport={REVEAL}
                >
                    {platforms.map((p, i) => (
                        <motion.span
                            key={p}
                            className={styles.chip}
                            variants={chip}
                            style={{ '--d': `${(i % 10) * 0.16}s` } as CSSProperties}
                        >
                            {p}
                        </motion.span>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
