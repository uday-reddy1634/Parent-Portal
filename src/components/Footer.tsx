import React from 'react';
import { TabType, ThemeMode } from '../types';

interface FooterProps {
  theme: ThemeMode;
  onTabChange: (tab: TabType) => void;
  onOpenHandbook?: () => void;
  onOpenPrivacy?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ 
  theme, 
  onTabChange,
  onOpenHandbook,
  onOpenPrivacy
}) => {
  return (
    <footer className={`w-full border-t transition-colors duration-300 ${
      theme === 'dark'
        ? 'bg-[#0e0e10] border-[#2a2a2c] text-[#99907c]'
        : 'bg-white border-slate-200/80 text-slate-600'
    }`}>
      <div className="max-w-360 mx-auto px-4 md:px-8 xl:px-12 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-body-sm">
        <div className="flex items-center gap-2">
          <span className={`font-semibold font-title-sm text-sm ${
            theme === 'dark' ? 'text-[#f2ca50]' : 'text-amber-800'
          }`}>
            Pathshala
          </span>
          <span className={theme === 'dark' ? 'text-[#4d4635]' : 'text-slate-300'}>•</span>
          <span className={theme === 'dark' ? 'text-[#d0c5af]' : 'text-slate-500'}>
            Sanctuary of Academic Distinction
          </span>
        </div>
        <div className="flex items-center gap-6 font-medium">
          <button 
            onClick={() => onTabChange('feedback-support')}
            className={`transition-colors cursor-pointer ${
              theme === 'dark' ? 'hover:text-[#f2ca50]' : 'hover:text-amber-800'
            }`}
          >
            Support Concierge
          </button>
          <button 
            onClick={onOpenHandbook}
            className={`transition-colors cursor-pointer ${
              theme === 'dark' ? 'hover:text-[#f2ca50]' : 'hover:text-amber-800'
            }`}
          >
            Parent Handbook
          </button>
          <button 
            onClick={onOpenPrivacy}
            className={`transition-colors cursor-pointer ${
              theme === 'dark' ? 'hover:text-[#f2ca50]' : 'hover:text-amber-800'
            }`}
          >
            Privacy Charter
          </button>
        </div>
        <p className={`font-label-sm ${theme === 'dark' ? 'text-[#4d4635]' : 'text-slate-400'}`}>
          © 2025 Pathshala. Encrypted Guardian Access.
        </p>
      </div>
    </footer>
  );
};
