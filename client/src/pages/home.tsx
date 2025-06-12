import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { SavingsCalculator } from "@/components/SavingsCalculator";
import { Benefits } from "@/components/Benefits";
import { WhyChooseSunMan } from "@/components/WhyChooseSunMan";
import { SolarQuote } from "@/components/SolarQuote";
import { ContactForm } from "@/components/ContactForm";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <HowItWorks />
      
      {/* YouTube Video Section */}
      <section className="py-16 px-4 max-w-5xl mx-auto">
        <div className="relative w-full max-w-3xl mx-auto" style={{ paddingBottom: '56.25%' /* 16:9 aspect ratio */ }}>
          <iframe
            className="absolute top-0 left-0 w-full h-full rounded-lg shadow-2xl"
            src="https://www.youtube.com/embed/hw2_hEMgE4o?start=17"
            title="Solar Installation Process"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      </section>
      
      <SavingsCalculator />
      <WhyChooseSunMan />
      <ContactForm />
      <Footer />
    </div>
  );
}
