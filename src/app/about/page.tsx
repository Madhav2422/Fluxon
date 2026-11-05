import type { Metadata } from "next";
import "@/components/Landing/landing.css";
import "@/components/About/about.css";
import AboutHero from "@/components/About/AboutHero";
import ApproachSection from "@/components/About/ApproachSection";
import JourneySection from "@/components/About/JourneySection";
import StoryManifesto from "@/components/About/StoryManifesto";
import ValuesSection from "@/components/About/ValuesSection";
import CTASection from "@/components/Landing/CTASection";
import PauseOffscreen from "@/components/Landing/PauseOffscreen";
import ScrollProgress from "@/components/Landing/ScrollProgress";

export const metadata: Metadata = {
  title: "About Us | Fluxon Infotech",
  description:
    "Meet Fluxon Infotech — a team of passionate developers on a mission to empower businesses through technology. Our story, our values and how we work.",
};

export default function AboutPage() {
  return (
    <div className="fx-root">
      <ScrollProgress />
      <PauseOffscreen />
      <AboutHero />
      <StoryManifesto />
      <JourneySection />
      <ValuesSection />
      <ApproachSection />
      <CTASection />
    </div>
  );
}
