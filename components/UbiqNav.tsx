'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { Menu, X, ChevronDown, ChevronRight, ArrowRight, Plus, Check, BrainCircuit, Box, LifeBuoy, type LucideIcon } from 'lucide-react';
import styles from './UbiqNav.module.css';

/* ============================================================
 * uBIQ dedicated header — light glass, homepage-style mega menus.
 *
 * Matches the main unntangle.com "What we do" dropdown: a wide,
 * rounded white panel anchored under the header, with columns of
 * dark underlined headers + cyan link titles + grey descriptions.
 * Desktop = hover mega panels; mobile = accordion drawer.
 * ============================================================ */

type MenuLink = { title: string; desc: string; href?: string };
type MenuColumn = { head: string; href: string; items: MenuLink[] };

/* ---------- SOLUTIONS — grouped into homepage-style columns ---------- */
const solutionGroups: MenuColumn[] = [
    {
        head: 'Living Intelligence', href: '/solutions', items: [
            { title: 'Smart Home Automation', desc: 'Complete connected living ecosystem designed around lifestyle.', href: '/solutions#smart-home-automation' },
            { title: 'Lighting Intelligence', desc: 'Personalized lighting scenes and intelligent illumination.', href: '/solutions#lighting-intelligence' },
            { title: 'Climate Automation', desc: 'Adaptive temperature and comfort experiences.', href: '/solutions#climate-automation' },
            { title: 'Smart Curtains & Shades', desc: 'Automated shading responding to lifestyle and environment.', href: '/solutions#smart-curtains-shades' },
        ],
    },
    {
        head: 'Media & Security', href: '/solutions', items: [
            { title: 'Audio & Entertainment', desc: 'Cinema, music and immersive entertainment environments.', href: '/solutions#audio-entertainment' },
            { title: 'Security & Access Intelligence', desc: 'Connected protection and intelligent access.', href: '/solutions#security-access' },
        ],
    },
    {
        head: 'Infrastructure & Scale', href: '/solutions', items: [
            { title: 'Energy Intelligence', desc: 'Smart monitoring and optimized consumption.', href: '/solutions#energy-intelligence' },
            { title: 'Networking & Connectivity', desc: 'Reliable infrastructure powering connected spaces.', href: '/solutions#networking-connectivity' },
            { title: 'Commercial Automation', desc: 'Future-ready offices, hospitality and enterprise environments.', href: '/solutions#commercial-automation' },
        ],
    },
];

/* ---------- ECOSYSTEM (experience layers, not products) ---------- */
const ecosystem: { icon: LucideIcon; name: string; mark?: string; category: string; desc: string; img: string; features: string[]; href: string }[] = [
    {
        icon: BrainCircuit, name: 'uBIQ', mark: 'Senz', category: 'Adaptive Intelligence Layer', href: '/senz',
        desc: 'An intelligent layer that understands routines, preferences, and environments to personalize automation experiences.',
        img: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=900&q=70',
        features: ['Behaviour-based automation', 'Occupancy intelligence', 'Lifestyle scenes', 'Adaptive environments'],
    },
    {
        icon: Box, name: 'uBIQ', mark: 'Twin', category: 'Digital Experience Layer', href: '/twin',
        desc: 'Interactive digital representation of spaces combining visualization and connected experiences.',
        img: 'https://images.unsplash.com/photo-1650682009477-52fd77302b78?auto=format&fit=crop&w=900&q=70',
        features: ['3D space visualization', 'Interactive smart controls', 'Digital walkthroughs', 'Future space planning'],
    },
    {
        icon: LifeBuoy, name: 'uBIQ', mark: 'Care+', category: 'Smart Ownership Program', href: '/care-plus',
        desc: 'Continuous care ensuring your intelligent environment stays optimized.',
        img: 'https://images.unsplash.com/photo-1545259742-b4fd8fea67e4?auto=format&fit=crop&w=900&q=70',
        features: ['System health checks', 'Priority support', 'Maintenance', 'Technology upgrades'],
    },
];

