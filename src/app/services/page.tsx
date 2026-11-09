import "@/components/Landing/landing.css";
import "@/components/Services/services.css";
import CTASection from "@/components/Landing/CTASection";
import PauseOffscreen from "@/components/Landing/PauseOffscreen";
import ScrollProgress from "@/components/Landing/ScrollProgress";
import Included from "@/components/Services/Included";
import LayerStack from "@/components/Services/LayerStack";
import ServiceIndex from "@/components/Services/ServiceIndex";
import ServicesHero from "@/components/Services/ServicesHero";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Website Development & IT Services in Morbi",
  description:
    "Website development, AI solutions, cloud, automation, DevOps and IT consulting from Fluxon Infotech in Morbi, Gujarat. End-to-end IT services for your business.",
  path: "/services",
});

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
