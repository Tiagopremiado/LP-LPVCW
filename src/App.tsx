import { useState } from 'react';
import { HeroSection } from './components/HeroSection';
import { SupportSection } from './components/SupportSection';
import { StepModal } from './components/StepModal';
import { DownloadModal } from './components/DownloadModal';
import { WorkflowStep } from './types';

export default function App() {
  const [activeStep, setActiveStep] = useState<WorkflowStep | null>(null);
  const [isDownloadOpen, setIsDownloadOpen] = useState(false);
  const [customBg, setCustomBg] = useState<string | null>(null);

  const handleCtaClick = () => {
    const workflowCards = document.getElementById('workflow-cards-container');
    if (workflowCards) {
      workflowCards.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <main className="w-full min-h-screen bg-black text-white relative selection:bg-white selection:text-black">
      {/* 1st Fold: Hero Section (100svh on desktop) */}
      <HeroSection
        customBg={customBg}
        onStepSelect={(step) => setActiveStep(step)}
        onDownloadClick={() => setIsDownloadOpen(true)}
        onCtaClick={handleCtaClick}
      />

      {/* 2nd Fold: Continuous Natural Black Cosmic Atmosphere (Fold Continuity) */}
      <SupportSection customBg={null} />

      {/* Interactive Step Details Modal */}
      <StepModal
        step={activeStep}
        onClose={() => setActiveStep(null)}
        onSelectStep={(step) => setActiveStep(step)}
      />

      {/* Minimalist Download & Asset Switcher Modal */}
      <DownloadModal
        isOpen={isDownloadOpen}
        onClose={() => setIsDownloadOpen(false)}
        onUploadCustomBg={(url) => setCustomBg(url)}
        hasCustomBg={Boolean(customBg)}
        onResetBg={() => setCustomBg(null)}
      />
    </main>
  );
}
