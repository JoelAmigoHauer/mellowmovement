<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# mellow movement

Marketing site for **mellow movement** — mobile massage & yoga in Sydney's Eastern Suburbs. Next.js front end with a Sanity CMS so the owner can edit every page at `/studio`.

## Tech Stack
- **Framework:** Next.js 16 (App Router, React 19, TypeScript strict, Turbopack)
- **UI:** shadcn/ui (Radix primitives, Tailwind CSS v4, `cn()` utility)
- **CMS:** Sanity v6 — embedded Studio at `/studio`, content fetched via GROQ
- **Fonts:** self-hosted via `next/font/local` (Libre Caslon Display + Source Serif 4)
- **Deployment:** Vercel (`master` → production, feature branches → preview)

## Commands
- `npm run dev` — Start dev server
- `npm run build` — Production build
- `npm run lint` — ESLint check
- `npm run typecheck` — TypeScript check
- `npm run check` — Run lint + typecheck + build

## Code Style
- TypeScript strict mode, no `any`
- Named exports, PascalCase components, camelCase utils
- Tailwind utility classes, no inline styles
- 2-space indentation
- Responsive: mobile-first

## Content & CMS Architecture
The site renders identically whether or not Sanity is configured — this is intentional and must be preserved.

- **`src/types/content.ts`** — the content contract shared by components, fallback, and CMS schema.
- **`src/lib/content.ts`** — `fallbackContent`: the real site content, bundled. Single source of truth when the CMS is empty/unconfigured.
- **`src/lib/getSiteContent.ts`** — `getSanityContent() ?? fallbackContent`. Pages call this.
- **`src/sanity/`** — schema (`schema/`), GROQ fetch (`getSanityContent.ts`), env, image URL builder, Studio config.
- **`src/app/api/seed/route.ts`** — one-time seeder; populates Studio (text + images) from `fallbackContent`.

When you add a content field: update the type, the fallback, the Sanity schema, the GROQ query/mapper, **and** the seed route — keep all five in sync.

## Project Structure
```
src/
  app/
    (site)/         # marketing pages (shared header/footer layout)
    studio/         # embedded Sanity Studio
    api/seed/       # one-time CMS seeder
  components/       # React components (ui/ = shadcn primitives, icons.tsx = SVGs)
  lib/              # content sources + cn() utility
  sanity/           # schema, queries, Studio config
  types/            # TypeScript interfaces
public/images/      # site images (also uploaded into Sanity by the seeder)
docs/               # research notes + design-reference screenshots from the build
```

## Notes
- All work happens on a feature branch and merges to `master` via PR; `master` is the Vercel production branch.
- Editing content in `/studio` and publishing triggers a Vercel deploy hook → production rebuild.
