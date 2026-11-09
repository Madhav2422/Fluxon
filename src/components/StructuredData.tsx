import { SITE } from "@/lib/site";

/**
 * Structured data (JSON-LD) that tells Google, in its own format, who we are, where we are
 * (Morbi, Gujarat), how to contact us and what services we offer.
 */
export default function StructuredData() {
  const organization = `${SITE.url}/#organization`;

  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": organization,
        name: SITE.name,
        url: SITE.url,
        logo: `${SITE.url}/Fluxon_Logo.png`,
        image: `${SITE.url}/og-image.jpg`,
        description: SITE.description,
        email: SITE.email,
        telephone: SITE.phone,
        address: {
          "@type": "PostalAddress",
          ...(SITE.streetAddress ? { streetAddress: SITE.streetAddress } : {}),
          addressLocality: SITE.city,
          addressRegion: SITE.region,
          ...(SITE.postalCode ? { postalCode: SITE.postalCode } : {}),
          addressCountry: SITE.country,
        },
        areaServed: [
          { "@type": "City", name: "Morbi" },
          { "@type": "State", name: "Gujarat" },
          { "@type": "Country", name: "India" },
        ],
        sameAs: SITE.socials,
        knowsAbout: [
          "Website development",
          "Website design",
          "Web applications",
          "Artificial intelligence",
          "Cloud computing",
          "Business automation",
          "DevOps",
          "IT consulting",
        ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "IT services",
          itemListElement: SITE.services.map((service) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: service.name,
              url: `${SITE.url}/services#${service.slug}`,
              provider: { "@id": organization },
            },
          })),
        },
      },
      {
        "@type": "WebSite",
        "@id": `${SITE.url}/#website`,
        url: SITE.url,
        name: SITE.name,
        inLanguage: "en-IN",
        publisher: { "@id": organization },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      // "<" is escaped so the JSON can never close the script tag early.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
