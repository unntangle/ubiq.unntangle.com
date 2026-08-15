'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import styles from './PageHero.module.css';

export interface PageHeroPill {
    text: string;
    variant?: 'cyan' | 'dark';
    icon?: boolean;
}

export interface PageHeroCTA {
    label: string;
    href: string;
    variant?: 'primary' | 'secondary';
    showArrow?: boolean;
}

export interface PageHeroProps {
    eyebrow?: string;
    /** Headline. Use the {accent: 'word'} marker syntax in titleParts to highlight words. */
    titleParts: Array<string | { accent: string }>;
    description: string;
    primaryCta?: PageHeroCTA;
    secondaryCta?: PageHeroCTA;
    /** Primary image used by all layouts. */
    image: string;
    imageAlt?: string;
    /** Optional secondary images for layouts that use multiple sources (collage, diamond-grid). */
    images?: string[];
    pills?: PageHeroPill[];
    /** Override the default purple→pink gradient. */
    gradient?: 'purple-pink' | 'blue-cyan' | 'orange-pink' | 'green-teal';
    /** Visual layout for the right side.
     *  'circle' = single circular portrait (default)
     *  'stacked-strips' = three horizontal capsule strips with optional CTA pill
     *  'collage' = asymmetric two-rectangle collage with offset
     *  'diamond-grid' = four rotated squares forming a tilted cluster */
    imageLayout?: 'circle' | 'stacked-strips' | 'collage' | 'diamond-grid' | 'bento';
    /** Optional CTA shown as a colored gradient pill overlaid on stacked-strips layout. */
    overlayCta?: PageHeroCTA;
}

const gradientPresets: Record<NonNullable<PageHeroProps['gradient']>, string> = {
    'purple-pink': 'linear-gradient(135deg, #6366f1 0%, #a855f7 25%, #d946ef 55%, #ec4899 100%)',
    'blue-cyan': 'linear-gradient(135deg, #1e40af 0%, #3b82f6 30%, #06b6d4 70%, #22d3ee 100%)',
    'orange-pink': 'linear-gradient(135deg, #f97316 0%, #ef4444 40%, #ec4899 100%)',
    'green-teal': 'linear-gradient(135deg, #059669 0%, #14b8a6 50%, #06b6d4 100%)',
};