/* ---------- TECHNOLOGIES (integrated, never sold / no partnership claims) ---------- */
const technologies: { group: string; blurb: string; items: string[] }[] = [
    { group: 'Automation Platforms', blurb: 'Core control systems that orchestrate every connected device into one experience.', items: ['Crestron', 'Control4', 'KNX', 'Lutron', 'Savant', 'Schneider Electric Wiser', 'Legrand MyHOME', 'ABB i-bus KNX', 'Siemens KNX', 'Jung Automation', 'Gira Smart Home', 'Basalte', 'RTI Control', 'URC Automation', 'Fibaro', 'Nice Automation'] },
    { group: 'Lighting Intelligence', blurb: 'Tunable, scene-driven lighting from the leading control ecosystems.', items: ['Lutron HomeWorks', 'DALI Lighting', 'Philips Hue', 'Casambi', 'DMX Lighting Control', 'Human Centric Lighting'] },
    { group: 'Voice & AI Assistants', blurb: 'Natural voice and AI control across the major assistant platforms.', items: ['Amazon Alexa', 'Google Assistant', 'Apple HomeKit', 'Siri Integration', 'Josh.ai', 'Voice Control Systems'] },
    { group: 'AV & Entertainment', blurb: 'Reference-grade cinema, audio and multi-room entertainment.', items: ['Dolby Atmos', 'Sony', 'Samsung', 'LG', 'Bose', 'Sonos', 'Bang & Olufsen', 'Bowers & Wilkins', 'KEF', 'Denon', 'Marantz', 'Yamaha', 'McIntosh', 'JBL Synthesis', 'Kaleidescape'] },
    { group: 'Security & Surveillance', blurb: 'Connected protection, access and intelligent monitoring.', items: ['Hikvision', 'Axis Communications', 'Bosch Security', 'Honeywell Security', 'Yale Smart Locks', 'DoorBird', 'Video Door Phones', 'Biometric Access'] },
    { group: 'Networking Infrastructure', blurb: 'Enterprise-grade connectivity that powers everything above it.', items: ['Ubiquiti UniFi', 'Cisco', 'Aruba Networks', 'Ruckus Networks', 'TP-Link Omada', 'Enterprise WiFi', 'Structured Cabling'] },
    { group: 'Climate & Comfort', blurb: 'Adaptive HVAC and climate control for effortless comfort.', items: ['Daikin', 'Mitsubishi Electric', 'Honeywell', 'Nest', 'Ecobee', 'HVAC Integration'] },
    { group: 'Energy & Sustainability', blurb: 'Monitoring and optimisation for cleaner, leaner energy use.', items: ['Smart Energy Monitoring', 'Solar Integration', 'Battery Storage Integration', 'EV Charging Integration', 'Energy Analytics'] },
    { group: 'Protocols & Connectivity', blurb: 'The open standards that let every layer talk to each other seamlessly.', items: ['KNX', 'Matter', 'Zigbee', 'Z-Wave', 'Thread', 'Bluetooth Mesh', 'WiFi', 'MQTT', 'IoT Integration'] },
];

/* ---------- EXPERIENCES (lifestyle, replaces industries) ---------- */
const experienceGroups: MenuColumn[] = [
    {
        head: 'Residential', href: '/experiences', items: [
            { title: 'Luxury Homes', desc: 'Whole-home intelligence, beautifully unified.' },
            { title: 'Premium Villas', desc: 'Estate-scale automation and effortless control.' },
            { title: 'Smart Apartments', desc: 'Premium connected living, scaled per unit.' },
        ],
    },
    {
        head: 'Commercial & Hospitality', href: '/experiences', items: [
            { title: 'Future-ready Offices', desc: 'Productive, efficient, adaptive workplaces.' },
            { title: 'Hotels & Hospitality', desc: 'Guest experiences that anticipate and delight.' },
            { title: 'Experience Centres', desc: 'Immersive showcases that captivate and engage.' },
        ],
    },
];

type MenuKey = 'solutions' | 'ecosystem' | 'technologies' | 'experiences';

const topItems: { key: MenuKey; label: string }[] = [
    { key: 'solutions', label: 'Solutions' },
    { key: 'ecosystem', label: 'Ecosystem' },
    { key: 'technologies', label: 'Technologies' },
    { key: 'experiences', label: 'Experiences' },
];

