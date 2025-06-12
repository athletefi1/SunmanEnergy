import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X, Sun } from "lucide-react";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50 transition-all">
      <div className="max-w-6xl mx-auto px-5">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 transition-all hover:scale-105">
            <Sun className="w-10 h-10 text-sunman-yellow" />
            <span className="text-3xl font-headline text-sunman-blue tracking-wide">SUNMAN ENERGY</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-3 ml-auto items-center">
            <button 
              onClick={() => scrollToSection('home')}
              className="text-sunman-black hover:text-sunman-blue transition-all font-medium font-body px-2 py-1 rounded-lg hover:bg-sunman-light-blue"
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection('how-it-works')}
              className="text-sunman-black hover:text-sunman-blue transition-all font-medium font-body px-2 py-1 rounded-lg hover:bg-sunman-light-blue"
            >
              How it Works
            </button>
            <button 
              onClick={() => scrollToSection('savings-calculator')}
              className="text-sunman-black hover:text-sunman-blue transition-all font-medium font-body px-2 py-1 rounded-lg hover:bg-sunman-light-blue"
            >
              Savings
            </button>
            <button 
              onClick={() => scrollToSection('why-choose')}
              className="text-sunman-black hover:text-sunman-blue transition-all font-medium font-body px-2 py-1 rounded-lg hover:bg-sunman-light-blue"
            >
              Why SUNMAN
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="bg-sunman-yellow text-sunman-black hover:bg-sunman-blue hover:text-white transition-all font-bold font-body px-4 py-2 rounded-lg"
            >
              Get Quote
            </button>
          </nav>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-black" />
            ) : (
              <Menu className="w-6 h-6 text-black" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-4">
              <button 
                onClick={() => scrollToSection('home')}
                className="text-black hover:text-solarman-header-blue transition-colors font-medium text-left font-body"
              >
                Home
              </button>
              <button 
                onClick={() => scrollToSection('how-it-works')}
                className="text-black hover:text-solarman-header-blue transition-colors font-medium text-left font-body"
              >
                How it Works
              </button>
              <button 
                onClick={() => scrollToSection('savings-calculator')}
                className="text-black hover:text-solarman-header-blue transition-colors font-medium text-left font-body"
              >
                Savings
              </button>
              <button 
                onClick={() => scrollToSection('services')}
                className="text-black hover:text-solarman-header-blue transition-colors font-medium text-left font-body"
              >
                Why SunMan Energy
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="text-black hover:text-solarman-header-blue transition-colors font-medium text-left font-body"
              >
                Contact
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
