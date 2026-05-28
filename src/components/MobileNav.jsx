import { useState, useEffect } from 'react';
import { Home, Camera, Users, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';

export default function MobileNav() {
  const [activeTab, setActiveTab] = useState('hero');

  const navItems = [
    { id: 'hero', label: 'Home', icon: Home, href: '#hero' },
    { id: 'gallery', label: 'Showcase', icon: Camera, href: '#gallery' },
    { id: 'studio', label: 'Studio', icon: Users, href: '#studio' },
    { id: 'contact', label: 'Connect', icon: MessageSquare, href: '#contact' }
  ];

  // Auto-track the current active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (const item of navItems) {
        const element = document.getElementById(item.id);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveTab(item.id);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = (e, href, id) => {
    e.preventDefault();
    setActiveTab(id);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="md:hidden fixed bottom-0 left-0 w-full z-50 bg-luxury-obsidian/85 backdrop-blur-lg border-t border-luxury-gold/10 px-4 py-3 pb-safe-bottom shadow-[0_-8px_30px_rgba(0,0,0,0.5)]">
      <div className="flex justify-around items-center max-w-md mx-auto relative">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <a
              key={item.id}
              href={item.href}
              onClick={(e) => handleClick(e, item.href, item.id)}
              className="relative py-1 flex flex-col items-center justify-center min-w-[60px] text-center transition-colors duration-300"
            >
              {/* Active Tab Floating Pill Glow (Luxury styling) */}
              {isActive && (
                <motion.div
                  layoutId="mobileActiveIndicator"
                  className="absolute -top-1 w-10 h-7 bg-luxury-gold/10 rounded-full border border-luxury-gold/20 flex items-center justify-center z-0"
                  transition={{ type: "spring", stiffness: 350, damping: 25 }}
                />
              )}

              <Icon
                className={`w-5.5 h-5.5 relative z-10 transition-transform duration-300 ${
                  isActive 
                    ? 'text-luxury-gold scale-110' 
                    : 'text-luxury-gray hover:text-luxury-light'
                }`}
              />
              
              <span 
                className={`text-[9px] font-sans tracking-widest mt-1 uppercase relative z-10 transition-colors ${
                  isActive ? 'text-luxury-light font-medium' : 'text-luxury-gray'
                }`}
              >
                {item.label}
              </span>
            </a>
          );
        })}
      </div>
    </div>
  );
}
