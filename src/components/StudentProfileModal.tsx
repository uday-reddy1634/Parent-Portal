import React from 'react';
import { ThemeMode } from '../types';

interface StudentProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme: ThemeMode;
}

export const StudentProfileModal: React.FC<StudentProfileModalProps> = ({
  isOpen,
  onClose,
  theme
}) => {
  if (!isOpen) return null;
  const isDark = theme === 'dark';

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className={`w-full max-w-lg rounded-2xl p-6 shadow-2xl border transition-all duration-300 relative ${
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

        <div className="flex items-start gap-4 mb-5">
          <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-bold font-display shadow-lg shrink-0 ${
            isDark ? 'bg-[#d4af37] text-[#3c2f00]' : 'bg-amber-600 text-white'
          }`}>
            JV
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-headline-sm text-2xl font-bold">Julian Vance</h3>
              <span className={`px-2 py-0.5 rounded-full text-[11px] font-semibold border ${
                isDark ? 'bg-[#2a2a2c] text-[#f2ca50] border-[#d4af37]/30' : 'bg-amber-100 text-amber-900 border-amber-200'
              }`}>
                Honors Scholar
              </span>
            </div>
            <p className={`text-xs mt-0.5 ${isDark ? 'text-[#d0c5af]' : 'text-slate-600'}`}>
              Student ID: <span className="font-mono font-semibold">#ATH-8842</span> • Grade 11-A
            </p>
            <p className={`text-xs ${isDark ? 'text-[#99907c]' : 'text-slate-500'}`}>
              Academic Track: Pre-Engineering & Pure Mathematics
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-5">
          <div className={`p-3 rounded-xl border ${isDark ? 'bg-[#201f22] border-[#353437]' : 'bg-slate-50 border-slate-200'}`}>
            <span className={`text-[10px] uppercase font-semibold block ${isDark ? 'text-[#99907c]' : 'text-slate-400'}`}>
              Current Standing
            </span>
            <span className="text-lg font-bold font-display text-emerald-600">Top 3.5%</span>
            <span className={`text-[11px] block ${isDark ? 'text-[#d0c5af]' : 'text-slate-500'}`}>Cohort Rank #4 / 142</span>
          </div>

          <div className={`p-3 rounded-xl border ${isDark ? 'bg-[#201f22] border-[#353437]' : 'bg-slate-50 border-slate-200'}`}>
            <span className={`text-[10px] uppercase font-semibold block ${isDark ? 'text-[#99907c]' : 'text-slate-400'}`}>
              Weighted GPA
            </span>
            <span className={`text-lg font-bold font-display ${isDark ? 'text-[#f2ca50]' : 'text-amber-700'}`}>4.42</span>
            <span className={`text-[11px] block ${isDark ? 'text-[#d0c5af]' : 'text-slate-500'}`}>3.94 Unweighted Scale</span>
          </div>

          <div className={`p-3 rounded-xl border ${isDark ? 'bg-[#201f22] border-[#353437]' : 'bg-slate-50 border-slate-200'}`}>
            <span className={`text-[10px] uppercase font-semibold block ${isDark ? 'text-[#99907c]' : 'text-slate-400'}`}>
              Attendance Rate
            </span>
            <span className="text-lg font-bold font-display">96.9%</span>
            <span className={`text-[11px] block ${isDark ? 'text-[#d0c5af]' : 'text-slate-500'}`}>124 of 128 Days Enrolled</span>
          </div>

          <div className={`p-3 rounded-xl border ${isDark ? 'bg-[#201f22] border-[#353437]' : 'bg-slate-50 border-slate-200'}`}>
            <span className={`text-[10px] uppercase font-semibold block ${isDark ? 'text-[#99907c]' : 'text-slate-400'}`}>
              Primary Faculty Mentor
            </span>
            <span className="text-xs font-bold block truncate">Dr. Marcus Sterling</span>
            <span className={`text-[11px] block ${isDark ? 'text-[#d0c5af]' : 'text-slate-500'}`}>STEM & Physics Chair</span>
          </div>
        </div>

        <div className={`p-3 rounded-xl border mb-5 text-xs ${
          isDark ? 'bg-[#201f22] border-[#353437] text-[#d0c5af]' : 'bg-slate-50 border-slate-200 text-slate-700'
        }`}>
          <div className="flex items-center gap-1.5 font-semibold mb-1">
            <span className="material-symbols-outlined text-[16px] text-amber-600">shield_person</span>
            <span>Registered Guardian Contact</span>
          </div>
          <div>Eleanor Vance (Mother & Primary Legal Guardian) • eleanor.vance@vanceholdings.com</div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={onClose}
            className={`px-5 py-2 rounded-xl text-xs font-semibold cursor-pointer ${
              isDark ? 'bg-[#d4af37] text-[#3c2f00] hover:bg-[#ffe088]' : 'bg-amber-700 text-white hover:bg-amber-800'
            }`}
          >
            Close Overview
          </button>
        </div>
      </div>
    </div>
  );
};
