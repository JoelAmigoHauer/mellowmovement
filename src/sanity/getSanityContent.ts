import { sanityClient } from "@/sanity/client";
import { urlForImage } from "@/sanity/image";
import { isSanityConfigured } from "@/sanity/env";
import { fallbackContent } from "@/lib/content";
import type {
  BlogPost,
  ImageRef,
  ServiceItem,
  SiteContent,
} from "@/types/content";

const QUERY = `{
  "settings": *[_type == "siteSettings"][0]{
    brand, nav[]{ label, href }, ctaLabel, ctaHref,
    contactEmail, contactPhone, availability, area
  },
  "home": *[_type == "homePage"][0]{
    heroHeadline, services[]{ title, href, image, alt },
    storyHeadline, storyButtonLabel, storyButtonHref, storyImage, storyImageAlt
  },
  "about": *[_type == "aboutPage"][0]{
    introHeadline, tagline, attribution, bioHeadline, bio, qualifications,
    portrait, hero, ctaHeadline
  },
  "services": *[_type == "servicesPage"][0]{
    headline, specialDeal,
    massage[]{ title, prices, description, healthFund, image },
    yoga[]{ title, prices, description, healthFund, image },
    note, ctaHeadline
  },
  "book": *[_type == "bookPage"][0]{ headline, intro, hero },
  "newsletter": *[_type == "newsletterPage"][0]{ headline, intro, hero },
  "footer": *[_type == "footer"][0]{
    brand, note, location, newsletterPrompt, newsletterCtaLabel, newsletterHref, instagramUrl
  },
  "posts": *[_type == "post"] | order(publishedAt desc){
    title, "slug": slug.current, excerpt, image, body[]{ style, text }
  }
}`;

type Rec = Record<string, unknown>;
type RawImage = { asset?: unknown } | null | undefined;

function image(src: RawImage, alt: string | undefined, fallback: ImageRef): ImageRef {
  if (src && (src as { asset?: unknown }).asset) {
    return { src: urlForImage(src as object), alt: alt || fallback.alt };
  }
  return fallback;
}

function str(v: unknown, fb: string): string {
  return typeof v === "string" && v.length ? v : fb;
}
function strArr(v: unknown, fb: string[]): string[] {
  return Array.isArray(v) && v.length ? (v.filter((x) => typeof x === "string") as string[]) : fb;
}

