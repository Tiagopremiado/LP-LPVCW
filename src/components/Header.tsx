import React from 'react';
import { Download } from 'lucide-react';
import { APP_LINKS } from '../config/links';

interface HeaderProps {
  downloadUrl?: string;
  onDownloadClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  downloadUrl = APP_LINKS.downloadUrl,
  onDownloadClick,
}) => {
  const isExternalLink =
    downloadUrl && (downloadUrl.startsWith('http://') || downloadUrl.startsWith('https://'));

  const handleClick = (e: React.MouseEvent) => {
    if (isExternalLink) {
      return; // allow normal anchor navigation to external link
    }
    if (downloadUrl && downloadUrl.startsWith('#') && onDownloadClick) {
      e.preventDefault();
      onDownloadClick();
    }
  };

  return (
    <header className="w-full relative z-30 px-6 sm:px-10 md:px-14 lg:px-20 pt-8 pb-4 flex items-center justify-between">
      {/* Left: Brand name + subtitle */}
      <div className="flex items-center gap-2.5 sm:gap-3.5">
        <span className="text-white font-bold text-base sm:text-lg tracking-tight">
          LPVCW
        </span>
        <span className="text-neutral-400 text-[11px] sm:text-xs font-normal tracking-wide select-none">
          Landing Page Vibe Creating WorkFlow
        </span>
      </div>

      {/* Right: Download CTA button */}
      <div>
        {isExternalLink ? (
          <a
            id="header-download-btn"
            href={downloadUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-medium text-neutral-200 hover:text-white rounded-full border border-white/15 hover:border-white/35 bg-white/[0.03] hover:bg-white/[0.08] backdrop-blur-md transition-all duration-300 shadow-[0_0_12px_rgba(255,255,255,0.03)] hover:shadow-[0_0_16px_rgba(255,255,255,0.1)] active:scale-[0.98]"
          >
            <span>Download</span>
            <Download className="w-3.5 h-3.5 text-neutral-300 group-hover:text-white transition-colors stroke-[1.75]" />
          </a>
        ) : (
          <button
            id="header-download-btn"
            onClick={handleClick}
            className="group relative inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-medium text-neutral-200 hover:text-white rounded-full border border-white/15 hover:border-white/35 bg-white/[0.03] hover:bg-white/[0.08] backdrop-blur-md transition-all duration-300 shadow-[0_0_12px_rgba(255,255,255,0.03)] hover:shadow-[0_0_16px_rgba(255,255,255,0.1)] active:scale-[0.98] cursor-pointer"
          >
            <span>Download</span>
            <Download className="w-3.5 h-3.5 text-neutral-300 group-hover:text-white transition-colors stroke-[1.75]" />
          </button>
        )}
      </div>
    </header>
  );
};

