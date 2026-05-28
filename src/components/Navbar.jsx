import { useState, useEffect } from 'react';
import { Menu, X, Camera } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Showcase', href: '#gallery' },
    { name: 'Studio', href: '#studio' },
    { name: 'Connect', href: '#contact' }
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-luxury-obsidian/75 backdrop-blur-md border-b border-luxury-gold/10 py-2.5 sm:py-4'
          : 'bg-transparent py-4 sm:py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex justify-between items-center">
        {/* Logo */}
        <a href="#hero" className="group flex items-center gap-3 text-luxury-light hover:text-luxury-gold transition-colors duration-300">
          <Camera className="w-5 h-5 md:w-6 md:h-6 text-luxury-gold group-hover:scale-110 transition-transform duration-300 shrink-0" />
          <span className="font-serif text-sm sm:text-lg md:text-2xl tracking-widest uppercase whitespace-nowrap">
            FOCUS PHOTO FILMS
          </span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center space-x-6 xl:space-x-12">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-sans tracking-[0.2em] uppercase text-luxury-light/80 hover:text-luxury-gold transition-colors duration-300 relative group py-2"
            >
              {link.name}
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-luxury-gold transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
          <a
            href="#contact"
            className="px-6 py-2.5 text-xs font-sans tracking-[0.25em] uppercase border border-luxury-gold text-luxury-gold hover:bg-luxury-gold hover:text-luxury-obsidian transition-all duration-300 rounded-sm"
          >
            Book Session
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden text-luxury-light hover:text-luxury-gold focus:outline-none transition-colors"
          aria-label="Toggle Menu"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 pt-24 bg-luxury-obsidian/98 backdrop-blur-lg flex flex-col justify-center items-center space-y-10 z-40 transition-all duration-300 animate-fade-in">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-xl font-serif tracking-[0.15em] text-luxury-light hover:text-luxury-gold transition-colors duration-300"
            >
              {link.name}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setIsMobileMenuOpen(false)}
            className="px-8 py-3 text-sm font-sans tracking-[0.2em] uppercase border border-luxury-gold text-luxury-gold hover:bg-luxury-gold hover:text-luxury-obsidian transition-all duration-300 rounded-sm"
          >
            Book Session
          </a>
        </div>
      )}
    </nav>
  );
}
