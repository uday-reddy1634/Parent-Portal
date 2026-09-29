import React from 'react';
import { TabType, ThemeMode } from '../types';

interface MobileBottomNavProps {
  currentTab: TabType;
  onTabChange: (tab: TabType) => void;
  theme: ThemeMode;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  currentTab,
  onTabChange,
  theme
}) => {
  const isDark = theme === 'dark';

  const items: { label: string; tab: TabType; icon: string }[] = [
    { label: 'Dashboard', tab: 'dashboard', icon: 'dashboard' },
    { label: 'Attendance', tab: 'attendance', icon: 'event_available' },
    { label: 'Marks', tab: 'academic-marks-reports', icon: 'school' },
    { label: 'Teachers', tab: 'thank-teachers', icon: 'award_star' },
    { label: 'Support', tab: 'feedback-support', icon: 'support_agent' }
  ];

  return (
    <nav className={`lg:hidden fixed bottom-0 left-0 right-0 z-40 border-t backdrop-blur-xl transition-all duration-300 pb-safe ${
      isDark 
        ? 'bg-[#141416]/95 border-[#262528] shadow-[0_-4px_16px_rgba(0,0,0,0.5)]' 
        : 'bg-white/95 border-slate-200 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]'
    }`}>
      <div className="flex items-center justify-around h-16 px-1">
        {items.map((item) => {
          const isActive = currentTab === item.tab;
          return (
            <button
              key={item.tab}
              onClick={() => onTabChange(item.tab)}
              className={`flex flex-col items-center justify-center flex-1 h-full py-1 transition-all cursor-pointer relative ${
                isActive
                  ? isDark ? 'text-[#f2ca50]' : 'text-amber-700'
                  : isDark ? 'text-[#99907c] hover:text-[#d0c5af]' : 'text-slate-400 hover:text-slate-700'
              }`}
            >
              <div className="relative">
                <span className={`material-symbols-outlined text-[22px] transition-transform ${
                  isActive ? 'scale-110 font-bold' : ''
                }`}>
                  {item.icon}
                </span>
                {isActive && (
                  <span className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full ${
                    isDark ? 'bg-[#f2ca50]' : 'bg-amber-700'
                  }`} />
                )}
              </div>
              <span className={`text-[10px] mt-0.5 font-medium tracking-tight ${
                isActive ? 'font-bold' : ''
              }`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
