import type { HeroContent } from "@/types/content";

interface HeroSectionProps {
  hero: HeroContent;
}

export function HeroSection({ hero }: HeroSectionProps) {
  return (
    <section className="page-inset pt-40 pb-12 text-center md:pt-48 md:pb-16">
      <h2 className="mx-auto max-w-[680px] text-coral text-[clamp(1.9rem,5vw,3.05rem)] leading-[1.3]">
        {hero.headline}
      </h2>
    </section>
  );
}
