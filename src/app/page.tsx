import "@/components/Landing/landing.css";
import CTASection from "@/components/Landing/CTASection";
import FeaturedWork from "@/components/Landing/FeaturedWork";
import HeroSection from "@/components/Landing/HeroSection";
import PauseOffscreen from "@/components/Landing/PauseOffscreen";
import ProcessSection from "@/components/Landing/ProcessSection";
import ScrollProgress from "@/components/Landing/ScrollProgress";
import ServicesBento from "@/components/Landing/ServicesBento";
import StatsSection from "@/components/Landing/StatsSection";
import TechMarquee from "@/components/Landing/TechMarquee";

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
      <ProcessSection />
      <CTASection />
    </div>
  );
}
