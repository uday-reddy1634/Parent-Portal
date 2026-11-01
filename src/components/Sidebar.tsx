import React from 'react';
import { TabType, ThemeMode, AppNotification } from '../types';
import { ASSETS } from '../data/mockData';

interface SidebarProps {
  currentTab: TabType;
  onTabChange: (tab: TabType) => void;
  theme: ThemeMode;
  onToggleTheme: () => void;
  notifications: AppNotification[];
  onOpenNotifications: () => void;
  onOpenStudentProfile: () => void;
  onOpenScheduleConference: () => void;
  onOpenMessageMentor: () => void;
  onOpenTranscript: () => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  isMobileOpen: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onTabChange,
  theme,
  onToggleTheme,
  notifications,
  onOpenNotifications,
  onOpenStudentProfile,
  onOpenScheduleConference,
  onOpenMessageMentor,
  onOpenTranscript,
  isCollapsed,
  onToggleCollapse,
  isMobileOpen,
  onCloseMobile
}) => {
  const isDark = theme === 'dark';
  const unreadCount = notifications.filter(n => !n.read).length;

  const navItems: { label: string; tab: TabType; icon: string; badge?: string; badgeColor?: string }[] = [
    { label: 'Executive Dashboard', tab: 'dashboard', icon: 'dashboard', badge: 'Live' },
    { label: 'Attendance Records', tab: 'attendance', icon: 'event_available', badge: '98.4%', badgeColor: 'emerald' },
    { label: 'Academic Marks & Reports', tab: 'academic-marks-reports', icon: 'school', badge: '3.94 GPA', badgeColor: 'amber' },
    { label: 'Thank Teachers', tab: 'thank-teachers', icon: 'award_star', badge: 'Fellowship', badgeColor: 'gold' },
    { label: 'Feedback & Support', tab: 'feedback-support', icon: 'support_agent' }
  ];

  const handleSelectTab = (tab: TabType) => {
    onTabChange(tab);
    onCloseMobile();
  };

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isMobileOpen && (
        <div 
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden transition-opacity"
          aria-hidden="true"
        />
      )}

      {/* Main Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 flex flex-col transition-all duration-300 ease-in-out border-r ${
          isDark 
            ? 'bg-[#141416] border-[#262528] text-[#e5e1e4]' 
            : 'bg-white border-slate-200 text-slate-800'
        } ${
          // Mobile responsive slide-in
          isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } ${
          // Desktop collapsed vs expanded width
          isCollapsed ? 'lg:w-20' : 'w-72 sm:w-80 lg:w-72 xl:w-76'
        }`}
      >
        {/* Sidebar Header / Brand Zone */}
        <div className={`h-16 px-4 flex items-center justify-between border-b shrink-0 ${
          isDark ? 'border-[#262528]' : 'border-slate-100'
        }`}>
          <div 
            onClick={() => handleSelectTab('dashboard')}
            className="flex items-center gap-3 cursor-pointer group overflow-hidden"
          >
            <div className="relative shrink-0">
              <img
                src={ASSETS.logo}
                alt="Pathshala Logo"
                className="w-9 h-9 object-contain transition-transform group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white dark:border-[#141416]"></span>
            </div>

            {(!isCollapsed || isMobileOpen) && (
              <div className="flex flex-col transition-opacity duration-200">
                <span className={`font-bold font-title-sm text-sm tracking-tight ${
                  isDark ? 'text-[#f2ca50]' : 'text-amber-800'
                }`}>
                  Pathshala
                </span>
                <span className={`text-[11px] font-medium ${
                  isDark ? 'text-[#99907c]' : 'text-slate-500'
                }`}>
                  Executive Guardian Portal
                </span>
              </div>
            )}
          </div>

          {/* Close Button on Mobile / Collapse on Desktop */}
          <div className="flex items-center">
            {/* Mobile close button */}
            <button
              onClick={onCloseMobile}
              className={`p-1.5 rounded-lg lg:hidden transition-colors ${
                isDark ? 'hover:bg-[#201f22] text-[#99907c]' : 'hover:bg-slate-100 text-slate-400'
              }`}
              title="Close Navigation"
            >
              <span className="material-symbols-outlined text-xl">close</span>
            </button>

            {/* Desktop collapse toggle */}
            <button
              onClick={onToggleCollapse}
              className={`hidden lg:flex p-1.5 rounded-lg transition-colors cursor-pointer ${
                isDark ? 'hover:bg-[#201f22] text-[#99907c]' : 'hover:bg-slate-100 text-slate-400'
              }`}
              title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              <span className="material-symbols-outlined text-[19px]">
                {isCollapsed ? 'chevron_right' : 'chevron_left'}
              </span>
            </button>
          </div>
        </div>

        {/* Scholar Quick Status Card */}
        {(!isCollapsed || isMobileOpen) ? (
          <div className="p-3 mx-3 mt-3 shrink-0">
            <div 
              onClick={onOpenStudentProfile}
              className={`p-3 rounded-2xl border transition-all cursor-pointer group relative overflow-hidden ${
                isDark 
                  ? 'bg-[#1c1b1d] border-[#302f33] hover:border-[#d4af37]/50' 
                  : 'bg-amber-50/50 border-amber-200/70 hover:border-amber-300 hover:shadow-sm'
              }`}
              title="Click to view Julian's full academic profile"
            >
              <div className="flex items-center gap-3">
                <div className="relative shrink-0">
                  <img
                    src={ASSETS.studentPhoto}
                    alt="Julian Vance"
                    className="w-11 h-11 rounded-xl object-cover border border-amber-400/40"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 border-2 border-white dark:border-[#1c1b1d] rounded-full"></span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-xs truncate group-hover:text-amber-600 dark:group-hover:text-[#f2ca50] transition-colors">
                      Julian Vance
                    </h4>
                    <span className="text-[10px] px-1.5 py-0.5 rounded font-bold bg-amber-500/15 text-amber-700 dark:text-[#f2ca50]">
                      11-A
                    </span>
                  </div>
                  <p className={`text-[11px] truncate ${isDark ? 'text-[#99907c]' : 'text-slate-500'}`}>
                    Honors Scholar • #PTH-8842
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                      GPA 3.94
                    </span>
                    <span className={isDark ? 'text-[#353437]' : 'text-slate-300'}>•</span>
                    <span className="text-[10px] text-amber-600 dark:text-[#f2ca50]">
                      Top 3% Cohort
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-3 flex justify-center shrink-0">
            <button
              onClick={onOpenStudentProfile}
              className="relative p-1 rounded-xl hover:ring-2 hover:ring-amber-500 transition-all cursor-pointer"
              title="Julian Vance (Grade 11-A)"
            >
              <img
                src={ASSETS.studentPhoto}
                alt="Julian Vance"
                className="w-9 h-9 rounded-lg object-cover"
                referrerPolicy="no-referrer"
              />
              <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-[#141416]"></span>
            </button>
          </div>
        )}

        {/* Scrollable Navigation Items */}
        <div className="flex-1 overflow-y-auto px-3 py-2 space-y-1">
          {(!isCollapsed || isMobileOpen) && (
            <div className="px-3 pt-2 pb-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-[#7d7565]">
              Navigation
            </div>
          )}

          {navItems.map((item) => {
            const isActive = currentTab === item.tab;
            return (
              <button
                key={item.tab}
                onClick={() => handleSelectTab(item.tab)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? isDark
                      ? 'bg-[#d4af37] text-[#3c2f00] font-bold shadow-[0_2px_12px_rgba(212,175,55,0.25)]'
                      : 'bg-amber-700 text-white font-bold shadow-sm'
                    : isDark
                      ? 'text-[#d0c5af] hover:text-white hover:bg-[#201f22]'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                } ${isCollapsed && !isMobileOpen ? 'justify-center px-2' : ''}`}
                title={item.label}
              >
                <span className={`material-symbols-outlined text-[20px] shrink-0 ${
                  isActive 
                    ? '' 
                    : isDark ? 'text-[#d4af37]' : 'text-amber-700'
                }`}>
                  {item.icon}
                </span>

                {(!isCollapsed || isMobileOpen) && (
                  <span className="truncate flex-1 text-left">{item.label}</span>
                )}

                {(!isCollapsed || isMobileOpen) && item.badge && (
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-md font-bold whitespace-nowrap shrink-0 ${
                    isActive
                      ? isDark ? 'bg-black/20 text-[#3c2f00]' : 'bg-white/20 text-white'
                      : isDark
                        ? 'bg-[#201f22] text-[#f2ca50] border border-[#353437]'
                        : 'bg-slate-100 text-slate-700 border border-slate-200'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}

          {/* Quick Actions Header & Dock */}
          {(!isCollapsed || isMobileOpen) ? (
            <div className="pt-4 pb-1">
              <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-[#7d7565]">
                Direct Registrar Actions
              </div>
              <div className="space-y-1">
                <button
                  onClick={() => { onOpenScheduleConference(); onCloseMobile(); }}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs transition-colors cursor-pointer text-left ${
                    isDark 
                      ? 'text-[#d0c5af] hover:bg-[#201f22] hover:text-[#f2ca50]' 
                      : 'text-slate-600 hover:bg-amber-50 hover:text-amber-800'
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px] text-amber-500">calendar_month</span>
                  <span className="truncate">Schedule Conference</span>
                </button>
                <button
                  onClick={() => { onOpenMessageMentor(); onCloseMobile(); }}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs transition-colors cursor-pointer text-left ${
                    isDark 
                      ? 'text-[#d0c5af] hover:bg-[#201f22] hover:text-[#f2ca50]' 
                      : 'text-slate-600 hover:bg-amber-50 hover:text-amber-800'
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px] text-blue-500">mail</span>
                  <span className="truncate">Message Faculty</span>
                </button>
                <button
                  onClick={() => { onOpenTranscript(); onCloseMobile(); }}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs transition-colors cursor-pointer text-left ${
                    isDark 
                      ? 'text-[#d0c5af] hover:bg-[#201f22] hover:text-[#f2ca50]' 
                      : 'text-slate-600 hover:bg-amber-50 hover:text-amber-800'
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px] text-emerald-500">description</span>
                  <span className="truncate">Official PDF Transcript</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="pt-3 border-t border-slate-200 dark:border-[#262528] flex flex-col items-center gap-2">
              <button
                onClick={onOpenScheduleConference}
                className="p-2 rounded-xl text-amber-500 hover:bg-slate-100 dark:hover:bg-[#201f22] transition-colors"
                title="Schedule Conference"
              >
                <span className="material-symbols-outlined text-[20px]">calendar_month</span>
              </button>
              <button
                onClick={onOpenMessageMentor}
                className="p-2 rounded-xl text-blue-500 hover:bg-slate-100 dark:hover:bg-[#201f22] transition-colors"
                title="Message Faculty"
              >
                <span className="material-symbols-outlined text-[20px]">mail</span>
              </button>
              <button
                onClick={onOpenTranscript}
                className="p-2 rounded-xl text-emerald-500 hover:bg-slate-100 dark:hover:bg-[#201f22] transition-colors"
                title="Download Official Transcript"
              >
                <span className="material-symbols-outlined text-[20px]">description</span>
              </button>
            </div>
          )}

          {/* Academic Term Capsule */}
          {(!isCollapsed || isMobileOpen) && (
            <div className={`mt-3 p-3 rounded-xl border text-xs ${
              isDark ? 'bg-[#18181a] border-[#2a2a2c]' : 'bg-slate-50 border-slate-200/80'
            }`}>
              <div className="flex items-center justify-between text-[11px] mb-1">
                <span className="font-semibold text-amber-600 dark:text-[#f2ca50]">AY 2024–2025</span>
                <span className="flex items-center gap-1 text-[10px] text-emerald-500 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  Active Term 1
                </span>
              </div>
              <p className={`text-[10px] leading-tight ${isDark ? 'text-[#99907c]' : 'text-slate-500'}`}>
                Period 4 In Session • Daily Roll Synchronized
              </p>
            </div>
          )}
        </div>

        {/* Sidebar Footer Controls */}
        <div className={`p-3 border-t shrink-0 space-y-2 ${
          isDark ? 'border-[#262528] bg-[#101012]' : 'border-slate-100 bg-slate-50/60'
        }`}>
          {/* Quick Utility Row: Theme Switcher & Notifications */}
          <div className="flex items-center gap-2">
            <button
              onClick={onToggleTheme}
              className={`flex-1 flex items-center justify-center gap-2 py-2 px-2.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                isDark 
                  ? 'bg-[#1c1b1d] border-[#302f33] text-[#f2ca50] hover:bg-[#252427]' 
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
              title={`Switch to ${isDark ? 'Light Alabaster' : 'Obsidian Dark'}`}
            >
              <span className="material-symbols-outlined text-[17px]">
                {isDark ? 'light_mode' : 'dark_mode'}
              </span>
              {(!isCollapsed || isMobileOpen) && (
                <span className="text-[11px] font-medium truncate">
                  {isDark ? 'Light Mode' : 'Dark Mode'}
                </span>
              )}
            </button>

            <button
              onClick={onOpenNotifications}
              className={`relative flex items-center justify-center py-2 px-2.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                isDark 
                  ? 'bg-[#1c1b1d] border-[#302f33] text-[#e5e1e4] hover:bg-[#252427]' 
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
              } ${isCollapsed && !isMobileOpen ? 'flex-1' : ''}`}
              title="Notifications"
            >
              <span className="material-symbols-outlined text-[18px]">notifications</span>
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-600 text-white text-[10px] font-bold flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>
          </div>

          {/* Guardian Profile Zone */}
          {(!isCollapsed || isMobileOpen) ? (
            <div className={`p-2.5 rounded-xl border flex items-center justify-between ${
              isDark ? 'bg-[#18181a] border-[#2a2a2c]' : 'bg-white border-slate-200/70'
            }`}>
              <div className="flex items-center gap-2.5 min-w-0">
                <img
                  src={ASSETS.parentPhoto}
                  alt="Eleanor Vance"
                  className="w-8 h-8 rounded-full object-cover shrink-0 border border-amber-500/30"
                  referrerPolicy="no-referrer"
                />
                <div className="min-w-0">
                  <div className="flex items-center gap-1">
                    <span className="font-semibold text-xs truncate">Eleanor Vance</span>
                    <span className="material-symbols-outlined text-[13px] text-amber-500">verified</span>
                  </div>
                  <span className={`text-[10px] block truncate ${isDark ? 'text-[#99907c]' : 'text-slate-400'}`}>
                    Primary Guardian
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex justify-center">
              <img
                src={ASSETS.parentPhoto}
                alt="Eleanor Vance"
                className="w-8 h-8 rounded-full object-cover border border-amber-500/30"
                title="Eleanor Vance (Primary Guardian)"
                referrerPolicy="no-referrer"
              />
            </div>
          )}
        </div>
      </aside>
    </>
  );
};
