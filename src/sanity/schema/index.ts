import { defineType, defineField, defineArrayMember } from "sanity";

const navLink = defineType({
  name: "navLink",
  title: "Navigation Link",
  type: "object",
  fields: [
    defineField({ name: "label", title: "Label", type: "string", validation: (r) => r.required() }),
    defineField({ name: "href", title: "Href", type: "string", validation: (r) => r.required() }),
  ],
  preview: { select: { title: "label", subtitle: "href" } },
});

const serviceCard = defineType({
  name: "serviceCard",
  title: "Service Card",
  type: "object",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "href", title: "Link", type: "string", initialValue: "/services" }),
    defineField({ name: "image", title: "Image", type: "image", options: { hotspot: true } }),
    defineField({ name: "alt", title: "Image alt text", type: "string" }),
  ],
  preview: { select: { title: "title", media: "image" } },
});

const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({ name: "brand", title: "Brand name", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "nav",
      title: "Navigation",
      type: "array",
      of: [defineArrayMember({ type: "navLink" })],
    }),
    defineField({ name: "ctaLabel", title: "Header button label", type: "string" }),
    defineField({ name: "ctaHref", title: "Header button link", type: "string" }),
  ],
  preview: { prepare: () => ({ title: "Site Settings" }) },
});

const homePage = defineType({
  name: "homePage",
  title: "Home Page",
  type: "document",
  fields: [
    defineField({
      name: "heroHeadline",
      title: "Hero headline",
      type: "text",
      rows: 2,
      validation: (r) => r.required(),
    }),
    defineField({
      name: "services",
      title: "Service cards",
      type: "array",
      of: [defineArrayMember({ type: "serviceCard" })],
      validation: (r) => r.max(4),
    }),
    defineField({ name: "storyHeadline", title: "Story headline", type: "text", rows: 2 }),
    defineField({ name: "storyButtonLabel", title: "Story button label", type: "string" }),
    defineField({ name: "storyButtonHref", title: "Story button link", type: "string" }),
    defineField({ name: "storyImage", title: "Story background image", type: "image", options: { hotspot: true } }),
    defineField({ name: "storyImageAlt", title: "Story image alt", type: "string" }),
  ],
  preview: { prepare: () => ({ title: "Home Page" }) },
});

const footer = defineType({
  name: "footer",
  title: "Footer",
  type: "document",
  fields: [
    defineField({ name: "brand", title: "Brand", type: "string" }),
    defineField({ name: "note", title: "Note", type: "string" }),
    defineField({ name: "location", title: "Location line", type: "string" }),
    defineField({ name: "newsletterPrompt", title: "Newsletter prompt", type: "string" }),
    defineField({ name: "newsletterCtaLabel", title: "Newsletter CTA label", type: "string" }),
    defineField({ name: "newsletterHref", title: "Newsletter link", type: "string" }),
    defineField({ name: "instagramUrl", title: "Instagram URL", type: "url" }),
  ],
  preview: { prepare: () => ({ title: "Footer" }) },
});

export const schemaTypes = [navLink, serviceCard, siteSettings, homePage, footer];
