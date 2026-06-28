// Content model for the mellow movement site.
// These interfaces are the contract shared by the React components, the local
// fallback content, and the Sanity CMS schema (see src/sanity/schema).

export interface NavLink {
  label: string;
  href: string;
}

export interface ImageRef {
  src: string;
  alt: string;
}

export interface ServiceCard {
  title: string;
  href: string;
  image: ImageRef;
}

export interface HeroContent {
  headline: string;
}

export interface StoryCta {
  headline: string;
  buttonLabel: string;
  buttonHref: string;
  image: ImageRef;
}

export interface FooterContent {
  brand: string;
  note: string;
  location: string;
  newsletterPrompt: string;
  newsletterCtaLabel: string;
  newsletterHref: string;
  instagramUrl: string;
}

export interface SiteSettings {
  brand: string;
  nav: NavLink[];
  ctaLabel: string;
  ctaHref: string;
}

export interface HomePage {
  hero: HeroContent;
  services: ServiceCard[];
  story: StoryCta;
}

export interface SiteContent {
  settings: SiteSettings;
  home: HomePage;
  footer: FooterContent;
}
