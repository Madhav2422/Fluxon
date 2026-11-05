import type { Metadata } from "next";
import "@/components/Landing/landing.css";
import "@/components/Services/services.css";
import CTASection from "@/components/Landing/CTASection";
import PauseOffscreen from "@/components/Landing/PauseOffscreen";
import ScrollProgress from "@/components/Landing/ScrollProgress";
import Included from "@/components/Services/Included";
import LayerStack from "@/components/Services/LayerStack";
import ServiceIndex from "@/components/Services/ServiceIndex";
import ServicesHero from "@/components/Services/ServicesHero";

export const metadata: Metadata = {
  title: "Services | Fluxon Infotech",
  description:
    "Web development, AI solutions, cloud, automation, DevOps and IT consulting — end-to-end IT services tailored to your business.",
};

export default function ServicesPage() {
  return (
    <div className="fx-root">
      <ScrollProgress />
      <PauseOffscreen />
      <ServicesHero />
      <ServiceIndex />
      <LayerStack />
      <Included />
      <CTASection />
    </div>
  );
}
