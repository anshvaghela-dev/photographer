import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

/**
 * 3D Physics-based Perspective Tilt Card.
 * Captures mouse coordinates to compute real-time rotation X and rotation Y angles.
 */
export default function Card3D({ children, className = "" }) {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  // Motion values for tracking cursor position
  const x = useMotionValue(0.5); // ranges from 0 to 1
  const y = useMotionValue(0.5); // ranges from 0 to 1

  // Smooth springs to avoid rigid transitions
  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);

  // Transform coordinates to 3D rotation degrees (-15 to 15 deg)
  const rotateX = useTransform(ySpring, [0, 1], [15, -15]);
  const rotateY = useTransform(xSpring, [0, 1], [-15, 15]);

  // Transform cursor positions for glare gradients
  const glareOpacity = useTransform(
    useSpring(useMotionValue(0), springConfig), 
    [0, 1], 
    [0, 0.15]
  );
  
  const glareX = useTransform(xSpring, [0, 1], ["0%", "100%"]);
  const glareY = useTransform(ySpring, [0, 1], ["0%", "100%"]);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    
    // Calculate normalized coordinates (0 to 1) relative to container width/height
    const clientX = (e.clientX - rect.left) / rect.width;
    const clientY = (e.clientY - rect.top) / rect.height;
    
    x.set(clientX);
    y.set(clientY);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    // Smooth reset to origin
    x.set(0.5);
    y.set(0.5);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative rounded-sm overflow-hidden select-none cursor-pointer border border-luxury-gold/5 bg-luxury-charcoal transition-colors duration-500 ${className}`}
      style={{ perspective: 1000 }}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d"
        }}
        className="w-full h-full relative"
      >
        {/* Child elements rendered in 3D */}
        <div style={{ transform: "translateZ(30px)", transformStyle: "preserve-3d" }} className="w-full h-full relative z-10">
          {children}
        </div>

        {/* Glossy glare overlay */}
        <motion.div
          className="absolute inset-0 pointer-events-none z-20 transition-opacity duration-300"
          style={{
            opacity: isHovered ? 0.25 : 0,
            background: `radial-gradient(circle 200px at ${glareX.get()} ${glareY.get()}, rgba(212, 175, 55, 0.25), transparent)`
          }}
        />

        {/* Ambient border reflection glow on hover */}
        <div className={`absolute inset-0 border border-luxury-gold/20 pointer-events-none rounded-sm transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />
      </motion.div>
    </div>
  );
}
