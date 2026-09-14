import React from 'react';
import { motion } from 'motion/react';
import { FileText, Image as ImageIcon, Layers, PanelsTopLeft, Code2 } from 'lucide-react';
import { WORKFLOW_STEPS, WorkflowStep } from '../types';

interface WorkflowCardsProps {
  onStepClick?: (step: WorkflowStep) => void;
}

export const WorkflowCards: React.FC<WorkflowCardsProps> = ({ onStepClick }) => {
  const renderIcon = (iconType: WorkflowStep['icon']) => {
    const iconClass = "w-6 h-6 text-white stroke-[1.65]";
    switch (iconType) {
      case 'briefing':
        return <FileText className={iconClass} />;
      case 'concept':
        return <ImageIcon className={iconClass} />;
      case 'rv_bg':
        return <Layers className={iconClass} />;
      case 'ip':
        return <PanelsTopLeft className={iconClass} />;
      case 'implementation':
        return <Code2 className={iconClass} />;
      default:
        return null;
    }
  };

  // 3D Perspective and positioning values matching heroref.png amphitheater arc
  const cardTransforms = [
    {
      // 01 Briefing (Left outer): Rotated towards center, left side taller/closer, right side recessed
      restingTransform: 'perspective(1400px) rotateY(24deg) translateY(14px)',
      hoverTransform: 'perspective(1400px) rotateY(18deg) translateY(6px) scale(1.02)',
      zIndex: 10,
      isCenter: false,
    },
    {
      // 02 Concept Hero (Left inner): Gentle inward angle towards center
      restingTransform: 'perspective(1400px) rotateY(12deg) translateY(2px)',
      hoverTransform: 'perspective(1400px) rotateY(6deg) translateY(-4px) scale(1.02)',
      zIndex: 20,
      isCenter: false,
    },
    {
      // 03 RV + BG (Center prominent): Directly facing forward, taller, elevated on horizon apex
      restingTransform: 'perspective(1400px) rotateY(0deg) translateY(-14px)',
      hoverTransform: 'perspective(1400px) rotateY(0deg) translateY(-20px) scale(1.03)',
      zIndex: 30,
      isCenter: true,
    },
    {
      // 04 IP (Right inner): Gentle inward angle towards center
      restingTransform: 'perspective(1400px) rotateY(-12deg) translateY(2px)',
      hoverTransform: 'perspective(1400px) rotateY(-6deg) translateY(-4px) scale(1.02)',
      zIndex: 20,
      isCenter: false,
    },
    {
      // 05 Implementação (Right outer): Rotated towards center, right side taller/closer, left side recessed
      restingTransform: 'perspective(1400px) rotateY(-24deg) translateY(14px)',
      hoverTransform: 'perspective(1400px) rotateY(-18deg) translateY(6px) scale(1.02)',
      zIndex: 10,
      isCenter: false,
    },
  ];

  const [hoveredIdx, setHoveredIdx] = React.useState<number | null>(null);

  return (
    <div className="w-full relative select-none">
      {/* Desktop / Tablet Container: Majestic 3D Perspective Panoramic Layout */}
      <div className="hidden md:block w-full max-w-[1440px] mx-auto px-4 lg:px-8 relative">
        
        {/* Subtle Architectural Projection Rays (as seen in heroref.png) */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-visible opacity-70">
          <svg className="w-full h-full overflow-visible" viewBox="0 0 1440 380" fill="none">
            <defs>
              <linearGradient id="rayGradLeft" x1="0%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="rgba(255,255,255,0.22)" />
                <stop offset="60%" stopColor="rgba(255,255,255,0.06)" />
                <stop offset="100%" stopColor="transparent" />
              </linearGradient>
              <linearGradient id="rayGradRight" x1="0%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="rgba(255,255,255,0.22)" />
                <stop offset="60%" stopColor="rgba(255,255,255,0.06)" />
                <stop offset="100%" stopColor="transparent" />
              </linearGradient>
            </defs>
            {/* Ray from Card 1 top-left shooting up-left */}
            <line x1="200" y1="180" x2="60" y2="40" stroke="url(#rayGradLeft)" strokeWidth="1" strokeDasharray="3 3" />
            {/* Ray from Card 2 top-left shooting up-left */}
            <line x1="450" y1="180" x2="340" y2="50" stroke="url(#rayGradLeft)" strokeWidth="0.8" opacity="0.6" />
            {/* Ray from Card 4 top-right shooting up-right */}
            <line x1="990" y1="180" x2="1100" y2="50" stroke="url(#rayGradRight)" strokeWidth="0.8" opacity="0.6" />
            {/* Ray from Card 5 top-right shooting up-right */}
            <line x1="1240" y1="180" x2="1380" y2="40" stroke="url(#rayGradRight)" strokeWidth="1" strokeDasharray="3 3" />
          </svg>
        </div>

        {/* Connecting Horizontal Line with 4 Luminous Node Beads between Cards */}
        <div className="absolute inset-x-0 top-[52%] -translate-y-1/2 pointer-events-none z-15">
          <div className="relative w-full max-w-[1360px] mx-auto px-6 h-6 flex items-center">
            {/* Continuous thin glowing connecting line with gradient ends */}
            <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent relative">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent blur-[0.5px]" />
            </div>

            {/* Glowing Dot 1 (between Card 1 & Card 2) */}
            <div className="absolute left-[20%] -translate-x-1/2 -translate-y-1/2 top-1/2">
              <div className="relative flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-white shadow-[0_0_10px_#ffffff,0_0_20px_rgba(200,230,255,0.9)]" />
                <div className="absolute w-3.5 h-3.5 rounded-full bg-white/20 animate-pulse pointer-events-none" />
              </div>
            </div>

            {/* Glowing Dot 2 (between Card 2 & Card 3) */}
            <div className="absolute left-[39.5%] -translate-x-1/2 -translate-y-1/2 top-1/2">
              <div className="relative flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-white shadow-[0_0_10px_#ffffff,0_0_20px_rgba(200,230,255,0.9)]" />
                <div className="absolute w-3.5 h-3.5 rounded-full bg-white/20 animate-pulse pointer-events-none" />
              </div>
            </div>

            {/* Glowing Dot 3 (between Card 3 & Card 4) */}
            <div className="absolute left-[60.5%] -translate-x-1/2 -translate-y-1/2 top-1/2">
              <div className="relative flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-white shadow-[0_0_10px_#ffffff,0_0_20px_rgba(200,230,255,0.9)]" />
                <div className="absolute w-3.5 h-3.5 rounded-full bg-white/20 animate-pulse pointer-events-none" />
              </div>
            </div>

            {/* Glowing Dot 4 (between Card 4 & Card 5) */}
            <div className="absolute left-[80%] -translate-x-1/2 -translate-y-1/2 top-1/2">
              <div className="relative flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-white shadow-[0_0_10px_#ffffff,0_0_20px_rgba(200,230,255,0.9)]" />
                <div className="absolute w-3.5 h-3.5 rounded-full bg-white/20 animate-pulse pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        {/* 5 Cards Row with Unified 3D Perspective */}
        <div
          className="relative z-20 flex items-center justify-center gap-4 lg:gap-6 xl:gap-8 w-full py-4"
          style={{ perspective: '1400px', perspectiveOrigin: '50% 50%' }}
        >
          {WORKFLOW_STEPS.map((step, idx) => {
            const config = cardTransforms[idx];
            const isHovered = hoveredIdx === idx;
            const currentTransform = isHovered ? config.hoverTransform : config.restingTransform;

            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="relative"
                style={{ zIndex: config.zIndex }}
              >
                {/* 3D Perspective Transformed Card Div */}
                <div
                  id={`workflow-step-card-${step.number}`}
                  onClick={() => onStepClick?.(step)}
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  style={{
                    transform: currentTransform,
                    transformStyle: 'preserve-3d',
                  }}
                  className={`relative group cursor-pointer transition-all duration-500 ease-out rounded-2xl flex flex-col justify-between p-5 lg:p-6 overflow-hidden ${
                    config.isCenter
                      ? 'w-[195px] lg:w-[220px] xl:w-[238px] h-[285px] lg:h-[310px] xl:h-[330px]'
                      : 'w-[185px] lg:w-[210px] xl:w-[226px] h-[275px] lg:h-[295px] xl:h-[315px]'
                  } bg-[#07090e]/80 backdrop-blur-md border border-white/[0.16] hover:border-white/35 shadow-[0_12px_40px_rgba(0,0,0,0.85)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.95),0_0_35px_rgba(200,230,255,0.08)]`}
                >
                  {/* Top Edge Specular Highlight (matching refined glass look in heroref.png) */}
                  <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent rounded-t-2xl pointer-events-none group-hover:via-white/60 transition-all duration-300" />

                  {/* Top Section: Number & Icon */}
                  <div className="relative z-10">
                    <span className="block text-xs lg:text-[13px] font-mono text-neutral-400 font-normal mb-3 lg:mb-4 group-hover:text-neutral-300 transition-colors">
                      {step.number}
                    </span>
                    <div className="text-white/95 group-hover:text-white transition-transform duration-300 group-hover:scale-105">
                      {renderIcon(step.icon)}
                    </div>
                  </div>

                  {/* Middle Spacer where the horizontal connecting line visually passes behind */}
                  <div className="flex-1" />

                  {/* Bottom Section: Title & Description */}
                  <div className="relative z-10">
                    <h3 className="text-white font-semibold text-[15px] lg:text-[17px] tracking-tight mb-1.5 lg:mb-2 group-hover:text-white transition-colors leading-snug">
                      {step.title}
                    </h3>
                    <p className="text-neutral-400 text-xs lg:text-[12.5px] leading-relaxed font-normal group-hover:text-neutral-300 transition-colors line-clamp-3">
                      {step.description}
                    </p>
                  </div>

                  {/* Interior subtle sheen on card glass surface */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/[0.04] via-transparent to-transparent pointer-events-none" />

                  {/* Ambient micro-glow gradient activated on hover */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-white/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Mobile / Small Screen: Clean Horizontal Snap Scroll Carousel */}
      <div className="md:hidden w-full px-4">
        <div className="flex gap-3.5 overflow-x-auto pb-4 pt-1 px-1 snap-x snap-mandatory scrollbar-none no-scrollbar">
          {WORKFLOW_STEPS.map((step, idx) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              onClick={() => onStepClick?.(step)}
              className="flex-shrink-0 w-64 h-56 rounded-2xl p-5 flex flex-col justify-between snap-center bg-[#07090e]/85 backdrop-blur-md border border-white/15 active:border-white/40 active:scale-[0.98] transition-all relative overflow-hidden"
            >
              <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent" />
              
              <div>
                <span className="block text-xs font-mono text-neutral-400 mb-3">
                  {step.number}
                </span>
                <div className="text-white/95">
                  {renderIcon(step.icon)}
                </div>
              </div>

              <div>
                <h3 className="text-white text-base font-semibold tracking-tight mb-1.5">
                  {step.title}
                </h3>
                <p className="text-neutral-400 text-xs leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Small step pagination indicators for mobile */}
        <div className="flex items-center justify-center gap-1.5 pt-2">
          {WORKFLOW_STEPS.map((step) => (
            <div
              key={step.number}
              className="w-1.5 h-1.5 rounded-full bg-white/25"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

