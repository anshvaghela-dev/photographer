import { Camera, Instagram, Youtube, Clapperboard } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#090a0d] border-t border-luxury-gold/5 py-16 text-luxury-gray font-sans relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row justify-between items-start gap-12">
        
        {/* Brand Column */}
        <div className="max-w-xs">
          <a href="#hero" className="flex items-center gap-3 text-luxury-light hover:text-luxury-gold transition-colors duration-300 mb-6">
            <Camera className="w-6 h-6 text-luxury-gold" />
            <span className="font-serif text-xl md:text-2xl tracking-widest uppercase text-luxury-light">
              FOCUS PHOTO FILMS
            </span>
          </a>
          <p className="text-xs leading-relaxed mb-6">
            Elite Creative Production Studio sculpting shadows and motion for luxury international campaigns, fine art portraiture, and high-fidelity cinematic grading.
          </p>
          <div className="flex items-center space-x-4">
            <a href="https://instagram.com/focusphotofilms" target="_blank" rel="noopener noreferrer" className="hover:text-luxury-gold transition-colors" aria-label="Instagram Profile">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="https://vimeo.com/focusphotofilms" target="_blank" rel="noopener noreferrer" className="hover:text-luxury-gold transition-colors" aria-label="Vimeo Portfolio">
              <Clapperboard className="w-4 h-4" />
            </a>
            <a href="https://youtube.com/focusphotofilms" target="_blank" rel="noopener noreferrer" className="hover:text-luxury-gold transition-colors" aria-label="YouTube Channel">
              <Youtube className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Links Column */}
        <div className="grid grid-cols-2 gap-12">
          <div>
            <h4 className="text-[10px] tracking-[0.2em] uppercase text-luxury-gold mb-4 font-semibold font-sans">
              Navigation
            </h4>
            <ul className="space-y-3 text-xs">
              <li>
                <a href="#hero" className="hover:text-luxury-light transition-colors">Top</a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-luxury-light transition-colors">Showcase</a>
              </li>
              <li>
                <a href="#studio" className="hover:text-luxury-light transition-colors">The Studio</a>
              </li>
              <li>
                <a href="#contact" className="hover:text-luxury-light transition-colors">Connect</a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] tracking-[0.2em] uppercase text-luxury-gold mb-4 font-semibold font-sans">
              Focus Areas
            </h4>
            <ul className="space-y-3 text-xs">
              <li>
                <span className="hover:text-luxury-light transition-colors cursor-default">Cinematic Video Editor</span>
              </li>
              <li>
                <span className="hover:text-luxury-light transition-colors cursor-default">Premium Portfolio Photography</span>
              </li>
              <li>
                <span className="hover:text-luxury-light transition-colors cursor-default">Creative Production Studio</span>
              </li>
              <li>
                <span className="hover:text-luxury-light transition-colors cursor-default">Advanced Color Grading</span>
              </li>
            </ul>
          </div>
        </div>

      </div>

      {/* Copyright & SEO Terms bar */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 mt-16 pt-8 border-t border-luxury-gold/5 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] tracking-wider uppercase">
        <p>&copy; {currentYear} Focus Photo Films. All rights reserved.</p>
        <div className="flex gap-6 text-luxury-gray/60">
          <span>Organic SEO Discovery System v1.0</span>
          <span>Zero-Cost Infrastructure</span>
        </div>
      </div>
    </footer>
  );
}
