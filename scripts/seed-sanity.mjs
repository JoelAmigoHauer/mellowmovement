// Seed the connected Sanity project with all mellow movement content + images.
// Usage (values can come from .env / Vercel):
//   NEXT_PUBLIC_SANITY_PROJECT_ID=xxx NEXT_PUBLIC_SANITY_DATASET=production \
//   SANITY_API_WRITE_TOKEN=sk... node scripts/seed-sanity.mjs
import { createClient } from "@sanity/client";
import { readFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_WRITE_TOKEN || process.env.VERCEL_SANITY_KEY;

if (!projectId || !token) {
  console.error("Set NEXT_PUBLIC_SANITY_PROJECT_ID and a write token (SANITY_API_WRITE_TOKEN / VERCEL_SANITY_KEY).");
  process.exit(1);
}

const client = createClient({ projectId, dataset, apiVersion: "2024-10-01", token, useCdn: false });
const root = join(dirname(fileURLToPath(import.meta.url)), "..");

const cache = new Map();
async function img(relPath, filename) {
  const full = join(root, "public", relPath);
  if (!existsSync(full)) { console.warn(`  ! missing ${relPath}`); return undefined; }
  if (cache.has(full)) return cache.get(full);
  const asset = await client.assets.upload("image", readFileSync(full), { filename: filename || relPath.split("/").pop() });
  const ref = { _type: "image", asset: { _type: "reference", _ref: asset._id } };
  cache.set(full, ref);
  console.log(`  uploaded ${relPath}`);
  return ref;
}

const item = (title, prices, description, healthFund, image) => ({
  _type: "serviceItem", _key: title.replace(/\W+/g, "").toLowerCase(),
  title, prices, description, healthFund, image,
});
const block = (style, text) => ({ _type: "postBlock", _key: Math.random().toString(36).slice(2, 9), style, text });

async function run() {
  console.log("Uploading images…");
  const [massage, yoga, story, aboutPortrait, aboutHero, svcHero, contactHero, bookHero, nlHero, blogBenefits, blogConditions, svcRem, svcPreg, svcSwe, svcPriv, svcGrp, svcCorp] = await Promise.all([
    img("images/massage.webp"), img("images/yoga.webp"), img("images/our-story.webp"),
    img("images/pages/about-portrait.webp"), img("images/pages/about-hero.jpg"),
    img("images/pages/svc-hero.jpg"), img("images/pages/contact-hero.webp"),
    img("images/pages/book-hero.webp"), img("images/pages/newsletter-hero.webp"),
    img("images/pages/blog-benefits.webp"), img("images/pages/blog-conditions.webp"),
    img("images/pages/svc-remedial.webp"), img("images/pages/svc-pregnancy.webp"), img("images/pages/svc-swedish.webp"),
    img("images/pages/svc-private-yoga.webp"), img("images/pages/svc-group-yoga.webp"), img("images/pages/svc-corporate.webp"),
  ]);

  console.log("Writing documents…");
  await client.createOrReplace({
    _id: "siteSettings", _type: "siteSettings", brand: "mellow movement",
    nav: [
      { _type: "navLink", _key: "n1", label: "Mobile Massage & Yoga", href: "/services" },
      { _type: "navLink", _key: "n2", label: "About", href: "/about" },
      { _type: "navLink", _key: "n3", label: "Contact", href: "/contact" },
      { _type: "navLink", _key: "n4", label: "Blog", href: "/blog" },
    ],
    ctaLabel: "Book Appointment", ctaHref: "/book",
    contactEmail: "niki@mellowmovement.com.au", contactPhone: "0425 205 741",
    availability: "Weekday and Weekend appointments available.",
    area: "Mobile massage and yoga in the Eastern Suburbs, NSW.",
  });

  await client.createOrReplace({
    _id: "homePage", _type: "homePage",
    heroHeadline: "Find your calm with mobile yoga and massage. Relax and be comfortable in your own space.",
    services: [
      { _type: "serviceCard", _key: "s1", title: "Massage", href: "/services", image: massage, alt: "Relaxing mobile massage treatment" },
      { _type: "serviceCard", _key: "s2", title: "Yoga", href: "/services", image: yoga, alt: "Private mobile yoga session" },
    ],
    storyHeadline: "Yoga and massage that will mellow your mind and bliss out your body.",
    storyButtonLabel: "Our Story", storyButtonHref: "/about", storyImage: story, storyImageAlt: "Mellow movement session",
  });

  await client.createOrReplace({
    _id: "aboutPage", _type: "aboutPage",
    introHeadline: "Find ease in your body",
    tagline: "Mellow out with therapeutic massage & yoga.",
    attribution: "— Niki Hauer, Clinical Yoga & Massage Therapist",
    bioHeadline: "Niki’s background in all things calm and blissful…",
    bio: [
      "Hi, my name is Niki and I’m a clinical yoga and massage therapist.",
      "Helping others is what I am really passionate about. I have been mentored and working in a private physiotherapy practice since 2015 where I do massage, teach yoga and rehab exercise, and collaborate with physios on a daily basis.",
      "I am particularly interested in helping people with chronic pain as well as injury rehabilitation. Combined with my experience at the physio practice I have also done training in trauma, chronic pain and pain management.",
      "I have lots of experience working with all ages and abilities – I have worked with 18-month-olds to 89 years old. All sessions are bespoke and are created around what is best for you and your body.",
      "I have recently had my own little bubba so have a great understanding about pregnancy and breastfeeding aches, pains and postural issues.",
      "My massage style is calming and soothing and the massage pressure is always up to you.",
      "My yoga style is relaxed, fun and focuses on flexibility, core strength, balance and relaxation through movement.",
    ],
    qualifications: [
      "Diploma in Remedial Massage Therapy (including Pregnancy, Sports & Swedish Massage)",
      "Baby Massage Therapy", "Hatha Yoga Teacher + Children’s Yoga Teacher",
      "Yoga for Trauma, Chronic Pain & Pain Management", "AntiGravity Aerial Yoga Teacher",
      "Member of the Australian Natural Therapists Association (ANTA)",
      "Bachelor of Design in Industrial Design (First Class Honours)",
    ],
    portrait: aboutPortrait, hero: aboutHero, ctaHeadline: "Ready to get mellow?",
  });

  await client.createOrReplace({
    _id: "servicesPage", _type: "servicesPage", headline: "Mobile Massage & Yoga",
    specialDeal: "SPECIAL DEAL: If you book any massage at the moment, you can also book a one-hour massage for a family member or friend straight afterwards at the same location for half price.",
    massage: [
      item("Remedial Massage", ["$155 – 60min", "$220 – 90min"], "Find your calm with a targeted massage that can help relieve muscle tension, chronic pain, postural imbalance and injury.", true, svcRem),
      item("Pre & Post Pregnancy Massage", ["$155 – 60min", "$220 – 90min"], "Bliss out with a soothing massage to reduce stress, relieve muscle tension and give you the perfect dose of ‘me time’.", true, svcPreg),
      item("Swedish Massage", ["$155 – 60min", "$220 – 90min"], "Relax your muscles and your mind whilst drifting off into a heavenly state of calm with long, flowing massage strokes.", true, svcSwe),
    ],
    yoga: [
      item("Private Yoga", ["$155 – 60min (1 or 2 people)"], "Soothe your body inside and out with targeted yoga postures, breath work, body awareness and meditation.", false, svcPriv),
      item("Group / Family Yoga", ["$155 – 60min (3-4 people)"], "Connect with your loved ones through yoga and a bit of fun! Bespoke yoga class to suit you and your friends/family’s needs.", false, svcGrp),
      item("Corporate Yoga", ["Enquire for a bespoke class that suits you!"], "Support your employee’s health and wellbeing with yoga in your workplace or online classes.", false, svcCorp),
    ],
    note: "Please note: Mobile massage and yoga prices are for the Eastern Suburbs area around Bondi, NSW — if you live a little further away the price may vary, so get in touch.",
    ctaHeadline: "Ready to mellow out?",
  });

  await client.createOrReplace({
    _id: "bookPage", _type: "bookPage", headline: "Book an Appointment",
    intro: ["Get your calendar ready, let’s schedule in some time to heal up and mellow out.", "Contact Niki to find a time that suits you."],
    hero: bookHero,
  });
  await client.createOrReplace({
    _id: "newsletterPage", _type: "newsletterPage", headline: "Newsletter Signup",
    intro: ["Join the mellow movement community for tips, offers and a little extra bliss in your inbox.", "We respect your privacy."],
    hero: nlHero,
  });
  await client.createOrReplace({
    _id: "footer", _type: "footer", brand: "mellow movement",
    note: "Gift vouchers available! Ask for more info.",
    location: "Mobile massage and yoga in the Eastern Suburbs, Niki is based in Bondi.",
    newsletterPrompt: "Stay in the Loop", newsletterCtaLabel: "Sign up for our newsletter",
    newsletterHref: "/newsletter", instagramUrl: "https://www.instagram.com/mellowmovementau/",
  });

  await client.createOrReplace({
    _id: "post-benefits-of-massage", _type: "post", title: "Benefits of massage",
    slug: { _type: "slug", current: "benefits-of-massage" },
    excerpt: "Massage has lots of benefits for your body and your mind: scientific evidence continues to show that mellowing out on the massage table is definitely a productive use of your time!",
    image: blogBenefits, publishedAt: "2023-01-02T00:00:00.000Z",
    body: [
      block("p", "Massage has lots of benefits for your body and your mind: scientific evidence continues to show that mellowing out on the massage table is definitely a productive use of your time!"),
      block("h2", "1. Improves recovery"),
      block("p", "When we have an injury, our body uses collagen fibres to repair the area. Remedial massage helps to soften and mobilise the collagen fibres, which relieves tightness and pain."),
      block("h2", "2. Relieves pain"),
      block("p", "Massage works by affecting your nervous system directly and dampening your pain, activating your parasympathetic nervous system, slowing your heart rate and breath, and calming your mind."),
      block("h2", "3. Reduces depression and anxiety"),
      block("p", "Evidence has shown that even a single session of massage therapy can significantly reduce anxiety in both adults and children."),
      block("h2", "4. Promotes relaxation and calm"),
      block("p", "Massage can create a relaxing state that lowers blood pressure, increases blood flow, improves digestion and dampens chronic pain."),
      block("p", "Remember: Regular massage helps to keep up the benefits and maintain your health and wellbeing."),
    ],
  });
  await client.createOrReplace({
    _id: "post-conditions-massage-can-help", _type: "post", title: "Conditions that massage can help",
    slug: { _type: "slug", current: "conditions-massage-can-help" },
    excerpt: "Massage therapy can help a wide variety of conditions and has a large body of empirical evidence to support it.",
    image: blogConditions, publishedAt: "2023-01-01T00:00:00.000Z",
    body: [
      block("p", "Massage therapy feels oh so good and can help a wide variety of conditions — with a large body of empirical evidence to support it!"),
      block("p", "Musculoskeletal pain, including low back pain – Massage can treat a wide range of presentations including pain, tension, and restriction of movement."),
      block("p", "Mood – Anxiety reduction is one of the most well-established effects of massage therapy."),
      block("p", "Pregnancy, Labour and Post-natal – Reduces low back pain, pelvic pain, as well as pain and anxiety during labour."),
      block("p", "Athletes, Sports and Exercise – Reduces delayed onset muscle soreness (DOMS) and enhances recovery after strenuous exercise."),
    ],
  });

  console.log("Done. Open /studio to edit.");
}

run().catch((e) => { console.error(e.message); process.exit(1); });
