import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/PageHero";
import { CtaBanner } from "@/components/CtaBanner";
import { getSiteContent } from "@/lib/getSiteContent";
import type { ServiceItem } from "@/types/content";

export const metadata: Metadata = {
  title: "Mobile Massage & Yoga — mellow movement",
  description:
    "Remedial, pregnancy and Swedish massage plus private, group and corporate yoga — mobile in Sydney's Eastern Suburbs.",
};

// Photos for each service, mapped by title.
const SERVICE_IMAGE: Record<string, string> = {
  "Remedial Massage": "/images/pages/svc-remedial.webp",
  "Pre & Post Pregnancy Massage": "/images/pages/svc-pregnancy.webp",
  "Swedish Massage": "/images/pages/svc-swedish.webp",
  "Private Yoga": "/images/pages/svc-private-yoga.webp",
  "Group / Family Yoga": "/images/pages/svc-group-yoga.webp",
  "Corporate Yoga": "/images/pages/svc-corporate.webp",
};

function ServiceCard({ item }: { item: ServiceItem }) {
  const img = item.image?.src ?? SERVICE_IMAGE[item.title];
  return (
    <article className="flex flex-col">
      {img && (
        <div className="overflow-hidden">
          <Image
            src={img}
            alt={item.title}
            width={900}
            height={675}
            sizes="(max-width: 768px) 100vw, 33vw"
            className="aspect-[4/3] w-full object-cover"
          />
        </div>
      )}
      <h3 className="mt-5 text-coral text-[clamp(1.4rem,2.4vw,1.9rem)]">{item.title}</h3>
      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[15px] font-[family-name:var(--font-heading)] text-ink">
        {item.prices.map((p) => (
          <span key={p}>{p}</span>
        ))}
      </div>
      <p className="mt-3 text-[16px] leading-[1.6] text-ink/80">{item.description}</p>
      {item.healthFund && (
        <p className="mt-3 text-[14px] italic text-ink/55">
          Health fund rebates available, ask for more info.
        </p>
      )}
    </article>
  );
}

function Group({ title, items }: { title: string; items: ServiceItem[] }) {
  return (
    <div className="page-inset py-10 md:py-14">
      <h2 className="mb-10 text-coral text-[clamp(2rem,4vw,3rem)]">{title}</h2>
      <div className="grid grid-cols-1 gap-x-12 gap-y-14 md:grid-cols-3">
        {items.map((item) => (
          <ServiceCard key={item.title} item={item} />
        ))}
      </div>
    </div>
  );
}

export default async function ServicesPage() {
  const { services } = await getSiteContent();

  return (
    <main className="flex-1">
      <PageHero title={services.headline} />

      <section className="page-inset pt-12">
        <p className="mx-auto max-w-[820px] rounded-sm bg-secondary/70 px-6 py-5 text-center text-[16px] leading-[1.6] text-ink/85">
          {services.specialDeal}
        </p>
      </section>

      <Group title="Massage" items={services.massage} />
      <Group title="Yoga" items={services.yoga} />

      <p className="page-inset pb-16 text-center text-[15px] italic text-ink/60">
        {services.note}
      </p>

      <CtaBanner headline={services.ctaHeadline} />
    </main>
  );
}
