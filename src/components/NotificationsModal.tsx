import React from 'react';
import { ThemeMode, AppNotification } from '../types';

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme: ThemeMode;
  notifications: AppNotification[];
  onMarkAllAsRead: () => void;
}

export const NotificationsModal: React.FC<NotificationsModalProps> = ({
  isOpen,
  onClose,
  theme,
  notifications,
  onMarkAllAsRead
}) => {
  if (!isOpen) return null;
  const isDark = theme === 'dark';

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className={`w-full max-w-md rounded-2xl p-6 shadow-2xl border transition-all duration-300 relative ${
        isDark ? 'bg-[#1c1b1d] border-[#353437] text-[#e5e1e4]' : 'bg-white border-slate-200 text-slate-900'
      }`}>
        <button
          onClick={onClose}
          aria-label="Close"
          className={`absolute top-5 right-5 p-1.5 rounded-full transition-colors cursor-pointer ${
            isDark ? 'bg-[#2a2a2c] text-[#d0c5af] hover:text-white' : 'bg-slate-100 text-slate-500 hover:text-slate-800'
          }`}
        >
          <span className="material-symbols-outlined text-[18px]">close</span>
        </button>

        <div className="flex items-center justify-between mb-4 pr-8">
          <div>
            <h3 className="font-headline-sm text-xl font-bold tracking-tight">
              Guardian Notifications
            </h3>
            <span className={`font-label-sm text-xs ${isDark ? 'text-[#99907c]' : 'text-slate-400'}`}>
              Real-time academic & campus alerts
            </span>
          </div>
          <button
            onClick={onMarkAllAsRead}
            className={`font-label-sm text-xs font-semibold hover:underline cursor-pointer ${
              isDark ? 'text-[#f2ca50]' : 'text-amber-800'
            }`}
          >
            Mark all read
          </button>
        </div>

        <div className="flex flex-col gap-2.5 max-h-100 overflow-y-auto pr-1">
          {notifications.map((n) => (
            <div
              key={n.id}
              className={`p-3.5 rounded-xl border transition-colors ${
                n.read
                  ? isDark ? 'bg-[#201f22]/50 border-[#2a2a2c]' : 'bg-slate-50/60 border-slate-200/60'
                  : isDark ? 'bg-[#201f22] border-[#d4af37]/40' : 'bg-amber-50/40 border-amber-200'
              }`}
            >
              <div className="flex items-start justify-between gap-2 mb-1">
                <div className="flex items-center gap-1.5">
                  {!n.read && (
                    <span className={`w-2 h-2 rounded-full ${isDark ? 'bg-[#f2ca50]' : 'bg-amber-600'}`}></span>
                  )}
                  <h4 className="font-semibold text-xs font-title-sm">{n.title}</h4>
                </div>
                <span className={`text-[10px] font-label-sm shrink-0 ${isDark ? 'text-[#99907c]' : 'text-slate-400'}`}>
                  {n.timestamp}
                </span>
              </div>
              <p className={`text-xs font-body-sm leading-relaxed ${isDark ? 'text-[#d0c5af]' : 'text-slate-600'}`}>
                {n.message}
              </p>
            </div>
          ))}
        </div>

        <div className="pt-4 mt-2 border-t flex justify-end">
          <button
            onClick={onClose}
            className={`px-4 py-2 rounded-xl text-xs font-semibold cursor-pointer ${
              isDark ? 'bg-[#2a2a2c] text-white hover:bg-[#353437]' : 'bg-slate-100 text-slate-800 hover:bg-slate-200'
            }`}
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
};
