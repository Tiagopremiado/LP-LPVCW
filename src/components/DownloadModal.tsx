import React, { useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Download, FileText, Image as ImageIcon, Upload, Check, ArrowRight } from 'lucide-react';

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUploadCustomBg: (url: string) => void;
  hasCustomBg: boolean;
  onResetBg: () => void;
}

export const DownloadModal: React.FC<DownloadModalProps> = ({
  isOpen,
  onClose,
  onUploadCustomBg,
  hasCustomBg,
  onResetBg,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      onUploadCustomBg(url);
    }
  };

  const downloadWorkflowText = () => {
    const content = `# LPVCW — Landing Page Vibe Creating WorkFlow

## ETAPAS DO WORKFLOW:
01 — Briefing: Defina o objetivo, público e proposta de valor.
02 — Concept Hero: Direção visual que estabelece o tom da página.
03 — RV + BG: Reforce a narrativa com recursos visuais e background.
04 — IP: Desenvolva as seções com clareza e consistência.
05 — Implementação: Una tudo em uma página de alto impacto.

## DNA VISUAL:
- Estética preta e branca de alto contraste.
- Iluminação fria central e horizonte cósmico sutil.
- Tipografia sans-serif dominante com tratamento prata sutil.
- Espaço negativo generoso e sem clichês genéricos de SaaS.
`;
    const blob = new Blob([content], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'LPVCW-Workflow-Guide.md';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="relative w-full max-w-md rounded-2xl p-6 sm:p-7 bg-[#090a0d] border border-white/20 shadow-[0_12px_48px_rgba(0,0,0,0.9),0_0_32px_rgba(255,255,255,0.05)] text-white"
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

          <div className="mb-5">
            <span className="text-[11px] font-mono text-neutral-400 tracking-wider">
              RECURSOS LPVCW
            </span>
            <h2 className="text-xl font-bold tracking-tight text-white mt-1">
              Download & Gerenciador de Background
            </h2>
            <p className="text-neutral-400 text-xs mt-1.5 leading-relaxed">
              Baixe as diretrizes do workflow ou teste seu asset de background aprovado (<code className="text-neutral-200">hero-bg.png</code>).
            </p>
          </div>

          <div className="space-y-3">
            {/* Google Drive Link */}
            <a
              href="https://drive.google.com/drive/folders/1129OoxEICKaXjhBoFkiqBKHW0Eg-fHjS"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-between p-3.5 rounded-xl border border-white/20 bg-white/[0.06] hover:bg-white/[0.1] hover:border-white/35 transition-all text-left group"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white">
                  <Download className="w-4 h-4 stroke-[1.8]" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">
                    Pasta do Drive (Assets & Arquivos)
                  </div>
                  <div className="text-[11px] text-neutral-400">
                    Acessar arquivos completos no Google Drive
                  </div>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-neutral-300 group-hover:text-white transition-colors group-hover:translate-x-0.5" />
            </a>

            {/* Download Guide Button */}
            <button
              onClick={downloadWorkflowText}
              className="w-full flex items-center justify-between p-3.5 rounded-xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.07] hover:border-white/25 transition-all text-left group"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white">
                  <FileText className="w-4 h-4 stroke-[1.5]" />
                </div>
                <div>
                  <div className="text-sm font-medium text-white group-hover:text-white">
                    Guia do Workflow (.md)
                  </div>
                  <div className="text-[11px] text-neutral-400">
                    Instruções completas e DNA visual
                  </div>
                </div>
              </div>
              <Download className="w-4 h-4 text-neutral-400 group-hover:text-white transition-colors" />
            </button>

            {/* View/Download References */}
            <div className="grid grid-cols-2 gap-2">
              <a
                href="/assets/heroref.png"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 p-2.5 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.06] hover:border-white/20 transition-all text-xs text-neutral-300 hover:text-white"
              >
                <ImageIcon className="w-3.5 h-3.5 text-neutral-400" />
                <span>heroref.png</span>
              </a>
              <a
                href="/assets/section2ref.png"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 p-2.5 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.06] hover:border-white/20 transition-all text-xs text-neutral-300 hover:text-white"
              >
                <ImageIcon className="w-3.5 h-3.5 text-neutral-400" />
                <span>section2ref.png</span>
              </a>
            </div>

            {/* Custom Background Upload / Test Button */}
            <div className="p-3.5 rounded-xl border border-white/10 bg-white/[0.03] space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white">
                    <ImageIcon className="w-4 h-4 stroke-[1.5]" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white">
                      Testar [HERO_BG] local
                    </div>
                    <div className="text-[11px] text-neutral-400">
                      Substituir dinamicamente a imagem de fundo
                    </div>
                  </div>
                </div>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/png,image/jpeg,image/webp"
                  className="hidden"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg text-xs font-medium bg-white/10 hover:bg-white/20 text-white transition-colors border border-white/15"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>{hasCustomBg ? 'Trocar imagem...' : 'Carregar hero-bg...'}</span>
                </button>
                {hasCustomBg && (
                  <button
                    type="button"
                    onClick={onResetBg}
                    className="py-1.5 px-3 rounded-lg text-xs text-neutral-400 hover:text-white transition-colors"
                  >
                    Restaurar padrão
                  </button>
                )}
              </div>
              {hasCustomBg && (
                <div className="flex items-center gap-1.5 text-[11px] text-emerald-400">
                  <Check className="w-3.5 h-3.5" />
                  <span>Asset carregado no preview</span>
                </div>
              )}
            </div>
          </div>

          <div className="mt-6 pt-3 border-t border-white/10 flex justify-end">
            <button
              onClick={onClose}
              className="text-xs font-semibold px-4 py-1.5 rounded-full bg-white text-black hover:bg-neutral-200 transition-colors"
            >
              Fechar
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
