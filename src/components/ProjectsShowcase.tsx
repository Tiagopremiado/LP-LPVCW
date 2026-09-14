import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Maximize2, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { PROJECT_IMAGES, ProjectImage } from '../data/projects';

export const ProjectsShowcase: React.FC = () => {
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);

  // Keyboard navigation for Lightbox
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (activeImageIndex === null) return;
      if (e.key === 'Escape') {
        setActiveImageIndex(null);
      } else if (e.key === 'ArrowRight') {
        setActiveImageIndex((prev) =>
          prev !== null ? (prev + 1) % PROJECT_IMAGES.length : 0
        );
      } else if (e.key === 'ArrowLeft') {
        setActiveImageIndex((prev) =>
          prev !== null ? (prev - 1 + PROJECT_IMAGES.length) % PROJECT_IMAGES.length : 0
        );
      }
    },
    [activeImageIndex]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImageIndex((prev) =>
      prev !== null ? (prev + 1) % PROJECT_IMAGES.length : 0
    );
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImageIndex((prev) =>
      prev !== null ? (prev - 1 + PROJECT_IMAGES.length) % PROJECT_IMAGES.length : 0
    );
  };

  return (
    <section
      id="projetos-lpvcw"
      className="relative w-full bg-black text-white py-20 sm:py-28 lg:py-32 px-4 sm:px-8 lg:px-12 overflow-hidden border-t border-white/[0.08]"
    >
      {/* Subtle Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[450px] bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.05),transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4"
          >
            Projetos criados com LPVCW
          </motion.h2>
        </div>

        {/* Pure Images Grid - Original Format without cropping or names */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">
          {PROJECT_IMAGES.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: (idx % 2) * 0.12 }}
              className="group relative rounded-xl sm:rounded-2xl overflow-hidden border border-white/[0.12] hover:border-white/35 bg-[#06080c] transition-all duration-500 shadow-[0_12px_40px_rgba(0,0,0,0.8)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.95),0_0_30px_rgba(255,255,255,0.06)] cursor-pointer"
              onClick={() => setActiveImageIndex(idx)}
            >
              {/* Natural Image Viewport (Preserves exact aspect ratio) */}
              <div className="relative w-full overflow-hidden bg-black/50">
                <img
                  src={item.src}
                  alt="Projeto criado com LPVCW"
                  loading="lazy"
                  className="w-full h-auto block object-contain transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                />

                {/* Subtle Hover Action Overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-[2px]">
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-black font-medium text-xs tracking-tight shadow-[0_0_24px_rgba(255,255,255,0.5)] transform translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                    <Maximize2 className="w-3.5 h-3.5 stroke-[2.2]" />
                    <span>Expandir</span>
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal (Full Resolution, Original Format) */}
      <AnimatePresence>
        {activeImageIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 lg:p-8 bg-black/95 backdrop-blur-xl"
            onClick={() => setActiveImageIndex(null)}
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveImageIndex(null)}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 z-50 p-2.5 rounded-full text-neutral-300 hover:text-white bg-white/[0.08] hover:bg-white/[0.2] border border-white/15 transition-colors cursor-pointer shadow-lg"
              aria-label="Fechar"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Counter indicator */}
            <div className="absolute top-5 left-6 z-50 text-xs font-mono text-neutral-400 bg-white/[0.06] border border-white/10 px-3 py-1 rounded-full">
              {activeImageIndex + 1} / {PROJECT_IMAGES.length}
            </div>

            {/* Left Nav Button */}
            <button
              onClick={handlePrev}
              className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-50 p-3 sm:p-3.5 rounded-full bg-black/70 hover:bg-white text-white hover:text-black border border-white/20 transition-all duration-300 backdrop-blur-md cursor-pointer shadow-2xl"
              aria-label="Imagem anterior"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            {/* Right Nav Button */}
            <button
              onClick={handleNext}
              className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-50 p-3 sm:p-3.5 rounded-full bg-black/70 hover:bg-white text-white hover:text-black border border-white/20 transition-all duration-300 backdrop-blur-md cursor-pointer shadow-2xl"
              aria-label="Próxima imagem"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            {/* Full Image Container */}
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-[94vw] max-h-[90vh] flex items-center justify-center"
            >
              <img
                src={PROJECT_IMAGES[activeImageIndex].src}
                alt="Projeto LPVCW em formato original"
                className="max-h-[88vh] max-w-[92vw] w-auto h-auto object-contain rounded-lg sm:rounded-xl border border-white/15 shadow-[0_25px_80px_rgba(0,0,0,0.95)]"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
