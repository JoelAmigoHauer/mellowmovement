import type { SiteContent } from "@/types/content";

// Real content extracted from https://www.mellowmovement.com.au/
// Used as the fallback/seed when the Sanity CMS has no published document yet.
export const fallbackContent: SiteContent = {
  settings: {
    brand: "mellow movement",
    nav: [
      { label: "Mobile Massage & Yoga", href: "/services" },
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Blog", href: "/blog" },
    ],
    ctaLabel: "Book Appointment",
    ctaHref: "/book",
  },
  home: {
    hero: {
      headline:
        "Find your calm with mobile yoga and massage. Relax and be comfortable in your own space.",
    },
    services: [
      {
        title: "Massage",
        href: "/services",
        image: { src: "/images/massage.webp", alt: "Relaxing mobile massage treatment" },
      },
      {
        title: "Yoga",
        href: "/services",
        image: { src: "/images/yoga.webp", alt: "Private mobile yoga session" },
      },
    ],
    story: {
      headline:
        "Yoga and massage that will mellow your mind and bliss out your body.",
      buttonLabel: "Our Story",
      buttonHref: "/about",
      image: { src: "/images/our-story.webp", alt: "Mellow movement session" },
    },
  },
  footer: {
    brand: "mellow movement",
    note: "Gift vouchers available! Ask for more info.",
    location:
      "Mobile massage and yoga in the Eastern Suburbs, Niki is based in Bondi.",
    newsletterPrompt: "Stay in the Loop",
    newsletterCtaLabel: "Sign up for our newsletter",
    newsletterHref: "/newsletter",
    instagramUrl: "https://www.instagram.com/mellowmovementau/",
  },
  contact: {
    email: "niki@mellowmovement.com.au",
    phone: "0425 205 741",
    availability: "Weekday and Weekend appointments available.",
    area: "Mobile massage and yoga in the Eastern Suburbs, NSW.",
  },
  about: {
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
      "My massage style is calming and soothing and the massage pressure is always up to you. If there is a specific injury, tension or pain some deeper tissue work may need to be done if you are up for it. We can also incorporate some gentle assisted stretches during or after the massage if it’s indicated.",
      "My yoga style is relaxed, fun and focuses on flexibility, core strength, balance and relaxation through movement. Classes also feature breath-work exercises (pranayama), mindfulness and meditation techniques and relaxation.",
    ],
    qualifications: [
      "Diploma in Remedial Massage Therapy (including Pregnancy, Sports & Swedish Massage)",
      "Baby Massage Therapy",
      "Hatha Yoga Teacher + Children’s Yoga Teacher",
      "Yoga for Trauma, Chronic Pain & Pain Management",
      "AntiGravity Aerial Yoga Teacher",
      "Member of the Australian Natural Therapists Association (ANTA)",
      "Bachelor of Design in Industrial Design (First Class Honours)",
    ],
    portrait: { src: "/images/pages/about-portrait.webp", alt: "Niki Hauer, clinical yoga & massage therapist" },
    hero: { src: "/images/pages/about-hero.jpg", alt: "Mellow movement therapeutic massage & yoga" },
    ctaHeadline: "Ready to get mellow?",
  },
  services: {
    headline: "Mobile Massage & Yoga",
    specialDeal:
      "SPECIAL DEAL: If you book any massage at the moment, you can also book a one-hour massage for a family member or friend straight afterwards at the same location for half price.",
    hero: { src: "/images/pages/svc-hero.jpg", alt: "Mobile massage & yoga" },
    massage: [
      {
        title: "Remedial Massage",
        prices: ["$155 – 60min", "$220 – 90min"],
        description:
          "Find your calm with a targeted massage that can help relieve muscle tension, chronic pain, postural imbalance and injury.",
        healthFund: true,
      },
      {
        title: "Pre & Post Pregnancy Massage",
        prices: ["$155 – 60min", "$220 – 90min"],
        description:
          "Bliss out with a soothing massage to reduce stress, relieve muscle tension and give you the perfect dose of ‘me time’.",
        healthFund: true,
      },
      {
        title: "Swedish Massage",
        prices: ["$155 – 60min", "$220 – 90min"],
        description:
          "Relax your muscles and your mind whilst drifting off into a heavenly state of calm with long, flowing massage strokes.",
        healthFund: true,
      },
    ],
    yoga: [
      {
        title: "Private Yoga",
        prices: ["$155 – 60min (1 or 2 people)"],
        description:
          "Soothe your body inside and out with targeted yoga postures, breath work, body awareness and meditation. Yoga can help to relieve and rehabilitate muscle tension, pain and injury.",
      },
      {
        title: "Group / Family Yoga",
        prices: ["$155 – 60min (3-4 people)"],
        description:
          "Connect with your loved ones through yoga and a bit of fun! Bespoke yoga class to suit you and your friends/family’s needs. Get fit, stretch out and bliss out together.",
      },
      {
        title: "Corporate Yoga",
        prices: ["Enquire for a bespoke class that suits you!"],
        description:
          "Support your employee’s health and wellbeing with yoga in your workplace or online classes. Reduce stress, boost morale and improve focus.",
      },
    ],
    note: "Please note: Mobile massage and yoga prices are for the Eastern Suburbs area around Bondi, New South Wales — if you live a little further away the price may vary, so get in touch.",
    ctaHeadline: "Ready to mellow out?",
  },
  book: {
    headline: "Book an Appointment",
    intro: [
      "Get your calendar ready, let’s schedule in some time to heal up and mellow out.",
      "Contact Niki to find a time that suits you.",
    ],
    hero: { src: "/images/pages/book-hero.webp", alt: "Book a mellow movement appointment" },
  },
  newsletter: {
    headline: "Newsletter Signup",
    intro: [
      "Join the mellow movement community for tips, offers and a little extra bliss in your inbox.",
      "We respect your privacy.",
    ],
    hero: { src: "/images/pages/newsletter-hero.webp", alt: "Mellow movement newsletter" },
  },
  posts: [
    {
      slug: "benefits-of-massage",
      title: "Benefits of massage",
      excerpt:
        "Massage has lots of benefits for your body and your mind: scientific evidence continues to show that mellowing out on the massage table is definitely a productive use of your time!",
      image: { src: "/images/pages/blog-benefits.webp", alt: "Benefits of massage" },
      body: [
        { type: "p", text: "Massage has lots of benefits for your body and your mind: scientific evidence continues to show that mellowing out on the massage table is definitely a productive use of your time!" },
        { type: "h2", text: "1. Improves recovery" },
        { type: "p", text: "When we have an injury, our body uses collagen fibres to repair the area – a healing process which also creates scar tissue. Sometimes the tissues around the injury begin to stick together rather than glide smoothly over each other. This can prevent healthy regrowth of the tissue, lack of elasticity and painful and/or restricted movement. Remedial massage helps to soften and mobilise the collagen fibres, which relieves tightness and pain." },
        { type: "h2", text: "2. Relieves pain" },
        { type: "p", text: "Massage works by affecting your nervous system directly and dampening your pain. Your skin is richly innervated with around one million nerve fibres, which can make the touch of a massage therapist a rich sensory experience that helps to relieve pain. Cutaneous receptors are stimulated during each moment of your massage sending sensations of touch, pressure, vibration, temperature, and pain to your brain. This activates your parasympathetic nervous system, slowing your heart rate and breath, calming your mind, and encouraging your digestion." },
        { type: "h2", text: "3. Reduces depression and anxiety" },
        { type: "p", text: "Evidence has shown that even a single session of massage therapy can significantly reduce anxiety, decreasing emotions such as apprehension, worry, and tension in both adults and children. Anxiety and depression can lead to other more serious health problems, making massage therapy highly beneficial for your health and wellbeing." },
        { type: "h2", text: "4. Promotes relaxation and calm" },
        { type: "p", text: "Massage can create a relaxing state that lowers blood pressure, increases blood flow to major muscles, improves digestion, balances blood sugar levels, and dampens chronic pain." },
        { type: "h2", text: "5. Improves joint mobility" },
        { type: "p", text: "Remedial massage can create more mobility in a joint by using joint mobilisation techniques which can help to reduce stiffness, pain, and a quicker recovery from injury." },
        { type: "h2", text: "6. Improves heart rate regulation" },
        { type: "p", text: "Remedial massage can include gentle stretching, which for people with low flexibility, has shown to improve the balance between their sympathetic and parasympathetic nervous systems, and resulted in better heart rate regulation." },
        { type: "p", text: "Remember: Regular massage helps to keep up the benefits and maintain your health and wellbeing." },
      ],
    },
    {
      slug: "conditions-massage-can-help",
      title: "Conditions that massage can help",
      excerpt:
        "Massage therapy can help a wide variety of conditions and has a large body of empirical evidence to support it.",
      image: { src: "/images/pages/blog-conditions.webp", alt: "Conditions that massage can help" },
      body: [
        { type: "p", text: "Massage therapy feels oh so good and can help a wide variety of conditions — with a large body of empirical evidence to support it!" },
        { type: "p", text: "Musculoskeletal pain, including low back pain – Massage can treat a wide range of musculoskeletal presentations including pain, tension, and restriction of movement." },
        { type: "p", text: "Mood – Anxiety reduction is one of the most well-established effects of massage therapy with evidence for this crossing multiple presenting conditions and populations." },
        { type: "p", text: "Pre/Post Operation – Massage can help with the management of pre- and post-operative pain, anxiety and tension, and post-operative nausea." },
        { type: "p", text: "Pregnancy, Labour and Post-natal – Reduces low back pain, pelvic pain, as well as pain and anxiety during labour." },
        { type: "p", text: "Infant and Paediatric – Massage of pre-term or low-weight infants has been shown to improve daily weight gain by reducing anxiety." },
        { type: "p", text: "Older adults – Helps manage behavioural, emotional and other conditions associated with dementia." },
        { type: "p", text: "Athletes, Sports and Exercise – Reduces delayed onset muscle soreness (DOMS) and enhances recovery after strenuous exercise." },
        { type: "p", text: "Cancer – Massage can help with mood (including stress and depression) as well as reducing pain intensity/severity, fatigue and anxiety in cancer populations." },
        { type: "p", text: "There is also preliminary evidence for the clinical efficacy of massage therapy for headache and migraine, osteoarthritis and rheumatoid arthritis, hypertension, and HIV." },
      ],
    },
  ],
};
