import type { StaticImageData } from "next/image";
import avvira from "../../../public/portfolio/sites/avvira.webp";
import avviraFull from "../../../public/portfolio/sites/avvira-full.webp";
import drSaurabh from "../../../public/portfolio/sites/dr-saurabh.webp";
import drSaurabhFull from "../../../public/portfolio/sites/dr-saurabh-full.webp";
import shailesh from "../../../public/portfolio/sites/shailesh.webp";
import shaileshFull from "../../../public/portfolio/sites/shailesh-full.webp";
import somnath from "../../../public/portfolio/sites/somnath.webp";
import somnathFull from "../../../public/portfolio/sites/somnath-full.webp";
import soulfulSmell from "../../../public/portfolio/sites/soulful-smell.webp";
import soulfulSmellFull from "../../../public/portfolio/sites/soulful-smell-full.webp";

export interface Project {
  name: string;
  url: string;
  domain: string;
  category: string;
  description: string;
  /** First-screen screenshot (1280×800). */
  shot: StaticImageData;
  /** Full-page screenshot used for the hover-to-scroll preview. */
  full: StaticImageData;
  /** Brand colour used for small accents on the card. */
  accent: string;
}

/**
 * Live client websites (from the Fluxon Infotech portfolio PDF).
 * Order matters — Avvira Agro Industries always comes first.
 * Every URL was checked and returns HTTP 200.
 */
export const PROJECTS: Project[] = [
  {
    name: "Avvira Agro Industries",
    url: "https://www.avviraagroindustries.com/",
    domain: "avviraagroindustries.com",
    category: "Agro industries · Corporate website",
    description:
      "“Growing Value Naturally.” A warm, editorial website for a manufacturer and supplier of wheat, rice, pulses and spices — with import & export services.",
    shot: avvira,
    full: avviraFull,
    accent: "#b8892c",
  },
  {
    name: "Soulful Smell",
    url: "https://soulfulsmell.com/",
    domain: "soulfulsmell.com",
    category: "Fragrance brand · Online store",
    description:
      "“Fragrances that stay.” A luxurious online store for long-lasting eau de parfums — with shop and customise experiences.",
    shot: soulfulSmell,
    full: soulfulSmellFull,
    accent: "#e2b33c",
  },
  {
    name: "Shailesh Enterprise",
    url: "https://www.shaileshenterprise.com/products",
    domain: "shaileshenterprise.com",
    category: "Industrial manufacturing · Product catalogue",
    description:
      "A bold product catalogue for heavy machinery — grab buckets, winches and excavator attachments from a Jamnagar manufacturer since 2009.",
    shot: shailesh,
    full: shaileshFull,
    accent: "#d4a017",
  },
  {
    name: "Somnath Silica",
    url: "https://www.somnathsilica.com/",
    domain: "somnathsilica.com",
    category: "Industrial minerals · Corporate website",
    description:
      "“Premium silica sand, processed to perfection.” A corporate website showcasing their process, the industries they serve and quick quotes.",
    shot: somnath,
    full: somnathFull,
    accent: "#b8916b",
  },
  {
    name: "Dr. Saurabh Hirani",
    url: "https://drsaurabhhirani.com/",
    domain: "drsaurabhhirani.com",
    category: "Healthcare · Personal portfolio",
    description:
      "A personal portfolio for an Emergency Medicine specialist — clinical practice, gallery and a downloadable CV.",
    shot: drSaurabh,
    full: drSaurabhFull,
    accent: "#38bdf8",
  },
];
