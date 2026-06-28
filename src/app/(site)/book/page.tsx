import type { Metadata } from "next";
import Image from "next/image";
import { getSiteContent } from "@/lib/getSiteContent";
import { ContactForm } from "@/components/forms";

export const metadata: Metadata = {
  title: "Book — mellow movement",
  description: "Book a mobile massage or yoga appointment with Niki in Sydney's Eastern Suburbs.",
};

export default async function BookPage() {
  const { book, contact } = await getSiteContent();

  return (
    <main className="flex-1">
      <section className="page-inset grid grid-cols-1 items-center gap-12 pt-36 pb-16 md:grid-cols-2 md:gap-16 md:pt-44 md:pb-24">
        <div>
          <h1 className="text-coral text-[clamp(2.4rem,5.5vw,4rem)] leading-[1.15]">
            {book.headline}
          </h1>
          <div className="mt-6 space-y-4 text-[18px] leading-[1.7] text-ink/85">
            {book.intro.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          <div className="mt-8 space-y-2 text-[18px]">
            <p>
              <span className="text-ink/60">Call or text: </span>
              <a href={`tel:${contact.phone.replace(/\s/g, "")}`} className="text-coral hover:underline">
                {contact.phone}
              </a>
            </p>
            <p>
              <span className="text-ink/60">Email: </span>
              <a href={`mailto:${contact.email}`} className="text-coral hover:underline">
                {contact.email}
              </a>
            </p>
          </div>
        </div>

        <div className="overflow-hidden">
          <Image
            src={book.hero.src}
            alt={book.hero.alt}
            width={1000}
            height={1250}
            priority
            sizes="(max-width: 768px) 100vw, 45vw"
            className="aspect-[4/5] w-full object-cover"
          />
        </div>
      </section>

      <section className="bg-secondary/40 py-16 md:py-24">
        <div className="page-inset mx-auto max-w-2xl">
          <h2 className="mb-6 text-center text-2xl text-ink">Request a time</h2>
          <ContactForm email={contact.email} />
        </div>
      </section>
    </main>
  );
}
