import { Hero } from "@/components/sections/Hero";
import { Portfolio } from "@/components/sections/Portfolio";
import { SellYourSpace } from "@/components/sections/SellYourSpace";
import { ContactMap } from "@/components/sections/ContactMap";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { LocationsMarquee } from "@/components/ui/LocationsMarquee";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-brand-dark text-white selection:bg-brand-blue selection:text-white">
      <Navbar />
      <Hero />
      <Portfolio />
      <SellYourSpace />
      <LocationsMarquee />
      <ContactMap />
      <WhatsAppButton />
      <Footer />
    </main>
  );
}
