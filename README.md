# Picoq public website

A responsive, typography-led website for PICOQ, built with Next.js App Router, TypeScript, Tailwind CSS, Lucide, and original SVG illustrations. The page is statically rendered; only the accessible mobile navigation needs client JavaScript. Fonts are served locally using the Manrope variable font package (SIL Open Font License, included with the package).

## Run locally

Use Node.js 24 (see `.nvmrc`) and npm. No environment variables, database, API credentials, or external services are required.

```sh
npm ci
npm run dev
```

The development server listens on port 3000. For a production-mode review:

```sh
npm run build
npm run start
```

In the managed cloud workspace, use `npm ci --cache /workspace/.cache/npm` to keep the npm cache in a writable directory. `NEXT_TELEMETRY_DISABLED=1` disables Next.js tool telemetry during local commands.

## Edit the site

`src/content/site.ts` is the content source of truth:

| Change | Configuration |
| --- | --- |
| Page copy, FAQ, privacy information | Named section objects, such as `hero`, `business`, `faq`, `footer` |
| WhatsApp CTAs, merchant message, existing site, wireframe | `links` and `actions` |
| Recorded metrics and attribution | `evidence.metrics`, `apiValue`, `apiLabel`, `apiNote`, `footnote` |
| Pilot locations, descriptions, status | `pilots.places` |
| Live / planned / future summary | `stages` and `story.chapters` |
| Metadata and deployment settings | `metadata` and `deployment` |
| Sample listings, pack size, stock, timestamps | `discovery.demo` |

Keep stage language consistent across these sections when changing an actual product status. Metrics are static content, not fetched data. The 500 SerpAPI calls are combined founder-reported usage; they are separate from the 101 customer product searches. Store-link clicks do not establish purchases. Update the dated footnote only when a new snapshot is supplied.

The layout is in `src/app/page.tsx`; reusable illustrations and navigation are in `src/components`. Visual tokens, responsive rules, and motion are in `src/app/globals.css`. Motion never hides essential text and is disabled with `prefers-reduced-motion`. The SVG line art makes no claim about pilot coverage or participating shops.

The local shopping conversation and seller check-in are labelled illustrations. They deliberately have no input, checkout, ordering, or operational seller controls. Real CTAs open the exact supplied WhatsApp destinations.

## Review and verification

```sh
npm run build
npm run typecheck
npm run lint
npm run test:e2e
```

The browser suite starts the production build automatically if port 3000 is unused. Run the build first, and stop any stale production server before rebuilding. It covers desktop, 360px mobile, and reduced-motion configurations, with additional overflow checks through 1920px; keyboard navigation and FAQ/privacy disclosures; Axe WCAG A/AA checks; exact link destinations; metric/status labels; no-JavaScript content; runtime errors and external page requests; and SEO/image routes. Automated accessibility scans supplement manual keyboard and visual checks; they are not an accessibility certification.

The cloud machine already provides Chromium at `/usr/bin/chromium`. On another machine, run `npx playwright install chromium` first, or set `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH` to an existing browser executable. Screenshot and HTML report outputs are ignored by Git:

- `artifacts/desktop-hero.png`: desktop first-screen preview
- `artifacts/desktop.png`: complete desktop page
- `artifacts/mobile.png`: complete 360px mobile page
- `artifacts/reduced-motion.png`: 390px reduced-motion review
- `playwright-report/index.html`: browser test results

The onboarding UI has no supported public web preview. The saved screenshots provide a visual review; run the server in an environment with its own supported preview to review live interactions. No public deployment was made.

## Review versus production

This build is prepared for review. `site.deployment.indexable` defaults to `false`, so the page has `noindex, nofollow`, robots disallow all crawling, and the sitemap has no public entries. The intended domain `https://picoq.si` is stored only as deployment metadata. No DNS, redirects, existing website, or shopping-assistant changes are made.

For a separately authorized production launch, confirm the deployment URL, set `indexable` to `true`, rebuild, and deploy through the chosen host. That enables the robots sitemap declaration and the home-page sitemap entry. Domain setup remains a separate step. Hosting access logs and third-party destinations are governed by their own privacy practices; the application itself installs no analytics, cookies, forms, or trackers.

## Cloud environment

Use the existing `/workspace/Picoq.si-Website` checkout. Each cloud task is already isolated; do not create an additional Git worktree. Installed dependencies and build files can be retained in an environment snapshot, but running processes must be restarted. The saved environment setup and startup instructions describe that restart and local readiness checks.
