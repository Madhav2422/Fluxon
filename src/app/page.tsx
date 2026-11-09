import "@/components/Landing/landing.css";
import "@/components/CaseStudy/casestudy.css";
import CTASection from "@/components/Landing/CTASection";
import FeaturedWork from "@/components/Landing/FeaturedWork";
import HeroSection from "@/components/Landing/HeroSection";
import PauseOffscreen from "@/components/Landing/PauseOffscreen";
import ProcessSection from "@/components/Landing/ProcessSection";
import ScrollProgress from "@/components/Landing/ScrollProgress";
import ServicesBento from "@/components/Landing/ServicesBento";
import StatsSection from "@/components/Landing/StatsSection";
import TechMarquee from "@/components/Landing/TechMarquee";
import CaseStudyTeaser from "@/components/Portfolio/CaseStudyTeaser";
import { pageMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Fluxon Infotech | IT Company in Morbi, Gujarat",
  description: SITE.description,
  path: "/",
  absolute: true,
});

export default function Home() {
  return (
    <div className="fx-root">
      <ScrollProgress />
      <PauseOffscreen />
      <HeroSection />
      <TechMarquee />
      <StatsSection />
      <ServicesBento />
      <FeaturedWork />
      <CaseStudyTeaser tone="mint" />
      <ProcessSection />
      <CTASection />
    </div>
  );
}
