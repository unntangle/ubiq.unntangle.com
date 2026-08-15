'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Power } from 'lucide-react';
import styles from './UbiqIntelligence.module.css';

/* ============================================================
 * The uBIQ Intelligence Layer.
 *
 * Positioning moment: uBIQ is not another automation box - it's
 * the intelligence layer ABOVE proven automation. Reframed as a
 * "transformation": traditional control -> uBIQ understanding,
 * bridged by a gradient arrow node.
 * ============================================================ */

const ease = [0.16, 1, 0.3, 1] as const;

export default function UbiqIntelligence() {
    return (
        <section id="intelligence" className={styles.section}>
            <div className={styles.inner}>
                <motion.div
                    className={styles.header}
                    initial={{ opacity: 0, y: 22 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px 0px' }}
                    transition={{ duration: 0.6 }}
                >
                    <span className={styles.eyebrow}>The <span style={{ textTransform: 'none' }}>uBIQ</span> Intelligence Layer</span>
                    <h2 className={styles.title}>
                        We don&apos;t just automate your space.{' '}
                        <span className={styles.accent}>We give it intelligence.</span>
                    </h2>
                    <p className={styles.subtitle}>
                        Proven systems — KNX, Matter, IoT — handle the wiring. uBIQ sits above
                        them as a layer that senses, learns and adapts, turning a controllable
                        space into one that understands the people in it.
                    </p>
                </motion.div>

                <div className={styles.compare}>
                    {/* Traditional */}
                    <motion.div
                        className={styles.cardMuted}
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-60px 0px' }}
                        transition={{ duration: 0.55, ease }}
                    >
                        <span className={styles.iconMuted}><Power size={20} strokeWidth={1.9} /></span>
                        <span className={styles.cardLabel}>Traditional automation</span>
                        <p className={styles.cardLine}>You control your space.</p>
                        <p className={styles.cardNote}>
                            Scenes, schedules and switches — powerful, but waiting for your
                            command every time.
                        </p>
                        <div className={styles.tagRow}>
                            <span className={styles.tagMuted}>Scenes</span>
                            <span className={styles.tagMuted}>Schedules</span>
                            <span className={styles.tagMuted}>Switches</span>
                        </div>
                    </motion.div>

                    {/* Transform node */}
                    <motion.div
                        className={styles.transform}
                        initial={{ opacity: 0, scale: 0.7 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, margin: '-60px 0px' }}
                        transition={{ duration: 0.5, delay: 0.15, type: 'spring' }}
                        aria-hidden="true"
                    >
                        <span className={styles.transformRing}><ArrowRight size={22} strokeWidth={2.2} /></span>
                        <span className={styles.transformLabel}>uBIQ layer</span>
                    </motion.div>

                    {/* With uBIQ — gradient-bordered */}
                    <motion.div
                        className={styles.cardLiveWrap}
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-60px 0px' }}
                        transition={{ duration: 0.55, delay: 0.1, ease }}
                    >
                        <div className={styles.cardLive}>
                            <div className={styles.liveTop}>
                                <span className={styles.livePill}>
                                    <span className={styles.livePulse} aria-hidden="true" />
                                    Always learning
                                </span>
                            </div>
                            <span className={styles.cardLabelLive}>With uBIQ</span>
                            <p className={styles.cardLineLive}>Your space understands you.</p>
                            <p className={styles.cardNoteLive}>
                                It learns your routines, anticipates what you need, and adapts the
                                environment around you — quietly, in the background.
                            </p>
                            <div className={styles.tagRow}>
                                <span className={styles.tagLive}>Senses</span>
                                <span className={styles.tagLive}>Learns</span>
                                <span className={styles.tagLive}>Adapts</span>
                                <span className={styles.tagLive}>Anticipates</span>
                            </div>
                            <a href="#platforms" className={styles.liveCta}>
                                Meet the intelligence <ArrowRight size={16} />
                            </a>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
