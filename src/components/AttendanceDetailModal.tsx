import React from 'react';
import { ThemeMode } from '../types';

export interface AttendanceDetailData {
  title: string;
  date: string;
  status: 'present' | 'tardy' | 'excused' | 'unexcused';
  periodDetails?: { period: string; subject: string; status: string; instructor: string }[];
  verifiedBy?: string;
  role?: string;
  notes?: string;
  timestamp?: string;
}

interface AttendanceDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme: ThemeMode;
  data: AttendanceDetailData | null;
}

export const AttendanceDetailModal: React.FC<AttendanceDetailModalProps> = ({
  isOpen,
  onClose,
  theme,
  data
}) => {
  if (!isOpen || !data) return null;
  const isDark = theme === 'dark';

  const getStatusBadge = () => {
    switch (data.status) {
      case 'present':
        return {
          bg: isDark ? 'bg-emerald-950/40 text-emerald-400 border-emerald-500/30' : 'bg-emerald-50 text-emerald-700 border-emerald-200',
          icon: 'check_circle',
          label: 'Fully Present (All Periods)'
        };
      case 'tardy':
        return {
          bg: isDark ? 'bg-orange-950/40 text-orange-400 border-orange-500/30' : 'bg-orange-50 text-orange-700 border-orange-200',
          icon: 'schedule',
          label: 'Excused Tardy'
        };
      case 'excused':
        return {
          bg: isDark ? 'bg-blue-950/40 text-blue-400 border-blue-500/30' : 'bg-blue-50 text-blue-700 border-blue-200',
          icon: 'medical_services',
          label: 'Excused Absence (Medical/Dean)'
        };
      default:
        return {
          bg: isDark ? 'bg-rose-950/40 text-rose-400 border-rose-500/30' : 'bg-rose-50 text-rose-700 border-rose-200',
          icon: 'error',
          label: 'Unexcused Absence'
        };
    }
  };

  const badge = getStatusBadge();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className={`w-full max-w-lg rounded-2xl border shadow-2xl overflow-hidden transition-all flex flex-col max-h-[90vh] ${
          isDark ? 'bg-[#1c1b1d] border-[#353437] text-[#e5e1e4]' : 'bg-white border-slate-200 text-slate-800'
        }`}
      >
        {/* Header */}
        <div className={`p-5 sm:p-6 border-b flex items-center justify-between ${
          isDark ? 'border-[#2a2a2c] bg-[#141416]' : 'border-slate-100 bg-slate-50/80'
        }`}>
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${badge.bg}`}>
              <span className="material-symbols-outlined text-xl">{badge.icon}</span>
            </div>
            <div>
              <h3 className="font-bold text-base sm:text-lg font-title-sm">{data.title}</h3>
              <p className={`text-xs ${isDark ? 'text-[#99907c]' : 'text-slate-500'}`}>
                {data.date} • Official Registrar Attendance Roll
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className={`p-2 rounded-xl transition-colors ${
              isDark ? 'text-[#99907c] hover:bg-[#201f22] hover:text-white' : 'text-slate-400 hover:bg-slate-100 hover:text-slate-700'
            }`}
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4">
          {/* Status Chip */}
          <div className="flex items-center justify-between">
            <span className={`text-xs font-semibold uppercase tracking-wider ${isDark ? 'text-[#99907c]' : 'text-slate-500'}`}>
              Recorded Status
            </span>
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${badge.bg}`}>
              <span className="material-symbols-outlined text-[14px]">{badge.icon}</span>
              {badge.label}
            </span>
          </div>

          {/* Verification Details */}
          <div className={`p-4 rounded-xl border space-y-2 ${
            isDark ? 'bg-[#141416]/70 border-[#2a2a2c]' : 'bg-slate-50 border-slate-200/70'
          }`}>
            <div className="flex items-center justify-between text-xs">
              <span className={isDark ? 'text-[#99907c]' : 'text-slate-500'}>Verifying Official:</span>
              <span className="font-semibold">{data.verifiedBy || 'Dean Harrison'}</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className={isDark ? 'text-[#99907c]' : 'text-slate-500'}>Administrative Role:</span>
              <span className="font-medium text-amber-600 dark:text-[#f2ca50]">{data.role || 'Homeroom Dean & Upper School Faculty'}</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className={isDark ? 'text-[#99907c]' : 'text-slate-500'}>Recorded Timestamp:</span>
              <span className="font-mono text-[11px]">{data.timestamp || '08:48:12 AM PST'}</span>
            </div>
          </div>

          {/* Notes & Remarks */}
          {data.notes && (
            <div className="space-y-1.5">
              <span className={`text-xs font-semibold ${isDark ? 'text-[#d0c5af]' : 'text-slate-700'}`}>
                Official Remarks & Incident Notes:
              </span>
              <div className={`p-3.5 rounded-xl border text-xs leading-relaxed ${
                isDark ? 'bg-[#201f22] border-[#353437] text-[#e5e1e4]' : 'bg-white border-slate-200 text-slate-700'
              }`}>
                {data.notes}
              </div>
            </div>
          )}

          {/* Periods Breakdown */}
          <div className="space-y-2">
            <span className={`text-xs font-semibold ${isDark ? 'text-[#d0c5af]' : 'text-slate-700'}`}>
              Daily Schedule Breakdown:
            </span>
            <div className={`divide-y rounded-xl border overflow-hidden ${
              isDark ? 'divide-[#2a2a2c] border-[#2a2a2c] bg-[#141416]' : 'divide-slate-100 border-slate-200 bg-white'
            }`}>
              {(data.periodDetails || [
                { period: 'P1 (08:30)', subject: 'AP Calculus BC', status: data.status === 'tardy' ? 'Tardy (08:48 AM)' : 'Present', instructor: 'Dr. Marcus Sterling' },
                { period: 'P2 (09:45)', subject: 'AP English Literature', status: 'Present', instructor: 'Prof. Evelyn Vance-Hart' },
                { period: 'P3 (11:00)', subject: 'Advanced Robotics & AI', status: 'Present', instructor: 'Dr. Alistair Chen' },
                { period: 'P4 (13:00)', subject: 'Microeconomics (Honors)', status: 'Present', instructor: 'Dean Harrison' },
                { period: 'P5 (14:15)', subject: 'Classical Chamber Orchestra', status: 'Present', instructor: 'Maestro Valerius' },
                { period: 'P6 (15:30)', subject: 'Physical Conditioning', status: 'Present', instructor: 'Coach Montgomery' },
              ]).map((p, idx) => (
                <div key={idx} className="p-2.5 px-3 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[11px] text-amber-600 dark:text-[#f2ca50] font-semibold">{p.period}</span>
                    <span className="font-medium">{p.subject}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-[11px] px-2 py-0.5 rounded font-semibold ${
                      p.status.includes('Tardy') 
                        ? 'bg-orange-500/15 text-orange-600 border border-orange-500/20' 
                        : p.status.includes('Medical') || p.status.includes('Excused')
                        ? 'bg-blue-500/15 text-blue-600 border border-blue-500/20'
                        : 'bg-emerald-500/15 text-emerald-600 border border-emerald-500/20'
                    }`}>
                      {p.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className={`p-4 border-t flex justify-end gap-3 ${
          isDark ? 'border-[#2a2a2c] bg-[#141416]' : 'border-slate-100 bg-slate-50'
        }`}>
          <button
            onClick={onClose}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              isDark ? 'bg-[#201f22] text-[#e5e1e4] hover:bg-[#2a2a2c]' : 'bg-slate-200 text-slate-800 hover:bg-slate-300'
            }`}
          >
            Close Inspection
          </button>
        </div>
      </div>
    </div>
  );
};
