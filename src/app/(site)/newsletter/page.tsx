import type { Metadata } from "next";
import Image from "next/image";
import { getSiteContent } from "@/lib/getSiteContent";
import { NewsletterForm } from "@/components/forms";

export const metadata: Metadata = {
  title: "Newsletter — mellow movement",
  description: "Sign up for the mellow movement newsletter.",
};

export default async function NewsletterPage() {
  const { newsletter, contact } = await getSiteContent();

  return (
    <main className="flex-1">
      <section className="page-inset grid grid-cols-1 items-center gap-12 pt-36 pb-20 md:grid-cols-2 md:gap-16 md:pt-44 md:pb-28">
        <div className="overflow-hidden md:order-1">
          <Image
            src={newsletter.hero.src}
            alt={newsletter.hero.alt}
            width={1000}
            height={1100}
            priority
            sizes="(max-width: 768px) 100vw, 45vw"
            className="aspect-[10/11] w-full object-cover"
          />
        </div>
        <div>
          <h1 className="text-coral text-[clamp(2.4rem,5.5vw,4rem)] leading-[1.15]">
            {newsletter.headline}
          </h1>
          <div className="mt-6 space-y-4 text-[18px] leading-[1.7] text-ink/85">
            {newsletter.intro.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <div className="mt-8">
            <NewsletterForm email={contact.email} />
          </div>
        </div>
      </section>
    </main>
  );
}
