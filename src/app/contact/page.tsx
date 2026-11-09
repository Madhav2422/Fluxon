import "@/components/Landing/landing.css";
import "@/components/Contact/contact.css";
import ContactBody from "@/components/Contact/ContactBody";
import ContactFAQ from "@/components/Contact/ContactFAQ";
import ContactHero from "@/components/Contact/ContactHero";
import { caveat } from "@/components/Contact/fonts";
import PauseOffscreen from "@/components/Landing/PauseOffscreen";
import ScrollProgress from "@/components/Landing/ScrollProgress";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contact Us – Morbi, Gujarat",
  description:
    "Talk to Fluxon Infotech in Morbi, Gujarat about your website, app or IT project. Call +91 79848 46312 or email fluxoninfotech@gmail.com. We reply within 24 hours.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <div className={`fx-root ${caveat.variable}`}>
      <ScrollProgress />
      <PauseOffscreen />
      <ContactHero />
      <ContactBody />
      <ContactFAQ />
    </div>
  );
}
