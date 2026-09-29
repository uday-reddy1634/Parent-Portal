import React, { useState } from 'react';
import { ThemeMode } from '../types';
import { ASSETS, COURSES_DATA } from '../data/mockData';

interface AcademicMarksScreenProps {
  theme: ThemeMode;
  onOpenTranscriptModal: () => void;
}

export const AcademicMarksScreen: React.FC<AcademicMarksScreenProps> = ({
  theme,
  onOpenTranscriptModal
}) => {
  const [selectedTerm, setSelectedTerm] = useState('Term 2 — Current');
  const [termDropdownOpen, setTermDropdownOpen] = useState(false);
  const [expandedCourses, setExpandedCourses] = useState<Record<string, boolean>>({
    'ap-physics-c': true // First one expanded by default
  });
  const [isPdfGenerating, setIsPdfGenerating] = useState(false);
  const [pdfSuccess, setPdfSuccess] = useState(false);

  const isDark = theme === 'dark';

  const toggleCourse = (id: string) => {
    setExpandedCourses(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const toggleExpandAll = () => {
    const allExpanded = Object.keys(expandedCourses).length === COURSES_DATA.length && 
      Object.values(expandedCourses).every(v => v);
    
    if (allExpanded) {
      setExpandedCourses({});
    } else {
      const all: Record<string, boolean> = {};
      COURSES_DATA.forEach(c => { all[c.id] = true; });
      setExpandedCourses(all);
    }
  };

  const handleDownloadPdf = () => {
    setIsPdfGenerating(true);
    setTimeout(() => {
      setIsPdfGenerating(false);
      setPdfSuccess(true);
      setTimeout(() => {
        setPdfSuccess(false);
      }, 3000);
    }, 1200);
  };

  const allAreExpanded = Object.keys(expandedCourses).length === COURSES_DATA.length && 
    Object.values(expandedCourses).every(v => v);

  return (
    <div className="flex flex-col w-full">
      <div className="relative w-full max-w-360 mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 py-5 sm:py-6 flex flex-col gap-8">
        {/* Subtle Luxury Glow */}
        <div className={`absolute top-12 left-1/4 w-96 h-96 rounded-full blur-3xl pointer-events-none -z-10 ${
          isDark ? 'bg-[#f2ca50]/5' : 'bg-amber-200/20'
        }`}></div>
        <div className={`absolute top-80 right-10 w-80 h-80 rounded-full blur-3xl pointer-events-none -z-10 ${
          isDark ? 'bg-[#c8cee3]/5' : 'bg-slate-200/40'
        }`}></div>

        {/* 1. ACADEMIC HEADER */}
        <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-1.5 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs uppercase tracking-wider font-semibold border ${
                isDark 
                  ? 'bg-[#201f22] border-[#353437] text-[#f2ca50]' 
                  : 'bg-amber-50 border-amber-200 text-amber-900'
              }`}>
                <span className={`w-1.5 h-1.5 rounded-full animate-ping ${isDark ? 'bg-[#f2ca50]' : 'bg-amber-600'}`}></span>
                Official Guardian Transcript Audit
              </span>
              <span className={`font-label-sm text-xs font-medium ${isDark ? 'text-[#99907c]' : 'text-slate-500'}`}>
                AY 2023-2024
              </span>
            </div>
            <h1 className={`font-headline-lg text-3xl md:text-4xl tracking-tight font-bold ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}>
              Academic Marks, Reports &amp; Class Standing
            </h1>
            <p className={`font-body-md text-sm md:text-base ${isDark ? 'text-[#d0c5af]' : 'text-slate-600'}`}>
              Term 2 Cumulative Report Card &amp; Subject Performance Analytics for{' '}
              <span className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>Julian Vance</span>.
            </p>
          </div>

          {/* Controls */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Term Selector Custom Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setTermDropdownOpen(!termDropdownOpen)}
                className={`flex items-center justify-between gap-3 px-4 py-2.5 rounded-xl border transition-colors text-xs md:text-sm font-semibold cursor-pointer shadow-sm ${
                  isDark 
                    ? 'bg-[#201f22] hover:bg-[#2a2a2c] border-[#353437] text-[#e5e1e4]' 
                    : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800'
                }`}
              >
                <span className="flex items-center gap-2">
                  <span className={`material-symbols-outlined text-[18px] ${isDark ? 'text-[#f2ca50]' : 'text-amber-800'}`}>
                    calendar_month
                  </span>
                  <span>{selectedTerm}</span>
                </span>
                <span className="material-symbols-outlined text-[18px] text-slate-400">expand_more</span>
              </button>

              {termDropdownOpen && (
                <div className={`absolute right-0 mt-2 w-56 rounded-xl border shadow-xl py-1.5 z-30 ${
                  isDark ? 'bg-[#1c1b1d] border-[#353437]' : 'bg-white border-slate-200'
                }`}>
                  {['Term 2 — Current', 'Term 1 — Final', 'Full Year Aggregate'].map((term) => (
                    <button
                      key={term}
                      onClick={() => {
                        setSelectedTerm(term);
                        setTermDropdownOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-xs font-semibold flex items-center justify-between transition-colors ${
                        selectedTerm === term
                          ? isDark ? 'text-[#f2ca50] bg-[#2a2a2c]' : 'text-amber-900 bg-amber-50'
                          : isDark ? 'text-[#d0c5af] hover:bg-[#201f22]' : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <span>{term}</span>
                      {selectedTerm === term && (
                        <span className="material-symbols-outlined text-[16px]">check</span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Download Action */}
            <button 
              onClick={handleDownloadPdf}
              disabled={isPdfGenerating}
              className={`group flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-xs md:text-sm transition-all duration-300 shadow-sm cursor-pointer ${
                isDark
                  ? 'bg-[#d4af37] text-[#3c2f00] hover:bg-[#ffe088] shadow-[0_0_20px_rgba(212,175,55,0.25)]'
                  : 'bg-amber-700 hover:bg-amber-800 text-white'
              }`}
            >
              {isPdfGenerating ? (
                <>
                  <span className="material-symbols-outlined text-[20px] animate-spin">sync</span>
                  <span>Generating Official PDF...</span>
                </>
              ) : pdfSuccess ? (
                <>
                  <span className="material-symbols-outlined text-[20px]">check_circle</span>
                  <span>Transcript Downloaded</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-[20px] transition-transform duration-300 group-hover:-translate-y-0.5">
                    file_download
                  </span>
                  <span>Download Official PDF</span>
                </>
              )}
            </button>
          </div>
        </header>

        {/* 2. PERFORMANCE OVERVIEW BANNER (Bento Style) */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: GPA Metric */}
          <div className={`relative overflow-hidden rounded-2xl border p-5 flex flex-col justify-between shadow-sm transition-shadow ${
            isDark ? 'bg-[#1c1b1d] border-[#353437]' : 'bg-white border-slate-200/80'
          }`}>
            <div className="flex items-center justify-between">
              <span className={`font-label-sm text-xs uppercase tracking-wider font-semibold ${
                isDark ? 'text-[#99907c]' : 'text-slate-500'
              }`}>
                Cumulative GPA
              </span>
              <div className={`w-9 h-9 rounded-full flex items-center justify-center border ${
                isDark ? 'bg-[#201f22] text-[#f2ca50] border-[#353437]' : 'bg-amber-50 text-amber-700 border-amber-200/60'
              }`}>
                <span className="material-symbols-outlined text-[18px]">workspace_premium</span>
              </div>
            </div>
            <div className="my-3">
              <div className="flex items-baseline gap-1.5">
                <span className={`font-display text-4xl font-bold tracking-tight ${
                  isDark ? 'text-[#f2ca50]' : 'text-amber-800'
                }`}>
                  4.42
                </span>
                <span className={`text-xs font-semibold ${isDark ? 'text-[#99907c]' : 'text-slate-500'}`}>
                  Weighted
                </span>
              </div>
              <div className="text-xs mt-1 flex items-center gap-1.5 font-medium">
                <span className={`w-1.5 h-1.5 rounded-full ${isDark ? 'bg-[#f2ca50]' : 'bg-amber-600'}`}></span>
                <span className={isDark ? 'text-white' : 'text-slate-800'}>3.94 Unweighted Scale</span>
              </div>
            </div>
            <div className="text-xs flex items-center gap-1 font-semibold text-emerald-600">
              <span className="material-symbols-outlined text-[15px]">trending_up</span>
              <span>+0.08 improvement from Term 1</span>
            </div>
          </div>

          {/* Card 2: Cohort Standing */}
          <div className={`relative overflow-hidden rounded-2xl border p-5 flex flex-col justify-between shadow-sm transition-shadow ${
            isDark ? 'bg-[#1c1b1d] border-[#353437]' : 'bg-white border-slate-200/80'
          }`}>
            <div className="flex items-center justify-between">
              <span className={`font-label-sm text-xs uppercase tracking-wider font-semibold ${
                isDark ? 'text-[#99907c]' : 'text-slate-500'
              }`}>
                Class Percentile
              </span>
              <div className={`w-9 h-9 rounded-full flex items-center justify-center border ${
                isDark ? 'bg-[#201f22] text-[#f2ca50] border-[#353437]' : 'bg-amber-50 text-amber-700 border-amber-200/60'
              }`}>
                <span className="material-symbols-outlined text-[18px]">leaderboard</span>
              </div>
            </div>
            <div className="my-3">
              <div className="flex items-baseline gap-1.5">
                <span className={`font-display text-4xl font-bold tracking-tight ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}>
                  Top 3.5%
                </span>
              </div>
              <div className={`text-xs mt-1 ${isDark ? 'text-[#d0c5af]' : 'text-slate-600'}`}>
                Cohort Rank: <span className={`font-bold ${isDark ? 'text-[#f2ca50]' : 'text-amber-800'}`}>4</span> of 142 Scholars
              </div>
            </div>
            <div className={`w-full h-2 rounded-full overflow-hidden border ${
              isDark ? 'bg-[#2a2a2c] border-[#353437]' : 'bg-slate-100 border-slate-200/50'
            }`}>
              <div className={`h-full rounded-full transition-all duration-1000 ${
                isDark ? 'bg-[#f2ca50]' : 'bg-amber-600'
              }`} style={{ width: '96.5%' }}></div>
            </div>
          </div>

          {/* Card 3: Honor Roll Distinction */}
          <div className={`relative overflow-hidden rounded-2xl border p-5 flex flex-col justify-between shadow-sm transition-shadow ${
            isDark ? 'bg-[#1c1b1d] border-[#353437]' : 'bg-white border-slate-200/80'
          }`}>
            <div className="flex items-center justify-between">
              <span className={`font-label-sm text-xs uppercase tracking-wider font-semibold ${
                isDark ? 'text-[#99907c]' : 'text-slate-500'
              }`}>
                Honor Roll Standing
              </span>
              <div className={`w-9 h-9 rounded-full flex items-center justify-center border ${
                isDark ? 'bg-[#201f22] text-[#f2ca50] border-[#353437]' : 'bg-amber-50 text-amber-700 border-amber-200/60'
              }`}>
                <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  military_tech
                </span>
              </div>
            </div>
            <div className="my-3">
              <div className={`font-headline-sm text-lg font-bold tracking-tight ${
                isDark ? 'text-[#f2ca50]' : 'text-amber-800'
              }`}>
                Summa Cum Laude
              </div>
              <p className={`text-xs mt-1 leading-snug ${isDark ? 'text-[#d0c5af]' : 'text-slate-600'}`}>
                Dean’s Highest Scholastic Distinction Awarded for Academic Excellence.
              </p>
            </div>
            <span className={`inline-flex items-center gap-1.5 text-xs font-semibold ${
              isDark ? 'text-[#f2ca50]' : 'text-amber-900'
            }`}>
              <span className="material-symbols-outlined text-[15px] text-amber-600">stars</span>
              Quarterly Honors Society Verified
            </span>
          </div>

          {/* Card 4: Degree Matrix */}
          <div className={`relative overflow-hidden rounded-2xl border p-5 flex flex-col justify-between shadow-sm transition-shadow ${
            isDark ? 'bg-[#1c1b1d] border-[#353437]' : 'bg-white border-slate-200/80'
          }`}>
            <div className="flex items-center justify-between">
              <span className={`font-label-sm text-xs uppercase tracking-wider font-semibold ${
                isDark ? 'text-[#99907c]' : 'text-slate-500'
              }`}>
                Degree Matrix
              </span>
              <div className={`w-9 h-9 rounded-full flex items-center justify-center border ${
                isDark ? 'bg-[#201f22] text-[#f2ca50] border-[#353437]' : 'bg-amber-50 text-amber-700 border-amber-200/60'
              }`}>
                <span className="material-symbols-outlined text-[18px]">school</span>
              </div>
            </div>
            <div className="my-3">
              <div className="flex items-baseline gap-1.5">
                <span className={`font-display text-4xl font-bold tracking-tight ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}>
                  24 <span className={`text-xl font-normal ${isDark ? 'text-[#99907c]' : 'text-slate-400'}`}>/ 28</span>
                </span>
              </div>
              <p className={`text-xs mt-1 ${isDark ? 'text-[#d0c5af]' : 'text-slate-600'}`}>
                Credits Earned Toward Diploma
              </p>
            </div>
            <div className={`flex items-center justify-between text-xs font-semibold ${
              isDark ? 'text-[#d0c5af]' : 'text-slate-600'
            }`}>
              <span>85.7% Complete</span>
              <span className={isDark ? 'text-[#f2ca50]' : 'text-amber-900'}>4 Credits Remaining</span>
            </div>
          </div>
        </section>

        {/* 3. SUBJECT BREAKDOWN & DETAILED MARKS */}
        <section className="flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className={`font-headline-md text-xl md:text-2xl font-bold ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}>
                Enrolled Course Mastery
              </h2>
              <p className={`text-xs md:text-sm ${isDark ? 'text-[#d0c5af]' : 'text-slate-600'}`}>
                Click any subject row or card to expand syllabus weights, assessments, and teacher evaluations.
              </p>
            </div>
            <button 
              onClick={toggleExpandAll}
              className={`px-4 py-2 rounded-xl border text-xs font-semibold transition-colors flex items-center gap-1.5 shadow-sm cursor-pointer self-start sm:self-auto ${
                isDark 
                  ? 'bg-[#201f22] border-[#353437] text-white hover:bg-[#2a2a2c]' 
                  : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-800'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">
                {allAreExpanded ? 'unfold_less' : 'unfold_more'}
              </span>
              <span>{allAreExpanded ? 'Collapse All Details' : 'Expand All Details'}</span>
            </button>
          </div>

          {/* Interactive Accordion Course List */}
          <div className="flex flex-col gap-4">
            {COURSES_DATA.map((course) => {
              const isExpanded = !!expandedCourses[course.id];
              return (
                <div 
                  key={course.id}
                  className={`rounded-2xl border transition-all duration-300 overflow-hidden shadow-sm hover:shadow-md ${
                    isDark ? 'bg-[#1c1b1d] border-[#353437]' : 'bg-white border-slate-200/80'
                  }`}
                >
                  {/* Main Row */}
                  <div 
                    onClick={() => toggleCourse(course.id)}
                    className="p-5 md:p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4 cursor-pointer select-none"
                  >
                    <div className="flex items-start md:items-center gap-4 min-w-0">
                      <div className={`w-12 h-12 rounded-xl border flex items-center justify-center shrink-0 ${
                        isDark 
                          ? 'bg-[#201f22] border-[#353437] text-[#f2ca50]' 
                          : 'bg-amber-50 border-amber-200/60 text-amber-700'
                      }`}>
                        <span className="material-symbols-outlined text-[24px]">
                          {course.id.includes('physics') ? 'science' :
                           course.id.includes('calc') ? 'calculate' :
                           course.id.includes('eng') ? 'history_edu' :
                           course.id.includes('robotics') ? 'smart_toy' : 'query_stats'}
                        </span>
                      </div>
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className={`font-title-md text-base md:text-lg font-bold truncate ${
                            isDark ? 'text-white' : 'text-slate-900'
                          }`}>
                            {course.name}
                          </h3>
                          <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${
                            course.category.includes('AP')
                              ? isDark ? 'bg-[#d4af37]/20 text-[#f2ca50] border-[#d4af37]/30' : 'bg-amber-100 text-amber-900 border-amber-200'
                              : isDark ? 'bg-[#2a2a2c] text-[#e5e1e4] border-[#353437]' : 'bg-slate-100 text-slate-800 border-slate-200'
                          }`}>
                            {course.category}
                          </span>
                        </div>
                        <div className={`flex items-center gap-3 mt-1 text-xs ${
                          isDark ? 'text-[#99907c]' : 'text-slate-500'
                        }`}>
                          <span className="flex items-center gap-1 font-medium">
                            <span className="material-symbols-outlined text-[16px]">badge</span>
                            {course.mentor}
                          </span>
                          <span>•</span>
                          <span>{course.period} — {course.room}</span>
                        </div>
                      </div>
                    </div>

                    {/* Score Summary Group */}
                    <div className="flex items-center justify-between lg:justify-end gap-6 md:gap-10 shrink-0">
                      <div className="flex items-center gap-6 md:gap-8 text-left">
                        <div className="hidden sm:block">
                          <div className={`text-[10px] uppercase font-semibold ${isDark ? 'text-[#99907c]' : 'text-slate-500'}`}>
                            Class Avg
                          </div>
                          <div className={`text-sm font-bold ${isDark ? 'text-[#d0c5af]' : 'text-slate-700'}`}>
                            {course.classAvg}%
                          </div>
                        </div>
                        <div>
                          <div className={`text-[10px] uppercase font-semibold ${isDark ? 'text-[#99907c]' : 'text-slate-500'}`}>
                            Letter Grade
                          </div>
                          <div className={`font-headline-sm text-lg font-bold ${isDark ? 'text-[#f2ca50]' : 'text-amber-800'}`}>
                            {course.letterGrade}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={`text-[10px] uppercase font-semibold ${isDark ? 'text-[#99907c]' : 'text-slate-500'}`}>
                            Cumulative
                          </div>
                          <div className={`font-headline-md text-xl md:text-2xl font-bold ${
                            isDark ? 'text-white' : 'text-slate-900'
                          }`}>
                            {course.score}%
                          </div>
                        </div>
                      </div>

                      {/* Accordion Arrow */}
                      <div className={`w-8 h-8 rounded-full border flex items-center justify-center transition-transform duration-300 ${
                        isExpanded ? 'rotate-180' : ''
                      } ${isDark ? 'bg-[#201f22] border-[#353437] text-white' : 'bg-slate-100 border-slate-200 text-slate-600'}`}>
                        <span className="material-symbols-outlined text-[18px]">expand_more</span>
                      </div>
                    </div>
                  </div>

                  {/* Expanded Breakdown Content */}
                  {isExpanded && (
                    <div className={`px-5 md:px-6 pb-6 pt-2 border-t ${
                      isDark ? 'bg-[#151517] border-[#2a2a2c]' : 'bg-slate-50/70 border-slate-100'
                    }`}>
                      <div className="pt-4 grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Left: Assessment Weights */}
                        <div className="lg:col-span-2 space-y-4">
                          <h4 className={`text-xs uppercase tracking-wider font-semibold ${
                            isDark ? 'text-[#99907c]' : 'text-slate-500'
                          }`}>
                            Assessment Category Breakdown
                          </h4>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            {course.categories.map((cat, idx) => (
                              <div 
                                key={idx}
                                className={`p-3.5 rounded-xl border ${
                                  isDark ? 'bg-[#201f22] border-[#353437]' : 'bg-white border-slate-200'
                                }`}
                              >
                                <div className="flex items-center justify-between text-xs">
                                  <span className={`font-medium ${isDark ? 'text-[#d0c5af]' : 'text-slate-600'}`}>
                                    {cat.name}
                                  </span>
                                  <span className={`font-bold ${isDark ? 'text-[#f2ca50]' : 'text-amber-800'}`}>
                                    {cat.score}
                                  </span>
                                </div>
                                <div className={`w-full h-1.5 rounded-full mt-2 overflow-hidden ${
                                  isDark ? 'bg-[#2a2a2c]' : 'bg-slate-100'
                                }`}>
                                  <div 
                                    className={`h-full rounded-full ${isDark ? 'bg-[#f2ca50]' : 'bg-amber-600'}`}
                                    style={{ width: `${cat.percentage}%` }}
                                  ></div>
                                </div>
                                <span className={`text-[11px] mt-1.5 block ${isDark ? 'text-[#99907c]' : 'text-slate-500'}`}>
                                  {cat.description}
                                </span>
                              </div>
                            ))}
                          </div>

                          {/* Recent Itemized Marks */}
                          <div className="space-y-2">
                            <span className={`text-xs uppercase tracking-wider font-semibold ${
                              isDark ? 'text-[#99907c]' : 'text-slate-500'
                            }`}>
                              Recent Graded Deliverables
                            </span>
                            <div className={`rounded-xl border overflow-hidden ${
                              isDark ? 'bg-[#201f22] border-[#353437]' : 'bg-white border-slate-200'
                            }`}>
                              {course.recentDeliverables.map((item, idx) => (
                                <div 
                                  key={idx}
                                  className={`flex items-center justify-between p-3 text-xs border-b last:border-b-0 ${
                                    isDark ? 'border-[#2a2a2c] hover:bg-[#2a2a2c]/60' : 'border-slate-100 hover:bg-slate-50'
                                  }`}
                                >
                                  <div className="flex items-center gap-2">
                                    <span className={`material-symbols-outlined text-[16px] ${
                                      isDark ? 'text-[#f2ca50]' : 'text-amber-700'
                                    }`}>
                                      assignment_turned_in
                                    </span>
                                    <span className={`font-medium ${isDark ? 'text-[#e5e1e4]' : 'text-slate-800'}`}>
                                      {item.title}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-4 shrink-0">
                                    <span className={isDark ? 'text-[#99907c]' : 'text-slate-500'}>
                                      {item.date}
                                    </span>
                                    <span className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                                      {item.score}
                                    </span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Right: Faculty Observations & GPA Effect */}
                        <div className={`flex flex-col justify-between p-4 rounded-xl border ${
                          isDark ? 'bg-[#201f22] border-[#353437]' : 'bg-white border-slate-200'
                        }`}>
                          <div className="space-y-2">
                            <div className={`flex items-center gap-1.5 font-semibold text-xs ${
                              isDark ? 'text-[#f2ca50]' : 'text-amber-800'
                            }`}>
                              <span className="material-symbols-outlined text-[18px]">format_quote</span>
                              <span>Instructor Commendation</span>
                            </div>
                            <p className={`text-xs italic leading-relaxed ${
                              isDark ? 'text-[#d0c5af]' : 'text-slate-700'
                            }`}>
                              "{course.instructorNote}"
                            </p>
                          </div>
                          <div className={`pt-3 mt-3 border-t flex items-center justify-between text-xs font-semibold ${
                            isDark ? 'border-[#353437] text-[#99907c]' : 'border-slate-100 text-slate-600'
                          }`}>
                            <span>Weight Factor: {course.weightFactor}</span>
                            <span className={isDark ? 'text-[#f2ca50]' : 'text-amber-800'}>
                              Earned QPA: {course.earnedQPA}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* 4. VISUAL COMPARISON & HISTORICAL COHORT BENCHMARK */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Visual Chart: Julian's Performance vs Class Average (Span 8) */}
          <div className={`lg:col-span-8 rounded-2xl border p-6 flex flex-col justify-between shadow-sm transition-colors ${
            isDark ? 'bg-[#1c1b1d] border-[#353437]' : 'bg-white border-slate-200/80'
          }`}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
              <div>
                <span className={`font-label-sm text-xs uppercase tracking-wider font-semibold ${
                  isDark ? 'text-[#99907c]' : 'text-slate-500'
                }`}>
                  Cohort Differential
                </span>
                <h3 className={`font-headline-sm text-lg md:text-xl font-bold mt-1 ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}>
                  Julian vs Class Average Benchmark
                </h3>
              </div>
              <div className="flex items-center gap-4 text-xs font-semibold">
                <span className={`flex items-center gap-1.5 ${isDark ? 'text-white' : 'text-slate-800'}`}>
                  <span className={`w-3 h-3 rounded-full inline-block shadow-sm ${
                    isDark ? 'bg-[#f2ca50]' : 'bg-amber-600'
                  }`}></span>
                  Julian (+8% to +14%)
                </span>
                <span className={`flex items-center gap-1.5 ${isDark ? 'text-[#99907c]' : 'text-slate-500'}`}>
                  <span className={`w-3 h-3 rounded-full inline-block ${
                    isDark ? 'bg-[#353437]' : 'bg-slate-300'
                  }`}></span>
                  Class Average
                </span>
              </div>
            </div>

            {/* Inline SVG Visualization */}
            <div className="w-full overflow-x-auto pb-2">
              <div className="min-w-120 w-full h-64 relative flex items-end">
                <svg className="w-full h-full overflow-visible" fill="none" viewBox="0 0 700 240" xmlns="http://www.w3.org/2000/svg">
                {/* Gridlines */}
                <line className={isDark ? 'stroke-[#2a2a2c]' : 'stroke-slate-200'} strokeDasharray="4 4" x1="0" x2="700" y1="40" y2="40"></line>
                <text className={`text-[10px] font-mono ${isDark ? 'fill-[#99907c]' : 'fill-slate-400'}`} x="5" y="36">100%</text>

                <line className={isDark ? 'stroke-[#2a2a2c]' : 'stroke-slate-200'} strokeDasharray="4 4" x1="0" x2="700" y1="100" y2="100"></line>
                <text className={`text-[10px] font-mono ${isDark ? 'fill-[#99907c]' : 'fill-slate-400'}`} x="5" y="96">90%</text>

                <line className={isDark ? 'stroke-[#2a2a2c]' : 'stroke-slate-200'} strokeDasharray="4 4" x1="0" x2="700" y1="160" y2="160"></line>
                <text className={`text-[10px] font-mono ${isDark ? 'fill-[#99907c]' : 'fill-slate-400'}`} x="5" y="156">80%</text>

                <line className={isDark ? 'stroke-[#2a2a2c]' : 'stroke-slate-200'} x1="0" x2="700" y1="220" y2="220"></line>
                <text className={`text-[10px] font-mono ${isDark ? 'fill-[#99907c]' : 'fill-slate-400'}`} x="5" y="216">70%</text>

                {/* 1: Physics C */}
                <rect className={`transition-all duration-300 ${isDark ? 'fill-[#353437]' : 'fill-slate-200'}`} height="85" rx="4" width="36" x="70" y="135"></rect>
                <rect className={`transition-all duration-300 ${isDark ? 'fill-[#f2ca50]' : 'fill-amber-600'}`} height="159" rx="4" width="36" x="114" y="61"></rect>
                <text className={`text-[11px] font-mono font-medium ${isDark ? 'fill-[#d0c5af]' : 'fill-slate-600'}`} x="80" y="235">Physics C</text>
                <text className={`text-[11px] font-bold ${isDark ? 'fill-[#f2ca50]' : 'fill-amber-900'}`} x="116" y="53">96.4%</text>

                {/* 2: Calc BC */}
                <rect className={`transition-all duration-300 ${isDark ? 'fill-[#353437]' : 'fill-slate-200'}`} height="70" rx="4" width="36" x="200" y="150"></rect>
                <rect className={`transition-all duration-300 ${isDark ? 'fill-[#f2ca50]' : 'fill-amber-600'}`} height="169" rx="4" width="36" x="244" y="51"></rect>
                <text className={`text-[11px] font-mono font-medium ${isDark ? 'fill-[#d0c5af]' : 'fill-slate-600'}`} x="210" y="235">Calc BC</text>
                <text className={`text-[11px] font-bold ${isDark ? 'fill-[#f2ca50]' : 'fill-amber-900'}`} x="246" y="43">98.1%</text>

                {/* 3: AP Lit */}
                <rect className={`transition-all duration-300 ${isDark ? 'fill-[#353437]' : 'fill-slate-200'}`} height="92" rx="4" width="36" x="330" y="128"></rect>
                <rect className={`transition-all duration-300 ${isDark ? 'fill-[#f2ca50]' : 'fill-amber-600'}`} height="135" rx="4" width="36" x="374" y="85"></rect>
                <text className={`text-[11px] font-mono font-medium ${isDark ? 'fill-[#d0c5af]' : 'fill-slate-600'}`} x="340" y="235">AP Lit</text>
                <text className={`text-[11px] font-bold ${isDark ? 'fill-[#f2ca50]' : 'fill-amber-900'}`} x="376" y="77">92.5%</text>

                {/* 4: Robotics */}
                <rect className={`transition-all duration-300 ${isDark ? 'fill-[#353437]' : 'fill-slate-200'}`} height="108" rx="4" width="36" x="460" y="112"></rect>
                <rect className={`transition-all duration-300 ${isDark ? 'fill-[#f2ca50]' : 'fill-amber-600'}`} height="162" rx="4" width="36" x="504" y="58"></rect>
                <text className={`text-[11px] font-mono font-medium ${isDark ? 'fill-[#d0c5af]' : 'fill-slate-600'}`} x="465" y="235">Robotics</text>
                <text className={`text-[11px] font-bold ${isDark ? 'fill-[#f2ca50]' : 'fill-amber-900'}`} x="506" y="50">97.0%</text>

                {/* 5: MicroEcon */}
                <rect className={`transition-all duration-300 ${isDark ? 'fill-[#353437]' : 'fill-slate-200'}`} height="97" rx="4" width="36" x="590" y="123"></rect>
                <rect className={`transition-all duration-300 ${isDark ? 'fill-[#f2ca50]' : 'fill-amber-600'}`} height="145" rx="4" width="36" x="634" y="75"></rect>
                <text className={`text-[11px] font-mono font-medium ${isDark ? 'fill-[#d0c5af]' : 'fill-slate-600'}`} x="600" y="235">MicroEcon</text>
                <text className={`text-[11px] font-bold ${isDark ? 'fill-[#f2ca50]' : 'fill-amber-900'}`} x="636" y="67">94.2%</text>
              </svg>
            </div>
            </div>

            <div className={`mt-4 pt-4 border-t flex flex-wrap items-center justify-between text-xs ${
              isDark ? 'border-[#2a2a2c] text-[#99907c]' : 'border-slate-100 text-slate-500'
            }`}>
              <span>*Cohort data calculated across Grade 11 STEM &amp; Humanities Honors Cohorts (N=142).</span>
              <span className={`font-semibold flex items-center gap-1 ${
                isDark ? 'text-[#f2ca50]' : 'text-amber-800'
              }`}>
                <span className="material-symbols-outlined text-[15px]">insights</span>
                Julian leads cohort median by +11.2% aggregate
              </span>
            </div>
          </div>

          {/* Dean's Academic Endorsement Block (Span 4) */}
          <div className={`lg:col-span-4 rounded-2xl border p-6 flex flex-col justify-between shadow-sm relative overflow-hidden ${
            isDark ? 'bg-[#1c1b1d] border-[#353437]' : 'bg-white border-slate-200/80'
          }`}>
            <div className={`absolute -right-12 -bottom-12 w-48 h-48 rounded-full blur-2xl pointer-events-none ${
              isDark ? 'bg-[#d4af37]/10' : 'bg-amber-100/50'
            }`}></div>
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className={`font-label-sm text-xs uppercase tracking-wider font-bold ${
                  isDark ? 'text-[#f2ca50]' : 'text-amber-800'
                }`}>
                  Head of Academics
                </span>
                <span className={`material-symbols-outlined text-[24px] ${isDark ? 'text-[#f2ca50]' : 'text-amber-700'}`}>
                  verified
                </span>
              </div>
              <div className="space-y-2">
                <h4 className={`font-headline-sm text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Quarterly Dean’s Review
                </h4>
                <p className={`text-xs md:text-sm leading-relaxed ${isDark ? 'text-[#d0c5af]' : 'text-slate-600'}`}>
                  "Julian has sustained one of the most intellectually formidable curriculum tracks at Aetheria. His dedication to both empirical rigor in Mechanics and creative synthesis in Literature demonstrates true polymathic promise. He remains firmly on schedule for Ivy League &amp; Oxbridge early applicant nomination."
                </p>
              </div>
            </div>

            <div className={`mt-6 pt-4 border-t flex items-center gap-3.5 ${
              isDark ? 'border-[#2a2a2c]' : 'border-slate-100'
            }`}>
              <img 
                alt="Dr. Genevieve Montclaire"
                className="w-12 h-12 rounded-full object-cover shadow-sm ring-1 ring-slate-200"
                src={ASSETS.deanMontclaireAvatar}
                referrerPolicy="no-referrer"
              />
              <div className="min-w-0">
                <div className={`font-title-sm text-xs font-bold truncate ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Dr. Genevieve Montclaire
                </div>
                <div className={`text-[11px] truncate ${isDark ? 'text-[#99907c]' : 'text-slate-500'}`}>
                  Dean of Academic Curricula &amp; Honors Board
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. VERIFIED TRANSCRIPT CERTIFICATION FOOTER NOTE */}
        <div className={`p-4 rounded-xl border shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold ${
          isDark ? 'bg-[#151517] border-[#353437] text-[#d0c5af]' : 'bg-white border-slate-200 text-slate-600'
        }`}>
          <div className="flex items-center gap-2">
            <span className={`material-symbols-outlined text-[18px] ${isDark ? 'text-[#f2ca50]' : 'text-amber-800'}`}>
              lock
            </span>
            <span>
              Cryptographically Signed Record ID: <span className={`font-mono ${isDark ? 'text-white' : 'text-slate-900'}`}>AETH-2024-T2-JV9482</span>
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span>Grading Scale: Standard 4.0 / Weighted 5.0 AP</span>
            <span>•</span>
            <button 
              onClick={onOpenTranscriptModal}
              className={`hover:underline flex items-center gap-1 cursor-pointer ${
                isDark ? 'text-[#f2ca50]' : 'text-amber-800'
              }`}
            >
              <span>Request Certified Registrar Seal</span>
              <span className="material-symbols-outlined text-[14px]">arrow_outward</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
