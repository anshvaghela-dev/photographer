import { motion } from 'framer-motion';
import { ChevronDown, Play } from 'lucide-react';

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 60, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <header id="hero" className="relative w-full h-screen overflow-hidden flex items-center justify-center bg-luxury-obsidian">
      {/* 1. Full-Bleed Video Streaming Container */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover filter brightness-[0.25] contrast-[1.1] scale-[1.02]"
          poster="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=1920"
        >
          <source
            src="https://assets.mixkit.co/videos/preview/mixkit-abstract-dark-waves-43186-large.mp4"
            type="video/mp4"
          />
        </video>
        {/* Obsidian Glass Gradient Cover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-luxury-obsidian via-luxury-obsidian/30 to-luxury-obsidian/65" />
      </div>

      {/* 2. Content Layer with Text-Mask Reveal Animations */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 text-center max-w-5xl px-6 lg:px-12 flex flex-col items-center"
      >
        {/* Small subtitle tag */}
        <motion.div variants={itemVariants} className="mb-4">
          <span className="inline-block whitespace-nowrap text-[10px] sm:text-xs uppercase tracking-[0.3em] sm:tracking-[0.4em] text-luxury-gold font-sans font-medium bg-luxury-gold/10 px-3 py-1 sm:px-4 sm:py-1.5 rounded-full border border-luxury-gold/20">
            Creative Production Studio
          </span>
        </motion.div>

        {/* Big Editorial Heading */}
        <motion.h1
          variants={itemVariants}
          className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-luxury-light leading-[1.05] mb-6 select-none"
        >
          FOCUS PHOTO FILMS <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-luxury-light via-luxury-gold to-luxury-light bg-300% animate-gold-shine italic">
            Chronicles of Light & Motion.
          </span>
        </motion.h1>

        {/* Studio intro paragraph */}
        <motion.p
          variants={itemVariants}
          className="font-sans text-sm md:text-base text-luxury-gray max-w-2xl leading-relaxed tracking-wide mb-10 text-center"
        >
          We orchestrate fine art visual media campaigns, professional color grading, and luxury cinematics.
          Engineered for digital excellence and local search supremacy.
        </motion.p>

        {/* CTA Actions */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-5 items-center justify-center w-full"
        >
          <a
            href="#gallery"
            className="w-full sm:w-auto px-8 py-3.5 text-xs font-sans tracking-[0.25em] uppercase bg-luxury-gold text-luxury-obsidian font-semibold hover:bg-luxury-light hover:text-luxury-obsidian transition-all duration-300 rounded-sm shadow-lg shadow-luxury-gold/10 flex items-center justify-center gap-2"
          >
            Explore Showcase
          </a>
          <a
            href="#studio"
            className="w-full sm:w-auto px-8 py-3.5 text-xs font-sans tracking-[0.25em] uppercase bg-transparent text-luxury-light border border-luxury-light/20 hover:border-luxury-gold/55 hover:text-luxury-gold transition-all duration-300 rounded-sm flex items-center justify-center gap-2"
          >
            <Play className="w-3.5 h-3.5 fill-current" /> Studio Profile
          </a>
        </motion.div>
      </motion.div>

      {/* 3. Pulsing Scroll-Down indicator (Hidden on mobile to avoid CTA overlap) */}
      <div className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5 opacity-65 animate-bounce">
        <span className="text-[10px] tracking-[0.3em] uppercase text-luxury-gray font-sans">
          Scroll
        </span>
        <ChevronDown className="w-5 h-5 text-luxury-gold" />
      </div>
    </header>
  );
}
