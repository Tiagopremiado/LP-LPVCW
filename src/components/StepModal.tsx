import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowRight, ArrowLeft } from 'lucide-react';
import { WORKFLOW_STEPS, WorkflowStep } from '../types';

interface StepModalProps {
  step: WorkflowStep | null;
  onClose: () => void;
  onSelectStep: (step: WorkflowStep) => void;
}

export const StepModal: React.FC<StepModalProps> = ({ step, onClose, onSelectStep }) => {
  if (!step) return null;

  const currentIndex = WORKFLOW_STEPS.findIndex((s) => s.number === step.number);
  const prevStep = currentIndex > 0 ? WORKFLOW_STEPS[currentIndex - 1] : null;
  const nextStep = currentIndex < WORKFLOW_STEPS.length - 1 ? WORKFLOW_STEPS[currentIndex + 1] : null;

  const detailedGuidelines: Record<string, { role: string; deliverables: string[] }> = {
    '01': {
      role: 'Alinhamento estratégico e definição de premissas',
      deliverables: [
        'Definição do público-alvo e nível de sofisticação visual esperado',
        'Estruturação da proposta de valor em 1 headline clara',
        'Mapeamento das 5 mensagens-chave da narrativa',
      ],
    },
    '02': {
      role: 'Direção de arte e ancoragem visual de primeira dobra',
      deliverables: [
        'Composição de luz fria e alto contraste (Black & White rigoroso)',
        'Definição da tipografia de display dominante e escala modular',
        'Criação do asset visual de ancoragem (horizonte / atmosfera 3D)',
      ],
    },
    '03': {
      role: 'Recursos visuais e coerência ambiental',
      deliverables: [
        'Geração e refinamento do asset de background puro ([HERO_BG])',
        'Iluminação consistente sem competição com elementos de texto',
        'Tratamento de profundidade através de gradientes e bordas translúcidas',
      ],
    },
    '04': {
      role: 'Desenvolvimento das seções e ritmo de leitura',
      deliverables: [
        'Planejamento de dobras com alta densidade e respiro generoso',
        'Microinterações funcionais sem clichês de IA',
        'Responsividade e adaptação de perspectiva para mobile e desktop',
      ],
    },
    '05': {
      role: 'Montagem de código limpo e transições naturais',
      deliverables: [
        'Construção dos componentes reais em HTML/CSS/Tailwind',
        'Fold continuity entre as seções (transição contínua em fundo preto)',
        'Polimento de performance, acessibilidade e microdetalhes',
      ],
    },
  };

  const details = detailedGuidelines[step.number] || {
    role: 'Etapa do Workflow LPVCW',
    deliverables: [step.description],
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="relative w-full max-w-lg rounded-2xl p-6 sm:p-8 bg-[#090a0d] border border-white/20 shadow-[0_12px_48px_rgba(0,0,0,0.9),0_0_32px_rgba(255,255,255,0.05)] text-white"
        >
          {/* Top border specular light */}
          <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-t-2xl" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-neutral-400 hover:text-white hover:border-white/30 bg-white/[0.03] transition-colors"
          >
            <X className="w-4 h-4 stroke-[2]" />
          </button>

          {/* Header */}
          <div className="mb-6">
            <span className="text-xs font-mono text-neutral-400 tracking-wider">
              ETAPA {step.number} / 05
            </span>
            <h2 className="text-2xl font-bold tracking-tight text-white mt-1">
              {step.title}
            </h2>
            <p className="text-neutral-400 text-sm mt-1.5 leading-relaxed">
              {step.description}
            </p>
          </div>

          {/* Guidelines info */}
          <div className="space-y-4 py-3 border-y border-white/10 text-xs sm:text-sm">
            <div>
              <span className="text-neutral-400 font-mono text-[11px] uppercase tracking-wider block mb-1">
                Foco Estratégico
              </span>
              <p className="text-neutral-200">
                {details.role}
              </p>
            </div>

            <div>
              <span className="text-neutral-400 font-mono text-[11px] uppercase tracking-wider block mb-1.5">
                Entregáveis da Etapa
              </span>
              <ul className="space-y-1.5 text-neutral-300">
                {details.deliverables.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/60 mt-1.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Footer controls */}
          <div className="flex items-center justify-between mt-6 pt-1">
            {prevStep ? (
              <button
                onClick={() => onSelectStep(prevStep)}
                className="inline-flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>{prevStep.number} — {prevStep.title}</span>
              </button>
            ) : (
              <div />
            )}

            {nextStep ? (
              <button
                onClick={() => onSelectStep(nextStep)}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-white hover:text-white/80 transition-colors"
              >
                <span>{nextStep.number} — {nextStep.title}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={onClose}
                className="text-xs font-semibold px-4 py-1.5 rounded-full bg-white text-black"
              >
                Fechar
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
