import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { ContactForm } from "@/components/forms";
import { getSiteContent } from "@/lib/getSiteContent";

export const metadata: Metadata = {
  title: "Contact — mellow movement",
  description: "Get in touch with Niki for mobile massage and yoga in Sydney's Eastern Suburbs.",
};

export default async function ContactPage() {
  const { contact } = await getSiteContent();

  return (
    <main className="flex-1">
      <PageHero title="Ready to mellow out with us?" subtitle={contact.availability} />

      <section className="page-inset grid grid-cols-1 gap-14 py-16 md:grid-cols-2 md:gap-20 md:py-24">
        <div className="space-y-8">
          <div>
            <p className="text-[14px] uppercase tracking-[0.18em] text-ink/50">Email</p>
            <a href={`mailto:${contact.email}`} className="mt-1 block text-coral text-[clamp(1.3rem,2.2vw,1.7rem)] hover:underline">
              {contact.email}
            </a>
          </div>
          <div>
            <p className="text-[14px] uppercase tracking-[0.18em] text-ink/50">Call or Text</p>
            <a href={`tel:${contact.phone.replace(/\s/g, "")}`} className="mt-1 block text-coral text-[clamp(1.3rem,2.2vw,1.7rem)] hover:underline">
              {contact.phone}
            </a>
          </div>
          <p className="max-w-sm text-[17px] leading-[1.6] text-ink/75">{contact.area}</p>
        </div>

        <div>
          <h2 className="mb-6 text-2xl text-ink">Send an enquiry</h2>
          <ContactForm email={contact.email} />
        </div>
      </section>
    </main>
  );
}
