import React, { useState } from 'react';
import { ThemeMode, CommendationArchive } from '../types';
import { FACULTY_MENTORS, COMMENDATION_ARCHIVES } from '../data/mockData';

interface ThankTeachersScreenProps {
  theme: ThemeMode;
  preselectedTeacher?: string;
  defaultSubTab?: 'recognition' | 'feedback';
  onNavigateToFeedback?: () => void;
}

export const ThankTeachersScreen: React.FC<ThankTeachersScreenProps> = ({
  theme,
  preselectedTeacher,
  defaultSubTab = 'recognition',
  onNavigateToFeedback
}) => {
  const [subTab, setSubTab] = useState<'recognition' | 'feedback'>(defaultSubTab);
  const [selectedRecipient, setSelectedRecipient] = useState(preselectedTeacher || FACULTY_MENTORS[0].name);
  const [selectedCategory, setSelectedCategory] = useState('Inspiring Mentorship');
  const [selectedInsignia, setSelectedInsignia] = useState('distinguished');
  const [commMessage, setCommMessage] = useState(
    "Dear Dr. Sterling, we are profoundly grateful for the patience and deep intellectual rigor you have imparted to Julian this semester. Your after-hours physics discussions have truly ignited his academic ambition."
  );
  const [forwardToDean, setForwardToDean] = useState(true);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [archives, setArchives] = useState<CommendationArchive[]>(COMMENDATION_ARCHIVES);

  const isDark = theme === 'dark';

  const handleSelectTeacherCard = (mentor: typeof FACULTY_MENTORS[0]) => {
    setSelectedRecipient(mentor.name);
    setCommMessage(
      `Dear ${mentor.name}, we want to formally commend your dedication in ${mentor.role}. Your guidance has significantly enriched Julian's passion for scholarly excellence.`
    );
  };

  const handleSendCommendation = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuccessToast(true);

    const newArchive: CommendationArchive = {
      id: `comm-${Date.now()}`,
      toFaculty: selectedRecipient,
      initials: selectedRecipient.split(' ').map(n => n[0]).join('').slice(0, 2),
      date: 'Today',
      honorCategory: selectedCategory,
      parentNote: commMessage,
      status: 'Placed in Faculty Dossier',
      deanNotified: forwardToDean
    };

    setArchives(prev => [newArchive, ...prev]);
  };

  return (
    <div className="flex flex-col w-full">
      <div className="relative w-full max-w-360 mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 py-5 sm:py-6">
        {/* Ambient Glows */}
        <div className={`absolute top-6 left-1/4 w-96 h-96 rounded-full blur-3xl pointer-events-none -z-10 ${
          isDark ? 'bg-[#f2ca50]/5' : 'bg-amber-100/50'
        }`}></div>
        <div className={`absolute top-44 right-12 w-80 h-80 rounded-full blur-3xl pointer-events-none -z-10 ${
          isDark ? 'bg-[#c8cee3]/5' : 'bg-blue-50/70'
        }`}></div>

        {/* Header Section */}
        <header className="flex flex-col gap-1 pb-6">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest">
            <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${
              isDark ? 'bg-[#f2ca50]' : 'bg-amber-600'
            }`}></span>
            <span className={isDark ? 'text-[#f2ca50]' : 'text-amber-800'}>
              Aetheria Honors &amp; Community Dialogue
            </span>
            <span className={isDark ? 'text-[#4d4635]' : 'text-slate-300'}>/</span>
            <span className={isDark ? 'text-[#d0c5af]' : 'text-slate-600'}>
              Julian Vance (Grade 11-A)
            </span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mt-1">
            <div>
              <h1 className={`font-headline-lg text-3xl md:text-4xl font-bold tracking-tight ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}>
                Teacher Recognition &amp; Parent Feedback
              </h1>
              <p className={`text-xs md:text-sm max-w-2xl mt-1 leading-relaxed ${
                isDark ? 'text-[#d0c5af]' : 'text-slate-600'
              }`}>
                Celebrate outstanding faculty contributions and share thoughtful perspectives directly with academy leadership and dean councils.
              </p>
            </div>

            {/* Mode Toggle Tabs */}
            <div className={`flex items-center p-1 rounded-full border shadow-sm ${
              isDark ? 'bg-[#1c1b1d] border-[#353437]' : 'bg-white border-slate-200'
            }`}>
              <button 
                onClick={() => setSubTab('recognition')}
                className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 cursor-pointer ${
                  subTab === 'recognition'
                    ? isDark 
                      ? 'bg-[#d4af37] text-[#3c2f00] shadow-[0_0_16px_rgba(212,175,55,0.25)]' 
                      : 'bg-amber-700 text-white shadow-sm'
                    : isDark 
                      ? 'text-[#d0c5af] hover:text-white' 
                      : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">verified</span>
                <span>Thank a Teacher</span>
              </button>
              <button 
                onClick={() => {
                  if (onNavigateToFeedback) {
                    onNavigateToFeedback();
                  } else {
                    setSubTab('feedback');
                  }
                }}
                className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 cursor-pointer ${
                  subTab === 'feedback'
                    ? isDark 
                      ? 'bg-[#d4af37] text-[#3c2f00] shadow-[0_0_16px_rgba(212,175,55,0.25)]' 
                      : 'bg-amber-700 text-white shadow-sm'
                    : isDark 
                      ? 'text-[#d0c5af] hover:text-white' 
                      : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">support_agent</span>
                <span>Academy Feedback &amp; Inquiries</span>
              </button>
            </div>
          </div>
        </header>

        {subTab === 'recognition' ? (
          <div className="flex flex-col gap-8">
            {/* Hero Narrative Banner */}
            <section className={`relative overflow-hidden rounded-2xl border shadow-sm p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 transition-colors ${
              isDark 
                ? 'bg-[#1c1b1d] border-[#353437]' 
                : 'bg-linear-to-r from-amber-50/70 via-white to-orange-50/50 border-amber-200/70'
            }`}>
              <div className="flex flex-col gap-2 max-w-xl z-10">
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold w-fit border ${
                  isDark 
                    ? 'bg-[#201f22] border-[#353437] text-[#f2ca50]' 
                    : 'bg-amber-100/80 border-amber-300/50 text-amber-900'
                }`}>
                  <span className={`material-symbols-outlined text-[16px] ${isDark ? 'text-[#f2ca50]' : 'text-amber-800'}`} style={{ fontVariationSettings: "'FILL' 1" }}>
                    workspace_premium
                  </span>
                  <span>Faculty Excellence Fellowship</span>
                </div>
                <h2 className={`font-headline-md text-2xl md:text-3xl font-bold tracking-tight ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}>
                  Express Gratitude to Julian's Educators
                </h2>
                <p className={`text-xs md:text-sm leading-relaxed ${isDark ? 'text-[#d0c5af]' : 'text-slate-600'}`}>
                  Notes composed here are archived into the educators' permanent professional portfolios and presented during biannual board excellence reviews. Honor their mentorship with tangible commendations.
                </p>
                <div className="flex items-center gap-3 pt-2">
                  <div className="flex -space-x-2">
                    <span className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ring-2 ${
                      isDark ? 'bg-[#f2ca50] text-[#3c2f00] ring-[#1c1b1d]' : 'bg-amber-700 text-white ring-white'
                    }`}>
                      4
                    </span>
                    <span className={`w-8 h-8 rounded-full flex items-center justify-center text-xs ring-2 ${
                      isDark ? 'bg-[#2a2a2c] text-white ring-[#1c1b1d]' : 'bg-slate-100 text-slate-700 ring-white'
                    }`}>
                      <span className="material-symbols-outlined text-[16px]">school</span>
                    </span>
                    <span className={`w-8 h-8 rounded-full flex items-center justify-center text-xs ring-2 ${
                      isDark ? 'bg-[#353437] text-[#f2ca50] ring-[#1c1b1d]' : 'bg-amber-100 text-amber-800 ring-white'
                    }`}>
                      <span className="material-symbols-outlined text-[16px]">star</span>
                    </span>
                  </div>
                  <span className={`text-xs font-semibold ${isDark ? 'text-[#99907c]' : 'text-slate-500'}`}>
                    Current Term: 4 Faculty Assigned
                  </span>
                </div>
              </div>

              {/* Decorative Faculty Metric Vignette */}
              <div className="w-full md:w-auto shrink-0 flex items-center justify-center">
                <div className={`relative w-72 h-44 rounded-2xl border p-5 flex flex-col justify-between shadow-md ${
                  isDark ? 'bg-[#201f22] border-[#353437]' : 'bg-white border-slate-200/90'
                }`}>
                  <div className="flex justify-between items-start">
                    <div>
                      <span className={`text-xs block ${isDark ? 'text-[#99907c]' : 'text-slate-500'}`}>
                        Julian's Engagement
                      </span>
                      <span className={`text-sm font-bold font-title-sm ${
                        isDark ? 'text-[#f2ca50]' : 'text-amber-800'
                      }`}>
                        Top 2% Scholastic Growth
                      </span>
                    </div>
                    <span className={`material-symbols-outlined text-[28px] ${
                      isDark ? 'text-[#f2ca50]' : 'text-amber-700'
                    }`} style={{ fontVariationSettings: "'FILL' 1" }}>
                      military_tech
                    </span>
                  </div>
                  <div className={`flex items-center gap-3 pt-3 border-t ${
                    isDark ? 'border-[#353437]' : 'border-slate-100'
                  }`}>
                    <svg className={`w-16 h-10 shrink-0 ${isDark ? 'text-[#f2ca50]' : 'text-amber-700'}`} fill="none" viewBox="0 0 64 36">
                      <path d="M2 30 L18 22 L34 26 L50 10 L62 4" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5"></path>
                      <circle cx="62" cy="4" fill="currentColor" r="3"></circle>
                    </svg>
                    <p className={`text-xs leading-snug ${isDark ? 'text-[#d0c5af]' : 'text-slate-600'}`}>
                      Reflected through Dr. Sterling &amp; Prof. Rostova's customized honors tracks.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Main Dual Grid: Faculty Directory & Compose Console */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
              {/* Left: Faculty Cards Directory (7 Cols) */}
              <div className="xl:col-span-7 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <h3 className={`font-headline-sm text-lg font-bold flex items-center gap-2 ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}>
                    <span>Julian's Mentors &amp; Instructors</span>
                    <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold border ${
                      isDark ? 'bg-[#d4af37]/20 text-[#f2ca50] border-[#d4af37]/40' : 'bg-amber-100 text-amber-900 border-amber-200'
                    }`}>
                      Semester II
                    </span>
                  </h3>
                  <span className={`text-xs ${isDark ? 'text-[#99907c]' : 'text-slate-500'}`}>
                    Select mentor to recognize
                  </span>
                </div>

                {/* Faculty Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {FACULTY_MENTORS.map((m) => (
                    <article
                      key={m.id}
                      onClick={() => handleSelectTeacherCard(m)}
                      className={`group relative p-5 rounded-2xl border transition-all duration-300 flex flex-col justify-between shadow-sm cursor-pointer ${
                        selectedRecipient === m.name
                          ? isDark ? 'bg-[#201f22] border-[#f2ca50] shadow-[0_0_20px_rgba(242,202,80,0.15)]' : 'bg-amber-50/40 border-amber-400 shadow-md'
                          : isDark ? 'bg-[#1c1b1d] border-[#353437] hover:border-[#f2ca50]/50' : 'bg-white border-slate-200/80 hover:border-amber-400 hover:shadow-md'
                      }`}
                    >
                      <div className="flex flex-col gap-3">
                        <div className="flex items-start gap-3">
                          <div className="relative shrink-0">
                            <img 
                              alt={m.name} 
                              className="w-14 h-14 rounded-xl object-cover ring-1 ring-slate-200"
                              src={m.avatar}
                              referrerPolicy="no-referrer"
                            />
                            <span className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border shadow flex items-center justify-center text-[11px] ${
                              isDark ? 'bg-[#0e0e10] border-[#353437] text-[#f2ca50]' : 'bg-white border-slate-200 text-amber-800'
                            }`}>
                              <span className="material-symbols-outlined text-[13px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                                {m.iconName}
                              </span>
                            </span>
                          </div>
                          <div className="flex flex-col min-w-0">
                            <h4 className={`font-semibold text-sm truncate transition-colors ${
                              isDark ? 'text-white group-hover:text-[#f2ca50]' : 'text-slate-900 group-hover:text-amber-800'
                            }`}>
                              {m.name}
                            </h4>
                            <span className={`text-xs font-semibold ${isDark ? 'text-[#f2ca50]' : 'text-amber-800'}`}>
                              {m.role}
                            </span>
                            <span className={`text-xs truncate ${isDark ? 'text-[#99907c]' : 'text-slate-500'}`}>
                              {m.gradeBadge}
                            </span>
                          </div>
                        </div>

                        <div className={`p-3 rounded-xl border text-xs leading-relaxed ${
                          isDark ? 'bg-[#201f22] border-[#2a2a2c] text-[#d0c5af]' : 'bg-slate-50 border-slate-100 text-slate-700'
                        }`}>
                          <span className={`font-semibold ${isDark ? 'text-[#f2ca50]' : 'text-amber-900'}`}>Latest Note:</span> "{m.latestNote}"
                        </div>
                      </div>

                      <div className={`pt-3 mt-2 flex items-center justify-between border-t ${
                        isDark ? 'border-[#2a2a2c]' : 'border-slate-100'
                      }`}>
                        <span className={`text-xs flex items-center gap-1 font-medium ${
                          isDark ? 'text-[#99907c]' : 'text-slate-500'
                        }`}>
                          <span className="material-symbols-outlined text-[15px]">history_edu</span>
                          {m.honorsIssuedCount} Honors Issued
                        </span>
                        <span className={`inline-flex items-center gap-1 text-xs font-semibold transition-all group-hover:translate-x-0.5 ${
                          isDark ? 'text-[#f2ca50]' : 'text-amber-800'
                        }`}>
                          Draft Note <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                        </span>
                      </div>
                    </article>
                  ))}
                </div>

                {/* Academic Impact Mini-Banner */}
                <div className={`p-4 rounded-2xl border flex items-center justify-between gap-4 shadow-sm ${
                  isDark ? 'bg-[#1c1b1d] border-[#353437]' : 'bg-white border-slate-200/90'
                }`}>
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border ${
                      isDark ? 'bg-[#201f22] border-[#353437] text-[#f2ca50]' : 'bg-amber-100 border-amber-200 text-amber-900'
                    }`}>
                      <span className="material-symbols-outlined text-[20px]">emoji_events</span>
                    </div>
                    <div className="flex flex-col">
                      <span className={`font-title-sm text-xs md:text-sm font-bold ${
                        isDark ? 'text-white' : 'text-slate-900'
                      }`}>
                        Dean's Faculty Commendation Round
                      </span>
                      <span className={`text-xs ${isDark ? 'text-[#d0c5af]' : 'text-slate-600'}`}>
                        Guardian testimonials directly influence Faculty Sabbatical Grants and Endowments.
                      </span>
                    </div>
                  </div>
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full border whitespace-nowrap ${
                    isDark ? 'bg-[#d4af37]/20 text-[#f2ca50] border-[#d4af37]/40' : 'bg-amber-100 text-amber-900 border-amber-300'
                  }`}>
                    Closing Dec 18
                  </span>
                </div>
              </div>

              {/* Right: Compose Commendation Note Form (5 Cols) */}
              <div className={`xl:col-span-5 rounded-2xl p-6 shadow-xl border flex flex-col gap-4 relative transition-colors ${
                isDark ? 'bg-[#1c1b1d] border-[#353437]' : 'bg-white border-slate-200/90'
              }`}>
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className={`material-symbols-outlined text-[22px] ${
                      isDark ? 'text-[#f2ca50]' : 'text-amber-700'
                    }`} style={{ fontVariationSettings: "'FILL' 1" }}>
                      edit_note
                    </span>
                    <h3 className={`font-headline-sm text-base md:text-lg font-bold ${
                      isDark ? 'text-white' : 'text-slate-900'
                    }`}>
                      Commendation Portal
                    </h3>
                  </div>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${
                    isDark ? 'bg-[#201f22] text-[#f2ca50] border-[#353437]' : 'bg-amber-50 text-amber-900 border-amber-200'
                  }`}>
                    Permanent Record
                  </span>
                </div>

                <form onSubmit={handleSendCommendation} className="flex flex-col gap-4">
                  {/* Recipient Select */}
                  <div className="flex flex-col gap-1.5">
                    <label className={`font-label-sm text-xs font-semibold uppercase tracking-wider ${
                      isDark ? 'text-[#d0c5af]' : 'text-slate-700'
                    }`}>
                      Designated Faculty Recipient
                    </label>
                    <div className="relative">
                      <select 
                        value={selectedRecipient}
                        onChange={(e) => setSelectedRecipient(e.target.value)}
                        className={`w-full p-2.5 rounded-xl border text-xs md:text-sm font-medium focus:outline-none transition-colors appearance-none cursor-pointer ${
                          isDark 
                            ? 'bg-[#201f22] border-[#353437] text-white focus:border-[#f2ca50]' 
                            : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-amber-600 focus:bg-white'
                        }`}
                      >
                        {FACULTY_MENTORS.map((m) => (
                          <option key={m.id} value={m.name}>
                            {m.name} ({m.role})
                          </option>
                        ))}
                      </select>
                      <span className="material-symbols-outlined absolute right-3 top-2.5 text-slate-400 pointer-events-none text-[18px]">
                        expand_more
                      </span>
                    </div>
                  </div>

                  {/* Recognition Category Badges */}
                  <div className="flex flex-col gap-1.5">
                    <label className={`font-label-sm text-xs font-semibold uppercase tracking-wider ${
                      isDark ? 'text-[#d0c5af]' : 'text-slate-700'
                    }`}>
                      Recognition Citation Category
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { label: 'Inspiring Mentorship', icon: 'lightbulb' },
                        { label: 'Academic Rigor', icon: 'auto_graph' },
                        { label: 'Empathetic Guidance', icon: 'volunteer_activism' },
                        { label: 'Exceptional Dedication', icon: 'diamond' }
                      ].map((cat) => {
                        const isSelected = selectedCategory === cat.label;
                        return (
                          <button
                            key={cat.label}
                            type="button"
                            onClick={() => setSelectedCategory(cat.label)}
                            className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer text-left ${
                              isSelected
                                ? isDark 
                                  ? 'bg-[#d4af37] text-[#3c2f00] border-[#d4af37] shadow-sm' 
                                  : 'bg-amber-100 text-amber-950 border-amber-400 shadow-sm'
                                : isDark
                                  ? 'bg-[#201f22] border-[#353437] text-[#d0c5af] hover:text-white hover:bg-[#2a2a2c]'
                                  : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                            }`}
                          >
                            <span className="material-symbols-outlined text-[16px]">{cat.icon}</span>
                            <span className="truncate">{cat.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Digital Accolade Insignia */}
                  <div className="flex flex-col gap-1.5">
                    <label className={`font-label-sm text-xs font-semibold uppercase tracking-wider ${
                      isDark ? 'text-[#d0c5af]' : 'text-slate-700'
                    }`}>
                      Attach Digital Accolade Insignia
                    </label>
                    <div className="flex items-center gap-2">
                      {[
                        { id: 'distinguished', label: 'Distinguished Master', icon: 'star' },
                        { id: 'illuminator', label: 'Mind Illuminator', icon: 'flare' },
                        { id: 'pillar', label: 'Pillar of Wisdom', icon: 'foundation' }
                      ].map((badge) => {
                        const isSelected = selectedInsignia === badge.id;
                        return (
                          <label key={badge.id} className="flex-1 cursor-pointer">
                            <input
                              type="radio"
                              name="insignia"
                              value={badge.id}
                              checked={isSelected}
                              onChange={() => setSelectedInsignia(badge.id)}
                              className="sr-only"
                            />
                            <div className={`p-2 rounded-xl border flex items-center justify-center gap-1.5 transition-all text-center ${
                              isSelected
                                ? isDark
                                  ? 'bg-[#d4af37]/30 border-[#f2ca50] text-[#f2ca50]'
                                  : 'bg-amber-100 border-amber-400 text-amber-950 font-bold'
                                : isDark
                                  ? 'bg-[#201f22] border-[#353437] text-[#99907c]'
                                  : 'bg-slate-50 border-slate-200 text-slate-600'
                            }`}>
                              <span className="material-symbols-outlined text-[16px]">{badge.icon}</span>
                              <span className="text-[11px] font-semibold">{badge.label}</span>
                            </div>
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  {/* Personal Message Field */}
                  <div className="flex flex-col gap-1.5">
                    <div className="flex justify-between items-center text-xs">
                      <label className={`font-label-sm font-semibold uppercase tracking-wider ${
                        isDark ? 'text-[#d0c5af]' : 'text-slate-700'
                      }`}>
                        Guardian's Letter of Appreciation
                      </label>
                      <span className={`text-[11px] ${isDark ? 'text-[#99907c]' : 'text-slate-400'}`}>
                        {commMessage.length} / 600
                      </span>
                    </div>
                    <textarea 
                      rows={4}
                      value={commMessage}
                      maxLength={600}
                      onChange={(e) => setCommMessage(e.target.value)}
                      className={`w-full p-3 rounded-xl border text-xs md:text-sm focus:outline-none resize-none leading-relaxed transition-colors ${
                        isDark 
                          ? 'bg-[#201f22] border-[#353437] text-white focus:border-[#f2ca50]' 
                          : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-amber-600 focus:bg-white'
                      }`}
                      placeholder="Write your words of gratitude and recognition..."
                    />
                  </div>

                  {/* Leadership Visibility Toggle */}
                  <div className={`p-3 rounded-xl border flex items-start gap-3 ${
                    isDark ? 'bg-[#201f22] border-[#353437]' : 'bg-slate-50 border-slate-200'
                  }`}>
                    <input 
                      type="checkbox"
                      id="dean-copy"
                      checked={forwardToDean}
                      onChange={(e) => setForwardToDean(e.target.checked)}
                      className="mt-1 accent-amber-600 h-4 w-4 rounded cursor-pointer"
                    />
                    <label htmlFor="dean-copy" className="cursor-pointer select-none">
                      <span className={`font-semibold text-xs block ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        Forward to Headmaster &amp; Dean of Academic Affairs
                      </span>
                      <span className={`text-[11px] block leading-tight ${isDark ? 'text-[#99907c]' : 'text-slate-500'}`}>
                        Official copy will be registered under the Faculty Merit Ledger for Julian's academic year.
                      </span>
                    </label>
                  </div>

                  {/* Submit Button */}
                  <button 
                    type="submit"
                    className={`w-full py-3 px-6 rounded-xl font-bold text-xs md:text-sm transition-all duration-300 shadow-md flex items-center justify-center gap-2 cursor-pointer ${
                      isDark
                        ? 'bg-[#d4af37] text-[#3c2f00] hover:bg-[#ffe088] shadow-[0_0_20px_rgba(212,175,55,0.3)]'
                        : 'bg-amber-700 hover:bg-amber-800 text-white'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                      send
                    </span>
                    <span>Transmit Formal Commendation</span>
                  </button>
                </form>

                {/* Toast Notification Banner */}
                {showSuccessToast && (
                  <div className={`absolute inset-0 backdrop-blur-md rounded-2xl flex flex-col items-center justify-center p-6 text-center z-20 border ${
                    isDark ? 'bg-[#1c1b1d]/95 border-[#f2ca50]' : 'bg-white/95 border-amber-300'
                  }`}>
                    <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-3 shadow-lg ${
                      isDark ? 'bg-[#d4af37] text-[#3c2f00]' : 'bg-amber-100 text-amber-800'
                    }`}>
                      <span className="material-symbols-outlined text-[32px]">mark_email_read</span>
                    </div>
                    <h4 className={`font-headline-sm text-xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      Commendation Delivered
                    </h4>
                    <p className={`text-xs mt-1 mb-4 max-w-xs ${isDark ? 'text-[#d0c5af]' : 'text-slate-600'}`}>
                      Your note has been transmitted to {selectedRecipient} and officially logged with the Office of Academic Affairs.
                    </p>
                    <button 
                      onClick={() => setShowSuccessToast(false)}
                      className={`px-5 py-2 rounded-xl text-xs font-semibold cursor-pointer shadow-sm ${
                        isDark ? 'bg-[#2a2a2c] text-white hover:bg-[#353437]' : 'bg-slate-900 text-white hover:bg-slate-800'
                      }`}
                    >
                      Compose Another Commendation
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Sent Appreciation Wall & Faculty Acknowledgments History */}
            <section className="flex flex-col gap-4 mt-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={`material-symbols-outlined text-[22px] ${isDark ? 'text-[#f2ca50]' : 'text-amber-800'}`}>
                    history
                  </span>
                  <h3 className={`font-headline-sm text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    Guardian Commendation Archives &amp; Faculty Responses
                  </h3>
                </div>
                <span className={`text-xs ${isDark ? 'text-[#99907c]' : 'text-slate-500'}`}>
                  Logged during 2023-2024 Academic Calendar
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {archives.map((item) => (
                  <div 
                    key={item.id}
                    className={`rounded-2xl border p-5 shadow-sm flex flex-col justify-between gap-4 transition-colors ${
                      isDark ? 'bg-[#1c1b1d] border-[#353437]' : 'bg-white border-slate-200/90'
                    }`}
                  >
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <span className={`w-8 h-8 rounded-full border flex items-center justify-center text-xs font-bold ${
                            isDark ? 'bg-[#201f22] border-[#353437] text-[#f2ca50]' : 'bg-amber-100 border-amber-200 text-amber-900'
                          }`}>
                            {item.initials}
                          </span>
                          <div>
                            <span className={`font-semibold text-xs md:text-sm block ${isDark ? 'text-white' : 'text-slate-900'}`}>
                              To {item.toFaculty}
                            </span>
                            <span className={`text-[11px] ${isDark ? 'text-[#99907c]' : 'text-slate-500'}`}>
                              {item.date} • {item.honorCategory}
                            </span>
                          </div>
                        </div>
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
                          item.facultyResponse
                            ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20'
                            : isDark ? 'bg-[#2a2a2c] text-[#d0c5af] border-[#353437]' : 'bg-slate-100 text-slate-600 border-slate-200'
                        }`}>
                          {item.facultyResponse ? 'Faculty Replied' : 'Archived'}
                        </span>
                      </div>

                      <div className={`p-3 rounded-xl border text-xs italic ${
                        isDark ? 'bg-[#201f22] border-[#2a2a2c] text-[#d0c5af]' : 'bg-slate-50 border-slate-200/60 text-slate-700'
                      }`}>
                        "{item.parentNote}"
                      </div>

                      {item.facultyResponse && (
                        <div className={`p-3 rounded-xl border flex flex-col gap-1 ${
                          isDark ? 'bg-[#201f22]/80 border-[#d4af37]/30' : 'bg-amber-50/70 border-amber-200/80'
                        }`}>
                          <div className={`flex items-center justify-between text-xs font-semibold ${
                            isDark ? 'text-[#f2ca50]' : 'text-amber-900'
                          }`}>
                            <span className="flex items-center gap-1">
                              <span className="material-symbols-outlined text-[15px]">reply</span>
                              Response from {item.toFaculty.split(' ')[0]}
                            </span>
                            <span className={`text-[11px] font-normal ${isDark ? 'text-[#99907c]' : 'text-slate-400'}`}>
                              {item.facultyResponse.date}
                            </span>
                          </div>
                          <p className={`text-xs ${isDark ? 'text-white' : 'text-slate-800'}`}>
                            "{item.facultyResponse.message}"
                          </p>
                        </div>
                      )}
                    </div>

                    <div className={`flex items-center justify-between pt-2 border-t text-[11px] ${
                      isDark ? 'border-[#2a2a2c] text-[#99907c]' : 'border-slate-100 text-slate-500'
                    }`}>
                      <span>Status: {item.status}</span>
                      <span className={`font-semibold flex items-center gap-1 ${isDark ? 'text-[#f2ca50]' : 'text-amber-800'}`}>
                        <span className="material-symbols-outlined text-[15px]">done_all</span> Dean Notified
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        ) : (
          /* Sub-tab 2: Academy Feedback & Inquiries */
          <div className="flex flex-col gap-6">
            <section className={`rounded-2xl border p-6 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4 ${
              isDark ? 'bg-[#1c1b1d] border-[#353437]' : 'bg-white border-slate-200/90'
            }`}>
              <div className="flex flex-col gap-1 max-w-xl">
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold w-fit border ${
                  isDark ? 'bg-[#201f22] border-[#353437] text-[#f2ca50]' : 'bg-slate-100 border-slate-200 text-slate-800'
                }`}>
                  <span className="material-symbols-outlined text-[16px] text-amber-700">shield_person</span>
                  <span>Direct Concierge &amp; Governance Line</span>
                </div>
                <h2 className={`font-headline-md text-xl md:text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Institutional Feedback &amp; Pastoral Support
                </h2>
                <p className={`text-xs md:text-sm ${isDark ? 'text-[#d0c5af]' : 'text-slate-600'}`}>
                  Aetheria Academy operates an open-door standard. Inquiries, pastoral welfare notifications, or facilities suggestions are reviewed with executive confidentiality.
                </p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <div className={`px-4 py-2.5 rounded-xl border flex flex-col items-center justify-center text-center ${
                  isDark ? 'bg-[#201f22] border-[#353437]' : 'bg-slate-50 border-slate-200'
                }`}>
                  <span className={`font-headline-sm text-base font-bold ${isDark ? 'text-[#f2ca50]' : 'text-amber-800'}`}>24h</span>
                  <span className="text-[11px] text-slate-400">Dean Review SLAs</span>
                </div>
                <div className={`px-4 py-2.5 rounded-xl border flex flex-col items-center justify-center text-center ${
                  isDark ? 'bg-[#201f22] border-[#353437]' : 'bg-slate-50 border-slate-200'
                }`}>
                  <span className="font-headline-sm text-base font-bold text-emerald-600">100%</span>
                  <span className="text-[11px] text-slate-400">Executive Discretion</span>
                </div>
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  );
};
