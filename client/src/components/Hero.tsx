import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import sunManLogo from "@assets/Sun Man Logo.png";
import rateCrookImage from "@assets/The Rate Crook.png";

export function Hero() {
  const [showRateCrook, setShowRateCrook] = useState(false);

  // Rate Crook popup animation
  useEffect(() => {
    const interval = setInterval(() => {
      setShowRateCrook(true);
      setTimeout(() => setShowRateCrook(false), 8000); // Show for 8 seconds
    }, 12000); // Every 12 seconds

    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="hero-sky-bg py-10 lg:py-16 min-h-[450px] lg:min-h-[550px] relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-5 relative z-10">
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12 lg:gap-8">
          {/* Left Column - Text Content (60%) */}
          <div className="lg:w-[60%] space-y-6 text-center lg:text-left">
            {/* Main Headline */}
            <h1 className="font-headline text-5xl lg:text-7xl leading-[1.2] text-shadow-white font-extralight">
              <span className="text-white whitespace-nowrap">No Cash. No Credit. Just</span>
              <br />
              <span className="text-sunman-yellow">Sunlight.</span>
            </h1>
            
            {/* Subheadline */}
            <p className="text-lg font-body leading-relaxed max-w-[550px] text-white drop-shadow-lg" style={{ color: '#f9f9f9', textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
              If your roof gets sunlight, you may qualify for solar with no credit or money down. 
              Just a utility bill and sunlight.
            </p>
            
            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start pt-4">
              <Button 
                className="bg-sunman-blue hover:bg-sunman-yellow hover:text-sunman-black text-white font-bold px-8 py-4 text-lg rounded-full font-body transition-all transform hover:scale-105 shadow-lg"
                onClick={() => scrollToSection('savings-calculator')}
              >
                Calculate Your Savings
              </Button>
              <Button 
                className="bg-sunman-yellow hover:bg-sunman-blue hover:text-white text-sunman-black font-bold px-8 py-4 text-lg rounded-full font-body transition-all transform hover:scale-105 shadow-lg"
                onClick={() => scrollToSection('contact')}
              >
                Schedule Consultation
              </Button>
            </div>

            {/* Benefit Strip */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start pt-6">
              <div className="bg-black bg-opacity-70 text-white px-4 py-3 rounded-md flex flex-col items-center text-center font-body">
                <div className="font-bold text-sm mb-1 text-sunman-yellow">
                  $0 Down Solar
                </div>
                <span className="text-xs opacity-90">No upfront costs</span>
              </div>
              <div className="bg-black bg-opacity-70 text-white px-4 py-3 rounded-md flex flex-col items-center text-center font-body">
                <div className="font-bold text-sm mb-1 text-sunman-yellow">
                  Need A New Roof
                </div>
                <span className="text-xs opacity-90">Included in Package</span>
              </div>
              <div className="bg-black bg-opacity-70 text-white px-4 py-3 rounded-md flex flex-col items-center text-center font-body">
                <div className="font-bold text-sm mb-1 text-sunman-yellow">
                  Fixed Monthly Bill
                </div>
                <span className="text-xs opacity-90">Predictable rates</span>
              </div>
            </div>
          </div>

          {/* Right Column - SolarMan Image (40%) */}
          <div className="lg:w-[40%] flex justify-center lg:justify-end items-start lg:pt-8">
            <div className="card-container w-64 lg:w-72">
              <div className="card-flip">
                <div className="card-front">
                  <div className="bg-sunman-yellow rounded-xl p-2 shadow-2xl card-border">
                    <img 
                      src={sunManLogo}
                      alt="SUNMAN - Your Solar Hero"
                      className="w-full h-auto rounded-lg bg-white"
                    />
                  </div>
                </div>
                <div className="card-back bg-sunman-yellow rounded-xl p-6 shadow-2xl">
                  <div className="text-sunman-black font-headline text-2xl font-black mb-4">
                    SPECIAL OFFER!
                  </div>
                  <div className="text-sunman-black font-body text-lg font-bold mb-2">
                    Use Promo Code
                  </div>
                  <div className="bg-white text-sunman-black font-headline text-3xl font-black py-4 px-6 rounded-lg mb-4 border-2 border-sunman-black">
                    SUNMAN25
                  </div>
                  <div className="text-sunman-black font-body text-lg font-bold">
                    for an Extra 10% Off!
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Rate Crook Villain Popup */}
      {showRateCrook && (
        <div className="fixed bottom-4 right-4 z-50 animate-bounce">
          <div className="relative bg-red-600 rounded-lg p-4 shadow-2xl border-4 border-red-800 max-w-xs">
            {/* Speech bubble arrow */}
            <div className="absolute -top-2 left-6 w-4 h-4 bg-red-600 border-l-4 border-t-4 border-red-800 transform rotate-45"></div>
            
            {/* Rate Crook Image */}
            <div className="flex items-start gap-3">
              <img 
                src={rateCrookImage} 
                alt="The Rate Crook" 
                className="w-16 h-16 rounded-full border-2 border-red-800"
              />
              <div className="flex-1">
                {/* Evil speech bubble */}
                <div className="text-white font-bold text-sm mb-1">The Rate Crook:</div>
                <div className="text-yellow-300 font-body text-xs leading-tight">
                  "Don't go solar. Keep paying the evil utilities your hard earn money."
                </div>
              </div>
            </div>
            
            {/* Close button */}
            <button 
              onClick={() => setShowRateCrook(false)}
              className="absolute -top-2 -right-2 bg-red-800 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold hover:bg-red-900 transition-colors"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
