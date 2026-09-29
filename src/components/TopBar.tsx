import React from 'react';
import { TabType, ThemeMode, AppNotification } from '../types';

interface TopBarProps {
  currentTab: TabType;
  theme: ThemeMode;
  onToggleTheme: () => void;
  notifications: AppNotification[];
  onOpenNotifications: () => void;
  onOpenStudentProfile: () => void;
  onOpenScheduleConference: () => void;
  onOpenMobileSidebar: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  currentTab,
  theme,
  onToggleTheme,
  notifications,
  onOpenNotifications,
  onOpenStudentProfile,
  onOpenScheduleConference,
  onOpenMobileSidebar
}) => {
  const isDark = theme === 'dark';
  const unreadCount = notifications.filter(n => !n.read).length;

  const getScreenMeta = (tab: TabType) => {
    switch (tab) {
      case 'dashboard':
        return {
          title: 'Executive Guardian Dashboard',
          subtitle: 'AY 2024–2025 Term 1 • Academic Standing & Daily Overview',
          tag: 'Overview'
        };
      case 'attendance':
        return {
          title: 'Attendance & Punctuality Records',
          subtitle: 'Official Roll Ledger & Daily Period Synchronization',
          tag: 'Roll Ledger'
        };
      case 'academic-marks-reports':
        return {
          title: 'Academic Marks & Class Standing',
          subtitle: 'Official Guardian Transcript Audit AY 2023–2024',
          tag: 'Grade Audit'
        };
      case 'thank-teachers':
        return {
          title: 'Faculty Commendations & Recognition',
          subtitle: 'Honors Fellowship Citations & Guardian Appreciations',
          tag: 'Fellowships'
        };
      case 'feedback-support':
        return {
          title: 'Academy Concierge & Governance',
          subtitle: 'Direct Guardian Support Tickets & Pastoral Affairs',
          tag: 'Concierge'
        };
    }
  };

  const meta = getScreenMeta(currentTab);

  return (
    <header className={`sticky top-0 z-30 w-full h-16 px-4 sm:px-6 lg:px-8 flex items-center justify-between border-b backdrop-blur-xl transition-all duration-300 ${
      isDark 
        ? 'bg-[#131315]/85 border-[#262528] shadow-[0_1px_8px_rgba(0,0,0,0.5)]' 
        : 'bg-white/90 border-slate-200/80 shadow-[0_1px_4px_rgba(0,0,0,0.03)]'
    }`}>
      {/* Left Area: Mobile Drawer Toggle & View Title */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={onOpenMobileSidebar}
          className={`lg:hidden p-2 rounded-xl transition-colors cursor-pointer flex items-center justify-center ${
            isDark ? 'bg-[#201f22] text-[#f2ca50] hover:bg-[#2a2a2c]' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
          aria-label="Open Navigation Menu"
        >
          <span className="material-symbols-outlined text-[22px]">menu</span>
        </button>

        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-2">
            <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
              isDark ? 'bg-[#d4af37]/15 text-[#f2ca50]' : 'bg-amber-100 text-amber-900'
            }`}>
              {meta.tag}
            </span>
            <h1 className="text-sm sm:text-base font-bold font-title-sm truncate">
              {meta.title}
            </h1>
          </div>
          <p className={`hidden md:block text-[11px] truncate ${isDark ? 'text-[#99907c]' : 'text-slate-500'}`}>
            {meta.subtitle}
          </p>
        </div>
      </div>

      {/* Right Area: Scholar Status, Notification, Theme, Actions */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        {/* Scholar Quick Pill */}
        <button
          onClick={onOpenStudentProfile}
          className={`flex items-center gap-2 px-2.5 sm:px-3 py-1.5 rounded-full border text-xs transition-all cursor-pointer ${
            isDark 
              ? 'bg-[#1c1b1d] border-[#353437] text-[#e5e1e4] hover:border-[#d4af37]/60' 
              : 'bg-slate-100 border-slate-200 text-slate-800 hover:border-amber-300 hover:bg-white'
          }`}
          title="Julian Vance (Grade 11-A) Profile Details"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="font-semibold text-[11px] sm:text-xs">
            Julian Vance
          </span>
          <span className="hidden sm:inline text-[11px] text-amber-600 dark:text-[#f2ca50] font-medium">
            (11-A)
          </span>
          <span className={`material-symbols-outlined text-[16px] ${isDark ? 'text-[#99907c]' : 'text-slate-400'}`}>
            expand_more
          </span>
        </button>

        {/* Quick Schedule CTA Button (Visible on sm+) */}
        <button
          onClick={onOpenScheduleConference}
          className={`hidden xl:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm transition-all cursor-pointer ${
            isDark
              ? 'bg-[#d4af37] text-[#3c2f00] hover:bg-amber-300 font-bold'
              : 'bg-amber-700 text-white hover:bg-amber-800 font-bold'
          }`}
        >
          <span className="material-symbols-outlined text-[15px]">event</span>
          Schedule Conference
        </button>

        {/* Theme Toggle */}
        <button
          onClick={onToggleTheme}
          aria-label="Toggle visual theme"
          className={`p-2 rounded-full transition-colors cursor-pointer flex items-center justify-center ${
            isDark 
              ? 'bg-[#201f22] text-[#f2ca50] hover:bg-[#2a2a2c]' 
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
          title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          <span className="material-symbols-outlined text-[19px]">
            {isDark ? 'light_mode' : 'dark_mode'}
          </span>
        </button>

        {/* Notifications Icon Button */}
        <button
          onClick={onOpenNotifications}
          aria-label="Guardian Notifications"
          className={`relative p-2 rounded-full transition-colors cursor-pointer flex items-center justify-center ${
            isDark 
              ? 'bg-[#201f22] text-[#e5e1e4] hover:bg-[#2a2a2c]' 
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          <span className="material-symbols-outlined text-[19px]">notifications</span>
          {unreadCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 min-w-4 h-4 px-1 rounded-full bg-rose-600 text-white text-[10px] font-bold flex items-center justify-center animate-pulse">
              {unreadCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
};
