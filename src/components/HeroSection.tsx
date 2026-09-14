import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Header } from './Header';
import { HeroBackground } from './HeroBackground';
import { WorkflowCards } from './WorkflowCards';
import { WorkflowStep } from '../types';
import { APP_LINKS } from '../config/links';

interface HeroSectionProps {
  customBg?: string | null;
  workflowUrl?: string;
  downloadUrl?: string;
  onStepSelect?: (step: WorkflowStep) => void;
  onDownloadClick?: () => void;
  onCtaClick?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  customBg,
  workflowUrl = APP_LINKS.workflowUrl,
  downloadUrl = APP_LINKS.downloadUrl,
  onStepSelect,
  onDownloadClick,
  onCtaClick,
}) => {
  const isExternalWorkflow =
    workflowUrl && (workflowUrl.startsWith('http://') || workflowUrl.startsWith('https://'));

  return (
    <section className="relative w-full min-h-screen lg:h-[100svh] bg-black text-white flex flex-col justify-between overflow-hidden">
      {/* Background layer */}
      <HeroBackground customBg={customBg} />

      {/* Top Header */}
      <Header downloadUrl={downloadUrl} onDownloadClick={onDownloadClick} />

      {/* Main Content Area (Centered) */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 sm:px-8 text-center flex flex-col items-center justify-center pt-2 sm:pt-4 lg:pt-2 pb-6 sm:pb-8">
        {/* Dominant Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-[72px] font-extrabold tracking-[-0.035em] leading-[1.05] sm:leading-[1.04] mb-5 sm:mb-6 select-none"
        >
          <span className="block text-white">
            Crie sites com design
          </span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-b from-white via-[#eaedf2] to-[#8d92a0]">
            irresistível
          </span>
        </motion.h1>

        {/* Subheadline (2 lines, muted, high readability) */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="text-neutral-400 text-sm sm:text-[15px] md:text-base font-normal max-w-xl md:max-w-2xl leading-relaxed sm:leading-relaxed mb-7 sm:mb-8 select-none"
        >
          O LPVCW separa direção visual, implementação e continuidade entre seções,
          <br className="hidden sm:inline" /> para você criar landing pages completas, coesas e de alto impacto.
        </motion.p>

        {/* Exclusive Single CTA Button: Acesso ao Workflow */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
        >
          {isExternalWorkflow ? (
            <a
              id="hero-cta-btn"
              href={workflowUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-2.5 px-7 sm:px-8 py-2.5 sm:py-3 rounded-full bg-white text-black font-semibold text-sm tracking-tight shadow-[0_0_24px_rgba(255,255,255,0.35)] hover:shadow-[0_0_36px_rgba(255,255,255,0.6)] hover:-translate-y-[1px] active:translate-y-0 transition-all duration-300 active:scale-[0.99]"
            >
              <span>Começar agora</span>
              <ArrowRight className="w-4 h-4 stroke-[2.2] transition-transform duration-300 group-hover:translate-x-0.5" />
            </a>
          ) : (
            <button
              id="hero-cta-btn"
              onClick={onCtaClick}
              className="group relative inline-flex items-center gap-2.5 px-7 sm:px-8 py-2.5 sm:py-3 rounded-full bg-white text-black font-semibold text-sm tracking-tight shadow-[0_0_24px_rgba(255,255,255,0.35)] hover:shadow-[0_0_36px_rgba(255,255,255,0.6)] hover:-translate-y-[1px] active:translate-y-0 transition-all duration-300 active:scale-[0.99] cursor-pointer"
            >
              <span>Começar agora</span>
              <ArrowRight className="w-4 h-4 stroke-[2.2] transition-transform duration-300 group-hover:translate-x-0.5" />
            </button>
          )}
        </motion.div>
      </div>

      {/* Workflow Visual Section positioned directly over the horizon curve */}
      <div id="workflow-cards-container" className="relative z-20 w-full pb-6 sm:pb-8 lg:pb-12">
        <WorkflowCards onStepClick={onStepSelect} />
      </div>
    </section>
  );
};

