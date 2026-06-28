import Link from "next/link";
import { InstagramIcon } from "@/components/icons";
import type { FooterContent } from "@/types/content";

interface SiteFooterProps {
  footer: FooterContent;
}

export function SiteFooter({ footer }: SiteFooterProps) {
  return (
    <footer className="bg-cream py-16 md:py-20">
      <div className="page-inset grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">
        <div className="space-y-4">
          <p className="font-[family-name:var(--font-heading)] text-2xl text-coral md:text-3xl">
            {footer.brand}
          </p>
          <Link
            href={footer.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-ink/70 transition-colors hover:text-coral"
            aria-label="Instagram"
          >
            <InstagramIcon className="h-5 w-5" />
            <span className="text-sm">@mellowmovementau</span>
          </Link>
        </div>

        <div className="space-y-3 text-ink/80">
          <p className="text-[17px]">{footer.note}</p>
          <p className="text-[17px]">{footer.location}</p>
        </div>

        <div className="space-y-3">
          <p className="font-[family-name:var(--font-heading)] text-xl text-ink">
            {footer.newsletterPrompt}
          </p>
          <Link
            href={footer.newsletterHref}
            className="arrow-link inline-block text-[17px] underline-offset-4 hover:underline"
          >
            {footer.newsletterCtaLabel}
          </Link>
        </div>
      </div>

      <div className="page-inset mt-14 border-t border-border/60 pt-6 text-sm text-ink/50">
        © {new Date().getFullYear()} {footer.brand}. Mobile massage & yoga · Bondi, NSW.
      </div>
    </footer>
  );
}
