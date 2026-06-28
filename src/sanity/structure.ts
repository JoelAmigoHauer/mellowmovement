import type { StructureResolver } from "sanity/structure";

// Singletons (one document each) + the Blog Posts collection.
const SINGLETONS: { id: string; type: string; title: string }[] = [
  { id: "siteSettings", type: "siteSettings", title: "Site Settings" },
  { id: "homePage", type: "homePage", title: "Home Page" },
  { id: "aboutPage", type: "aboutPage", title: "About Page" },
  { id: "servicesPage", type: "servicesPage", title: "Services Page" },
  { id: "bookPage", type: "bookPage", title: "Book Page" },
  { id: "newsletterPage", type: "newsletterPage", title: "Newsletter Page" },
  { id: "footer", type: "footer", title: "Footer" },
];

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      ...SINGLETONS.map(({ id, type, title }) =>
        S.listItem()
          .title(title)
          .id(id)
          .child(S.document().schemaType(type).documentId(id)),
      ),
      S.divider(),
      S.documentTypeListItem("post").title("Blog Posts"),
    ]);