export default function PageHero({
    eyebrow,
    titleParts,
    description,
    primaryCta,
    secondaryCta,
    image,
    imageAlt = '',
    images,
    pills,
    gradient = 'purple-pink',
    imageLayout = 'circle',
    overlayCta,
}: PageHeroProps) {
    // Resolve image sources for multi-image layouts (fall back to primary if none provided)
    const img = (i: number) => images?.[i] ?? image;

    return (
        <section className={styles.hero}>
            <div className={styles.heroInner} style={{ background: gradientPresets[gradient] }}>
                <div className={styles.gradientBg}>
                    <div className={styles.glowOrb1} />
                    <div className={styles.glowOrb2} />
                    <div className={styles.glowOrb3} />
                </div>

                <div className={styles.container}>
                    <div className={styles.content}>
                        {eyebrow && (
                            <motion.span
                                className={styles.eyebrow}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                            >
                                {eyebrow}
                            </motion.span>
                        )}

                        <motion.h1
                            className={styles.title}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.1 }}
                        >
                            {titleParts.map((part, i) =>
                                typeof part === 'string' ? (
                                    <span key={i}>{part}</span>
                                ) : (
                                    <span key={i} className={styles.titleAccent}>{part.accent}</span>
                                )
                            )}
                        </motion.h1>

                        <motion.p
                            className={styles.description}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.2 }}
                        >
                            {description}
                        </motion.p>

                        {(primaryCta || secondaryCta) && (
                            <motion.div
                                className={styles.actions}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7, delay: 0.3 }}
                            >
                                {primaryCta && (
                                    <Link href={primaryCta.href} className={styles.ctaPrimary}>
                                        {primaryCta.label}
                                        {primaryCta.showArrow !== false && <ArrowRight size={18} />}
                                    </Link>
                                )}
                                {secondaryCta && (
                                    <Link href={secondaryCta.href} className={styles.ctaSecondary}>
                                        {secondaryCta.label}
                                    </Link>
                                )}
                            </motion.div>
                        )}
                    </div>

                    <motion.div
                        className={styles.visual}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        {/* ====== STACKED STRIPS LAYOUT ====== */}
                        {imageLayout === 'stacked-strips' && (
                            <div className={styles.stackedStripsWrapper}>
                                <motion.div
                                    className={styles.strip}
                                    initial={{ opacity: 0, x: -30 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.6, delay: 0.3 }}
                                >
                                    <img
                                        src={image}
                                        alt={imageAlt}
                                        className={styles.stripImage}
                                        style={{ objectPosition: 'center 25%' }}
                                    />
                                </motion.div>

                                <div className={styles.stripGap}>
                                    <motion.div
                                        className={styles.smileyBadge}
                                        initial={{ opacity: 0, scale: 0 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.5, delay: 0.7, type: 'spring' }}
                                        aria-hidden="true"
                                    >
                                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <circle cx="9" cy="10" r="1.2" fill="white" />
                                            <circle cx="15" cy="10" r="1.2" fill="white" />
                                            <path
                                                d="M8 14c1 1.5 2.4 2.4 4 2.4s3-.9 4-2.4"
                                                stroke="white"
                                                strokeWidth="1.6"
                                                strokeLinecap="round"
                                                fill="none"
                                            />
                                        </svg>
                                    </motion.div>
                                </div>

                                <motion.div
                                    className={styles.strip}
                                    initial={{ opacity: 0, x: 30 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.6, delay: 0.45 }}
                                >
                                    <img
                                        src={image}
                                        alt=""
                                        aria-hidden="true"
                                        className={styles.stripImage}
                                        style={{ objectPosition: 'center 55%' }}
                                    />
                                </motion.div>

                                <div className={styles.stripGap} />

                                <motion.div
                                    className={`${styles.strip} ${styles.stripWithOverlay}`}
                                    initial={{ opacity: 0, x: -30 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.6, delay: 0.6 }}
                                >
                                    <img
                                        src={image}
                                        alt=""
                                        aria-hidden="true"
                                        className={styles.stripImage}
                                        style={{ objectPosition: 'center 85%' }}
                                    />

                                    {overlayCta && (
                                        <motion.div
                                            className={styles.overlayCtaWrapper}
                                            initial={{ opacity: 0, scale: 0.85 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ duration: 0.6, delay: 0.85 }}
                                        >
                                            <Link href={overlayCta.href} className={styles.overlayCta}>
                                                {overlayCta.label}
                                            </Link>
                                        </motion.div>
                                    )}
                                </motion.div>
                            </div>
                        )}

                        {/* ====== COLLAGE LAYOUT (asymmetric 2-image) ====== */}
                        {imageLayout === 'collage' && (
                            <div className={styles.collageWrapper}>
                                <motion.div
                                    className={styles.collageMain}
                                    initial={{ opacity: 0, y: -20, rotate: -3 }}
                                    animate={{ opacity: 1, y: 0, rotate: -3 }}
                                    transition={{ duration: 0.7, delay: 0.3 }}
                                >
                                    <img
                                        src={img(0)}
                                        alt={imageAlt}
                                        className={styles.collageImage}
                                    />
                                </motion.div>

                                <motion.div
                                    className={styles.collageSecondary}
                                    initial={{ opacity: 0, y: 20, rotate: 5 }}
                                    animate={{ opacity: 1, y: 0, rotate: 5 }}
                                    transition={{ duration: 0.7, delay: 0.5 }}
                                >
                                    <img
                                        src={img(1)}
                                        alt=""
                                        aria-hidden="true"
                                        className={styles.collageImage}
                                    />
                                </motion.div>

                                {pills && pills[0] && (
                                    <motion.div
                                        className={`${styles.collagePill} ${pills[0].variant === 'dark' ? styles.pillDark : styles.pillCyan}`}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.6, delay: 0.8, type: 'spring' }}
                                    >
                                        {pills[0].text}
                                        {pills[0].icon && <span className={styles.pillIcon}>✦</span>}
                                    </motion.div>
                                )}
                            </div>
                        )}

                        {/* ====== DIAMOND GRID LAYOUT (4 rotated squares) ====== */}
                        {imageLayout === 'diamond-grid' && (
                            <div className={styles.diamondWrapper}>
                                <div className={styles.diamondGrid}>
                                    {[0, 1, 2, 3].map((i) => (
                                        <motion.div
                                            key={i}
                                            className={styles.diamondTile}
                                            initial={{ opacity: 0, scale: 0.7 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
                                        >
                                            <div className={styles.diamondInner}>
                                                <img
                                                    src={img(i)}
                                                    alt={i === 0 ? imageAlt : ''}
                                                    aria-hidden={i !== 0}
                                                    className={styles.diamondImage}
                                                />
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>

                                {pills && pills[0] && (
                                    <motion.div
                                        className={`${styles.diamondPill} ${pills[0].variant === 'dark' ? styles.pillDark : styles.pillCyan}`}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.6, delay: 0.9 }}
                                    >
                                        {pills[0].text}
                                        {pills[0].icon && <span className={styles.pillIcon}>✦</span>}
                                    </motion.div>
                                )}
                            </div>
                        )}

                        {/* ====== BENTO LAYOUT (smart-home dashboard) ====== */}
                        {imageLayout === 'bento' && (
                            <div className={styles.bentoWrapper}>
                                <div className={styles.bentoGrid}>
                                    <motion.div
                                        className={`${styles.bentoTile} ${styles.bentoTileLarge}`}
                                        initial={{ opacity: 0, scale: 0.94 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.7, delay: 0.3 }}
                                    >
                                        <img src={img(0)} alt={imageAlt} className={styles.bentoImage} />
                                    </motion.div>
                                    <motion.div
                                        className={styles.bentoTile}
                                        initial={{ opacity: 0, y: -24 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6, delay: 0.45 }}
                                    >
                                        <img src={img(1)} alt="" aria-hidden="true" className={styles.bentoImage} />
                                    </motion.div>
                                    <motion.div
                                        className={styles.bentoTile}
                                        initial={{ opacity: 0, y: 24 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6, delay: 0.6 }}
                                    >
                                        <img src={img(2)} alt="" aria-hidden="true" className={styles.bentoImage} />
                                    </motion.div>
                                </div>

                                {pills?.[0] && (
                                    <motion.div
                                        className={`${styles.bentoPill} ${styles.bentoPillA}`}
                                        initial={{ opacity: 0, scale: 0.8, y: -8 }}
                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: 0.85, type: 'spring' }}
                                    >
                                        <span className={`${styles.bentoDot} ${styles.dotGreen}`} />{pills[0].text}
                                    </motion.div>
                                )}
                                {pills?.[1] && (
                                    <motion.div
                                        className={`${styles.bentoPill} ${styles.bentoPillB}`}
                                        initial={{ opacity: 0, scale: 0.8, x: 12 }}
                                        animate={{ opacity: 1, scale: 1, x: 0 }}
                                        transition={{ duration: 0.5, delay: 1.0, type: 'spring' }}
                                    >
                                        <span className={`${styles.bentoDot} ${styles.dotAmber}`} />{pills[1].text}
                                    </motion.div>
                                )}
                                {pills?.[2] && (
                                    <motion.div
                                        className={`${styles.bentoPill} ${styles.bentoPillC}`}
                                        initial={{ opacity: 0, scale: 0.8, y: 8 }}
                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: 1.15, type: 'spring' }}
                                    >
                                        <span className={`${styles.bentoDot} ${styles.dotViolet}`} />{pills[2].text}
                                    </motion.div>
                                )}
                            </div>
                        )}

                        {/* ====== CIRCLE LAYOUT (default) ====== */}
                        {imageLayout === 'circle' && (
                            <div className={styles.visualWrapper}>
                                <img
                                    src={image}
                                    alt={imageAlt}
                                    className={styles.visualImage}
                                />

                                {pills && pills[0] && (
                                    <motion.div
                                        className={`${styles.floatingPill1} ${pills[0].variant === 'dark' ? styles.pillDark : styles.pillCyan}`}
                                        initial={{ opacity: 0, x: -40 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.7, delay: 0.6 }}
                                    >
                                        {pills[0].text}
                                        {pills[0].icon && <span className={styles.pillIcon}>✦</span>}
                                    </motion.div>
                                )}

                                {pills && pills[1] && (
                                    <motion.div
                                        className={`${styles.floatingPill2} ${pills[1].variant === 'cyan' ? styles.pillCyan : styles.pillDark}`}
                                        initial={{ opacity: 0, x: 40 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.7, delay: 0.8 }}
                                    >
                                        {pills[1].text}
                                        {pills[1].icon && <span className={styles.pillIcon}>✦</span>}
                                    </motion.div>
                                )}
                            </div>
                        )}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
