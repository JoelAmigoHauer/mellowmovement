import { NextResponse } from "next/server";
import { createClient } from "@sanity/client";
import { fallbackContent } from "@/lib/content";
import { projectId, dataset, apiVersion } from "@/sanity/env";

// One-time content seeder. Runs server-side on Vercel using the Sanity write
// token from the environment, so no secret needs to be shared. Seeds text
// content for every page + the blog posts; images fall back to the bundled
// local assets and can be uploaded later in /studio.
//
// Trigger once:  /api/seed?secret=<SEED_SECRET>
// Guard: requires ?secret to match env SEED_SECRET (default "mellow-seed").
export const runtime = "nodejs";

const key = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "").slice(0, 40) || "k";

export async function GET(request: Request) {
  const secret = new URL(request.url).searchParams.get("secret");
  const expected = process.env.SEED_SECRET || "mellow-seed";
  if (secret !== expected) {
    return NextResponse.json({ ok: false, error: "Invalid or missing ?secret" }, { status: 401 });
  }

  const token = process.env.SANITY_API_WRITE_TOKEN || process.env.VERCEL_SANITY_KEY;
  if (!projectId || !token) {
    return NextResponse.json(
      { ok: false, error: "Missing NEXT_PUBLIC_SANITY_PROJECT_ID or write token (SANITY_API_WRITE_TOKEN / VERCEL_SANITY_KEY)." },
      { status: 400 },
    );
  }

  const client = createClient({ projectId, dataset, apiVersion, token, useCdn: false });
  const c = fallbackContent;

  type SeedDoc = { _id: string; _type: string; [key: string]: unknown };

  try {
    const docs: SeedDoc[] = [
      {
        _id: "siteSettings",
        _type: "siteSettings",
        brand: c.settings.brand,
        nav: c.settings.nav.map((n) => ({ _type: "navLink", _key: key(n.label), ...n })),
        ctaLabel: c.settings.ctaLabel,
        ctaHref: c.settings.ctaHref,
        contactEmail: c.contact.email,
        contactPhone: c.contact.phone,
        availability: c.contact.availability,
        area: c.contact.area,
      },
      {
        _id: "homePage",
        _type: "homePage",
        heroHeadline: c.home.hero.headline,
        services: c.home.services.map((s) => ({ _type: "serviceCard", _key: key(s.title), title: s.title, href: s.href, alt: s.image.alt })),
        storyHeadline: c.home.story.headline,
        storyButtonLabel: c.home.story.buttonLabel,
        storyButtonHref: c.home.story.buttonHref,
        storyImageAlt: c.home.story.image.alt,
      },
      {
        _id: "aboutPage",
        _type: "aboutPage",
        introHeadline: c.about.introHeadline,
        tagline: c.about.tagline,
        attribution: c.about.attribution,
        bioHeadline: c.about.bioHeadline,
        bio: c.about.bio,
        qualifications: c.about.qualifications,
        ctaHeadline: c.about.ctaHeadline,
      },
      {
        _id: "servicesPage",
        _type: "servicesPage",
        headline: c.services.headline,
        specialDeal: c.services.specialDeal,
        massage: c.services.massage.map((s) => ({ _type: "serviceItem", _key: key(s.title), title: s.title, prices: s.prices, description: s.description, healthFund: !!s.healthFund })),
        yoga: c.services.yoga.map((s) => ({ _type: "serviceItem", _key: key(s.title), title: s.title, prices: s.prices, description: s.description, healthFund: !!s.healthFund })),
        note: c.services.note,
        ctaHeadline: c.services.ctaHeadline,
      },
      { _id: "bookPage", _type: "bookPage", headline: c.book.headline, intro: c.book.intro },
      { _id: "newsletterPage", _type: "newsletterPage", headline: c.newsletter.headline, intro: c.newsletter.intro },
      {
        _id: "footer",
        _type: "footer",
        brand: c.footer.brand,
        note: c.footer.note,
        location: c.footer.location,
        newsletterPrompt: c.footer.newsletterPrompt,
        newsletterCtaLabel: c.footer.newsletterCtaLabel,
        newsletterHref: c.footer.newsletterHref,
        instagramUrl: c.footer.instagramUrl,
      },
      ...c.posts.map((p) => ({
        _id: `post-${p.slug}`,
        _type: "post",
        title: p.title,
        slug: { _type: "slug", current: p.slug },
        excerpt: p.excerpt,
        body: p.body.map((b) => ({ _type: "postBlock", _key: key(b.text), style: b.type, text: b.text })),
        publishedAt: new Date("2023-01-01").toISOString(),
      })),
    ];

    let tx = client.transaction();
    for (const doc of docs) tx = tx.createOrReplace(doc);
    await tx.commit();

    return NextResponse.json({ ok: true, seeded: docs.map((d) => d._id) });
  } catch (e) {
    return NextResponse.json({ ok: false, error: (e as Error).message }, { status: 500 });
  }
}
