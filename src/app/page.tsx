import { Hero } from "@/components/sections/Hero";
import { Portfolio } from "@/components/sections/Portfolio";
import { SellYourSpace } from "@/components/sections/SellYourSpace";
import { ContactMap } from "@/components/sections/ContactMap";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { LocationsMarquee } from "@/components/ui/LocationsMarquee";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { getCoveragePoints } from "@/lib/coverage";
import { getBillboardFormats } from "@/lib/formats";

export default async function Home() {
  const [points, formats] = await Promise.all([
    getCoveragePoints(),
    getBillboardFormats(),
  ]);

  return (
    <main className="flex min-h-screen flex-col bg-brand-dark text-white selection:bg-brand-blue selection:text-white">
      <Navbar />
      <Hero formats={formats} />
      <Portfolio />
      <SellYourSpace />
      <LocationsMarquee points={points} />
      <ContactMap points={points} />
      <WhatsAppButton />
      <Footer />
    </main>
  );
}
