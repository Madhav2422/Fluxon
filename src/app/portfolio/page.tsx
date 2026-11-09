import type { Metadata } from "next";
import "@/components/Landing/landing.css";
import "@/components/Portfolio/portfolio.css";
import "@/components/CaseStudy/casestudy.css";
import PauseOffscreen from "@/components/Landing/PauseOffscreen";
import ScrollProgress from "@/components/Landing/ScrollProgress";
import ApproachScroll from "@/components/Portfolio/ApproachScroll";
import CaseStudyTeaser from "@/components/Portfolio/CaseStudyTeaser";
import Impact from "@/components/Portfolio/Impact";
import Platforms from "@/components/Portfolio/Platforms";
import PortfolioHero from "@/components/Portfolio/PortfolioHero";
import WhatWeDo from "@/components/Portfolio/WhatWeDo";
import WorkGallery from "@/components/Portfolio/WorkGallery";
import WorkWithUs from "@/components/Portfolio/WorkWithUs";

export const metadata: Metadata = {
  title: "Portfolio | Fluxon Infotech",
  description:
    "Selected work by Fluxon Infotech — live websites, platforms and AI-driven solutions for businesses across industries.",
};

export default function PortfolioPage() {
  return (
    <div className="fx-root">
      <ScrollProgress />
      <PauseOffscreen />
      <PortfolioHero />
      <WorkGallery />
      <CaseStudyTeaser />
      <WhatWeDo />
      <Platforms />
      <ApproachScroll />
      <Impact />
      <WorkWithUs />
    </div>
  );
}