/* Top items that also navigate to their own page (in addition to opening the mega panel). */
const triggerHref: Partial<Record<MenuKey, string>> = {
    solutions: '/solutions',
    technologies: '/technologies',
    experiences: '/experiences',
};

/* Reusable homepage-style link column */
function LinkColumn({ col, onNav }: { col: MenuColumn; onNav: () => void }) {
    return (
        <div className={styles.col}>
            <span className={styles.colHead}>{col.head}</span>
            {col.items.map((it) => (
                <a key={it.title} href={it.href ?? col.href} className={styles.menuLink} onClick={onNav}>
                    <span className={styles.menuLinkTitle}>{it.title}</span>
                    <span className={styles.menuLinkDesc}>{it.desc}</span>
                </a>
            ))}
        </div>
    );
}

export default function UbiqNav() {
    const [open, setOpen] = useState(false);          // mobile drawer
    const [scrolled, setScrolled] = useState(false);
    const [active, setActive] = useState<MenuKey | null>(null); // desktop mega
    const [mobileOpen, setMobileOpen] = useState<MenuKey | null>(null); // mobile accordion
    const [techCat, setTechCat] = useState(0); // active Technologies category (left rail)
    const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
    const pathname = usePathname();

    const { scrollY } = useScroll();
    useMotionValueEvent(scrollY, 'change', (latest) => setScrolled(latest > 20));

    const openMenu = (key: MenuKey) => {
        if (closeTimer.current) clearTimeout(closeTimer.current);
        setActive(key);
    };
    const scheduleClose = () => {
        if (closeTimer.current) clearTimeout(closeTimer.current);
        closeTimer.current = setTimeout(() => setActive(null), 120);
    };
    const closeAll = () => {
        setOpen(false);
        setActive(null);
        setMobileOpen(null);
    };

    return (
        <header className={`${styles.header} ${scrolled || active ? styles.scrolled : ''} ${active ? styles.menuOpen : ''}`}>
            <nav className={styles.nav}>
                {/* Brand lockup */}
                <div className={styles.lockup} onMouseEnter={() => setActive(null)}>
                    <Link href="/" className={styles.brandMark} aria-label="uBIQ Smart Automation home">
                        <Image
                            src="/uBIQ/uBIQ-logo.svg"
                            alt="uBIQ"
                            width={932}
                            height={306}
                            unoptimized
                            priority
                            className={styles.logo}
                        />
                        <span className={styles.brandTagline}>Smart Automation</span>
                    </Link>
                    <span className={styles.lockupDivider} aria-hidden="true" />
                    <a
                        href="https://unntangle.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.byline}
                    >
                        An Unntangle<br />Company
                    </a>
                </div>

                {/* Desktop nav + mega panel share one hover region */}
                <div className={styles.navWrap} onMouseLeave={scheduleClose}>
                    <div className={styles.links}>
                        <Link href="/" className={`${styles.link} ${pathname === '/' ? styles.linkActive : ''}`} onMouseEnter={() => setActive(null)}>
                            Home
                        </Link>
                        <Link href="/about" className={`${styles.link} ${pathname === '/about' ? styles.linkActive : ''}`} onMouseEnter={() => setActive(null)}>
                            About
                        </Link>
                        {topItems.map((t) =>
                            triggerHref[t.key] ? (
                                <Link
                                    key={t.key}
                                    href={triggerHref[t.key]!}
                                    className={`${styles.link} ${styles.trigger} ${active === t.key ? styles.triggerActive : ''} ${pathname === triggerHref[t.key] ? styles.linkActive : ''}`}
                                    onMouseEnter={() => openMenu(t.key)}
                                    onFocus={() => openMenu(t.key)}
                                    onClick={closeAll}
                                    aria-expanded={active === t.key}
                                >
                                    {t.label}
                                    <ChevronDown size={14} className={styles.chev} />
                                </Link>
                            ) : (
                                <button
                                    key={t.key}
                                    type="button"
                                    className={`${styles.link} ${styles.trigger} ${active === t.key ? styles.triggerActive : ''}`}
                                    onMouseEnter={() => openMenu(t.key)}
                                    onFocus={() => openMenu(t.key)}
                                    aria-expanded={active === t.key}
                                >
                                    {t.label}
                                    <ChevronDown size={14} className={styles.chev} />
                                </button>
                            )
                        )}
                    </div>

                    {/* Mega panel — centered via auto-margins (no transform, so the
                        Framer open animation can't break horizontal positioning). */}
                    <AnimatePresence>
                        {active && (
                            <motion.div
                                key={active}
                                className={styles.megaWrap}
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 6 }}
                                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] as const }}
                                onMouseEnter={() => openMenu(active)}
                            >
                                <div className={`${styles.mega} ${styles[`mega_${active}`]}`}>
                                    {active === 'solutions' && (
                                        <div className={styles.cols}>
                                            {solutionGroups.map((c) => (
                                                <LinkColumn key={c.head} col={c} onNav={closeAll} />
                                            ))}
                                        </div>
                                    )}

                                    {active === 'ecosystem' && (
                                        <>
                                            <div className={styles.megaHead}>
                                                <h3 className={styles.megaTitle}>The uBIQ Ecosystem</h3>
                                                <p className={styles.megaSub}>Beyond automation. A connected intelligence layer designed around people.</p>
                                            </div>
                                            <div className={styles.ecoGrid}>
                                                {ecosystem.map((e) => {
                                                    const Icon = e.icon;
                                                    return (
                                                        <a key={e.name + e.category} href={e.href} className={styles.ecoCard} onClick={closeAll}>
                                                            <span className={styles.ecoHead} style={{ backgroundImage: `url(${e.img})` }}>
                                                                <span className={styles.ecoIcon}><Icon size={24} strokeWidth={1.7} /></span>
                                                            </span>
                                                            <span className={styles.ecoBody}>
                                                                <span className={styles.ecoCat}>{e.category}</span>
                                                                <span className={styles.ecoName}>
                                                                    {e.name}{e.mark && <span className={styles.ecoMark}> {e.mark}</span>}
                                                                </span>
                                                                <span className={styles.ecoDesc}>{e.desc}</span>
                                                                {e.features.length > 0 && (
                                                                    <span className={styles.ecoFeatures}>
                                                                        {e.features.map((f) => (
                                                                            <span key={f} className={styles.ecoFeature}>
                                                                                <Check size={14} strokeWidth={2.6} className={styles.ecoCheck} />{f}
                                                                            </span>
                                                                        ))}
                                                                    </span>
                                                                )}
                                                                <span className={styles.ecoLink}>Explore <ArrowRight size={14} /></span>
                                                            </span>
                                                        </a>
                                                    );
                                                })}
                                            </div>
                                        </>
                                    )}

                                    {active === 'technologies' && (
                                        <>
                                            <div className={styles.megaHead}>
                                                <h3 className={styles.megaTitle}>Technology Ecosystem</h3>
                                                <p className={styles.megaSub}>uBIQ integrates leading global technologies to create seamless intelligent environments.</p>
                                            </div>
                                            <div className={styles.techWrap}>
                                                <div className={styles.techRail}>
                                                    {technologies.map((t, i) => (
                                                        <button
                                                            key={t.group}
                                                            type="button"
                                                            className={`${styles.techRailItem} ${techCat === i ? styles.techRailItemActive : ''}`}
                                                            onMouseEnter={() => setTechCat(i)}
                                                            onFocus={() => setTechCat(i)}
                                                        >
                                                            {t.group}
                                                            <ChevronRight size={15} className={styles.techRailChev} />
                                                        </button>
                                                    ))}
                                                </div>
                                                <div className={styles.techPane}>
                                                    <div className={styles.techPaneHead}>
                                                        <span className={styles.techPaneTitle}>{technologies[techCat].group}</span>
                                                        <span className={styles.techCount}>{technologies[techCat].items.length} integrations</span>
                                                    </div>
                                                    <p className={styles.techPaneDesc}>{technologies[techCat].blurb}</p>
                                                    <div className={styles.techPaneGrid}>
                                                        {technologies[techCat].items.map((it) => (
                                                            <span key={it} className={styles.techPaneItem}>
                                                                <span className={styles.techDot} aria-hidden="true" />{it}
                                                            </span>
                                                        ))}
                                                    </div>
                                                    <div className={styles.techPaneFoot}>
                                                        <span className={styles.techPaneFootText}>Don&apos;t see your platform? We integrate more systems on request.</span>
                                                        <Link href="/contact" className={styles.techPaneFootCta} onClick={closeAll}>Talk to us <ArrowRight size={14} /></Link>
                                                    </div>
                                                </div>
                                            </div>
                                            <p className={styles.techNote}>Technologies we design with and integrate — uBIQ is a vendor-independent integrator, not a reseller or manufacturer.</p>
                                        </>
                                    )}

                                    {active === 'experiences' && (
                                        <>
                                            <div className={styles.megaHead}>
                                                <h3 className={styles.megaTitle}>Designed for every space</h3>
                                                <p className={styles.megaSub}>Intelligent environments shaped to how people live, work and host.</p>
                                            </div>
                                            <div className={styles.cols}>
                                                {experienceGroups.map((c) => (
                                                    <LinkColumn key={c.head} col={c} onNav={closeAll} />
                                                ))}
                                            </div>
                                        </>
                                    )}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <div className={styles.right}>
                    <Link href="/contact" className={styles.cta}>
                        Book Experience
                    </Link>
                    <button
                        type="button"
                        className={styles.menuBtn}
                        onClick={() => setOpen((v) => !v)}
                        aria-label={open ? 'Close menu' : 'Open menu'}
                    >
                        {open ? <X size={22} /> : <Menu size={22} />}
                    </button>
                </div>
            </nav>

            {/* Mobile drawer */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        className={styles.mobile}
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.2 }}
                    >
                        <Link href="/" className={styles.mobileLink} onClick={closeAll}>Home</Link>
                        <Link href="/about" className={`${styles.mobileLink} ${pathname === '/about' ? styles.mobileLinkActive : ''}`} onClick={closeAll}>About</Link>

                        {topItems.map((t) => (
                            <div key={t.key} className={styles.mAccordion}>
                                <button
                                    type="button"
                                    className={styles.mAccBtn}
                                    onClick={() => setMobileOpen((v) => (v === t.key ? null : t.key))}
                                    aria-expanded={mobileOpen === t.key}
                                >
                                    {t.label}
                                    <Plus size={18} className={`${styles.mAccIcon} ${mobileOpen === t.key ? styles.mAccIconOpen : ''}`} />
                                </button>
                                <AnimatePresence initial={false}>
                                    {mobileOpen === t.key && (
                                        <motion.div
                                            className={styles.mAccPanel}
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.25 }}
                                        >
                                            {t.key === 'solutions' && solutionGroups.map((g) => (
                                                <div key={g.head}>
                                                    <span className={styles.mSubGroup}>{g.head}</span>
                                                    {g.items.map((it) => (
                                                        <a key={it.title} href={it.href ?? g.href} className={styles.mSub} onClick={closeAll}>{it.title}</a>
                                                    ))}
                                                </div>
                                            ))}
                                            {t.key === 'ecosystem' && ecosystem.map((e) => (
                                                <a key={e.name + e.category} href={e.href} className={styles.mSub} onClick={closeAll}>
                                                    {e.name}{e.mark ? ` ${e.mark}` : ''} · <span className={styles.mSubMuted}>{e.category}</span>
                                                </a>
                                            ))}
                                            {t.key === 'technologies' && (
                                                <>
                                                    <Link href="/technologies" className={styles.mSub} onClick={closeAll}>View all technologies →</Link>
                                                    {technologies.map((g) => (
                                                        <span key={g.group} className={styles.mSubGroup}>{g.group}</span>
                                                    ))}
                                                </>
                                            )}
                                            {t.key === 'experiences' && experienceGroups.map((g) => (
                                                <div key={g.head}>
                                                    <span className={styles.mSubGroup}>{g.head}</span>
                                                    {g.items.map((it) => (
                                                        <a key={it.title} href={g.href} className={styles.mSub} onClick={closeAll}>{it.title}</a>
                                                    ))}
                                                </div>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}

                        <Link href="/contact" className={styles.mobileCta} onClick={closeAll}>
                            Book Experience
                        </Link>
                        <Link href="/" className={styles.mobileHome} onClick={closeAll}>
                            ← Unntangle Technologies home
                        </Link>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
