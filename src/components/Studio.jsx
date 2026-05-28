import { useState } from 'react';
import teamData from '../data/team.json';
import { X, ArrowRight, Loader } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Studio() {
  const [selectedMember, setSelectedMember] = useState(null);
  const [loading, setLoading] = useState(false);
  const [memberDetail, setMemberDetail] = useState(null);

  // Simulating an asynchronous API fetch for profile data (implicit route like /about/:memberId)
  const fetchMemberDetails = (memberId) => {
    setSelectedMember(memberId);
    setLoading(true);
    setMemberDetail(null);

    // Mock API delay
    setTimeout(() => {
      const detail = teamData.find(m => m.id === memberId);
      setMemberDetail(detail);
      setLoading(false);
    }, 850);
  };

  const closeDetail = () => {
    setSelectedMember(null);
    setMemberDetail(null);
    setLoading(false);
  };

  return (
    <section id="studio" className="py-24 bg-luxury-obsidian border-b border-luxury-gold/5 relative overflow-hidden">
      {/* Background ambient lighting blur */}
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] rounded-full bg-luxury-gold/5 filter blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-20">
          <span className="text-xs uppercase tracking-[0.3em] text-luxury-gold block mb-3 font-sans">
            Our Collective
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-luxury-light tracking-tight mb-6">
            The Production Studio Team
          </h2>
          <p className="font-sans text-sm text-luxury-gray leading-relaxed tracking-wide">
            A cohesive group of elite creative directors, premium portfolio photographers, and cinematic video editors. We fuse physical film optics with digital design grading.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teamData.map((member) => (
            <article
              key={member.id}
              onClick={() => fetchMemberDetails(member.id)}
              className="group relative cursor-pointer border border-luxury-gold/5 bg-luxury-charcoal/50 rounded-sm overflow-hidden p-6 hover:border-luxury-gold/25 transition-all duration-500 hover:-translate-y-1"
            >
              {/* Profile Image Frame */}
              <div className="aspect-[4/5] w-full overflow-hidden mb-6 bg-luxury-obsidian rounded-sm relative">
                <img
                  src={member.image}
                  alt={`${member.name} - ${member.role}`}
                  loading="lazy"
                  className="w-full h-full object-cover grayscale contrast-[1.05] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-luxury-obsidian via-transparent to-transparent opacity-60" />
              </div>

              {/* Basic Info */}
              <span className="text-[10px] tracking-[0.3em] uppercase text-luxury-gold block mb-1 font-sans">
                {member.role}
              </span>
              <h3 className="font-serif text-xl text-luxury-light mb-2 flex items-center justify-between group-hover:text-luxury-gold transition-colors duration-300">
                {member.name}
                <ArrowRight className="w-4 h-4 text-luxury-gold opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
              </h3>
              <p className="font-sans text-xs text-luxury-gray line-clamp-2 leading-relaxed">
                {member.specialty}
              </p>
            </article>
          ))}
        </div>

        {/* Dynamic Parameter-Driven View Render Overlay (Simulating implicit routes) */}
        <AnimatePresence>
          {selectedMember && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-luxury-obsidian/95 backdrop-blur-md flex justify-end"
            >
              {/* Close backdrop trigger */}
              <div className="absolute inset-0 cursor-pointer" onClick={closeDetail} />

              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 26, stiffness: 220 }}
                className="relative w-full max-w-2xl bg-luxury-charcoal border-l border-luxury-gold/15 h-full p-8 md:p-12 overflow-y-auto z-10 flex flex-col justify-between"
              >
                {/* Close Button */}
                <button
                  onClick={closeDetail}
                  className="absolute top-6 right-6 p-2 rounded-full border border-luxury-light/10 hover:border-luxury-gold text-luxury-light hover:text-luxury-gold transition-colors"
                  aria-label="Close panel"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Simulated API Loader */}
                {loading && (
                  <div className="flex-1 flex flex-col items-center justify-center gap-4 py-20">
                    <Loader className="w-8 h-8 text-luxury-gold animate-spin" />
                    <span className="text-[10px] tracking-[0.25em] uppercase text-luxury-gold font-sans">
                      Fetching Profile Details...
                    </span>
                  </div>
                )}

                {/* Fetched Data Layout */}
                {!loading && memberDetail && (
                  <div className="flex-1 flex flex-col justify-center py-8">
                    {/* Head section */}
                    <div className="flex flex-col sm:flex-row gap-8 items-start mb-8">
                      <div className="w-32 h-40 bg-luxury-obsidian rounded-sm overflow-hidden shrink-0 border border-luxury-gold/10">
                        <img
                          src={memberDetail.image}
                          alt={memberDetail.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <span className="text-xs tracking-[0.35em] uppercase text-luxury-gold font-sans block mb-1">
                          {memberDetail.role}
                        </span>
                        <h2 className="font-serif text-3xl md:text-4xl text-luxury-light mb-3">
                          {memberDetail.name}
                        </h2>
                        <div className="space-y-1.5 text-xs text-luxury-gray font-sans">
                          <p><strong className="text-luxury-light font-medium">Expertise:</strong> {memberDetail.specialty}</p>
                          <p><strong className="text-luxury-light font-medium">Tenure:</strong> {memberDetail.experience}</p>
                        </div>
                      </div>
                    </div>

                    {/* Detailed Bio */}
                    <div className="border-t border-luxury-gold/10 pt-6 mb-8">
                      <h4 className="text-[10px] tracking-[0.2em] uppercase text-luxury-gold mb-3 font-sans font-semibold">
                        Biography
                      </h4>
                      <p className="font-sans text-sm text-luxury-light/90 leading-relaxed mb-6">
                        {memberDetail.bio}
                      </p>
                      
                      {/* Quote Panel */}
                      <blockquote className="border-l border-luxury-gold pl-4 py-1.5 bg-luxury-gold/5 italic text-luxury-light/90 text-sm font-serif">
                        "{memberDetail.quote}"
                      </blockquote>
                    </div>

                    {/* Associated Works */}
                    <div>
                      <h4 className="text-[10px] tracking-[0.2em] uppercase text-luxury-gold mb-3 font-sans font-semibold">
                        Project Contributions
                      </h4>
                      <div className="flex flex-wrap gap-2.5">
                        {memberDetail.works.map((work, idx) => (
                          <span
                            key={idx}
                            className="text-xs bg-luxury-obsidian border border-luxury-gold/10 text-luxury-light px-3 py-1.5 rounded-sm font-sans"
                          >
                            {work}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Footer action inside details drawer */}
                <div className="border-t border-luxury-gold/10 pt-6 flex justify-between items-center text-xs font-sans text-luxury-gray">
                  <span>Focus Photo Films Agency</span>
                  <a
                    href="#contact"
                    onClick={closeDetail}
                    className="text-luxury-gold hover:text-luxury-light transition-colors uppercase tracking-widest font-semibold flex items-center gap-1.5"
                  >
                    Start Project <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>

              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
