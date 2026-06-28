// Seed the connected Sanity project with the real mellow movement content +
// images. Run once after setting env vars:
//   NEXT_PUBLIC_SANITY_PROJECT_ID=xxx NEXT_PUBLIC_SANITY_DATASET=production \
//   SANITY_API_WRITE_TOKEN=sk... node scripts/seed-sanity.mjs
import { createClient } from "@sanity/client";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !token) {
  console.error("Set NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_WRITE_TOKEN first.");
  process.exit(1);
}

const client = createClient({ projectId, dataset, apiVersion: "2024-10-01", token, useCdn: false });
const root = join(dirname(fileURLToPath(import.meta.url)), "..");

async function upload(file, label) {
  const buf = readFileSync(join(root, "public/images", file));
  const asset = await client.assets.upload("image", buf, { filename: file });
  console.log(`  uploaded ${label}: ${asset._id}`);
  return { _type: "image", asset: { _type: "reference", _ref: asset._id } };
}

async function run() {
  console.log("Uploading images…");
  const massage = await upload("massage.webp", "massage");
  const yoga = await upload("yoga.webp", "yoga");
  const story = await upload("our-story.webp", "our-story");

  console.log("Writing documents…");
  await client.createOrReplace({
    _id: "siteSettings",
    _type: "siteSettings",
    brand: "mellow movement",
    nav: [
      { _type: "navLink", _key: "n1", label: "Mobile Massage & Yoga", href: "/services" },
      { _type: "navLink", _key: "n2", label: "About", href: "/about" },
      { _type: "navLink", _key: "n3", label: "Contact", href: "/contact" },
      { _type: "navLink", _key: "n4", label: "Blog", href: "/blog" },
    ],
    ctaLabel: "Book Appointment",
    ctaHref: "/book",
  });
  await client.createOrReplace({
    _id: "homePage",
    _type: "homePage",
    heroHeadline:
      "Find your calm with mobile yoga and massage. Relax and be comfortable in your own space.",
    services: [
      { _type: "serviceCard", _key: "s1", title: "Massage", href: "/services", image: massage, alt: "Relaxing mobile massage treatment" },
      { _type: "serviceCard", _key: "s2", title: "Yoga", href: "/services", image: yoga, alt: "Private mobile yoga session" },
    ],
    storyHeadline: "Yoga and massage that will mellow your mind and bliss out your body.",
    storyButtonLabel: "Our Story",
    storyButtonHref: "/about",
    storyImage: story,
    storyImageAlt: "Mellow movement session",
  });
  await client.createOrReplace({
    _id: "footer",
    _type: "footer",
    brand: "mellow movement",
    note: "Gift vouchers available! Ask for more info.",
    location: "Mobile massage and yoga in the Eastern Suburbs, Niki is based in Bondi.",
    newsletterPrompt: "Stay in the Loop",
    newsletterCtaLabel: "Sign up for our newsletter",
    newsletterHref: "/newsletter",
    instagramUrl: "https://www.instagram.com/mellowmovementau/",
  });
  console.log("Done. Open /studio to edit.");
}

run().catch((e) => {
  console.error(e.message);
  process.exit(1);
});
