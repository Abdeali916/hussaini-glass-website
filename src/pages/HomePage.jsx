import { useState } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import ContactBar from "../components/ContactBar";
import CategoryOverview from "../components/CategoryOverview";
import Services from "../components/Services";
import About from "../components/About";
import WhyChooseUs from "../components/WhyChooseUs";
import Gallery from "../components/Gallery";
import ProjectCTA from "../components/ProjectCTA";
import QuoteForm from "../components/QuoteForm";
import Location from "../components/Location";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import WhatsAppButton from "../components/WhatsAppButton";
import MobileContactBar from "../components/MobileContactBar";

export default function HomePage() {
  const [presetService, setPresetService] = useState(null);

  const requestQuoteFor = (serviceName) => {
    setPresetService(serviceName);
    document.querySelector("#quote")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-paper">
      <Navbar />
      <main>
        <Hero />
        <ContactBar />
        <CategoryOverview />
        <Services onRequestQuote={requestQuoteFor} />
        <About />
        <WhyChooseUs />
        <Gallery />
        <ProjectCTA />
        <QuoteForm presetService={presetService} onConsumePreset={() => setPresetService(null)} />
        <Location />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
      <MobileContactBar />
    </div>
  );
}
