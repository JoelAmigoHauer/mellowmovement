"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { apiVersion, dataset, studioProjectId } from "@/sanity/env";
import { schemaTypes } from "@/sanity/schema";
import { structure } from "@/sanity/structure";

export default defineConfig({
  name: "mellow-movement",
  title: "mellow movement",
  basePath: "/studio",
  projectId: studioProjectId,
  dataset,
  plugins: [structureTool({ structure }), visionTool({ defaultApiVersion: apiVersion })],
  schema: { types: schemaTypes },
});
