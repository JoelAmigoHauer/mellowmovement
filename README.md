# mellow movement

Marketing website for **mellow movement** — mobile massage & yoga in Sydney's Eastern Suburbs. Built with Next.js and a Sanity CMS so the content can be edited live, with no code changes, at `/studio`.

🌐 **Live:** [mellowmovement.vercel.app](https://mellowmovement.vercel.app)

## Tech Stack

- **Next.js 16** — App Router, React 19, TypeScript (strict), Turbopack
- **Tailwind CSS v4** — design tokens via CSS variables (oklch)
- **shadcn/ui** — Radix primitives + `cn()` utility
- **Sanity v6** — headless CMS with an embedded Studio at `/studio`
- **Self-hosted fonts** — Libre Caslon Display (headings) + Source Serif 4 (body) via `next/font/local`
- **Vercel** — `master` deploys to production, feature branches to preview

## Pages

| Route | Description |
| --- | --- |
| `/` | Home — hero, Massage & Yoga cards, story section |
| `/about` | Niki's bio, qualifications |
| `/services` | Massage & yoga services with pricing |
| `/contact` | Contact details + enquiry form |
| `/book` | Booking enquiry |
| `/newsletter` | Newsletter signup |
| `/blog`, `/blog/[slug]` | Blog index + posts |
| `/studio` | Sanity CMS (content editing) |

## Editing content

All site copy and imagery is editable in the CMS — open `/studio`, sign in, edit any page or blog post, and click **Publish**. A Sanity webhook triggers a Vercel rebuild, so changes go live within ~30–60s.

If Sanity is unconfigured or empty, the site falls back to the bundled content in `src/lib/content.ts`, so it always renders.

## Local development

```bash
npm install
cp .env.example .env.local   # fill in your Sanity project values (optional — site runs without them)
npm run dev                  # http://localhost:3000
```

| Command | Description |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript check |
| `npm run check` | lint + typecheck + build |

## Environment variables

See [`.env.example`](.env.example). Set the `NEXT_PUBLIC_SANITY_*` values to enable `/studio` and live editing. A write token + `/api/seed` are used once to seed initial content into Sanity.

## Project structure

```
src/
  app/
    (site)/         # marketing pages (shared header/footer)
    studio/         # embedded Sanity Studio
    api/seed/       # one-time CMS seeder
  components/       # React components (ui/ = shadcn, icons.tsx = SVGs)
  lib/              # content sources (fallback) + cn() utility
  sanity/           # schema, GROQ queries, Studio config
  types/            # shared content interfaces
public/images/      # site imagery
docs/               # build research notes + design-reference screenshots
```

## Deployment

Hosted on Vercel. Pushes to `master` build and deploy to production automatically; pull-request branches get preview deployments.
