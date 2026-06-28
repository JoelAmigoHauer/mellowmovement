import type { StructureResolver } from "sanity/structure";

// Present the editable content as singletons (one document each).
const SINGLETONS: { id: string; type: string; title: string }[] = [
  { id: "siteSettings", type: "siteSettings", title: "Site Settings" },
  { id: "homePage", type: "homePage", title: "Home Page" },
  { id: "footer", type: "footer", title: "Footer" },
];

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items(
      SINGLETONS.map(({ id, type, title }) =>
        S.listItem()
          .title(title)
          .id(id)
          .child(S.document().schemaType(type).documentId(id)),
      ),
    );
