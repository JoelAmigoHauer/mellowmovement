import type { SiteContent } from "@/types/content";
import { fallbackContent } from "@/lib/content";
import { getSanityContent } from "@/sanity/getSanityContent";

// Single source of truth for page content. Reads from Sanity when configured
// and published; otherwise falls back to the bundled real content.
export async function getSiteContent(): Promise<SiteContent> {
  const fromCms = await getSanityContent();
  return fromCms ?? fallbackContent;
}
