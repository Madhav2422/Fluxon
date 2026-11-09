/**
 * Business details that search engines read (page titles, structured data, sitemap).
 * Keep them identical to your Google Business Profile, character for character.
 */
export const SITE = {
  name: "Fluxon Infotech",
  url: "https://www.fluxoninfotech.com",
  description:
    "Fluxon Infotech is an IT company in Morbi, Gujarat. We build websites, web apps, AI solutions and cloud systems for businesses in Morbi, across Gujarat and beyond.",
  email: "fluxoninfotech@gmail.com",
  phone: "+917984846312",
  city: "Morbi",
  region: "Gujarat",
  country: "IN",
  /** Fill these in to show your full address to Google (must match your Google Business Profile). */
  streetAddress: "" as string,
  postalCode: "" as string,
  socials: ["https://www.linkedin.com/in/fluxon-infotech", "https://www.instagram.com/fluxoninfotech"],
  services: [
    { name: "Web Development", slug: "web-development" },
    { name: "AI Solutions", slug: "ai-solutions" },
    { name: "Cloud Solutions", slug: "cloud-solutions" },
    { name: "Automation", slug: "automation" },
    { name: "DevOps", slug: "devops" },
    { name: "IT Consulting", slug: "it-consulting" },
  ],
} as const;
