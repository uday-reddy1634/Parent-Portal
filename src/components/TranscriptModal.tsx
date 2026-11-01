import React, { useState } from 'react';
import { ThemeMode } from '../types';

interface TranscriptModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme: ThemeMode;
}

export const TranscriptModal: React.FC<TranscriptModalProps> = ({
  isOpen,
  onClose,
  theme
}) => {
  const [downloading, setDownloading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  if (!isOpen) return null;

  const handleDownload = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      setDownloaded(true);
      setTimeout(() => {
        setDownloaded(false);
      }, 3500);
    }, 1500);
  };

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

        <div className="flex items-center gap-2 mb-1">
          <span className={`w-2 h-2 rounded-full ${isDark ? 'bg-[#f2ca50]' : 'bg-amber-600'}`}></span>
          <span className={`font-label-sm text-xs uppercase tracking-wider font-semibold ${
            isDark ? 'text-[#f2ca50]' : 'text-amber-700'
          }`}>
            Registrar Cryptographic Registry
          </span>
        </div>
        <h3 className="font-headline-sm text-2xl font-bold tracking-tight mb-2">
          Official Academic Transcript
        </h3>
        <p className={`font-body-sm text-xs mb-4 leading-relaxed ${isDark ? 'text-[#d0c5af]' : 'text-slate-600'}`}>
          Authentic institutional transcript record for Julian Vance (Grade 11-A Honors). Cryptographically signed with registrar private key.
        </p>

        {/* Certificate Card Preview */}
        <div className={`p-4 rounded-xl border mb-4 flex flex-col gap-2.5 ${
          isDark ? 'bg-[#201f22] border-[#353437]' : 'bg-slate-50 border-slate-200'
        }`}>
          <div className="flex items-center justify-between pb-2 border-b border-slate-200/50">
            <div className="flex items-center gap-2">
              <span className={`material-symbols-outlined text-[20px] ${isDark ? 'text-[#f2ca50]' : 'text-amber-700'}`}>
                verified
              </span>
              <span className="font-semibold text-xs font-title-sm">Pathshala Registrar Seal</span>
            </div>
            <span className={`font-mono text-[10px] font-semibold px-2 py-0.5 rounded ${
              isDark ? 'bg-[#2a2a2c] text-[#f2ca50]' : 'bg-amber-100 text-amber-900'
            }`}>
              VERIFIED
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <span className={`block font-label-sm text-[10px] uppercase ${isDark ? 'text-[#99907c]' : 'text-slate-400'}`}>Student</span>
              <span className="font-semibold">Julian Vance</span>
            </div>
            <div>
              <span className={`block font-label-sm text-[10px] uppercase ${isDark ? 'text-[#99907c]' : 'text-slate-400'}`}>Cohort Standing</span>
              <span className="font-semibold text-emerald-600">Top 3.5% (Rank #4)</span>
            </div>
            <div>
              <span className={`block font-label-sm text-[10px] uppercase ${isDark ? 'text-[#99907c]' : 'text-slate-400'}`}>Cumulative GPA</span>
              <span className="font-semibold">4.42 Weighted / 3.94 UW</span>
            </div>
            <div>
              <span className={`block font-label-sm text-[10px] uppercase ${isDark ? 'text-[#99907c]' : 'text-slate-400'}`}>Diploma Credits</span>
              <span className="font-semibold">24 / 28 Credits (85.7%)</span>
            </div>
          </div>

          <div className={`pt-2 border-t text-[11px] font-mono flex items-center justify-between ${
            isDark ? 'border-[#353437] text-[#99907c]' : 'border-slate-200 text-slate-500'
          }`}>
            <span>Record ID: AETH-2024-T2-JV9482</span>
            <span>256-bit SHA Signature</span>
          </div>
        </div>

        {downloaded && (
          <div className={`p-3 rounded-xl mb-4 text-xs flex items-center gap-2 ${
            isDark ? 'bg-emerald-950/40 text-emerald-300 border border-emerald-800' : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
          }`}>
            <span className="material-symbols-outlined text-[18px]">check_circle</span>
            <span>PDF transcript file generated and downloaded successfully.</span>
          </div>
        )}

        <div className="flex items-center justify-end gap-2.5">
          <button
            type="button"
            onClick={onClose}
            className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-colors cursor-pointer ${
              isDark 
                ? 'border-[#353437] text-[#d0c5af] hover:bg-[#201f22]' 
                : 'border-slate-200 text-slate-600 hover:bg-slate-100'
            }`}
          >
            Close
          </button>
          <button
            type="button"
            onClick={handleDownload}
            disabled={downloading}
            className={`px-5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer shadow-md flex items-center gap-1.5 ${
              isDark
                ? 'bg-[#d4af37] text-[#3c2f00] hover:bg-[#ffe088]'
                : 'bg-amber-700 hover:bg-amber-800 text-white'
            }`}
          >
            {downloading ? (
              <>
                <span className="material-symbols-outlined text-[16px] animate-spin">sync</span>
                <span>Generating Cryptographic PDF...</span>
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-[16px]">file_download</span>
                <span>Download Official Signed PDF</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
