import type { MetadataRoute } from "next";

/**
 * Web App Manifest — served at /manifest.webmanifest.
 *
 * Same rationale as the parent project: not a full PWA, but it gives mobile
 * browsers a real name and icon for "Add to home screen" and keeps Lighthouse
 * happy. Icons use the uBIQ mark rather than the Unntangle one.
 *
 * Known gap (inherited from the parent): there are no true 192x192 / 512x512
 * maskable PNGs yet, so no `sizes` is declared rather than claiming dimensions
 * that aren't real. Generate proper icons from the uBIQ mark when there's time.
 */
export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "uBIQ — Smart Space Automation by Unntangle",
        short_name: "uBIQ",
        description:
            "Intelligent spaces, seamless experiences. Automation for homes, workplaces and commercial environments.",
        start_url: "/",
        display: "standalone",
        background_color: "#faf7f2",
        theme_color: "#7b2cbf",
        orientation: "portrait",
        icons: [
            {
                src: "/uBIQ/uBIQ-logo.webp",
                type: "image/webp",
                purpose: "any",
            },
            {
                src: "/uBIQ/uBIQ-logo.png",
                type: "image/png",
                purpose: "any",
            },
        ],
        categories: ["business", "lifestyle", "utilities"],
    };
}
