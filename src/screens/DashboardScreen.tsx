import React, { useState } from 'react';
import { TabType, ThemeMode } from '../types';
import { ASSETS, COURSES_DATA } from '../data/mockData';

interface DashboardScreenProps {
  theme: ThemeMode;
  onNavigateTab: (tab: TabType) => void;
  onOpenScheduleConference: () => void;
  onOpenMessageMentor: () => void;
  onOpenTranscript: () => void;
  onSelectTeacherForCommendation: (teacherName: string) => void;
}

export const DashboardScreen: React.FC<DashboardScreenProps> = ({
  theme,
  onNavigateTab,
  onOpenScheduleConference,
  onOpenMessageMentor,
  onOpenTranscript,
  onSelectTeacherForCommendation
}) => {
  const [sortOption, setSortOption] = useState<'weight' | 'score' | 'alpha'>('weight');
  const [rsvpState, setRsvpState] = useState<'idle' | 'confirmed'>('idle');

  const isDark = theme === 'dark';

  const sortedCourses = [...COURSES_DATA].sort((a, b) => {
    if (sortOption === 'score') return b.score - a.score;
    if (sortOption === 'alpha') return a.name.localeCompare(b.name);
    return 0; // default weight order
  });

  const handleRsvp = () => {
    setRsvpState('confirmed');
  };

  return (
    <div className="flex flex-col w-full">
      {/* Subtle Ambient Glow */}
      <div className="relative w-full max-w-360 mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 py-5 sm:py-6">
        {/* Top Welcome & Student Status Banner */}
        <section className={`relative w-full rounded-2xl border shadow-sm overflow-hidden mb-8 p-6 md:p-8 transition-colors ${
          isDark 
            ? 'bg-[#1c1b1d] border-[#353437]' 
            : 'bg-white border-slate-200/80'
        }`}>
          {/* Decorative radial light leak */}
          <div className={`absolute -right-24 -top-24 w-96 h-96 rounded-full blur-[100px] pointer-events-none ${
            isDark ? 'bg-[#d4af37]/10' : 'bg-amber-100/60'
          }`}></div>
          <div className={`absolute -left-20 -bottom-20 w-80 h-80 rounded-full blur-[90px] pointer-events-none ${
            isDark ? 'bg-[#876d00]/15' : 'bg-amber-50/70'
          }`}></div>

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            {/* Left Greeting & Identity */}
            <div className="flex flex-col gap-2 max-w-2xl">
              <div className={`flex items-center gap-1.5 font-label-md text-xs tracking-wider uppercase font-semibold ${
                isDark ? 'text-[#f2ca50]' : 'text-amber-800'
              }`}>
                <span className="material-symbols-outlined text-[15px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  verified
                </span>
                <span>Executive Guardian Interface • Term 2 Cycle</span>
              </div>
              <h1 className={`font-headline-lg text-3xl md:text-4xl tracking-tight font-bold ${
                isDark ? 'text-[#e5e1e4]' : 'text-slate-900'
              }`}>
                Welcome back, Eleanor.
              </h1>
              <p className={`font-body-lg text-sm md:text-base leading-relaxed ${
                isDark ? 'text-[#d0c5af]' : 'text-slate-600'
              }`}>
                Here is Julian Vance's academic overview and real-time standing for Term 2. Scholastic trajectory remains within the cohort's 99th percentile.
              </p>

              {/* Student Profile Badges Bar */}
              <div className="flex flex-wrap items-center gap-2 pt-2">
                <div className={`flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-medium ${
                  isDark 
                    ? 'bg-[#2a2a2c] border-[#353437] text-[#e5e1e4]' 
                    : 'bg-slate-100 border-slate-200 text-slate-800'
                }`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${isDark ? 'bg-[#f2ca50]' : 'bg-amber-600'}`}></span>
                  <span>Grade 11-A (Honors Scholar)</span>
                </div>
                <div className={`px-3 py-1 rounded-full border text-xs ${
                  isDark 
                    ? 'bg-[#2a2a2c] border-[#353437] text-[#d0c5af]' 
                    : 'bg-slate-100 border-slate-200 text-slate-600'
                }`}>
                  ID: <span className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>#ATH-8842</span>
                </div>
                <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-semibold ${
                  isDark 
                    ? 'bg-[#2a2a2c] border-[#d4af37]/40 text-[#f2ca50]' 
                    : 'bg-amber-50 border-amber-200 text-amber-900'
                }`}>
                  <span className="material-symbols-outlined text-[14px]">military_tech</span>
                  <span>Top 3% Cohort Rank</span>
                </div>
              </div>
            </div>

            {/* Right Quick Actions */}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 shrink-0 justify-center">
              <button 
                type="button"
                onClick={onOpenScheduleConference}
                className={`group flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-xs md:text-sm shadow-md transition-all duration-300 cursor-pointer ${
                  isDark
                    ? 'bg-[#f2ca50] hover:bg-[#ffe088] text-[#3c2f00] shadow-[0_0_20px_rgba(242,202,80,0.25)]'
                    : 'bg-amber-700 hover:bg-amber-800 text-white shadow-amber-900/10'
                }`}
              >
                <span className="material-symbols-outlined text-[20px] transition-transform duration-300 group-hover:scale-110">
                  calendar_month
                </span>
                <span>Schedule Conference</span>
              </button>

              <div className="flex items-center gap-2">
                <button 
                  type="button"
                  onClick={onOpenMessageMentor}
                  className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-semibold transition-colors cursor-pointer ${
                    isDark 
                      ? 'bg-[#201f22] border-[#353437] text-[#e5e1e4] hover:bg-[#2a2a2c] hover:text-[#f2ca50]' 
                      : 'bg-slate-100 border-slate-200 text-slate-800 hover:bg-slate-200/80 hover:text-amber-800'
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">chat_bubble</span>
                  <span>Message Mentor</span>
                </button>
                <button 
                  type="button"
                  onClick={onOpenTranscript}
                  title="Download Official Academic Transcript"
                  className={`flex items-center justify-center p-2 rounded-xl border transition-colors cursor-pointer ${
                    isDark 
                      ? 'bg-[#201f22] border-[#353437] text-[#d0c5af] hover:text-[#f2ca50] hover:bg-[#2a2a2c]' 
                      : 'bg-slate-100 border-slate-200 text-slate-600 hover:text-amber-800 hover:bg-slate-200/80'
                  }`}
                >
                  <span className="material-symbols-outlined text-[20px]">download</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Top KPI Metrics (4 Bento Cards) */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {/* Metric 1: Attendance Rate */}
          <div className={`p-5 rounded-2xl border shadow-sm transition-all duration-300 group ${
            isDark ? 'bg-[#1c1b1d] border-[#353437] hover:border-[#f2ca50]/40' : 'bg-white border-slate-200/80 hover:border-amber-400/50'
          }`}>
            <div className="flex items-start justify-between mb-2">
              <div className="flex flex-col">
                <span className={`font-label-sm text-xs uppercase tracking-wider font-semibold ${
                  isDark ? 'text-[#99907c]' : 'text-slate-500'
                }`}>
                  Term Attendance
                </span>
                <span className={`font-display text-3xl font-bold tracking-tight mt-1 ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}>
                  98.4%
                </span>
              </div>
              <div className={`p-2 rounded-xl border ${
                isDark ? 'bg-[#201f22] text-[#f2ca50] border-[#353437]' : 'bg-amber-50 text-amber-700 border-amber-200/60'
              }`}>
                <span className="material-symbols-outlined text-[22px]">event_available</span>
              </div>
            </div>
            <div className="flex items-center justify-between pt-1 text-xs">
              <span className="inline-flex items-center gap-1 text-emerald-600 font-semibold bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                <span className="material-symbols-outlined text-[13px]">arrow_upward</span> +1.2%
              </span>
              <span className={isDark ? 'text-[#99907c]' : 'text-slate-500'}>1 Excused / 64 Sessions</span>
            </div>
            <div className={`w-full h-1.5 rounded-full mt-3 overflow-hidden ${
              isDark ? 'bg-[#2a2a2c]' : 'bg-slate-100'
            }`}>
              <div className={`h-full rounded-full transition-all duration-700 ${
                isDark ? 'bg-[#f2ca50]' : 'bg-amber-600'
              }`} style={{ width: '98.4%' }}></div>
            </div>
          </div>

          {/* Metric 2: Weighted GPA */}
          <div className={`p-5 rounded-2xl border shadow-sm transition-all duration-300 group ${
            isDark ? 'bg-[#1c1b1d] border-[#353437] hover:border-[#f2ca50]/40' : 'bg-white border-slate-200/80 hover:border-amber-400/50'
          }`}>
            <div className="flex items-start justify-between mb-2">
              <div className="flex flex-col">
                <span className={`font-label-sm text-xs uppercase tracking-wider font-semibold ${
                  isDark ? 'text-[#99907c]' : 'text-slate-500'
                }`}>
                  Cumulative GPA
                </span>
                <div className="flex items-baseline gap-1.5 mt-1">
                  <span className={`font-display text-3xl font-bold tracking-tight ${
                    isDark ? 'text-[#f2ca50]' : 'text-amber-800'
                  }`}>
                    3.94
                  </span>
                  <span className={`text-xs font-semibold ${isDark ? 'text-[#99907c]' : 'text-slate-400'}`}>/ 4.0</span>
                </div>
              </div>
              <div className={`p-2 rounded-xl border ${
                isDark ? 'bg-[#201f22] text-[#f2ca50] border-[#353437]' : 'bg-amber-50 text-amber-700 border-amber-200/60'
              }`}>
                <span className="material-symbols-outlined text-[22px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  workspace_premium
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between pt-1 text-xs">
              <span className={`inline-flex items-center gap-1 font-semibold px-2 py-0.5 rounded-full border ${
                isDark ? 'bg-[#f2ca50]/10 text-[#f2ca50] border-[#f2ca50]/20' : 'bg-amber-50 text-amber-900 border-amber-200'
              }`}>
                Cohort Rank #4
              </span>
              <span className={isDark ? 'text-[#99907c]' : 'text-slate-500'}>Out of 142 Peers</span>
            </div>
            <div className={`w-full h-1.5 rounded-full mt-3 overflow-hidden ${
              isDark ? 'bg-[#2a2a2c]' : 'bg-slate-100'
            }`}>
              <div className={`h-full rounded-full transition-all duration-700 ${
                isDark ? 'bg-[#f2ca50]' : 'bg-amber-600'
              }`} style={{ width: '98.5%' }}></div>
            </div>
          </div>

          {/* Metric 3: Deliverables */}
          <div className={`p-5 rounded-2xl border shadow-sm transition-all duration-300 group ${
            isDark ? 'bg-[#1c1b1d] border-[#353437] hover:border-[#f2ca50]/40' : 'bg-white border-slate-200/80 hover:border-amber-400/50'
          }`}>
            <div className="flex items-start justify-between mb-2">
              <div className="flex flex-col">
                <span className={`font-label-sm text-xs uppercase tracking-wider font-semibold ${
                  isDark ? 'text-[#99907c]' : 'text-slate-500'
                }`}>
                  Deliverables Submitted
                </span>
                <div className="flex items-baseline gap-1.5 mt-1">
                  <span className={`font-display text-3xl font-bold tracking-tight ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}>
                    28
                  </span>
                  <span className={`text-xs font-semibold ${isDark ? 'text-[#99907c]' : 'text-slate-400'}`}>/ 29 Tasks</span>
                </div>
              </div>
              <div className={`p-2 rounded-xl border ${
                isDark ? 'bg-[#201f22] text-[#f2ca50] border-[#353437]' : 'bg-amber-50 text-amber-700 border-amber-200/60'
              }`}>
                <span className="material-symbols-outlined text-[22px]">assignment_turned_in</span>
              </div>
            </div>
            <div className="flex items-center justify-between pt-1 text-xs">
              <span className={`inline-flex items-center gap-1 font-semibold px-2 py-0.5 rounded-full border ${
                isDark ? 'bg-[#2a2a2c] text-[#e5e1e4] border-[#353437]' : 'bg-slate-100 text-slate-700 border-slate-200'
              }`}>
                1 Active Essay
              </span>
              <span className={`truncate max-w-27.5 ${isDark ? 'text-[#99907c]' : 'text-slate-500'}`}>
                AP Euro Hist
              </span>
            </div>
            <div className={`w-full h-1.5 rounded-full mt-3 overflow-hidden ${
              isDark ? 'bg-[#2a2a2c]' : 'bg-slate-100'
            }`}>
              <div className={`h-full rounded-full transition-all duration-700 ${
                isDark ? 'bg-[#f2ca50]' : 'bg-amber-600'
              }`} style={{ width: '96.5%' }}></div>
            </div>
          </div>

          {/* Metric 4: Faculty Recognitions */}
          <div className={`p-5 rounded-2xl border shadow-sm transition-all duration-300 group ${
            isDark ? 'bg-[#1c1b1d] border-[#353437] hover:border-[#f2ca50]/40' : 'bg-white border-slate-200/80 hover:border-amber-400/50'
          }`}>
            <div className="flex items-start justify-between mb-2">
              <div className="flex flex-col">
                <span className={`font-label-sm text-xs uppercase tracking-wider font-semibold ${
                  isDark ? 'text-[#99907c]' : 'text-slate-500'
                }`}>
                  Faculty Recognitions
                </span>
                <div className="flex items-baseline gap-1.5 mt-1">
                  <span className={`font-display text-3xl font-bold tracking-tight ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}>
                    12
                  </span>
                  <span className={`text-xs font-semibold ${isDark ? 'text-[#99907c]' : 'text-slate-400'}`}>
                    Commendations
                  </span>
                </div>
              </div>
              <div className={`p-2 rounded-xl border ${
                isDark ? 'bg-[#201f22] text-[#f2ca50] border-[#353437]' : 'bg-amber-50 text-amber-700 border-amber-200/60'
              }`}>
                <span className="material-symbols-outlined text-[22px]">auto_awesome</span>
              </div>
            </div>
            <div className="flex items-center justify-between pt-1 text-xs">
              <span className={`inline-flex items-center gap-1 font-semibold px-2 py-0.5 rounded-full border truncate max-w-32.5 ${
                isDark ? 'bg-[#f2ca50]/10 text-[#f2ca50] border-[#f2ca50]/20' : 'bg-amber-50 text-amber-900 border-amber-200'
              }`}>
                New: Dr. Sterling
              </span>
              <span className={isDark ? 'text-[#99907c]' : 'text-slate-500'}>AP Physics C</span>
            </div>
            <div className={`w-full h-1.5 rounded-full mt-3 overflow-hidden ${
              isDark ? 'bg-[#2a2a2c]' : 'bg-slate-100'
            }`}>
              <div className={`h-full rounded-full transition-all duration-700 ${
                isDark ? 'bg-[#f2ca50]' : 'bg-amber-600'
              }`} style={{ width: '100%' }}></div>
            </div>
          </div>
        </section>

        {/* Two-Column Core Architecture */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* LEFT COLUMN: 60% (col-span-7 or 8 on desktop) */}
          <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-6 w-full">
            {/* Table: Recent Grades & Term Assessments */}
            <div className={`w-full rounded-2xl border shadow-sm overflow-hidden transition-colors ${
              isDark ? 'bg-[#1c1b1d] border-[#353437]' : 'bg-white border-slate-200/80'
            }`}>
              <div className={`p-5 border-b flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                isDark ? 'border-[#2a2a2c]' : 'border-slate-200/70'
              }`}>
                <div>
                  <div className="flex items-center gap-2">
                    <span className={`material-symbols-outlined text-[20px] ${
                      isDark ? 'text-[#f2ca50]' : 'text-amber-800'
                    }`}>
                      analytics
                    </span>
                    <h2 className={`font-title-md text-base font-bold ${
                      isDark ? 'text-white' : 'text-slate-900'
                    }`}>
                      Academic Ledger &amp; Core Marks
                    </h2>
                  </div>
                  <p className={`font-body-sm text-xs mt-0.5 ${
                    isDark ? 'text-[#d0c5af]' : 'text-slate-500'
                  }`}>
                    Term 2 real-time weighted scores and assessment trends
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs uppercase font-medium ${isDark ? 'text-[#99907c]' : 'text-slate-500'}`}>
                    Sorting:
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setSortOption('weight')}
                      className={`text-xs font-semibold px-2.5 py-1 rounded-full border transition-all cursor-pointer ${
                        sortOption === 'weight'
                          ? isDark ? 'bg-[#d4af37] text-[#3c2f00] border-[#d4af37]' : 'bg-amber-100 text-amber-900 border-amber-300'
                          : isDark ? 'bg-[#201f22] text-[#d0c5af] border-[#353437]' : 'bg-slate-100 text-slate-600 border-slate-200'
                      }`}
                    >
                      Weight High
                    </button>
                    <button
                      onClick={() => setSortOption('score')}
                      className={`text-xs font-semibold px-2.5 py-1 rounded-full border transition-all cursor-pointer ${
                        sortOption === 'score'
                          ? isDark ? 'bg-[#d4af37] text-[#3c2f00] border-[#d4af37]' : 'bg-amber-100 text-amber-900 border-amber-300'
                          : isDark ? 'bg-[#201f22] text-[#d0c5af] border-[#353437]' : 'bg-slate-100 text-slate-600 border-slate-200'
                      }`}
                    >
                      Score
                    </button>
                  </div>
                </div>
              </div>

              {/* Grade Matrix Table */}
              <div className="w-full overflow-x-auto">
                <table className="w-full text-left font-body-md text-sm">
                  <thead className={`text-xs uppercase tracking-wider border-b ${
                    isDark ? 'bg-[#201f22] text-[#99907c] border-[#2a2a2c]' : 'bg-slate-50/80 text-slate-500 border-slate-200/80'
                  }`}>
                    <tr>
                      <th className="py-3 px-5 font-semibold" scope="col">Discipline / Course</th>
                      <th className="py-3 px-4 font-semibold" scope="col">Faculty Mentor</th>
                      <th className="py-3 px-4 font-semibold text-center" scope="col">Score</th>
                      <th className="py-3 px-4 font-semibold text-center" scope="col">Standing</th>
                      <th className="py-3 px-5 font-semibold text-right" scope="col">Trajectory</th>
                    </tr>
                  </thead>
                  <tbody className={`divide-y ${isDark ? 'divide-[#2a2a2c]' : 'divide-slate-100'}`}>
                    {sortedCourses.map((c) => (
                      <tr 
                        key={c.id} 
                        className={`transition-colors group cursor-pointer ${
                          isDark ? 'hover:bg-[#201f22]/60' : 'hover:bg-slate-50/80'
                        }`}
                        onClick={() => onNavigateTab('academic-marks-reports')}
                      >
                        <td className="py-3.5 px-5">
                          <div className="flex items-center gap-3">
                            <div className={`w-2 h-2 rounded-full shrink-0 ${
                              c.letterGrade.startsWith('A') 
                                ? (isDark ? 'bg-[#f2ca50]' : 'bg-amber-600') 
                                : 'bg-slate-400'
                            }`}></div>
                            <div className="flex flex-col">
                              <span className={`font-semibold text-sm transition-colors ${
                                isDark ? 'text-white group-hover:text-[#f2ca50]' : 'text-slate-900 group-hover:text-amber-800'
                              }`}>
                                {c.name}
                              </span>
                              <span className={`text-xs ${isDark ? 'text-[#99907c]' : 'text-slate-500'}`}>
                                {c.category} • {c.period}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className={`py-3.5 px-4 text-xs font-medium ${isDark ? 'text-[#d0c5af]' : 'text-slate-600'}`}>
                          {c.mentor}
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          <span className={`font-headline-sm text-sm md:text-base font-bold ${
                            isDark ? 'text-white' : 'text-slate-900'
                          }`}>
                            {Math.round(c.score)}%
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${
                            c.letterGrade === 'A+'
                              ? isDark ? 'bg-[#d4af37]/20 text-[#f2ca50] border-[#d4af37]/40' : 'bg-amber-50 text-amber-900 border-amber-200'
                              : isDark ? 'bg-[#2a2a2c] text-[#e5e1e4] border-[#353437]' : 'bg-slate-100 text-slate-700 border-slate-200'
                          }`}>
                            {c.letterGrade}
                          </span>
                        </td>
                        <td className="py-3.5 px-5 text-right">
                          <div className={`inline-flex items-center gap-1.5 font-semibold text-xs ${
                            c.trajectoryType === 'up' ? 'text-emerald-500' : isDark ? 'text-[#99907c]' : 'text-slate-500'
                          }`}>
                            <svg className="w-14 h-4 overflow-visible" fill="none" viewBox="0 0 60 20">
                              <path 
                                d={c.sparklinePoints} 
                                stroke="currentColor" 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth="2"
                              />
                              <circle cx="58" cy="4" fill="currentColor" r="2.5"></circle>
                            </svg>
                            <span>{c.trajectoryDelta}</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className={`p-4 border-t flex items-center justify-between text-xs ${
                isDark ? 'bg-[#201f22]/40 border-[#2a2a2c]' : 'bg-slate-50/60 border-slate-200/80'
              }`}>
                <span className={isDark ? 'text-[#99907c]' : 'text-slate-500'}>
                  5 of 5 Core Academic Courses Active
                </span>
                <button 
                  onClick={() => onNavigateTab('academic-marks-reports')}
                  className={`font-semibold flex items-center gap-1 transition-colors cursor-pointer ${
                    isDark ? 'text-[#f2ca50] hover:text-[#ffe088]' : 'text-amber-800 hover:text-amber-950'
                  }`}
                >
                  <span>Access Detailed Gradebook</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </button>
              </div>
            </div>

            {/* Upcoming Schedule & Key Milestones Card */}
            <div className={`p-6 rounded-2xl border shadow-sm transition-colors ${
              isDark ? 'bg-[#1c1b1d] border-[#353437]' : 'bg-white border-slate-200/80'
            }`}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className={`material-symbols-outlined text-[20px] ${
                    isDark ? 'text-[#f2ca50]' : 'text-amber-800'
                  }`}>
                    event_upcoming
                  </span>
                  <h3 className={`font-title-md text-base font-bold ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}>
                    Upcoming Curricular Milestones
                  </h3>
                </div>
                <span className={`text-xs ${isDark ? 'text-[#99907c]' : 'text-slate-500'}`}>Next 14 Days</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Milestone 1 */}
                <div className={`p-4 rounded-xl border flex items-start gap-4 transition-colors ${
                  isDark ? 'bg-[#201f22] border-[#353437] hover:bg-[#2a2a2c]' : 'bg-slate-50 border-slate-200/80 hover:bg-slate-100/70'
                }`}>
                  <div className={`flex flex-col items-center justify-center w-12 h-12 rounded-xl border shrink-0 ${
                    isDark 
                      ? 'bg-[#2a2a2c] border-[#f2ca50]/40 text-[#f2ca50]' 
                      : 'bg-amber-100/80 border-amber-200 text-amber-900'
                  }`}>
                    <span className="text-[10px] uppercase font-bold leading-none">OCT</span>
                    <span className="text-lg font-bold leading-tight">22</span>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        isDark ? 'bg-[#f2ca50]/20 text-[#f2ca50]' : 'bg-amber-100 text-amber-900'
                      }`}>
                        Exam
                      </span>
                      <span className={`text-[11px] ${isDark ? 'text-[#99907c]' : 'text-slate-500'}`}>09:00 AM</span>
                    </div>
                    <h4 className={`font-semibold text-xs md:text-sm truncate mt-1 ${
                      isDark ? 'text-white' : 'text-slate-900'
                    }`}>
                      Mid-Term Defense &amp; Lab Presentation
                    </h4>
                    <p className={`text-xs truncate ${isDark ? 'text-[#d0c5af]' : 'text-slate-500'}`}>
                      Physics C: Mechanics Rotational Dynamics
                    </p>
                  </div>
                </div>

                {/* Milestone 2 */}
                <div className={`p-4 rounded-xl border flex items-start gap-4 transition-colors ${
                  isDark ? 'bg-[#201f22] border-[#353437] hover:bg-[#2a2a2c]' : 'bg-slate-50 border-slate-200/80 hover:bg-slate-100/70'
                }`}>
                  <div className={`flex flex-col items-center justify-center w-12 h-12 rounded-xl border shrink-0 ${
                    isDark 
                      ? 'bg-[#2a2a2c] border-[#353437] text-white' 
                      : 'bg-slate-200/80 border-slate-300 text-slate-800'
                  }`}>
                    <span className="text-[10px] uppercase font-bold leading-none">OCT</span>
                    <span className="text-lg font-bold leading-tight">26</span>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        isDark ? 'bg-[#353437] text-white' : 'bg-slate-200 text-slate-800'
                      }`}>
                        Tournament
                      </span>
                      <span className={`text-[11px] ${isDark ? 'text-[#99907c]' : 'text-slate-500'}`}>All Day</span>
                    </div>
                    <h4 className={`font-semibold text-xs md:text-sm truncate mt-1 ${
                      isDark ? 'text-white' : 'text-slate-900'
                    }`}>
                      Science Olympiad Regional Qualifiers
                    </h4>
                    <p className={`text-xs truncate ${isDark ? 'text-[#d0c5af]' : 'text-slate-500'}`}>
                      Lead Competitor • Engineering Pavilion
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: 40% (col-span-5 or 4 on desktop) */}
          <div className="lg:col-span-5 xl:col-span-4 flex flex-col gap-6 w-full">
            {/* Monthly Attendance Calendar Snapshot Widget */}
            <div className={`p-6 rounded-2xl border shadow-sm transition-colors ${
              isDark ? 'bg-[#1c1b1d] border-[#353437]' : 'bg-white border-slate-200/80'
            }`}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className={`material-symbols-outlined text-[20px] ${
                    isDark ? 'text-[#f2ca50]' : 'text-amber-800'
                  }`}>
                    calendar_today
                  </span>
                  <h3 className={`font-title-md text-base font-bold ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}>
                    Monthly Attendance
                  </h3>
                </div>
                <button 
                  onClick={() => onNavigateTab('attendance')}
                  className={`text-xs font-semibold hover:underline cursor-pointer ${
                    isDark ? 'text-[#f2ca50]' : 'text-amber-800'
                  }`}
                >
                  View Log
                </button>
              </div>

              {/* Mini Calendar Matrix */}
              <div className={`p-4 rounded-xl border ${
                isDark ? 'bg-[#201f22] border-[#353437]' : 'bg-slate-50 border-slate-200/80'
              }`}>
                <div className={`flex items-center justify-between pb-2 mb-3 border-b ${
                  isDark ? 'border-[#353437]' : 'border-slate-200/60'
                }`}>
                  <span className={`text-xs font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>
                    October 2024
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1 text-[11px] font-medium">
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Present
                    </span>
                    <span className="flex items-center gap-1 text-[11px] font-medium">
                      <span className="w-2 h-2 rounded-full bg-amber-500"></span> Excused
                    </span>
                  </div>
                </div>

                {/* Calendar Days Header */}
                <div className={`grid grid-cols-7 text-center text-[11px] mb-1 font-semibold ${
                  isDark ? 'text-[#99907c]' : 'text-slate-400'
                }`}>
                  <span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span><span>S</span>
                </div>

                {/* Calendar 5-week dots */}
                <div className="grid grid-cols-7 gap-y-2 text-center text-xs items-center">
                  <span className={isDark ? 'text-[#4d4635]' : 'text-slate-300'}>29</span>
                  <span className={isDark ? 'text-[#4d4635]' : 'text-slate-300'}>30</span>
                  <span className="flex justify-center"><span className="w-6 h-6 rounded-full flex items-center justify-center text-emerald-700 text-[11px] bg-emerald-100 font-semibold">1</span></span>
                  <span className="flex justify-center"><span className="w-6 h-6 rounded-full flex items-center justify-center text-emerald-700 text-[11px] bg-emerald-100 font-semibold">2</span></span>
                  <span className="flex justify-center"><span className="w-6 h-6 rounded-full flex items-center justify-center text-emerald-700 text-[11px] bg-emerald-100 font-semibold">3</span></span>
                  <span className={isDark ? 'text-[#4d4635]' : 'text-slate-400'}>4</span>
                  <span className={isDark ? 'text-[#4d4635]' : 'text-slate-400'}>5</span>

                  <span className="flex justify-center"><span className="w-6 h-6 rounded-full flex items-center justify-center text-emerald-700 text-[11px] bg-emerald-100 font-semibold">6</span></span>
                  <span className="flex justify-center"><span className="w-6 h-6 rounded-full flex items-center justify-center text-emerald-700 text-[11px] bg-emerald-100 font-semibold">7</span></span>
                  <span className="flex justify-center"><span className="w-6 h-6 rounded-full flex items-center justify-center text-emerald-700 text-[11px] bg-emerald-100 font-semibold">8</span></span>
                  <span className="flex justify-center" title="Excused Absence: Medical appointment">
                    <span className="w-6 h-6 rounded-full flex items-center justify-center text-amber-900 text-[11px] bg-amber-200 border border-amber-400 font-bold">9</span>
                  </span>
                  <span className="flex justify-center"><span className="w-6 h-6 rounded-full flex items-center justify-center text-emerald-700 text-[11px] bg-emerald-100 font-semibold">10</span></span>
                  <span className={isDark ? 'text-[#4d4635]' : 'text-slate-400'}>11</span>
                  <span className={isDark ? 'text-[#4d4635]' : 'text-slate-400'}>12</span>

                  <span className="flex justify-center"><span className="w-6 h-6 rounded-full flex items-center justify-center text-emerald-700 text-[11px] bg-emerald-100 font-semibold">13</span></span>
                  <span className="flex justify-center"><span className="w-6 h-6 rounded-full flex items-center justify-center text-emerald-700 text-[11px] bg-emerald-100 font-semibold">14</span></span>
                  <span className="flex justify-center"><span className="w-6 h-6 rounded-full flex items-center justify-center text-emerald-700 text-[11px] bg-emerald-100 font-semibold">15</span></span>
                  <span className="flex justify-center"><span className="w-6 h-6 rounded-full flex items-center justify-center text-emerald-700 text-[11px] bg-emerald-100 font-semibold">16</span></span>
                  <span className="flex justify-center"><span className="w-6 h-6 rounded-full flex items-center justify-center text-emerald-700 text-[11px] bg-emerald-100 font-semibold">17</span></span>
                  <span className={isDark ? 'text-[#4d4635]' : 'text-slate-400'}>18</span>
                  <span className={isDark ? 'text-[#4d4635]' : 'text-slate-400'}>19</span>

                  <span className="flex justify-center">
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-[11px] font-bold shadow-sm ${
                      isDark ? 'bg-[#f2ca50] text-[#3c2f00]' : 'bg-amber-600'
                    }`}>20</span>
                  </span>
                  <span className={`font-medium ${isDark ? 'text-white' : 'text-slate-700'}`}>21</span>
                  <span className={`font-medium ${isDark ? 'text-white' : 'text-slate-700'}`}>22</span>
                  <span className={`font-medium ${isDark ? 'text-white' : 'text-slate-700'}`}>23</span>
                  <span className={`font-medium ${isDark ? 'text-white' : 'text-slate-700'}`}>24</span>
                  <span className={isDark ? 'text-[#4d4635]' : 'text-slate-400'}>25</span>
                  <span className={isDark ? 'text-[#4d4635]' : 'text-slate-400'}>26</span>
                </div>
              </div>

              <div className={`mt-3 flex items-center justify-between text-xs ${
                isDark ? 'text-[#99907c]' : 'text-slate-500'
              }`}>
                <span>Official registrar record updated today</span>
                <span className="text-emerald-600 font-semibold">100% On-Time Arrival</span>
              </div>
            </div>

            {/* Faculty Spotlight Card */}
            <div className={`p-6 rounded-2xl border shadow-sm transition-colors relative overflow-hidden ${
              isDark ? 'bg-[#1c1b1d] border-[#353437]' : 'bg-white border-slate-200/80'
            }`}>
              <div className="flex items-center justify-between mb-2">
                <span className={`font-label-sm text-xs uppercase tracking-wider font-semibold flex items-center gap-1 ${
                  isDark ? 'text-[#f2ca50]' : 'text-amber-800'
                }`}>
                  <span className="material-symbols-outlined text-[16px]">verified</span> Faculty Spotlight
                </span>
                <button 
                  onClick={() => onNavigateTab('thank-teachers')}
                  className={`text-xs font-medium cursor-pointer ${
                    isDark ? 'text-[#99907c] hover:text-[#f2ca50]' : 'text-slate-500 hover:text-amber-800'
                  }`}
                >
                  All Teachers • 6
                </button>
              </div>

              <div className="flex items-center gap-4 my-3">
                <img 
                  alt="Dr. Alistair Sterling" 
                  className={`w-14 h-14 rounded-full object-cover shadow-sm ring-2 ${
                    isDark ? 'ring-[#f2ca50]/30' : 'ring-amber-500/20'
                  }`}
                  src={ASSETS.drSterlingAvatar}
                  referrerPolicy="no-referrer"
                />
                <div className="flex flex-col min-w-0">
                  <h4 className={`font-title-md text-base font-bold truncate ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}>
                    Dr. Alistair Sterling
                  </h4>
                  <p className={`text-xs font-semibold ${isDark ? 'text-[#f2ca50]' : 'text-amber-800'}`}>
                    Department of Advanced Physics
                  </p>
                  <p className={`text-[11px] ${isDark ? 'text-[#99907c]' : 'text-slate-500'}`}>
                    Aetheria Faculty Senior Fellow
                  </p>
                </div>
              </div>

              <div className={`p-3.5 rounded-xl border text-xs italic relative leading-relaxed ${
                isDark 
                  ? 'bg-[#201f22] border-[#353437] text-[#d0c5af]' 
                  : 'bg-amber-50/50 border-amber-200/60 text-slate-700'
              }`}>
                <span className={`material-symbols-outlined text-[18px] absolute top-2 right-2 ${
                  isDark ? 'text-[#f2ca50]/30' : 'text-amber-600/30'
                }`}>
                  format_quote
                </span>
                "Julian's analytical deduction on quantum harmonic oscillation was university level. His leadership in group experiments inspires the entire seminar."
              </div>

              <button 
                type="button"
                onClick={() => {
                  onSelectTeacherForCommendation('Dr. Marcus Sterling');
                  onNavigateTab('thank-teachers');
                }}
                className={`mt-4 w-full flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl border text-xs font-semibold transition-all duration-300 cursor-pointer ${
                  isDark
                    ? 'bg-[#201f22] border-[#353437] text-white hover:bg-[#d4af37] hover:text-[#3c2f00] hover:border-[#d4af37]'
                    : 'bg-slate-100 border-slate-200 text-slate-800 hover:bg-amber-700 hover:text-white hover:border-amber-700'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">favorite</span>
                <span>Send Appreciation Commendation</span>
              </button>
            </div>

            {/* Feedback & Academy Announcements Card */}
            <div className={`p-6 rounded-2xl border shadow-sm transition-colors ${
              isDark ? 'bg-[#1c1b1d] border-[#353437]' : 'bg-white border-slate-200/80'
            }`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className={`material-symbols-outlined text-[20px] ${
                    isDark ? 'text-[#f2ca50]' : 'text-amber-800'
                  }`}>
                    campaign
                  </span>
                  <h3 className={`font-title-md text-base font-bold ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}>
                    Institutional Notice
                  </h3>
                </div>
                <span className={`w-2 h-2 rounded-full animate-pulse ${
                  isDark ? 'bg-[#f2ca50]' : 'bg-amber-600'
                }`}></span>
              </div>

              <div className={`p-4 rounded-xl border mb-3 ${
                isDark ? 'bg-[#201f22] border-[#353437]' : 'bg-slate-50 border-slate-200/80'
              }`}>
                <span className={`font-label-sm text-[10px] uppercase tracking-wider font-semibold ${
                  isDark ? 'text-[#f2ca50]' : 'text-amber-800'
                }`}>
                  Symposium Invitation
                </span>
                <h4 className={`font-semibold text-xs md:text-sm mt-1 ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}>
                  Term 2 Parent Guild Symposium
                </h4>
                <p className={`text-xs mt-1 leading-relaxed ${
                  isDark ? 'text-[#d0c5af]' : 'text-slate-600'
                }`}>
                  Curricular briefing for Ivy Plus admissions preparation &amp; global exchange honors. Hosted in the Great Rotunda.
                </p>
                <div className={`flex items-center gap-3 mt-2 text-[11px] font-medium ${
                  isDark ? 'text-[#99907c]' : 'text-slate-500'
                }`}>
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">calendar_month</span> Nov 04, 2024
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">schedule</span> 6:30 PM EST
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <button 
                  onClick={() => onNavigateTab('feedback-support')}
                  className={`text-xs flex items-center gap-1 font-medium cursor-pointer ${
                    isDark ? 'text-[#d0c5af] hover:text-[#f2ca50]' : 'text-slate-600 hover:text-amber-800'
                  }`}
                >
                  <span className="material-symbols-outlined text-[16px]">support_agent</span>
                  <span>Direct Guardian Support</span>
                </button>
                <button 
                  onClick={handleRsvp}
                  className={`text-xs font-semibold hover:underline cursor-pointer ${
                    rsvpState === 'confirmed' ? 'text-emerald-600' : isDark ? 'text-[#f2ca50]' : 'text-amber-800'
                  }`}
                >
                  {rsvpState === 'confirmed' ? '✓ RSVP Registered' : 'RSVP Notice'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
