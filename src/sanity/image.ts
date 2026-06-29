import { createImageUrlBuilder } from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";
import { sanityClient } from "@/sanity/client";

const builder = createImageUrlBuilder(sanityClient);

export function urlForImage(source: SanityImageSource): string {
  return builder.image(source).auto("format").fit("max").url();
}
