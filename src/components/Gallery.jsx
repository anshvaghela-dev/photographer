import { useState, useRef } from 'react';
import portfolioData from '../data/portfolio.json';
import Card3D from './Card3D';
import { Camera, Film, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Gallery() {
  const [activeTab, setActiveTab] = useState('all');

  const tabs = [
    { id: 'all', label: 'All', icon: null },
    { id: 'photography', label: 'Stills', icon: Camera },
    { id: 'cinematic', label: 'Cinema', icon: Film }
  ];

  const filteredItems = activeTab === 'all' 
    ? portfolioData 
    : portfolioData.filter(item => item.category === activeTab);

  return (
    <section id="gallery" className="py-24 bg-luxury-obsidian border-b border-luxury-gold/5 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-8">
          <div className="max-w-xl">
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-luxury-gold block mb-3 font-sans">
              Visual Portfolio
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl text-luxury-light tracking-tight leading-tight">
              Selected Works & Cinematic Narratives
            </h2>
          </div>

          {/* Fluid Animated Tab Selector: Content-fitting flex layout to prevent overlap */}
          <div className="flex max-w-full overflow-x-auto no-scrollbar bg-luxury-charcoal/80 p-1 rounded-sm border border-luxury-gold/5 backdrop-blur-sm self-start lg:self-auto w-full lg:w-auto justify-between sm:justify-center gap-1 sm:gap-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative shrink-0 px-3 py-2 sm:px-5 sm:py-2.5 text-[10px] sm:text-xs font-sans tracking-wider lg:tracking-widest uppercase transition-colors duration-300 flex items-center justify-center gap-1.5 rounded-sm ${
                    isActive ? 'text-luxury-obsidian font-semibold' : 'text-luxury-gray hover:text-luxury-light'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTabIndicator"
                      className="absolute inset-0 bg-luxury-gold rounded-sm z-0"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-1.5">
                    {Icon && <Icon className="w-3.5 h-3.5 shrink-0" />}
                    {tab.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Asymmetrical Staggered Column Masonry Grid */}
        <motion.div 
          layout 
          className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.article
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="break-inside-avoid w-full group relative mb-6"
              >
                {item.category === 'photography' ? (
                  /* Photography Render: Card3D */
                  <Card3D className="w-full">
                    <div 
                      className="relative overflow-hidden" 
                      style={{ aspectRatio: `${item.width} / ${item.height}` }}
                    >
                      <img
                        src={item.src}
                        alt={item.alt}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-luxury-obsidian/90 via-luxury-obsidian/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                        <span className="text-[10px] tracking-[0.3em] uppercase text-luxury-gold mb-1 font-sans">{item.tag}</span>
                        <h3 className="font-serif text-lg text-luxury-light flex items-center justify-between">
                          {item.title}
                          <ArrowUpRight className="w-4 h-4 text-luxury-gold" />
                        </h3>
                      </div>
                    </div>
                  </Card3D>
                ) : (
                  /* Cinematic Render: Inline Hover Playable Stream */
                  <CinematicCard item={item} />
                )}
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}

// Inline Subcomponent for handling Video streams and hover plays
function CinematicCard({ item }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hoverTimeout, setHoverTimeout] = useState(null);

  const handleMouseEnter = () => {
    setIsPlaying(true);
    if (videoRef.current) {
      // Small timeout to prevent standard DOM errors due to quick cursor movements interrupting loading stream
      const timeout = setTimeout(() => {
        const playPromise = videoRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch((error) => {
            console.log("Muted video play promise prevented:", error);
          });
        }
      }, 150);
      setHoverTimeout(timeout);
    }
  };

  const handleMouseLeave = () => {
    setIsPlaying(false);
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
    }
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <Card3D className="w-full">
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative w-full overflow-hidden bg-luxury-charcoal"
        style={{ aspectRatio: `${item.width} / ${item.height}` }}
      >
        {/* Poster Image / Fallback */}
        <img
          src={item.src}
          alt={item.alt}
          loading="lazy"
          className={`w-full h-full object-cover absolute inset-0 transition-opacity duration-500 z-10 ${
            isPlaying ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        />

        {/* Video Element */}
        <video
          ref={videoRef}
          src={item.videoSrc}
          loop
          muted
          playsInline
          preload="metadata"
          className="w-full h-full object-cover absolute inset-0 bg-luxury-obsidian"
        />

        {/* Cinematic Room Visual Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-luxury-obsidian/90 via-luxury-obsidian/25 to-transparent z-20 flex flex-col justify-end p-6 pointer-events-none">
          <span className="text-[10px] tracking-[0.3em] uppercase text-luxury-gold mb-1 font-sans">{item.tag}</span>
          <h3 className="font-serif text-lg text-luxury-light flex items-center justify-between">
            {item.title}
            <span className="w-7 h-7 rounded-full bg-luxury-gold/10 border border-luxury-gold/30 flex items-center justify-center text-luxury-gold scale-90 group-hover:scale-100 transition-transform duration-300">
              <Film className="w-3 h-3 fill-current" />
            </span>
          </h3>
        </div>
      </div>
    </Card3D>
  );
}
