import React, { useState, useEffect } from 'react';

interface HeroBackgroundProps {
  customBg?: string | null;
}

export const HeroBackground: React.FC<HeroBackgroundProps> = ({ customBg }) => {
  const [bgSrc, setBgSrc] = useState<string>(customBg || '/assets/herobg.png');

  useEffect(() => {
    if (customBg) {
      setBgSrc(customBg);
    } else {
      setBgSrc('/assets/herobg.png');
    }
  }, [customBg]);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none z-0 bg-black">
      {/* Primary Asset Background: /assets/herobg.png - exact 1672x941 background from heroref.png */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-no-repeat transition-opacity duration-700 opacity-100"
        style={{
          backgroundImage: `url("${bgSrc}")`,
          backgroundPosition: 'center bottom',
        }}
      />
    </div>
  );
};


