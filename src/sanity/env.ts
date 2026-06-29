// Sanity environment configuration.
// Set these in .env.local (see .env.example). When the project id is absent the
// site renders from bundled fallback content and /studio shows a setup notice.

export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-10-01";

export const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";

// Sanity's defineConfig requires a syntactically valid project id even when one
// has not been provided yet; this placeholder keeps imports from throwing.
export const studioProjectId = projectId || "placeholder";

export const isSanityConfigured = Boolean(projectId);
