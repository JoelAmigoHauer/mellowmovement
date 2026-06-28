import Image from "next/image";
import type { ImageRef } from "@/types/content";

interface PageHeroProps {
  title: string;
  image?: ImageRef;
  subtitle?: string;
}

// Standard sub-page header: large coral serif title above an optional wide image.
// Accounts for the fixed transparent header with generous top padding.
export function PageHero({ title, image, subtitle }: PageHeroProps) {
  return (
    <section className="page-inset pt-36 md:pt-44">
      <div className="text-center">
        <h1 className="mx-auto max-w-[900px] text-coral text-[clamp(2.4rem,6vw,4.45rem)] leading-[1.15]">
          {title}
        </h1>
        {subtitle && (
          <p className="mx-auto mt-6 max-w-[640px] text-[18px] text-ink/75">{subtitle}</p>
        )}
      </div>
      {image && (
        <div className="mt-12 overflow-hidden md:mt-16">
          <Image
            src={image.src}
            alt={image.alt}
            width={1500}
            height={844}
            priority
            sizes="100vw"
            className="aspect-[16/9] w-full object-cover"
          />
        </div>
      )}
    </section>
  );
}
