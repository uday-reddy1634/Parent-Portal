import React from 'react';
import { ThemeMode } from '../types';

interface HandbookModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme: ThemeMode;
  type: 'handbook' | 'privacy';
}

export const HandbookModal: React.FC<HandbookModalProps> = ({
  isOpen,
  onClose,
  theme,
  type
}) => {
  if (!isOpen) return null;
  const isDark = theme === 'dark';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className={`w-full max-w-xl rounded-2xl border shadow-2xl overflow-hidden transition-all flex flex-col max-h-[90vh] ${
          isDark ? 'bg-[#1c1b1d] border-[#353437] text-[#e5e1e4]' : 'bg-white border-slate-200 text-slate-800'
        }`}
      >
        <div className={`p-5 sm:p-6 border-b flex items-center justify-between ${
          isDark ? 'border-[#2a2a2c] bg-[#141416]' : 'border-slate-100 bg-slate-50/80'
        }`}>
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
              isDark ? 'bg-[#d4af37]/20 text-[#f2ca50]' : 'bg-amber-100 text-amber-800'
            }`}>
              <span className="material-symbols-outlined text-xl">
                {type === 'handbook' ? 'menu_book' : 'verified_user'}
              </span>
            </div>
            <div>
              <h3 className="font-bold text-base sm:text-lg font-title-sm">
                {type === 'handbook' ? 'Pathshala Parent Handbook (2024–2025)' : 'Pathshala Privacy Charter'}
              </h3>
              <p className={`text-xs ${isDark ? 'text-[#99907c]' : 'text-slate-500'}`}>
                Institutional Governance & Guardian Protocol
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

        <div className="p-6 overflow-y-auto space-y-4 text-xs sm:text-sm leading-relaxed">
          {type === 'handbook' ? (
            <>
              <div className={`p-3.5 rounded-xl border ${
                isDark ? 'bg-[#141416] border-[#2a2a2c]' : 'bg-amber-50/60 border-amber-200/60'
              }`}>
                <span className="font-semibold text-amber-700 dark:text-[#f2ca50] block mb-1">
                  Academic Integrity & Scholar Honor Code
                </span>
                <p className={isDark ? 'text-[#d0c5af]' : 'text-slate-600'}>
                  Scholars of Pathshala commit to the highest tier of scholarly discipline, intellectual honesty, and mutual respect.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold font-title-sm">1. Attendance & Punctuality Mandates</h4>
                <p className={isDark ? 'text-[#d0c5af]' : 'text-slate-600'}>
                  Honors standing requires a 95.0% minimum threshold. Any unexcused absence is flagged directly to the Upper School Dean within 60 minutes of period roll sync.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold font-title-sm">2. Guardian Portal Communications</h4>
                <p className={isDark ? 'text-[#d0c5af]' : 'text-slate-600'}>
                  The Guardian Portal represents the primary verified channel for official grade reporting, conference scheduling, and commendation submissions.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold font-title-sm">3. Faculty Fellowship Commendations</h4>
                <p className={isDark ? 'text-[#d0c5af]' : 'text-slate-600'}>
                  Guardian commendations are transmitted directly to the faculty member&apos;s registrar dossier and reviewed by the Headmaster for annual merit fellowships.
                </p>
              </div>
            </>
          ) : (
            <>
              <div className={`p-3.5 rounded-xl border ${
                isDark ? 'bg-[#141416] border-[#2a2a2c]' : 'bg-blue-50/60 border-blue-200/60'
              }`}>
                <span className="font-semibold text-blue-700 dark:text-blue-400 block mb-1">
                  FERPA & Institutional Cryptographic Safeguards
                </span>
                <p className={isDark ? 'text-[#d0c5af]' : 'text-slate-600'}>
                  All student marks, disciplinary notes, attendance rolls, and counselor inquiries are encrypted at rest with multi-tier cryptographic access.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold font-title-sm">1. Zero Third-Party Telemetry</h4>
                <p className={isDark ? 'text-[#d0c5af]' : 'text-slate-600'}>
                  Pathshala does not sell, license, or expose guardian identity or academic records to commercial analytics or third-party networks.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold font-title-sm">2. Authorized Guardian Delegation</h4>
                <p className={isDark ? 'text-[#d0c5af]' : 'text-slate-600'}>
                  Access is restricted strictly to verified primary guardians and designated academic advocates recorded on the student&apos;s permanent matriculation deed.
                </p>
              </div>
            </>
          )}
        </div>

        <div className={`p-4 border-t flex justify-end gap-3 ${
          isDark ? 'border-[#2a2a2c] bg-[#141416]' : 'border-slate-100 bg-slate-50'
        }`}>
          <button
            onClick={onClose}
            className={`px-4 py-2 rounded-xl text-xs font-semibold cursor-pointer ${
              isDark ? 'bg-[#d4af37] text-[#3c2f00] hover:bg-amber-300' : 'bg-amber-700 text-white hover:bg-amber-800'
            }`}
          >
            Acknowledge & Close
          </button>
        </div>
      </div>
    </div>
  );
};
