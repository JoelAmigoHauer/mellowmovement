import { createClient } from "next-sanity";
import { apiVersion, dataset, studioProjectId } from "@/sanity/env";

export const sanityClient = createClient({
  projectId: studioProjectId,
  dataset,
  apiVersion,
  useCdn: true,
});
