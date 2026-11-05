import type { Metadata } from "next";
import "@/components/Landing/landing.css";
import "@/components/Contact/contact.css";
import ContactBody from "@/components/Contact/ContactBody";
import ContactFAQ from "@/components/Contact/ContactFAQ";
import ContactHero from "@/components/Contact/ContactHero";
import { caveat } from "@/components/Contact/fonts";
import PauseOffscreen from "@/components/Landing/PauseOffscreen";
import ScrollProgress from "@/components/Landing/ScrollProgress";

export const metadata: Metadata = {
  title: "Contact Us | Fluxon Infotech",
  description:
    "Have a project in mind? Tell us about it — call, email or send us a message and we'll reply within 24 hours.",
};

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
