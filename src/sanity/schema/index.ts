import { defineType, defineField, defineArrayMember } from "sanity";

/* ---------- reusable objects ---------- */

const navLink = defineType({
  name: "navLink",
  title: "Navigation Link",
  type: "object",
  fields: [
    defineField({ name: "label", type: "string", validation: (r) => r.required() }),
    defineField({ name: "href", type: "string", validation: (r) => r.required() }),
  ],
  preview: { select: { title: "label", subtitle: "href" } },
});

const serviceCard = defineType({
  name: "serviceCard",
  title: "Service Card",
  type: "object",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "href", type: "string", initialValue: "/services" }),
    defineField({ name: "image", type: "image", options: { hotspot: true } }),
    defineField({ name: "alt", title: "Image alt text", type: "string" }),
  ],
  preview: { select: { title: "title", media: "image" } },
});

const serviceItem = defineType({
  name: "serviceItem",
  title: "Service",
  type: "object",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "prices", title: "Prices", type: "array", of: [defineArrayMember({ type: "string" })] }),
    defineField({ name: "description", type: "text", rows: 3 }),
    defineField({ name: "healthFund", title: "Show health fund rebate note", type: "boolean", initialValue: false }),
    defineField({ name: "image", type: "image", options: { hotspot: true } }),
  ],
  preview: { select: { title: "title", media: "image" } },
});

const postBlock = defineType({
  name: "postBlock",
  title: "Block",
  type: "object",
  fields: [
    defineField({
      name: "style",
      type: "string",
      options: { list: [{ title: "Paragraph", value: "p" }, { title: "Heading", value: "h2" }] },
      initialValue: "p",
    }),
    defineField({ name: "text", type: "text", rows: 3, validation: (r) => r.required() }),
  ],
  preview: { select: { title: "text", subtitle: "style" } },
});

/* ---------- documents ---------- */

const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({ name: "brand", type: "string", validation: (r) => r.required() }),
    defineField({ name: "nav", title: "Navigation", type: "array", of: [defineArrayMember({ type: "navLink" })] }),
    defineField({ name: "ctaLabel", title: "Header button label", type: "string" }),
    defineField({ name: "ctaHref", title: "Header button link", type: "string" }),
    defineField({ name: "contactEmail", title: "Contact email", type: "string" }),
    defineField({ name: "contactPhone", title: "Contact phone", type: "string" }),
    defineField({ name: "availability", title: "Availability line", type: "string" }),
    defineField({ name: "area", title: "Service area line", type: "string" }),
  ],
  preview: { prepare: () => ({ title: "Site Settings" }) },
});

const homePage = defineType({
  name: "homePage",
  title: "Home Page",
  type: "document",
  fields: [
    defineField({ name: "heroHeadline", title: "Hero headline", type: "text", rows: 2, validation: (r) => r.required() }),
    defineField({ name: "services", title: "Service cards", type: "array", of: [defineArrayMember({ type: "serviceCard" })], validation: (r) => r.max(4) }),
    defineField({ name: "storyHeadline", title: "Story headline", type: "text", rows: 2 }),
    defineField({ name: "storyButtonLabel", type: "string" }),
    defineField({ name: "storyButtonHref", type: "string" }),
    defineField({ name: "storyImage", title: "Story background image", type: "image", options: { hotspot: true } }),
    defineField({ name: "storyImageAlt", type: "string" }),
  ],
  preview: { prepare: () => ({ title: "Home Page" }) },
});

const aboutPage = defineType({
  name: "aboutPage",
  title: "About Page",
  type: "document",
  fields: [
    defineField({ name: "introHeadline", type: "string" }),
    defineField({ name: "tagline", type: "text", rows: 2 }),
    defineField({ name: "attribution", type: "string" }),
    defineField({ name: "bioHeadline", type: "string" }),
    defineField({ name: "bio", title: "Bio paragraphs", type: "array", of: [defineArrayMember({ type: "text" })] }),
    defineField({ name: "qualifications", type: "array", of: [defineArrayMember({ type: "string" })] }),
    defineField({ name: "portrait", type: "image", options: { hotspot: true } }),
    defineField({ name: "hero", title: "Hero image", type: "image", options: { hotspot: true } }),
    defineField({ name: "ctaHeadline", type: "string" }),
  ],
  preview: { prepare: () => ({ title: "About Page" }) },
});

const servicesPage = defineType({
  name: "servicesPage",
  title: "Services Page",
  type: "document",
  fields: [
    defineField({ name: "headline", type: "string" }),
    defineField({ name: "specialDeal", type: "text", rows: 3 }),
    defineField({ name: "massage", title: "Massage services", type: "array", of: [defineArrayMember({ type: "serviceItem" })] }),
    defineField({ name: "yoga", title: "Yoga services", type: "array", of: [defineArrayMember({ type: "serviceItem" })] }),
    defineField({ name: "note", type: "text", rows: 2 }),
    defineField({ name: "ctaHeadline", type: "string" }),
  ],
  preview: { prepare: () => ({ title: "Services Page" }) },
});

const simplePage = (name: string, title: string) =>
  defineType({
    name,
    title,
    type: "document",
    fields: [
      defineField({ name: "headline", type: "string" }),
      defineField({ name: "intro", title: "Intro paragraphs", type: "array", of: [defineArrayMember({ type: "text" })] }),
      defineField({ name: "hero", title: "Hero image", type: "image", options: { hotspot: true } }),
    ],
    preview: { prepare: () => ({ title }) },
  });

const footer = defineType({
  name: "footer",
  title: "Footer",
  type: "document",
  fields: [
    defineField({ name: "brand", type: "string" }),
    defineField({ name: "note", type: "string" }),
    defineField({ name: "location", type: "string" }),
    defineField({ name: "newsletterPrompt", type: "string" }),
    defineField({ name: "newsletterCtaLabel", type: "string" }),
    defineField({ name: "newsletterHref", type: "string" }),
    defineField({ name: "instagramUrl", type: "url" }),
  ],
  preview: { prepare: () => ({ title: "Footer" }) },
});

const post = defineType({
  name: "post",
  title: "Blog Post",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", type: "slug", options: { source: "title" }, validation: (r) => r.required() }),
    defineField({ name: "excerpt", type: "text", rows: 3 }),
    defineField({ name: "image", type: "image", options: { hotspot: true } }),
    defineField({ name: "body", title: "Body", type: "array", of: [defineArrayMember({ type: "postBlock" })] }),
    defineField({ name: "publishedAt", type: "datetime", initialValue: () => new Date().toISOString() }),
  ],
  preview: { select: { title: "title", media: "image" } },
});

export const schemaTypes = [
  navLink,
  serviceCard,
  serviceItem,
  postBlock,
  siteSettings,
  homePage,
  aboutPage,
  servicesPage,
  simplePage("bookPage", "Book Page"),
  simplePage("newsletterPage", "Newsletter Page"),
  footer,
  post,
];
