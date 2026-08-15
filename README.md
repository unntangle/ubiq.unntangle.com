# ubiq.unntangle.com

Standalone Next.js app for the **uBIQ** brand site.

This content used to live inside the parent `unntangle.com` project under
`/ubiq/*`. It's now its own project, served at its own subdomain, with the
same pages at the root of the domain:

| Was (parent site)      | Is now (this site) |
| ---------------------- | ------------------ |
| `/ubiq`                | `/`                |
| `/ubiq/about`          | `/about`           |
| `/ubiq/solutions`      | `/solutions`       |
| `/ubiq/technologies`   | `/technologies`    |
| `/ubiq/experiences`    | `/experiences`     |
| `/ubiq/contact`        | `/contact`         |
| `/ubiq/senz`           | `/senz`            |
| `/ubiq/twin`           | `/twin`            |
| `/ubiq/care-plus`      | `/care-plus`       |

On the parent site those routes are switched off — see the `HIDE_UBIQ` flag in
`unntangle.com/middleware.ts`.

## First-time setup

```bash
npm run migrate     # pull the uBIQ pages, components and assets from the parent
npm install
npm run dev         # http://localhost:3001
```

Port 3001 is deliberate — the parent project runs on 3000, so both can run
side by side.

Preview what the migration will do without writing anything:

```bash
node scripts/migrate-from-parent.mjs --dry-run
```

## How the migration works

`scripts/migrate-from-parent.mjs` reads the sibling `../unntangle.com`
directory (strictly read-only) and:

1. Copies `app/ubiq/**` into `app/**`, dropping the `ubiq` segment.
2. Follows the import graph out of those pages and copies every local
   dependency — components, their `*.module.css`, anything under `data/`.
   Only what the uBIQ pages actually reach gets copied.
3. Copies `app/globals.css` and the `public/uBIQ` + `public/images` folders.
4. Rewrites the `/ubiq` route prefix to root in all copied source, and points
   the `SITE_URL` fallback at this subdomain.

It's safely re-runnable. These files are this project's own and are never
overwritten:

- `app/layout.tsx` — uBIQ-branded metadata, title template, JSON-LD
- `app/sitemap.ts`, `app/robots.ts`, `app/manifest.ts`

### While the parent is still the source of truth

Re-running `npm run migrate` re-syncs from the parent. That's useful right
after the split. Once this project starts diverging — the moment you edit a
copied component here — stop running it, since it will overwrite local
changes. At that point delete the script and the parent's `app/ubiq/` folder
so there's one home for this code instead of two.

## Open items

- **The footer** is the parent site's `Footer` component, so its links
  (`/about`, `/services`, `/blog`, `/contact`) now resolve against *this*
  domain. `/about` and `/contact` exist here; **`/services` and `/blog` do
  not** and will 404. Either point those at absolute `https://unntangle.com/...`
  URLs or build a uBIQ-specific footer.
- **Contact form** — check where `/contact` submits. If it posts to an API
  route that lived in the parent project, that route needs to come across too.
- **DNS + hosting** — point `ubiq.unntangle.com` at this deployment.
- **Search Console** — a subdomain is a separate property. Add
  `ubiq.unntangle.com` and submit `/sitemap.xml`.
- **Redirects** — the old `/ubiq/*` URLs on the parent currently 404. Once
  this site is live, consider 301-ing them here instead so any existing links
  and indexed pages carry over their ranking.

## Dependencies

Trimmed relative to the parent. Dropped: AWS SDK, Supabase, bcrypt, jose,
cloudinary, adm-zip, jszip, next-mdx-remote — all of those belong to the
parent's CRM / OfficeMate / blog subsystems, none of which exist here. Kept:
`next`, `react`, `react-dom`, `framer-motion`, `lucide-react`.