// Returns CMS-backed content when Sanity is configured and a Home Page exists;
// otherwise null so callers use the bundled fallback. Never throws.
export async function getSanityContent(): Promise<SiteContent | null> {
  if (!isSanityConfigured) return null;

  try {
    const data = await sanityClient.fetch<{
      settings: Rec | null;
      home: Rec | null;
      about: Rec | null;
      services: Rec | null;
      book: Rec | null;
      newsletter: Rec | null;
      footer: Rec | null;
      posts: Rec[] | null;
    }>(QUERY, {}, { next: { revalidate: 60 } });

    if (!data?.home) return null;

    const fb = fallbackContent;
    const s = data.settings ?? {};
    const h = data.home;
    const a = data.about ?? {};
    const sv = data.services ?? {};
    const bk = data.book ?? {};
    const nl = data.newsletter ?? {};
    const f = data.footer ?? {};

    const homeServices = Array.isArray(h.services) && h.services.length
      ? (h.services as Rec[]).map((c, i) => ({
          title: str(c.title, fb.home.services[i]?.title ?? ""),
          href: str(c.href, "/services"),
          image: image(c.image as RawImage, c.alt as string | undefined, fb.home.services[i]?.image ?? fb.home.services[0].image),
        }))
      : fb.home.services;

    const mapItems = (raw: unknown, fbItems: ServiceItem[]): ServiceItem[] =>
      Array.isArray(raw) && raw.length
        ? (raw as Rec[]).map((it, i) => {
            const img = it.image as RawImage;
            return {
              title: str(it.title, fbItems[i]?.title ?? ""),
              prices: strArr(it.prices, fbItems[i]?.prices ?? []),
              description: str(it.description, fbItems[i]?.description ?? ""),
              healthFund: typeof it.healthFund === "boolean" ? it.healthFund : fbItems[i]?.healthFund,
              image: img && img.asset ? { src: urlForImage(img as object), alt: str(it.title, "") } : fbItems[i]?.image,
            };
          })
        : fbItems;

    const posts: BlogPost[] = Array.isArray(data.posts) && data.posts.length
      ? data.posts.map((p, i) => ({
          slug: str(p.slug, fb.posts[i]?.slug ?? String(i)),
          title: str(p.title, ""),
          excerpt: str(p.excerpt, ""),
          image: image(p.image as RawImage, p.title as string | undefined, fb.posts[i]?.image ?? fb.posts[0].image),
          body: Array.isArray(p.body)
            ? (p.body as Rec[]).map((b) => ({
                type: b.style === "h2" ? ("h2" as const) : ("p" as const),
                text: str(b.text, ""),
              }))
            : [],
        }))
      : fb.posts;

    return {
      settings: {
        brand: str(s.brand, fb.settings.brand),
        nav: Array.isArray(s.nav) && s.nav.length ? (s.nav as SiteContent["settings"]["nav"]) : fb.settings.nav,
        ctaLabel: str(s.ctaLabel, fb.settings.ctaLabel),
        ctaHref: str(s.ctaHref, fb.settings.ctaHref),
      },
      home: {
        hero: { headline: str(h.heroHeadline, fb.home.hero.headline) },
        services: homeServices,
        story: {
          headline: str(h.storyHeadline, fb.home.story.headline),
          buttonLabel: str(h.storyButtonLabel, fb.home.story.buttonLabel),
          buttonHref: str(h.storyButtonHref, fb.home.story.buttonHref),
          image: image(h.storyImage as RawImage, h.storyImageAlt as string | undefined, fb.home.story.image),
        },
      },
      footer: {
        brand: str(f.brand, fb.footer.brand),
        note: str(f.note, fb.footer.note),
        location: str(f.location, fb.footer.location),
        newsletterPrompt: str(f.newsletterPrompt, fb.footer.newsletterPrompt),
        newsletterCtaLabel: str(f.newsletterCtaLabel, fb.footer.newsletterCtaLabel),
        newsletterHref: str(f.newsletterHref, fb.footer.newsletterHref),
        instagramUrl: str(f.instagramUrl, fb.footer.instagramUrl),
      },
      contact: {
        email: str(s.contactEmail, fb.contact.email),
        phone: str(s.contactPhone, fb.contact.phone),
        availability: str(s.availability, fb.contact.availability),
        area: str(s.area, fb.contact.area),
      },
      about: {
        introHeadline: str(a.introHeadline, fb.about.introHeadline),
        tagline: str(a.tagline, fb.about.tagline),
        attribution: str(a.attribution, fb.about.attribution),
        bioHeadline: str(a.bioHeadline, fb.about.bioHeadline),
        bio: strArr(a.bio, fb.about.bio),
        qualifications: strArr(a.qualifications, fb.about.qualifications),
        portrait: image(a.portrait as RawImage, fb.about.portrait.alt, fb.about.portrait),
        hero: image(a.hero as RawImage, fb.about.hero.alt, fb.about.hero),
        ctaHeadline: str(a.ctaHeadline, fb.about.ctaHeadline),
      },
      services: {
        headline: str(sv.headline, fb.services.headline),
        specialDeal: str(sv.specialDeal, fb.services.specialDeal),
        hero: fb.services.hero,
        massage: mapItems(sv.massage, fb.services.massage),
        yoga: mapItems(sv.yoga, fb.services.yoga),
        note: str(sv.note, fb.services.note),
        ctaHeadline: str(sv.ctaHeadline, fb.services.ctaHeadline),
      },
      book: {
        headline: str(bk.headline, fb.book.headline),
        intro: strArr(bk.intro, fb.book.intro),
        hero: image(bk.hero as RawImage, fb.book.hero.alt, fb.book.hero),
      },
      newsletter: {
        headline: str(nl.headline, fb.newsletter.headline),
        intro: strArr(nl.intro, fb.newsletter.intro),
        hero: image(nl.hero as RawImage, fb.newsletter.hero.alt, fb.newsletter.hero),
      },
      posts,
    };
  } catch {
    return null;
  }
}
