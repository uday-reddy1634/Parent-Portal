import React, { useState } from 'react';
import { ThemeMode, LeaveRequest, AttendanceRecord } from '../types';
import { ASSETS, ATTENDANCE_RECORDS, LEAVE_REQUESTS } from '../data/mockData';
import { AttendanceDetailModal, AttendanceDetailData } from '../components/AttendanceDetailModal';

interface AttendanceScreenProps {
  theme: ThemeMode;
  onOpenExcuseModal: () => void;
  onOpenTranscriptModal: () => void;
  leaveQueue: LeaveRequest[];
}

export const AttendanceScreen: React.FC<AttendanceScreenProps> = ({
  theme,
  onOpenExcuseModal,
  onOpenTranscriptModal,
  leaveQueue
}) => {
  const [filterType, setFilterType] = useState<'all' | 'present' | 'excused' | 'tardy'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [inspectData, setInspectData] = useState<AttendanceDetailData | null>(null);

  const isDark = theme === 'dark';

  const filteredRecords = ATTENDANCE_RECORDS.filter(rec => {
    if (filterType !== 'all' && rec.status !== filterType) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        rec.date.toLowerCase().includes(q) ||
        rec.remarks.toLowerCase().includes(q) ||
        rec.verifiedOfficial.toLowerCase().includes(q) ||
        rec.statusLabel.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="flex flex-col w-full">
      <div className="w-full max-w-360 mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 py-5 sm:py-6 flex flex-col gap-8">
        {/* Top Bar: Title & Primary Actions */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2">
              <span className={`font-label-sm text-xs font-semibold tracking-widest uppercase ${
                isDark ? 'text-[#f2ca50]' : 'text-amber-800'
              }`}>
                Guardian Oversight Portal
              </span>
              <span className={isDark ? 'text-[#4d4635]' : 'text-slate-300'}>•</span>
              <span className={`font-label-sm text-xs uppercase tracking-wider ${
                isDark ? 'text-[#d0c5af]' : 'text-slate-500'
              }`}>
                Attendance Ledger
              </span>
            </div>
            <h1 className={`font-headline-lg text-3xl md:text-4xl font-bold tracking-tight ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}>
              Attendance &amp; Punctuality Records
            </h1>
            <div className="flex flex-wrap items-center gap-2 mt-1">
              <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-medium ${
                isDark ? 'bg-[#201f22] border-[#353437] text-white' : 'bg-white border-slate-200 text-slate-800 shadow-sm'
              }`}>
                <span className={`w-2 h-2 rounded-full ${isDark ? 'bg-[#f2ca50]' : 'bg-amber-600'}`}></span>
                <span className="font-semibold">Julian Vance</span>
                <span className={isDark ? 'text-[#4d4635]' : 'text-slate-300'}>|</span>
                <span className={isDark ? 'text-[#d0c5af]' : 'text-slate-600'}>Grade 11-A (Honors Track)</span>
                <span className={isDark ? 'text-[#4d4635]' : 'text-slate-300'}>|</span>
                <span className="text-emerald-600 font-semibold">AY 2026–2027</span>
              </div>
              <span className={`px-2.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider border ${
                isDark 
                  ? 'bg-[#d4af37]/20 text-[#f2ca50] border-[#d4af37]/40' 
                  : 'bg-amber-50 text-amber-900 border-amber-200'
              }`}>
                Semester 1
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button 
              type="button"
              onClick={onOpenTranscriptModal}
              className={`group flex items-center gap-2 px-4 py-2.5 rounded-xl border text-xs font-semibold transition-all duration-200 shadow-sm cursor-pointer ${
                isDark 
                  ? 'bg-[#201f22] border-[#353437] text-white hover:bg-[#2a2a2c] hover:border-[#f2ca50]/50' 
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <span className={`material-symbols-outlined text-[18px] transition-transform group-hover:scale-110 ${
                isDark ? 'text-[#f2ca50]' : 'text-amber-700'
              }`}>
                picture_as_pdf
              </span>
              <span>Official Transcript (PDF)</span>
            </button>
            <button 
              type="button"
              onClick={onOpenExcuseModal}
              className={`group flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-xs md:text-sm transition-all duration-300 shadow-md cursor-pointer ${
                isDark
                  ? 'bg-[#f2ca50] text-[#3c2f00] hover:bg-[#ffe088] shadow-[0_0_20px_rgba(242,202,80,0.25)]'
                  : 'bg-amber-700 hover:bg-amber-800 text-white'
              }`}
            >
              <span className="material-symbols-outlined text-[20px] transition-transform duration-300 group-hover:rotate-90">
                add
              </span>
              <span>Submit Medical / Leave Excuse</span>
            </button>
          </div>
        </div>

        {/* 4 Key Stat Metrics Cards with Circular SVG Meter */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Metric 1 */}
          <div className={`p-5 rounded-2xl border shadow-sm flex flex-col justify-between transition-colors ${
            isDark ? 'bg-[#1c1b1d] border-[#353437]' : 'bg-white border-slate-200/90'
          }`}>
            <div className="flex items-start justify-between">
              <div className="flex flex-col">
                <span className={`font-label-sm text-xs uppercase tracking-wider font-semibold ${
                  isDark ? 'text-[#99907c]' : 'text-slate-500'
                }`}>
                  Days Enrolled
                </span>
                <span className={`font-display text-4xl font-bold mt-1 leading-none ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}>
                  128
                </span>
              </div>
              <div className={`p-2 rounded-xl border ${
                isDark ? 'bg-[#201f22] text-[#f2ca50] border-[#353437]' : 'bg-amber-50 text-amber-700 border-amber-100'
              }`}>
                <span className="material-symbols-outlined text-[24px]">calendar_month</span>
              </div>
            </div>
            <div className={`mt-4 pt-3 flex items-center justify-between text-xs border-t ${
              isDark ? 'border-[#2a2a2c] text-[#99907c]' : 'border-slate-100 text-slate-500'
            }`}>
              <span>Active Terms: 2 of 4</span>
              <span className="text-emerald-600 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded-full">
                100% Session Sync
              </span>
            </div>
          </div>

          {/* Metric 2: Present Attended with Circular Ring */}
          <div className={`p-5 rounded-2xl border shadow-md flex flex-col justify-between transition-colors ${
            isDark ? 'bg-[#201f22] border-[#d4af37]/30' : 'bg-white border-slate-200/90'
          }`}>
            <div className="flex items-start justify-between">
              <div className="flex flex-col">
                <span className={`font-label-sm text-xs uppercase tracking-wider font-semibold ${
                  isDark ? 'text-[#f2ca50]' : 'text-amber-800'
                }`}>
                  Present Attended
                </span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className={`font-display text-4xl font-bold leading-none ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}>
                    124
                  </span>
                  <span className={`font-title-md text-base font-bold ${
                    isDark ? 'text-[#f2ca50]' : 'text-amber-700'
                  }`}>
                    96.9%
                  </span>
                </div>
              </div>
              <div className="relative w-12 h-12 shrink-0">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                  <path 
                    className={isDark ? 'text-[#2a2a2c]' : 'text-slate-100'} 
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="3.2"
                  ></path>
                  <path 
                    className={isDark ? 'text-[#f2ca50]' : 'text-amber-600'}
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeDasharray="96.9, 100" 
                    strokeLinecap="round" 
                    strokeWidth="3.2"
                  ></path>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className={`material-symbols-outlined text-[16px] ${
                    isDark ? 'text-[#f2ca50]' : 'text-amber-700'
                  }`}>
                    verified
                  </span>
                </div>
              </div>
            </div>
            <div className={`mt-4 pt-3 flex items-center justify-between text-xs border-t ${
              isDark ? 'border-[#353437] text-[#d0c5af]' : 'border-slate-100 text-slate-500'
            }`}>
              <span className="text-emerald-600 font-semibold flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">stars</span> Honors Tier Safe
              </span>
              <span className="font-semibold">&gt;90% Req.</span>
            </div>
          </div>

          {/* Metric 3 */}
          <div className={`p-5 rounded-2xl border shadow-sm flex flex-col justify-between transition-colors ${
            isDark ? 'bg-[#1c1b1d] border-[#353437]' : 'bg-white border-slate-200/90'
          }`}>
            <div className="flex items-start justify-between">
              <div className="flex flex-col">
                <span className={`font-label-sm text-xs uppercase tracking-wider font-semibold ${
                  isDark ? 'text-[#99907c]' : 'text-slate-500'
                }`}>
                  Excused Absences
                </span>
                <span className={`font-display text-4xl font-bold mt-1 leading-none ${
                  isDark ? 'text-[#e5c359]' : 'text-slate-900'
                }`}>
                  3
                </span>
              </div>
              <div className={`p-2 rounded-xl border ${
                isDark ? 'bg-[#201f22] text-[#e5c359] border-[#353437]' : 'bg-blue-50 text-blue-700 border-blue-100'
              }`}>
                <span className="material-symbols-outlined text-[24px]">assignment_turned_in</span>
              </div>
            </div>
            <div className={`mt-4 pt-3 flex items-center justify-between text-xs border-t ${
              isDark ? 'border-[#2a2a2c] text-[#99907c]' : 'border-slate-100 text-slate-500'
            }`}>
              <span>All 3 Fully Verified</span>
              <span className="text-blue-600 font-semibold bg-blue-500/10 px-2 py-0.5 rounded-full">
                Dean Approved
              </span>
            </div>
          </div>

          {/* Metric 4 */}
          <div className={`p-5 rounded-2xl border shadow-sm flex flex-col justify-between transition-colors ${
            isDark ? 'bg-[#1c1b1d] border-[#353437]' : 'bg-white border-slate-200/90'
          }`}>
            <div className="flex items-start justify-between">
              <div className="flex flex-col">
                <span className={`font-label-sm text-xs uppercase tracking-wider font-semibold ${
                  isDark ? 'text-[#99907c]' : 'text-slate-500'
                }`}>
                  Tardy / Unexcused
                </span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className={`font-display text-4xl font-bold leading-none ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}>
                    1
                  </span>
                  <span className={`text-xs ${isDark ? 'text-[#99907c]' : 'text-slate-500'}`}>Late roll</span>
                </div>
              </div>
              <div className={`p-2 rounded-xl border ${
                isDark ? 'bg-[#201f22] text-orange-400 border-[#353437]' : 'bg-orange-50 text-orange-700 border-orange-100'
              }`}>
                <span className="material-symbols-outlined text-[24px]">schedule</span>
              </div>
            </div>
            <div className={`mt-4 pt-3 flex items-center justify-between text-xs border-t ${
              isDark ? 'border-[#2a2a2c] text-[#99907c]' : 'border-slate-100 text-slate-500'
            }`}>
              <span className="text-emerald-600 font-semibold">0 Unexcused truancies</span>
              <span className={isDark ? 'text-[#d0c5af]' : 'text-slate-500'}>Good Standing</span>
            </div>
          </div>
        </div>

        {/* Main Content Area: Heatmap & Side Panel Layout */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
          {/* Calendar & Interactive Heatmap (8 Cols) */}
          <div className="xl:col-span-8 flex flex-col gap-6">
            <div className={`p-6 rounded-2xl border shadow-sm transition-colors ${
              isDark ? 'bg-[#1c1b1d] border-[#353437]' : 'bg-white border-slate-200'
            }`}>
              {/* Month Switcher & Filter Pills */}
              <div className={`flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-5 border-b ${
                isDark ? 'border-[#2a2a2c]' : 'border-slate-100'
              }`}>
                <div className="flex items-center gap-2">
                  <button 
                    aria-label="Previous Month" 
                    className={`p-2 rounded-xl transition-colors cursor-pointer ${
                      isDark ? 'bg-[#201f22] text-[#d0c5af] hover:bg-[#2a2a2c]' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[20px]">chevron_left</span>
                  </button>
                  <div className="flex items-center gap-2 px-2">
                    <span className={`material-symbols-outlined text-[20px] ${
                      isDark ? 'text-[#f2ca50]' : 'text-amber-800'
                    }`}>
                      calendar_today
                    </span>
                    <span className={`font-title-md text-base font-bold tracking-tight ${
                      isDark ? 'text-white' : 'text-slate-900'
                    }`}>
                      October 2026
                    </span>
                  </div>
                  <button 
                    aria-label="Next Month" 
                    className={`p-2 rounded-xl transition-colors cursor-pointer ${
                      isDark ? 'bg-[#201f22] text-[#d0c5af] hover:bg-[#2a2a2c]' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[20px]">chevron_right</span>
                  </button>
                </div>

                {/* Filter Pills */}
                <div className={`flex flex-wrap items-center gap-1 p-1 rounded-xl border ${
                  isDark ? 'bg-[#0e0e10] border-[#353437]' : 'bg-slate-100 border-slate-200/60'
                }`}>
                  <button 
                    onClick={() => setFilterType('all')}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer ${
                      filterType === 'all'
                        ? isDark ? 'bg-[#f2ca50] text-[#3c2f00] shadow-sm' : 'bg-white text-slate-900 shadow-sm'
                        : isDark ? 'text-[#d0c5af] hover:text-white' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    All Days
                  </button>
                  <button 
                    onClick={() => setFilterType('present')}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer ${
                      filterType === 'present'
                        ? isDark ? 'bg-[#f2ca50] text-[#3c2f00] shadow-sm' : 'bg-white text-slate-900 shadow-sm'
                        : isDark ? 'text-[#d0c5af] hover:text-white' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Present (20)
                  </button>
                  <button 
                    onClick={() => setFilterType('excused')}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer ${
                      filterType === 'excused'
                        ? isDark ? 'bg-[#f2ca50] text-[#3c2f00] shadow-sm' : 'bg-white text-slate-900 shadow-sm'
                        : isDark ? 'text-[#d0c5af] hover:text-white' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Excused (1)
                  </button>
                  <button 
                    onClick={() => setFilterType('tardy')}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer ${
                      filterType === 'tardy'
                        ? isDark ? 'bg-[#f2ca50] text-[#3c2f00] shadow-sm' : 'bg-white text-slate-900 shadow-sm'
                        : isDark ? 'text-[#d0c5af] hover:text-white' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Tardy (1)
                  </button>
                </div>
              </div>

              {/* Calendar Header */}
              <div className={`grid grid-cols-5 gap-2 pt-4 pb-2 text-center text-xs font-semibold uppercase tracking-wider ${
                isDark ? 'text-[#99907c]' : 'text-slate-400'
              }`}>
                <div>Mon</div>
                <div>Tue</div>
                <div>Wed</div>
                <div>Thu</div>
                <div>Fri</div>
              </div>

              {/* Calendar Heatmap Grid */}
              <div className="grid grid-cols-5 gap-2.5 pt-2">
                {/* Week 1 */}
                <div className={`p-3 rounded-xl border flex flex-col justify-between min-h-24 transition-colors ${
                  isDark ? 'bg-[#201f22]/50 border-[#2a2a2c]' : 'bg-slate-50/70 border-slate-200/80'
                }`}>
                  <div className="flex items-center justify-between text-xs">
                    <span className={isDark ? 'text-[#4d4635]' : 'text-slate-400'}>Sep 28</span>
                    <span className={`text-[10px] ${isDark ? 'text-[#4d4635]' : 'text-slate-400'}`}>Prev</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/10 text-emerald-600 font-semibold border border-emerald-500/20">
                      Present (6/6)
                    </span>
                    <div className="flex gap-1">
                      {[1,2,3,4,5,6].map(i => (
                        <span key={i} className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className={`p-3 rounded-xl border flex flex-col justify-between min-h-24 transition-colors ${
                  isDark ? 'bg-[#201f22]/50 border-[#2a2a2c]' : 'bg-slate-50/70 border-slate-200/80'
                }`}>
                  <div className="flex items-center justify-between text-xs">
                    <span className={isDark ? 'text-[#4d4635]' : 'text-slate-400'}>Sep 29</span>
                    <span className={`text-[10px] ${isDark ? 'text-[#4d4635]' : 'text-slate-400'}`}>Prev</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/10 text-emerald-600 font-semibold border border-emerald-500/20">
                      Present (6/6)
                    </span>
                    <div className="flex gap-1">
                      {[1,2,3,4,5,6].map(i => (
                        <span key={i} className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className={`p-3 rounded-xl border flex flex-col justify-between min-h-24 transition-colors ${
                  isDark ? 'bg-[#201f22]/50 border-[#2a2a2c]' : 'bg-slate-50/70 border-slate-200/80'
                }`}>
                  <div className="flex items-center justify-between text-xs">
                    <span className={isDark ? 'text-[#4d4635]' : 'text-slate-400'}>Sep 30</span>
                    <span className={`text-[10px] ${isDark ? 'text-[#4d4635]' : 'text-slate-400'}`}>Prev</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/10 text-emerald-600 font-semibold border border-emerald-500/20">
                      Present (6/6)
                    </span>
                    <div className="flex gap-1">
                      {[1,2,3,4,5,6].map(i => (
                        <span key={i} className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className={`p-3 rounded-xl border flex flex-col justify-between min-h-24 transition-all cursor-pointer ${
                  isDark ? 'bg-[#201f22] border-[#353437] hover:border-[#f2ca50]' : 'bg-white border-slate-200 hover:border-amber-300 shadow-sm'
                }`}>
                  <div className="flex items-center justify-between text-xs">
                    <span className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>Oct 01</span>
                    <span className="material-symbols-outlined text-[15px] text-emerald-600">check_circle</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/10 text-emerald-600 font-semibold border border-emerald-500/20">
                      Present (6/6)
                    </span>
                    <div className="flex gap-1">
                      {[1,2,3,4,5,6].map(i => (
                        <span key={i} className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className={`p-3 rounded-xl border flex flex-col justify-between min-h-24 transition-all cursor-pointer ${
                  isDark ? 'bg-[#201f22] border-[#353437] hover:border-[#f2ca50]' : 'bg-white border-slate-200 hover:border-amber-300 shadow-sm'
                }`}>
                  <div className="flex items-center justify-between text-xs">
                    <span className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>Oct 02</span>
                    <span className="material-symbols-outlined text-[15px] text-emerald-600">check_circle</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/10 text-emerald-600 font-semibold border border-emerald-500/20">
                      Present (6/6)
                    </span>
                    <div className="flex gap-1">
                      {[1,2,3,4,5,6].map(i => (
                        <span key={i} className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Week 2 */}
                <div className={`p-3 rounded-xl border flex flex-col justify-between min-h-24 transition-all cursor-pointer ${
                  isDark ? 'bg-[#201f22] border-[#353437] hover:border-[#f2ca50]' : 'bg-white border-slate-200 hover:border-amber-300 shadow-sm'
                }`}>
                  <div className="flex items-center justify-between text-xs">
                    <span className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>Oct 05</span>
                    <span className="material-symbols-outlined text-[15px] text-emerald-600">check_circle</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/10 text-emerald-600 font-semibold border border-emerald-500/20">
                      Present (6/6)
                    </span>
                    <div className="flex gap-1">
                      {[1,2,3,4,5,6].map(i => (
                        <span key={i} className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className={`p-3 rounded-xl border flex flex-col justify-between min-h-24 transition-all cursor-pointer ${
                  isDark ? 'bg-[#201f22] border-[#353437] hover:border-[#f2ca50]' : 'bg-white border-slate-200 hover:border-amber-300 shadow-sm'
                }`}>
                  <div className="flex items-center justify-between text-xs">
                    <span className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>Oct 06</span>
                    <span className="material-symbols-outlined text-[15px] text-emerald-600">check_circle</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/10 text-emerald-600 font-semibold border border-emerald-500/20">
                      Present (6/6)
                    </span>
                    <div className="flex gap-1">
                      {[1,2,3,4,5,6].map(i => (
                        <span key={i} className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* TARDY DAY: Oct 07 */}
                <div 
                  onClick={() => setInspectData({
                    title: "Late Entry Verification • Oct 07, 2024",
                    date: "Oct 07, 2024",
                    status: "tardy",
                    verifiedBy: "Dean Harrison",
                    role: "Upper School Dean & Homeroom Proctor",
                    notes: "Julian arrived at 08:48 AM due to regional train system technical delay. Period 1 Calculus entry excused by homeroom master. Academic status in good standing.",
                    timestamp: "08:48:22 AM PST"
                  })}
                  className={`p-3 rounded-xl border flex flex-col justify-between min-h-24 transition-all cursor-pointer ${
                    isDark ? 'bg-orange-950/20 border-orange-500/40' : 'bg-orange-50/70 border-orange-200 hover:border-orange-300'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-orange-600">Oct 07</span>
                    <span className="material-symbols-outlined text-[15px] text-orange-600">schedule</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="px-2 py-0.5 rounded text-[10px] bg-orange-500/15 text-orange-600 font-semibold border border-orange-500/30">
                      Tardy (P1 late)
                    </span>
                    <div className="flex gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-orange-500" title="P1 Late"></span>
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    </div>
                  </div>
                </div>

                <div className={`p-3 rounded-xl border flex flex-col justify-between min-h-24 transition-all cursor-pointer ${
                  isDark ? 'bg-[#201f22] border-[#353437] hover:border-[#f2ca50]' : 'bg-white border-slate-200 hover:border-amber-300 shadow-sm'
                }`}>
                  <div className="flex items-center justify-between text-xs">
                    <span className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>Oct 08</span>
                    <span className="material-symbols-outlined text-[15px] text-emerald-600">check_circle</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/10 text-emerald-600 font-semibold border border-emerald-500/20">
                      Present (6/6)
                    </span>
                    <div className="flex gap-1">
                      {[1,2,3,4,5,6].map(i => (
                        <span key={i} className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className={`p-3 rounded-xl border flex flex-col justify-between min-h-24 transition-all cursor-pointer ${
                  isDark ? 'bg-[#201f22] border-[#353437] hover:border-[#f2ca50]' : 'bg-white border-slate-200 hover:border-amber-300 shadow-sm'
                }`}>
                  <div className="flex items-center justify-between text-xs">
                    <span className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>Oct 09</span>
                    <span className="material-symbols-outlined text-[15px] text-emerald-600">check_circle</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/10 text-emerald-600 font-semibold border border-emerald-500/20">
                      Present (6/6)
                    </span>
                    <div className="flex gap-1">
                      {[1,2,3,4,5,6].map(i => (
                        <span key={i} className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Week 3 */}
                <div className={`p-3 rounded-xl border flex flex-col justify-between min-h-24 transition-all cursor-pointer ${
                  isDark ? 'bg-[#201f22] border-[#353437] hover:border-[#f2ca50]' : 'bg-white border-slate-200 hover:border-amber-300 shadow-sm'
                }`}>
                  <div className="flex items-center justify-between text-xs">
                    <span className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>Oct 12</span>
                    <span className="material-symbols-outlined text-[15px] text-emerald-600">check_circle</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/10 text-emerald-600 font-semibold border border-emerald-500/20">
                      Present (6/6)
                    </span>
                    <div className="flex gap-1">
                      {[1,2,3,4,5,6].map(i => (
                        <span key={i} className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className={`p-3 rounded-xl border flex flex-col justify-between min-h-24 transition-all cursor-pointer ${
                  isDark ? 'bg-[#201f22] border-[#353437] hover:border-[#f2ca50]' : 'bg-white border-slate-200 hover:border-amber-300 shadow-sm'
                }`}>
                  <div className="flex items-center justify-between text-xs">
                    <span className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>Oct 13</span>
                    <span className="material-symbols-outlined text-[15px] text-emerald-600">check_circle</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/10 text-emerald-600 font-semibold border border-emerald-500/20">
                      Present (6/6)
                    </span>
                    <div className="flex gap-1">
                      {[1,2,3,4,5,6].map(i => (
                        <span key={i} className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* EXCUSED ABSENCE DAY: Oct 14 */}
                <div 
                  onClick={() => setInspectData({
                    title: "Excused Medical Leave • Oct 14, 2024",
                    date: "Oct 14, 2024",
                    status: "excused",
                    verifiedBy: "Dr. Aris Thorne",
                    role: "Attending Pediatric Specialist & Upper School Health Liaison",
                    notes: "Scheduled Specialist Orthodontic Surgery and rehabilitation rest. Medical clearance note on file with Registrar Office. All homework dossiers uploaded to portal.",
                    timestamp: "07:30:15 AM PST"
                  })}
                  className={`p-3 rounded-xl border flex flex-col justify-between min-h-24 transition-all cursor-pointer ${
                    isDark ? 'bg-blue-950/20 border-blue-500/40' : 'bg-blue-50/70 border-blue-200 hover:border-blue-300'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-blue-600">Oct 14</span>
                    <span className="material-symbols-outlined text-[15px] text-blue-600">medical_services</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="px-2 py-0.5 rounded text-[10px] bg-blue-500/15 text-blue-600 font-semibold border border-blue-500/30">
                      Excused Leave
                    </span>
                    <div className="flex gap-1">
                      {[1,2,3,4,5,6].map(i => (
                        <span key={i} className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className={`p-3 rounded-xl border flex flex-col justify-between min-h-24 transition-all cursor-pointer ${
                  isDark ? 'bg-[#201f22] border-[#353437] hover:border-[#f2ca50]' : 'bg-white border-slate-200 hover:border-amber-300 shadow-sm'
                }`}>
                  <div className="flex items-center justify-between text-xs">
                    <span className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>Oct 15</span>
                    <span className="material-symbols-outlined text-[15px] text-emerald-600">check_circle</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/10 text-emerald-600 font-semibold border border-emerald-500/20">
                      Present (6/6)
                    </span>
                    <div className="flex gap-1">
                      {[1,2,3,4,5,6].map(i => (
                        <span key={i} className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className={`p-3 rounded-xl border flex flex-col justify-between min-h-24 transition-all cursor-pointer ${
                  isDark ? 'bg-[#201f22] border-[#353437] hover:border-[#f2ca50]' : 'bg-white border-slate-200 hover:border-amber-300 shadow-sm'
                }`}>
                  <div className="flex items-center justify-between text-xs">
                    <span className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>Oct 16</span>
                    <span className="material-symbols-outlined text-[15px] text-emerald-600">check_circle</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/10 text-emerald-600 font-semibold border border-emerald-500/20">
                      Present (6/6)
                    </span>
                    <div className="flex gap-1">
                      {[1,2,3,4,5,6].map(i => (
                        <span key={i} className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Week 4 */}
                <div className={`p-3 rounded-xl border flex flex-col justify-between min-h-24 transition-all cursor-pointer ${
                  isDark ? 'bg-[#201f22] border-[#353437] hover:border-[#f2ca50]' : 'bg-white border-slate-200 hover:border-amber-300 shadow-sm'
                }`}>
                  <div className="flex items-center justify-between text-xs">
                    <span className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>Oct 19</span>
                    <span className="material-symbols-outlined text-[15px] text-emerald-600">check_circle</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/10 text-emerald-600 font-semibold border border-emerald-500/20">
                      Present (6/6)
                    </span>
                    <div className="flex gap-1">
                      {[1,2,3,4,5,6].map(i => (
                        <span key={i} className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className={`p-3 rounded-xl border flex flex-col justify-between min-h-24 transition-all cursor-pointer ${
                  isDark ? 'bg-[#201f22] border-[#353437] hover:border-[#f2ca50]' : 'bg-white border-slate-200 hover:border-amber-300 shadow-sm'
                }`}>
                  <div className="flex items-center justify-between text-xs">
                    <span className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>Oct 20</span>
                    <span className="material-symbols-outlined text-[15px] text-emerald-600">check_circle</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/10 text-emerald-600 font-semibold border border-emerald-500/20">
                      Present (6/6)
                    </span>
                    <div className="flex gap-1">
                      {[1,2,3,4,5,6].map(i => (
                        <span key={i} className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* TODAY: Oct 21 */}
                <div className={`p-3 rounded-xl border-2 flex flex-col justify-between min-h-24 relative overflow-hidden transition-all cursor-pointer shadow-md ${
                  isDark 
                    ? 'bg-[#201f22] border-[#f2ca50]' 
                    : 'bg-amber-50/70 border-amber-400'
                }`}>
                  <div className={`absolute top-0 right-0 px-2 py-0.5 rounded-bl text-[9px] uppercase tracking-wider font-bold ${
                    isDark ? 'bg-[#f2ca50] text-[#3c2f00]' : 'bg-amber-600 text-white'
                  }`}>
                    Today
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className={`font-bold ${isDark ? 'text-[#f2ca50]' : 'text-amber-900'}`}>Oct 21</span>
                    <span className="material-symbols-outlined text-[15px] text-amber-600 animate-pulse">radio_button_checked</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                      isDark ? 'bg-[#d4af37]/20 text-[#f2ca50] border-[#d4af37]/30' : 'bg-amber-200/70 text-amber-900 border-amber-300'
                    }`}>
                      Active Session
                    </span>
                    <div className="flex gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" title="P1: Present"></span>
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" title="P2: Present"></span>
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" title="P3: Present"></span>
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" title="P4: Present"></span>
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400" title="P5: In Progress"></span>
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-300" title="P6: Scheduled"></span>
                    </div>
                  </div>
                </div>

                <div className={`p-3 rounded-xl border flex flex-col justify-between min-h-24 ${
                  isDark ? 'bg-[#151517] border-[#2a2a2c] text-[#4d4635]' : 'bg-slate-50 border-slate-200/60 text-slate-400'
                }`}>
                  <span className="text-xs">Oct 22</span>
                  <span className="text-[11px] font-medium">Scheduled</span>
                </div>

                <div className={`p-3 rounded-xl border flex flex-col justify-between min-h-24 ${
                  isDark ? 'bg-[#151517] border-[#2a2a2c] text-[#4d4635]' : 'bg-slate-50 border-slate-200/60 text-slate-400'
                }`}>
                  <span className="text-xs">Oct 23</span>
                  <span className="text-[11px] font-medium">Scheduled</span>
                </div>
              </div>

              {/* Calendar Footer Legend */}
              <div className={`flex flex-wrap items-center justify-between gap-4 pt-5 mt-5 border-t text-xs ${
                isDark ? 'border-[#2a2a2c] text-[#99907c]' : 'border-slate-100 text-slate-600'
              }`}>
                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                    <span>Present (All Sessions)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
                    <span>Excused Leave</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-orange-500"></span>
                    <span>Tardy</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
                    <span>Unexcused (None)</span>
                  </div>
                </div>
                <div className="font-label-sm text-[11px]">
                  *Daily roll syncs at 08:30 AM &amp; 03:45 PM
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Academy Policy & Pending Leave Status (4 Cols) */}
          <div className="xl:col-span-4 flex flex-col gap-6">
            {/* Attendance Policy Meter Card */}
            <div className={`p-6 rounded-2xl border shadow-sm flex flex-col gap-4 transition-colors ${
              isDark ? 'bg-[#1c1b1d] border-[#353437]' : 'bg-white border-slate-200'
            }`}>
              <div className="flex items-center justify-between">
                <h2 className={`font-headline-sm text-base md:text-lg font-bold ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}>
                  Honors Attendance Policy
                </h2>
                <span className={`material-symbols-outlined text-[20px] ${
                  isDark ? 'text-[#f2ca50]' : 'text-amber-800'
                }`}>
                  policy
                </span>
              </div>
              <p className={`text-xs leading-relaxed ${isDark ? 'text-[#d0c5af]' : 'text-slate-600'}`}>
                Aetheria Academic Charter stipulates a minimum <strong className={isDark ? 'text-white' : 'text-slate-900'}>90.0% attendance threshold</strong> to maintain Dean’s Honors and AP Exam endorsements.
              </p>

              {/* Gauge Indicator */}
              <div className="flex flex-col gap-2 pt-1">
                <div className="flex justify-between items-baseline text-xs">
                  <span className={`font-semibold flex items-center gap-1 ${isDark ? 'text-white' : 'text-slate-800'}`}>
                    Julian's Rate: <span className={`font-bold text-sm ${isDark ? 'text-[#f2ca50]' : 'text-amber-700'}`}>96.9%</span>
                  </span>
                  <span className="text-emerald-600 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded-full">
                    +6.9% above min
                  </span>
                </div>
                <div className={`w-full h-3 rounded-full overflow-hidden relative border ${
                  isDark ? 'bg-[#2a2a2c] border-[#353437]' : 'bg-slate-100 border-slate-200'
                }`}>
                  <div 
                    className={`h-full rounded-full transition-all duration-700 ${
                      isDark ? 'bg-[#f2ca50]' : 'bg-amber-600'
                    }`}
                    style={{ width: '96.9%' }}
                  ></div>
                  {/* 90% benchmark marker line */}
                  <div 
                    className="absolute top-0 bottom-0 left-[90%] w-0.5 bg-slate-800 shadow-sm"
                    title="90% Threshold"
                  ></div>
                </div>
                <div className={`flex justify-between text-[10px] font-semibold pt-0.5 ${
                  isDark ? 'text-[#99907c]' : 'text-slate-400'
                }`}>
                  <span>85% Warning</span>
                  <span className={isDark ? 'text-[#f2ca50]' : 'text-amber-800'}>90% Benchmark</span>
                  <span>100% Exemplary</span>
                </div>
              </div>

              <div className={`p-4 rounded-xl border flex items-start gap-3 mt-1 ${
                isDark ? 'bg-[#201f22] border-[#353437]' : 'bg-amber-50/70 border-amber-200/70'
              }`}>
                <span className={`material-symbols-outlined text-[20px] shrink-0 mt-0.5 ${
                  isDark ? 'text-[#f2ca50]' : 'text-amber-800'
                }`}>
                  verified_user
                </span>
                <div className="flex flex-col">
                  <span className={`font-title-sm text-xs font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    Safe Honors Tier
                  </span>
                  <span className={`text-[11px] leading-relaxed ${isDark ? 'text-[#d0c5af]' : 'text-slate-600'}`}>
                    Julian qualifies for early exam privileges and the Semester 1 Academic Merit citation.
                  </span>
                </div>
              </div>
            </div>

            {/* Leave & Excuse Queue */}
            <div className={`p-6 rounded-2xl border shadow-sm flex flex-col gap-4 transition-colors ${
              isDark ? 'bg-[#1c1b1d] border-[#353437]' : 'bg-white border-slate-200'
            }`}>
              <div className="flex items-center justify-between">
                <h3 className={`font-headline-sm text-base md:text-lg font-bold ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}>
                  Leave &amp; Excuse Queue
                </h3>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
                  isDark ? 'bg-[#d4af37]/20 text-[#f2ca50] border-[#d4af37]/40' : 'bg-amber-100 text-amber-900 border-amber-200'
                }`}>
                  {leaveQueue.filter(l => l.status === 'Under Review').length} Pending
                </span>
              </div>

              <div className="flex flex-col gap-3">
                {leaveQueue.map((item) => (
                  <div 
                    key={item.id}
                    className={`p-4 rounded-xl border flex flex-col gap-2 ${
                      item.status === 'Under Review'
                        ? isDark ? 'bg-[#201f22] border-[#353437]' : 'bg-slate-50 border-slate-200'
                        : isDark ? 'bg-[#151517] border-[#2a2a2c]' : 'bg-white border-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className={`px-2 py-0.5 rounded font-semibold border text-[11px] ${
                        item.status === 'Under Review'
                          ? isDark ? 'bg-[#d4af37]/20 text-[#f2ca50] border-[#d4af37]/30' : 'bg-amber-100 text-amber-900 border-amber-200'
                          : 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20'
                      }`}>
                        {item.status}
                      </span>
                      <span className={`text-[11px] font-mono ${isDark ? 'text-[#99907c]' : 'text-slate-400'}`}>
                        {item.trackingNumber}
                      </span>
                    </div>
                    <div className={`font-semibold text-xs md:text-sm mt-0.5 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      {item.title}
                    </div>
                    <span className={`text-xs ${isDark ? 'text-[#d0c5af]' : 'text-slate-600'}`}>
                      Dates: {item.dates}
                    </span>
                    <div className={`flex items-center justify-between pt-2 border-t text-[11px] ${
                      isDark ? 'border-[#2a2a2c] text-[#99907c]' : 'border-slate-200/60 text-slate-400'
                    }`}>
                      <span>Submitted: {item.submittedDate}</span>
                      <span className={item.status === 'Under Review' ? (isDark ? 'text-[#f2ca50]' : 'text-amber-800') : 'text-emerald-600'}>
                        {item.assignedStaff}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <button 
                type="button"
                onClick={onOpenExcuseModal}
                className={`w-full py-2.5 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer ${
                  isDark 
                    ? 'bg-[#201f22] border-[#353437] text-white hover:bg-[#2a2a2c] hover:text-[#f2ca50]' 
                    : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200/80 hover:text-slate-900'
                }`}
              >
                <span className="material-symbols-outlined text-[16px]">history_edu</span>
                <span>Review Full Leave Ledger</span>
              </button>
            </div>

            {/* Attendance Registrar Liaison */}
            <div className={`p-4 rounded-2xl border shadow-sm flex items-center gap-3.5 transition-colors ${
              isDark ? 'bg-[#1c1b1d] border-[#353437]' : 'bg-white border-slate-200'
            }`}>
              <img 
                alt="Ms. Clara Oswald"
                className={`w-12 h-12 rounded-full object-cover shrink-0 ring-2 ${
                  isDark ? 'ring-[#f2ca50]/20' : 'ring-amber-500/20'
                }`}
                src={ASSETS.msClaraOswaldAvatar}
                referrerPolicy="no-referrer"
              />
              <div className="flex flex-col min-w-0">
                <span className={`font-label-sm text-[10px] uppercase tracking-wider font-semibold ${
                  isDark ? 'text-[#f2ca50]' : 'text-amber-800'
                }`}>
                  Attendance Registrar
                </span>
                <span className={`font-title-sm text-xs md:text-sm font-bold truncate ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}>
                  Ms. Clara Oswald
                </span>
                <span className={`text-xs truncate ${isDark ? 'text-[#d0c5af]' : 'text-slate-500'}`}>
                  registrar@aetheria.edu • Ext 402
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Detailed Attendance History Log (Data Table) */}
        <div className={`p-6 rounded-2xl border shadow-sm flex flex-col gap-5 transition-colors ${
          isDark ? 'bg-[#1c1b1d] border-[#353437]' : 'bg-white border-slate-200'
        }`}>
          <div className={`flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-2 border-b ${
            isDark ? 'border-[#2a2a2c]' : 'border-slate-100'
          }`}>
            <div className="flex flex-col">
              <h2 className={`font-headline-md text-lg md:text-xl font-bold ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}>
                Detailed Attendance History Log
              </h2>
              <span className={`text-xs ${isDark ? 'text-[#d0c5af]' : 'text-slate-500'}`}>
                Per-period ledger verified by Department of Academic Records
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
              <div className="relative flex-1 md:w-64">
                <span className={`material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[18px] ${
                  isDark ? 'text-[#99907c]' : 'text-slate-400'
                }`}>
                  search
                </span>
                <input 
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by reason, date, or staff..."
                  className={`w-full pl-9 pr-4 py-2 rounded-xl border text-xs focus:outline-none transition-colors ${
                    isDark 
                      ? 'bg-[#201f22] border-[#353437] text-white focus:border-[#f2ca50]' 
                      : 'bg-slate-50 border-slate-200 text-slate-800 focus:border-amber-600 focus:bg-white'
                  }`}
                />
              </div>
              <button 
                type="button"
                onClick={() => setSearchQuery('')}
                className={`px-4 py-2 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                  isDark 
                    ? 'bg-[#201f22] border-[#353437] text-[#d0c5af] hover:text-white' 
                    : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <span className="material-symbols-outlined text-[16px]">tune</span>
                <span>Reset</span>
              </button>
            </div>
          </div>

          {/* Data Table */}
          <div className="w-full overflow-x-auto">
            <table className="w-full text-left font-body-md text-xs border-collapse">
              <thead>
                <tr className={`uppercase text-[11px] tracking-wider border-y ${
                  isDark ? 'bg-[#201f22] text-[#99907c] border-[#2a2a2c]' : 'bg-slate-50 text-slate-500 border-slate-200'
                }`}>
                  <th className="py-3 px-4">Date &amp; Day</th>
                  <th className="py-3 px-4">Status Badge</th>
                  <th className="py-3 px-4">Periods</th>
                  <th className="py-3 px-4">Remarks / Authorized Excuse</th>
                  <th className="py-3 px-4">Verified Official</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className={`divide-y ${isDark ? 'divide-[#2a2a2c]' : 'divide-slate-100'}`}>
                {filteredRecords.map((row) => (
                  <tr 
                    key={row.id} 
                    className={`transition-colors ${
                      isDark ? 'hover:bg-[#201f22]/60' : 'hover:bg-slate-50/70'
                    }`}
                  >
                    <td className="py-4 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-2.5">
                        {row.date.includes('Oct 21') ? (
                          <span className={`w-2 h-2 rounded-full animate-ping ${isDark ? 'bg-[#f2ca50]' : 'bg-amber-600'}`}></span>
                        ) : null}
                        <div className="flex flex-col">
                          <span className={`font-semibold text-xs md:text-sm ${isDark ? 'text-white' : 'text-slate-900'}`}>
                            {row.date}
                          </span>
                          <span className={`text-[11px] ${
                            row.date.includes('Oct 21') 
                              ? isDark ? 'text-[#f2ca50]' : 'text-amber-800' 
                              : isDark ? 'text-[#99907c]' : 'text-slate-400'
                          }`}>
                            {row.dayName}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${
                        row.status === 'present'
                          ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20'
                          : row.status === 'excused'
                            ? 'bg-blue-500/10 text-blue-600 border-blue-500/20'
                            : 'bg-orange-500/10 text-orange-600 border-orange-500/20'
                      }`}>
                        <span className="material-symbols-outlined text-[14px]">
                          {row.status === 'present' ? 'check' : row.status === 'excused' ? 'medical_services' : 'schedule'}
                        </span>
                        {row.statusLabel}
                      </span>
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap font-medium">
                      <div className="flex items-center gap-1.5">
                        <span className={isDark ? 'text-white' : 'text-slate-900'}>{row.periodsCompleted}</span>
                        <span className={`text-[11px] ${isDark ? 'text-[#99907c]' : 'text-slate-400'}`}>{row.periodsDetail}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 max-w-xs">
                      <div className="flex flex-col">
                        <span className={isDark ? 'text-[#e5e1e4]' : 'text-slate-800'}>{row.remarks}</span>
                        {row.attachmentName && (
                          <span className={`text-[11px] font-mono mt-0.5 ${isDark ? 'text-[#f2ca50]' : 'text-amber-800'}`}>
                            Attachment: {row.attachmentName}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap">
                      <div className="flex flex-col">
                        <span className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                          {row.verifiedOfficial}
                        </span>
                        <span className={`text-[11px] ${isDark ? 'text-[#99907c]' : 'text-slate-400'}`}>
                          {row.officialRole}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-right whitespace-nowrap">
                      <button 
                        onClick={() => setInspectData({
                          title: `Attendance Audit • ${row.date}`,
                          date: row.date,
                          status: row.status as 'present' | 'tardy' | 'excused' | 'unexcused',
                          verifiedBy: row.verifiedOfficial,
                          role: row.officialRole,
                          notes: `Official Registrar Remark: ${row.remarks}`,
                          timestamp: '08:30:00 AM PST (Roll Sync)'
                        })}
                        className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                          isDark ? 'text-[#d0c5af] hover:text-[#f2ca50] hover:bg-[#201f22]' : 'text-slate-400 hover:text-slate-700 hover:bg-slate-100'
                        }`}
                        title="View Period Breakdown"
                      >
                        <span className="material-symbols-outlined text-[18px]">visibility</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className={`flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t text-xs ${
            isDark ? 'border-[#2a2a2c] text-[#99907c]' : 'border-slate-100 text-slate-500'
          }`}>
            <span>
              Displaying <span className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>1 – {filteredRecords.length}</span> of <span className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>128</span> entries
            </span>
            <div className="flex items-center gap-1.5">
              <button 
                type="button"
                className={`px-3 py-1.5 rounded-lg border text-xs font-semibold cursor-pointer ${
                  isDark ? 'bg-[#201f22] border-[#353437] text-white hover:bg-[#2a2a2c]' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                Previous
              </button>
              <button 
                type="button"
                className={`w-8 h-8 rounded-lg text-xs font-bold flex items-center justify-center shadow-sm ${
                  isDark ? 'bg-[#f2ca50] text-[#3c2f00]' : 'bg-amber-700 text-white'
                }`}
              >
                1
              </button>
              <button 
                type="button"
                className={`w-8 h-8 rounded-lg border text-xs font-medium flex items-center justify-center cursor-pointer ${
                  isDark ? 'bg-[#201f22] border-[#353437] text-white' : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                2
              </button>
              <button 
                type="button"
                className={`w-8 h-8 rounded-lg border text-xs font-medium flex items-center justify-center cursor-pointer ${
                  isDark ? 'bg-[#201f22] border-[#353437] text-white' : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                3
              </button>
              <span className="px-1 text-slate-400">...</span>
              <button 
                type="button"
                className={`w-8 h-8 rounded-lg border text-xs font-medium flex items-center justify-center cursor-pointer ${
                  isDark ? 'bg-[#201f22] border-[#353437] text-white' : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                26
              </button>
              <button 
                type="button"
                className={`px-3 py-1.5 rounded-lg border text-xs font-semibold cursor-pointer ${
                  isDark ? 'bg-[#201f22] border-[#353437] text-white hover:bg-[#2a2a2c]' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                Next
              </button>
            </div>
          </div>
        </div>

        {/* Campus Life & Wellness Context Strip */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className={`p-5 rounded-2xl border shadow-sm flex items-center gap-4 transition-colors ${
            isDark ? 'bg-[#1c1b1d] border-[#353437]' : 'bg-white border-slate-200/90'
          }`}>
            <img 
              alt="Aetheria Health Center Protocol"
              className="w-20 h-20 rounded-xl object-cover shrink-0 border border-slate-200/50 shadow-sm"
              src={ASSETS.modernLibraryPod}
              referrerPolicy="no-referrer"
            />
            <div className="flex flex-col gap-1">
              <span className={`font-label-sm text-[10px] uppercase tracking-wider font-semibold ${
                isDark ? 'text-[#f2ca50]' : 'text-amber-800'
              }`}>
                Health &amp; Wellness Liaison
              </span>
              <h4 className={`font-title-sm text-sm md:text-base font-bold ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}>
                Aetheria Health Center Protocol
              </h4>
              <p className={`text-xs line-clamp-2 leading-relaxed ${
                isDark ? 'text-[#d0c5af]' : 'text-slate-600'
              }`}>
                Medical leaves extending past 48 hours automatically alert the campus nurse practitioner for academic accommodation plans.
              </p>
            </div>
          </div>

          <div className={`p-5 rounded-2xl border shadow-sm flex items-center gap-4 transition-colors ${
            isDark ? 'bg-[#1c1b1d] border-[#353437]' : 'bg-white border-slate-200/90'
          }`}>
            <img 
              alt="Automated Gate Notification"
              className="w-20 h-20 rounded-xl object-cover shrink-0 border border-slate-200/50 shadow-sm"
              src={ASSETS.campusTwilightExterior}
              referrerPolicy="no-referrer"
            />
            <div className="flex flex-col gap-1">
              <span className={`font-label-sm text-[10px] uppercase tracking-wider font-semibold ${
                isDark ? 'text-[#e5c359]' : 'text-amber-800'
              }`}>
                Automated Gate Notification
              </span>
              <h4 className={`font-title-sm text-sm md:text-base font-bold ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}>
                Secure Guardian SMS &amp; App Push
              </h4>
              <p className={`text-xs line-clamp-2 leading-relaxed ${
                isDark ? 'text-[#d0c5af]' : 'text-slate-600'
              }`}>
                Electronic campus turnstile roll confirms student arrival instantly. Daily departure clearance opens at 03:30 PM.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Attendance Record Inspection Modal */}
      <AttendanceDetailModal
        isOpen={!!inspectData}
        onClose={() => setInspectData(null)}
        theme={theme}
        data={inspectData}
      />
    </div>
  );
};
