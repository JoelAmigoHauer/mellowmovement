import Link from "next/link";
import Image from "next/image";
import { ArrowRightIcon } from "@/components/icons";
import { cn } from "@/lib/utils";
import type { ServiceCard } from "@/types/content";

interface ServicesSectionProps {
  services: ServiceCard[];
}

function Heading({ title }: { title: string }) {
  return (
    <h2 className="flex items-center gap-4 text-coral text-[clamp(1.9rem,4vw,3.05rem)]">
      {title}
      <ArrowRightIcon className="h-3 w-9 shrink-0 transition-transform duration-300 group-hover:translate-x-1.5" />
    </h2>
  );
}

// Staggered two-column editorial grid. The left card shows image→label; the
// right card shows label→image and rides higher, mirroring the original
// Squarespace fluid-engine stagger.
export function ServicesSection({ services }: ServicesSectionProps) {
  return (
    <section className="page-inset py-12 md:py-20">
      <div className="grid grid-cols-1 gap-x-16 gap-y-14 md:grid-cols-2 md:items-start">
        {services.map((service, i) => {
          const labelFirst = i % 2 === 1; // right column: label on top
          return (
            <Link
              key={service.title}
              href={service.href}
              className={cn(
                "group flex flex-col gap-6 md:max-w-[532px]",
                labelFirst ? "md:mt-2 md:justify-self-end" : "md:mt-24",
              )}
            >
              {labelFirst && <Heading title={service.title} />}
              <div className="overflow-hidden">
                <Image
                  src={service.image.src}
                  alt={service.image.alt}
                  width={i % 2 === 0 ? 2000 : 1000}
                  height={i % 2 === 0 ? 3000 : 1333}
                  className="aspect-[2/3] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  sizes="(max-width: 768px) 100vw, 40vw"
                  priority={i === 0}
                />
              </div>
              {!labelFirst && <Heading title={service.title} />}
            </Link>
          );
        })}
      </div>
    </section>
  );
}
