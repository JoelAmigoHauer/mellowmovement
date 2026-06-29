import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/PageHero";
import { CtaBanner } from "@/components/CtaBanner";
import { getSiteContent } from "@/lib/getSiteContent";

export const metadata: Metadata = {
  title: "About — mellow movement",
  description:
    "Niki Hauer, clinical yoga & massage therapist. Mellow Movement was founded to bring a little extra bliss to your life.",
};

export default async function AboutPage() {
  const { about } = await getSiteContent();

  return (
    <main className="flex-1">
      <PageHero title={about.introHeadline} image={about.hero} />

      {/* Tagline */}
      <section className="page-inset py-16 text-center md:py-24">
        <p className="mx-auto max-w-[820px] text-coral text-[clamp(1.6rem,4vw,2.6rem)] leading-[1.3]">
          {about.tagline}
        </p>
        <p className="mt-6 text-[16px] tracking-wide text-ink/70">{about.attribution}</p>
      </section>

      {/* Bio */}
      <section className="page-inset grid grid-cols-1 gap-12 pb-20 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:items-start md:gap-16">
        <div className="overflow-hidden md:sticky md:top-28">
          <Image
            src={about.portrait.src}
            alt={about.portrait.alt}
            width={1000}
            height={1333}
            sizes="(max-width: 768px) 100vw, 40vw"
            className="aspect-[3/4] w-full object-cover"
          />
        </div>
        <div>
          <h2 className="text-coral text-[clamp(1.8rem,3.5vw,2.6rem)]">{about.bioHeadline}</h2>
          <div className="mt-6 space-y-5 text-[17px] leading-[1.7] text-ink/85">
            {about.bio.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

          <h3 className="mt-12 text-2xl text-ink">Qualifications</h3>
          <ul className="mt-5 space-y-2.5 text-[16px] text-ink/80">
            {about.qualifications.map((q) => (
              <li key={q} className="flex gap-3">
                <span className="text-coral">·</span>
                <span>{q}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBanner headline={about.ctaHeadline} />
    </main>
  );
}
