import { sanityClient } from "@/sanity/client";
import { urlForImage } from "@/sanity/image";
import { isSanityConfigured } from "@/sanity/env";
import { fallbackContent } from "@/lib/content";
import type { ImageRef, SiteContent } from "@/types/content";

const QUERY = `{
  "settings": *[_type == "siteSettings"][0]{ brand, nav[]{ label, href }, ctaLabel, ctaHref },
  "home": *[_type == "homePage"][0]{
    heroHeadline,
    services[]{ title, href, image, alt },
    storyHeadline, storyButtonLabel, storyButtonHref, storyImage, storyImageAlt
  },
  "footer": *[_type == "footer"][0]{
    brand, note, location, newsletterPrompt, newsletterCtaLabel, newsletterHref, instagramUrl
  }
}`;

type RawImage = { asset?: unknown } | null | undefined;

function image(src: RawImage, alt: string | undefined, fallback: ImageRef): ImageRef {
  if (src && (src as { asset?: unknown }).asset) {
    return { src: urlForImage(src as object), alt: alt || fallback.alt };
  }
  return fallback;
}

// Returns CMS-backed content when Sanity is configured and a Home Page document
// exists; otherwise null so callers can use the bundled fallback. Never throws.
export async function getSanityContent(): Promise<SiteContent | null> {
  if (!isSanityConfigured) return null;

  try {
    const data = await sanityClient.fetch<{
      settings: Record<string, unknown> | null;
      home: Record<string, unknown> | null;
      footer: Record<string, unknown> | null;
    }>(QUERY, {}, { next: { revalidate: 60 } });

    if (!data?.home) return null;

    const fb = fallbackContent;
    const s = data.settings ?? {};
    const h = data.home;
    const f = data.footer ?? {};

    const rawServices = Array.isArray(h.services) ? (h.services as Record<string, unknown>[]) : [];
    const services = rawServices.length
      ? rawServices.map((sv, i) => ({
          title: (sv.title as string) ?? fb.home.services[i]?.title ?? "",
          href: (sv.href as string) ?? "/services",
          image: image(sv.image as RawImage, sv.alt as string | undefined, fb.home.services[i]?.image ?? fb.home.services[0].image),
        }))
      : fb.home.services;

    return {
      settings: {
        brand: (s.brand as string) ?? fb.settings.brand,
        nav: Array.isArray(s.nav) && s.nav.length ? (s.nav as SiteContent["settings"]["nav"]) : fb.settings.nav,
        ctaLabel: (s.ctaLabel as string) ?? fb.settings.ctaLabel,
        ctaHref: (s.ctaHref as string) ?? fb.settings.ctaHref,
      },
      home: {
        hero: { headline: (h.heroHeadline as string) ?? fb.home.hero.headline },
        services,
        story: {
          headline: (h.storyHeadline as string) ?? fb.home.story.headline,
          buttonLabel: (h.storyButtonLabel as string) ?? fb.home.story.buttonLabel,
          buttonHref: (h.storyButtonHref as string) ?? fb.home.story.buttonHref,
          image: image(h.storyImage as RawImage, h.storyImageAlt as string | undefined, fb.home.story.image),
        },
      },
      footer: {
        brand: (f.brand as string) ?? fb.footer.brand,
        note: (f.note as string) ?? fb.footer.note,
        location: (f.location as string) ?? fb.footer.location,
        newsletterPrompt: (f.newsletterPrompt as string) ?? fb.footer.newsletterPrompt,
        newsletterCtaLabel: (f.newsletterCtaLabel as string) ?? fb.footer.newsletterCtaLabel,
        newsletterHref: (f.newsletterHref as string) ?? fb.footer.newsletterHref,
        instagramUrl: (f.instagramUrl as string) ?? fb.footer.instagramUrl,
      },
    };
  } catch {
    return null;
  }
}
