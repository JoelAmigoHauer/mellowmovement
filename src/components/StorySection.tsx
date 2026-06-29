import Link from "next/link";
import Image from "next/image";
import type { StoryCta } from "@/types/content";

interface StorySectionProps {
  story: StoryCta;
}

// Full-bleed photo on black with a centered white statement and coral CTA.
export function StorySection({ story }: StorySectionProps) {
  return (
    <section className="relative isolate flex min-h-[594px] items-center justify-center overflow-hidden bg-black py-24 text-center">
      <Image
        src={story.image.src}
        alt={story.image.alt}
        fill
        sizes="100vw"
        className="-z-10 object-cover opacity-80"
        priority={false}
      />
      <div className="absolute inset-0 -z-10 bg-black/30" />
      <div className="page-inset flex flex-col items-center gap-10">
        <h1 className="mx-auto max-w-[1000px] text-white text-[clamp(2.2rem,6vw,4.45rem)] leading-[1.22]">
          {story.headline}
        </h1>
        <Link
          href={story.buttonHref}
          className="bg-coral px-9 py-4 text-[15px] text-white transition-opacity hover:opacity-90"
        >
          {story.buttonLabel}
        </Link>
      </div>
    </section>
  );
}
