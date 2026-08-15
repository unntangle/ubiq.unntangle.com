'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, PhoneCall } from 'lucide-react';
import styles from './UbiqCTA.module.css';

/* ============================================================
 * uBIQ closing CTA band.
 *
 * Dark band that bookends the dark hero and drives the single
 * conversion that matters for an integration business: booking a
 * consultation. Routes to the existing /contact page.
 * ============================================================ */

export default function UbiqCTA() {
    return (
        <section className={styles.section}>
            <div className={styles.inner}>
                <motion.div
                    className={styles.band}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <div className={styles.glow} aria-hidden="true" />

                    <div className={styles.content}>
                        <span className={styles.eyebrow}>Start the conversation</span>
                        <h2 className={styles.title}>
                            Design your{' '}
                            <span className={styles.titleAccent}>intelligent space</span>.
                        </h2>
                        <p className={styles.description}>
                            Tell us about your home, workplace or project. We&apos;ll walk you
                            through what&apos;s possible and propose a system designed around how
                            you actually live and work — no pressure, no jargon.
                        </p>

                        <div className={styles.actions}>
                            <Link href="/contact" className={styles.primaryCta}>
                                Book a consultation <ArrowRight size={18} />
                            </Link>
                            {/* HIDDEN-CONTACT: phone
                            <Link href="tel:+917092747933" className={styles.secondaryCta}>
                                <PhoneCall size={16} /> +91 70927 47933
                            </Link>
                            */}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
