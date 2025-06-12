import { Sun } from "lucide-react";
import { FaTwitter, FaLinkedin } from "react-icons/fa";

export function Footer() {
  return (
    <footer className="bg-sunman-blue text-white py-8">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <Sun className="w-10 h-10 text-sunman-yellow" />
          <span className="text-3xl font-headline text-white tracking-wide">SUNMAN ENERGY</span>
        </div>
        <p className="text-white/80 font-body mb-4">
          Making solar energy accessible to everyone with no credit checks and zero down payment.
        </p>
        
        <div className="flex items-center justify-center space-x-6 mb-4">
          <a 
            href="https://x.com/SUNMAN_ENERGY" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-white/70 hover:text-sunman-yellow transition-colors duration-300"
          >
            <FaTwitter className="w-6 h-6" />
          </a>
          <a 
            href="https://www.linkedin.com/company/solarmanenergy" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-white/70 hover:text-sunman-yellow transition-colors duration-300"
          >
            <FaLinkedin className="w-6 h-6" />
          </a>
        </div>
        
        <div className="text-white/60 text-sm font-body">
          © 2024 SUNMAN ENERGY. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
