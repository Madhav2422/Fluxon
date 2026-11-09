import type { Metadata } from "next";
import { SITE } from "./site";

/** The preview image shown when a page is shared (WhatsApp, LinkedIn, Google, etc.). */
export const SHARE_IMAGE = {
  url: "/og-image.jpg",
  width: 1200,
  height: 630,
  alt: "Fluxon Infotech, IT company in Morbi, Gujarat",
};

interface PageSeo {
  /** Shown in the browser tab and as the blue link on Google. " | Fluxon Infotech" is added unless `absolute`. */
  title: string;
  /** The grey text under the link on Google. Aim for 120–160 characters. */
  description: string;
  /** The page's own address, e.g. "/services". Tells Google this is the one true URL for the page. */
  path: string;
  absolute?: boolean;
}

/**
 * Complete metadata for one page. Next.js replaces (rather than merges) `openGraph` and
 * `twitter` between layout and page, so every page gets the full set from here.
 */
export function pageMetadata({ title, description, path, absolute = false }: PageSeo): Metadata {
  const fullTitle = absolute ? title : `${title} | ${SITE.name}`;
  return {
    title: absolute ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "en_IN",
      siteName: SITE.name,
      url: path,
      title: fullTitle,
      description,
      images: [SHARE_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [SHARE_IMAGE.url],
    },
  };
}
