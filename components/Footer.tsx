'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Instagram, Twitter, Linkedin, ArrowUp } from 'lucide-react';
import styles from './Footer.module.css';

/**
 * Sitewide footer.
 *
 * Link audit notes:
 *   - Removed "Case studies" / "Case studies CMS" — there's no
 *     /case-studies route yet, and "CMS" links shouldn't ship to
 *     production. Re-add once a real case-studies surface exists.
 *   - Removed "Blog post CMS" for the same reason.
 *   - Removed the per-category blog links (/blog/ai, /modernization,
 *     /case-studies) — those paths are blog post slugs, not category
 *     filters, so they 404'd. The blog index already lets users
 *     filter by service category, which is the correct surface.
 *   - Legal links now point at real /privacy, /terms, and
 *     /cookie-preferences pages instead of `#`.
 *   - Social links remain `#` because the company doesn't have
 *     official handles yet — wire them up when accounts exist.
 */

export default function Footer() {
    const scrollToTop = () => {
        if (typeof window !== 'undefined') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <div className={styles.footerWrapper}>
            <footer className={styles.footer}>
                <div className={styles.container}>
                    {/* Top Bar with Logo */}
                    <div className={styles.topBar}>
                        <div>
                            <Link href="/" className={styles.logoLink}>
                                <Image
                                    src="/images/unntangle_logo_white.png"
                                    alt="Unntangle Technologies Logo"
                                    width={160}
                                    height={40}
                                    className={styles.footerLogo}
                                />
                            </Link>
                            <p style={{ color: '#8b939e', fontSize: '14px', lineHeight: 1.5, marginTop: '14px', maxWidth: '340px' }}>
                                Building immersive and intelligent experiences since 2023.
                            </p>
                        </div>
                    </div>

                    {/* Main Links Grid - 4 Columns */}
                    <div className={styles.linksGrid}>
                        <div className={styles.column}>
                            <h4>Quick Links</h4>
                            <Link href="/about">About us</Link>
                            <Link href="/services">Services</Link>
                            {/* HIDDEN-UBIQ: <Link href="/">uBIQ</Link> */}
                            <Link href="/blog">Blog</Link>
                            <Link href="/contact">Contact</Link>
                        </div>

                        <div className={styles.column}>
                            <h4>What we do</h4>
                            <Link href="/services">Technology</Link>
                            <Link href="/services">Creative Design</Link>
                            <Link href="/services">Growth Marketing</Link>
                        </div>

                        {/* HIDDEN-UBIQ: the "Our Brands" column listed only
                            uBIQ, so the entire column is hidden rather than
                            leaving a dangling heading. Restore as-is when the
                            brand site comes back.
                        <div className={styles.column}>
                            <h4>Our Brands</h4>
                            <Link href="/">uBIQ — Smart Space Automation</Link>
                        </div>
                        */}

                        {/* HIDDEN-CONTACT: entire Contact column hidden — phone, email,
                            and office address are all suppressed, which left this column
                            empty (just a dangling heading). Restore the inner items below
                            when contact details should be shown again.
                        <div className={styles.column}>
                            <h4>Contact</h4>
                            <div className={styles.contactInfo}>
                                <div className={styles.phoneNumbers}>
                                    <Link href="tel:+917092747933">+91 70927 47933</Link>
                                    <span> / </span>
                                    <Link href="tel:+916379388462">+91 63793 88462</Link>
                                </div>
                                <Link href="mailto:gokul@unntangle.com">gokul@unntangle.com</Link>
                                <p className={styles.address}>
                                    SBS Office Space, Old No.470, New No.700,<br />
                                    Anna Salai, Nandanam, Chennai 600035.
                                </p>
                            </div>
                        </div>
                        */}

                        <div className={styles.column}>
                            <h4>Follow us</h4>
                            <div className={styles.socialCol}>
                                <Link href="#" className={styles.socialLink}><Linkedin size={18} /> <span>LinkedIn</span></Link>
                                <Link href="#" className={styles.socialLink}><Instagram size={18} /> <span>Instagram</span></Link>
                                <Link href="#" className={styles.socialLink}><Facebook size={18} /> <span>Facebook</span></Link>
                                <Link href="#" className={styles.socialLink}><Twitter size={18} /> <span>Twitter</span></Link>
                            </div>
                        </div>
                    </div>

                    <div className={styles.backToTop}>
                        <button onClick={scrollToTop} aria-label="Back to top">
                            <ArrowUp size={20} />
                        </button>
                    </div>

                    {/* Bottom Bar */}
                    <div className={styles.bottomBar}>
                        <div className={styles.splitRow}>
                            <div className={styles.legalLinks}>
                                <Link href="/privacy">Privacy</Link>
                                <Link href="/terms">Site Terms</Link>
                                <Link href="/cookie-preferences">Cookie Preferences</Link>
                            </div>

                            <p className={styles.copyright}>
                                © {new Date().getFullYear()}, <span className={styles.accent}>Unntangle Technologies</span>. All rights reserved.
                            </p>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
