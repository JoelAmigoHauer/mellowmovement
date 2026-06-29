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

export interface ContactInfo {
  email: string;
  phone: string;
  availability: string;
  area: string;
}

export interface AboutPage {
  introHeadline: string;
  tagline: string;
  attribution: string;
  bioHeadline: string;
  bio: string[];
  qualifications: string[];
  portrait: ImageRef;
  hero: ImageRef;
  ctaHeadline: string;
}

export interface ServiceItem {
  title: string;
  prices: string[];
  description: string;
  healthFund?: boolean;
  image?: ImageRef;
}

export interface ServicesPage {
  headline: string;
  specialDeal: string;
  hero: ImageRef;
  massage: ServiceItem[];
  yoga: ServiceItem[];
  note: string;
  ctaHeadline: string;
}

export interface SimplePage {
  headline: string;
  intro: string[];
  hero: ImageRef;
}

export interface BlogPostBlock {
  type: "h2" | "p";
  text: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  image: ImageRef;
  body: BlogPostBlock[];
}

export interface SiteContent {
  settings: SiteSettings;
  home: HomePage;
  footer: FooterContent;
  contact: ContactInfo;
  about: AboutPage;
  services: ServicesPage;
  book: SimplePage;
  newsletter: SimplePage;
  posts: BlogPost[];
}
