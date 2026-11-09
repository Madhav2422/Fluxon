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
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About Us – IT Company in Morbi, Gujarat",
  description:
    "Fluxon Infotech is an IT company in Morbi, Gujarat: a team of developers helping businesses grow with websites, software, AI and cloud. Read our story.",
  path: "/about",
});

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
