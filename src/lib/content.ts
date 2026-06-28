import type { SiteContent } from "@/types/content";

// Real content extracted from https://www.mellowmovement.com.au/
// Used as the fallback/seed when the Sanity CMS has no published document yet.
export const fallbackContent: SiteContent = {
  settings: {
    brand: "mellow movement",
    nav: [
      { label: "Mobile Massage & Yoga", href: "/services" },
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Blog", href: "/blog" },
    ],
    ctaLabel: "Book Appointment",
    ctaHref: "/book",
  },
  home: {
    hero: {
      headline:
        "Find your calm with mobile yoga and massage. Relax and be comfortable in your own space.",
    },
    services: [
      {
        title: "Massage",
        href: "/services",
        image: { src: "/images/massage.webp", alt: "Relaxing mobile massage treatment" },
      },
      {
        title: "Yoga",
        href: "/services",
        image: { src: "/images/yoga.webp", alt: "Private mobile yoga session" },
      },
    ],
    story: {
      headline:
        "Yoga and massage that will mellow your mind and bliss out your body.",
      buttonLabel: "Our Story",
      buttonHref: "/about",
      image: { src: "/images/our-story.webp", alt: "Mellow movement session" },
    },
  },
  footer: {
    brand: "mellow movement",
    note: "Gift vouchers available! Ask for more info.",
    location:
      "Mobile massage and yoga in the Eastern Suburbs, Niki is based in Bondi.",
    newsletterPrompt: "Stay in the Loop",
    newsletterCtaLabel: "Sign up for our newsletter",
    newsletterHref: "/newsletter",
    instagramUrl: "https://www.instagram.com/mellowmovementau/",
  },
};
