import { NextResponse } from "next/server";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { createClient, type SanityClient } from "@sanity/client";
import { fallbackContent } from "@/lib/content";
import { projectId, dataset, apiVersion } from "@/sanity/env";

// One-time content seeder. Runs server-side on Vercel using the Sanity write
// token from the environment, so no secret needs to be shared. Seeds text
// content AND uploads the extracted images for every page + the blog posts, so
// Studio comes up fully populated and every image is editable in place.
//
// Trigger once:  /api/seed?secret=<SEED_SECRET>
// Guard: requires ?secret to match env SEED_SECRET (default "mellow-seed").
export const runtime = "nodejs";
export const maxDuration = 60;

const key = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "").slice(0, 40) || "k";

type ImageRefValue = { _type: "image"; asset: { _type: "reference"; _ref: string } };

// Upload a bundled public/ image to Sanity once (cached by path) and return an
// image reference. Tolerant: returns undefined if a file is missing so seeding
// still succeeds and that field simply falls back to the local asset.
function makeImageUploader(client: SanityClient) {
  const cache = new Map<string, ImageRefValue | undefined>();
  return async function image(publicSrc: string | undefined): Promise<ImageRefValue | undefined> {
    if (!publicSrc) return undefined;
    const rel = publicSrc.replace(/^\//, "");
    if (cache.has(rel)) return cache.get(rel);
    try {
      const buf = await readFile(join(process.cwd(), "public", rel));
      const asset = await client.assets.upload("image", buf, { filename: rel.split("/").pop() });
      const ref: ImageRefValue = { _type: "image", asset: { _type: "reference", _ref: asset._id } };
      cache.set(rel, ref);
      return ref;
    } catch {
      cache.set(rel, undefined);
      return undefined;
    }
  };
}

// Photos for each service, mapped by title (service items carry no image in the
// bundled content — the page maps them by title, so the seeder mirrors that).
const SERVICE_IMAGE: Record<string, string> = {
  "Remedial Massage": "/images/pages/svc-remedial.webp",
  "Pre & Post Pregnancy Massage": "/images/pages/svc-pregnancy.webp",
  "Swedish Massage": "/images/pages/svc-swedish.webp",
  "Private Yoga": "/images/pages/svc-private-yoga.webp",
  "Group / Family Yoga": "/images/pages/svc-group-yoga.webp",
  "Corporate Yoga": "/images/pages/svc-corporate.webp",
};

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
  const image = makeImageUploader(client);
  const c = fallbackContent;

  type SeedDoc = { _id: string; _type: string; [key: string]: unknown };

  try {
    // Upload images first so each can be referenced from the documents below.
    const homeServices = await Promise.all(
      c.home.services.map(async (s) => ({
        _type: "serviceCard",
        _key: key(s.title),
        title: s.title,
        href: s.href,
        alt: s.image.alt,
        image: await image(s.image.src),
      })),
    );
    const storyImage = await image(c.home.story.image.src);
    const aboutPortrait = await image(c.about.portrait.src);
    const aboutHero = await image(c.about.hero.src);
    const bookHero = await image(c.book.hero.src);
    const newsletterHero = await image(c.newsletter.hero.src);

    const mapServices = (items: typeof c.services.massage) =>
      Promise.all(
        items.map(async (s) => ({
          _type: "serviceItem",
          _key: key(s.title),
          title: s.title,
          prices: s.prices,
          description: s.description,
          healthFund: !!s.healthFund,
          image: await image(s.image?.src ?? SERVICE_IMAGE[s.title]),
        })),
      );
    const massage = await mapServices(c.services.massage);
    const yoga = await mapServices(c.services.yoga);

    const posts = await Promise.all(
      c.posts.map(async (p) => ({
        _id: `post-${p.slug}`,
        _type: "post",
        title: p.title,
        slug: { _type: "slug", current: p.slug },
        excerpt: p.excerpt,
        image: await image(p.image.src),
        body: p.body.map((b) => ({ _type: "postBlock", _key: key(b.text), style: b.type, text: b.text })),
        publishedAt: new Date("2023-01-01").toISOString(),
      })),
    );

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
        services: homeServices,
        storyHeadline: c.home.story.headline,
        storyButtonLabel: c.home.story.buttonLabel,
        storyButtonHref: c.home.story.buttonHref,
        storyImage,
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
        portrait: aboutPortrait,
        hero: aboutHero,
        ctaHeadline: c.about.ctaHeadline,
      },
      {
        _id: "servicesPage",
        _type: "servicesPage",
        headline: c.services.headline,
        specialDeal: c.services.specialDeal,
        massage,
        yoga,
        note: c.services.note,
        ctaHeadline: c.services.ctaHeadline,
      },
      { _id: "bookPage", _type: "bookPage", headline: c.book.headline, intro: c.book.intro, hero: bookHero },
      { _id: "newsletterPage", _type: "newsletterPage", headline: c.newsletter.headline, intro: c.newsletter.intro, hero: newsletterHero },
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
      ...posts,
    ];

    let tx = client.transaction();
    for (const doc of docs) tx = tx.createOrReplace(doc);
    await tx.commit();

    return NextResponse.json({ ok: true, seeded: docs.map((d) => d._id) });
  } catch (e) {
    return NextResponse.json({ ok: false, error: (e as Error).message }, { status: 500 });
  }
}
