# mellow movement — Reverse-Engineering Notes

**Target:** https://www.mellowmovement.com.au/
**Platform:** Squarespace 7.1 (template `5c5a519771c10ba3470d8101`), site id `5f7f09e27ce8ec631ac82614`
**Business:** Niki — mobile massage & yoga in Sydney's Eastern Suburbs (based in Bondi, NSW, AU).
**Instagram:** https://www.instagram.com/mellowmovementau/

> Recon performed by mirroring the live HTML + CSS + images locally (curl through the egress
> proxy) and rendering with Chromium against a local server. Computed styles in `computed.json`,
> assets in `assets.json`, screenshots in `docs/design-references/mellowmovement/`.

## Design Tokens (exact, from getComputedStyle)
- **Background (page):** `rgb(253, 240, 230)` → `#FDF0E6` (warm cream)
- **Accent / brand:** `rgb(240, 142, 128)` → `#F08E80` (coral / salmon)
- **Dark section bg:** `#000000` (full-bleed image overlays on black)
- **Text on light:** `#000000`; **text on dark/coral:** `#FFFFFF`
- **Body font:** `minion-pro` (serif) → web substitute **Source Serif 4**
- **Heading font:** `kings-caslon-display` (serif) → web substitute **Libre Caslon Display**
- **Meta font:** `big-caslon-fb` → substitute Libre Caslon Text / Source Serif 4
- Layout: max page width **1700px**, page padding **4vw**, header inset, fixed + transparent header ("scroll back").

## Type scale (desktop, 1440px)
- Hero H2: 48.8px / 400, line-height 63.2px, color coral, centered
- Section heading H2 ("Massage ⟶", "Yoga ⟶"): 48.8px / 400, coral, left-aligned
- Big statement H1 (section 3): 71.3px / 400, line-height 87px, white, centered
- Logo (text): kings-caslon-display, 33.3px / 400, coral

## Page Topology (top → bottom)
1. **Header** (116px, transparent, fixed): logo "mellow movement" (left, coral serif) · centered nav · "Book Appointment" coral button (right).
2. **Hero** (section `…a43d`, ~442px): centered coral headline — *"Find your calm with mobile yoga and massage. Relax and be comfortable in your own space."* padding-top 100px.
3. **Services** (section `…a43f`, ~1007px): staggered editorial two-column grid:
   - Left/lower: portrait photo (massage) + **"Massage ⟶"** heading → `/services`
   - Right/upper: portrait photo (yoga) + **"Yoga ⟶"** heading → `/services`
4. **Story CTA** (section `…a441`, ~594px): full-bleed background photo on black, centered white headline *"Yoga and massage that will mellow your mind and bliss out your body."* + coral **"Our Story"** button → `/about`.
5. **Footer** (section `…265e`, ~297px): "mellow movement" · "Gift vouchers available! Ask for more info." · "Mobile massage and yoga in the Eastern Suburbs, Niki is based in Bondi." · "Stay in the Loop — Sign up for our newsletter" → `/newsletter`. Instagram link.

## Navigation
- Mobile Massage & Yoga → `/services`
- About → `/about`
- Contact → `/contact`
- Blog → `/blog`
- Book Appointment (button) → `/book`

## Assets (saved to public/images/)
- `massage.webp` — portrait, 1V0A8565 (massage closeup)
- `yoga.webp` — portrait, 1V0A9302 (yoga pose)
- `our-story.webp` — landscape 2400×1600, full-bleed story background

## Interaction notes
- Header: fixed, "scroll back" style (reappears on scroll up), transparent over hero.
- Section headings link with a trailing `⟶` arrow (coral).
- Global animations were disabled in tweak settings (`tweak-global-animations-enabled: false`) → subtle/none. Keep transitions gentle.
