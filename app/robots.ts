import type { MetadataRoute } from "next";

/**
 * robots.txt for ubiq.unntangle.com.
 *
 * A subdomain is a separate host to crawlers, so it needs its own robots.txt
 * and its own Search Console property — the parent unntangle.com robots.txt
 * has no authority here.
 */

const SITE_URL =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    "https://ubiq.unntangle.com";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: "*",
                allow: "/",
                disallow: ["/api/", "/_next/"],
            },
            {
                userAgent: ["Googlebot", "Bingbot"],
                allow: "/",
                disallow: ["/api/", "/_next/"],
            },
        ],
        sitemap: `${SITE_URL}/sitemap.xml`,
        host: SITE_URL,
    };
}
