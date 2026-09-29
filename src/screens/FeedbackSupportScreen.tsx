import React, { useState } from 'react';
import { ThemeMode, FeedbackTicket } from '../types';
import { FEEDBACK_TICKETS } from '../data/mockData';

interface FeedbackSupportScreenProps {
  theme: ThemeMode;
}

export const FeedbackSupportScreen: React.FC<FeedbackSupportScreenProps> = ({ theme }) => {
  const [tickets, setTickets] = useState<FeedbackTicket[]>(FEEDBACK_TICKETS);
  const [department, setDepartment] = useState('Curriculum & Academic Rigor');
  const [subject, setSubject] = useState('');
  const [priority, setPriority] = useState<'standard' | 'urgent'>('standard');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [details, setDetails] = useState('');
  const [submittedCode, setSubmittedCode] = useState<string | null>(null);

  const isDark = theme === 'dark';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newCode = `TKT-${Math.floor(1000 + Math.random() * 9000)}`;
    const newTicket: FeedbackTicket = {
      id: `tkt-${Date.now()}`,
      code: newCode,
      department,
      subject,
      description: details,
      status: 'In Review by Dean',
      submittedDate: 'Today',
      assignedTo: 'Office of the Dean',
      priority,
      isAnonymous
    };

    setTickets(prev => [newTicket, ...prev]);
    setSubmittedCode(newCode);
    setSubject('');
    setDetails('');
  };

  return (
    <div className="flex flex-col w-full">
      <div className="w-full max-w-360 mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 py-5 sm:py-6 flex flex-col gap-8">
        {/* Feedback Introduction Banner */}
        <section className={`rounded-2xl border p-6 md:p-8 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 transition-colors ${
          isDark ? 'bg-[#1c1b1d] border-[#353437]' : 'bg-white border-slate-200/90'
        }`}>
          <div className="flex flex-col gap-2 max-w-xl">
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold w-fit border ${
              isDark ? 'bg-[#201f22] border-[#353437] text-[#f2ca50]' : 'bg-slate-100 border-slate-200 text-slate-800'
            }`}>
              <span className="material-symbols-outlined text-[16px] text-amber-700">shield_person</span>
              <span>Direct Concierge &amp; Governance Line</span>
            </div>
            <h1 className={`font-headline-lg text-2xl md:text-3xl font-bold tracking-tight ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}>
              Institutional Feedback &amp; Pastoral Support
            </h1>
            <p className={`text-xs md:text-sm leading-relaxed ${isDark ? 'text-[#d0c5af]' : 'text-slate-600'}`}>
              Aetheria Academy operates an open-door standard. Inquiries, pastoral welfare notifications, or facilities suggestions are reviewed with executive confidentiality.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <div className={`px-4 py-3 rounded-xl border flex flex-col items-center justify-center text-center ${
              isDark ? 'bg-[#201f22] border-[#353437]' : 'bg-slate-50 border-slate-200'
            }`}>
              <span className={`font-headline-sm text-lg font-bold ${isDark ? 'text-[#f2ca50]' : 'text-amber-800'}`}>24h</span>
              <span className="text-[11px] text-slate-400">Dean Review SLAs</span>
            </div>
            <div className={`px-4 py-3 rounded-xl border flex flex-col items-center justify-center text-center ${
              isDark ? 'bg-[#201f22] border-[#353437]' : 'bg-slate-50 border-slate-200'
            }`}>
              <span className="font-headline-sm text-lg font-bold text-emerald-600">100%</span>
              <span className="text-[11px] text-slate-400">Executive Discretion</span>
            </div>
          </div>
        </section>

        {submittedCode && (
          <div className={`p-4 rounded-xl border text-xs flex items-center justify-between shadow-sm ${
            isDark ? 'bg-[#201f22] border-[#f2ca50] text-white' : 'bg-emerald-50 border-emerald-300 text-emerald-950'
          }`}>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[20px] text-emerald-600">check_circle</span>
              <span>
                Thank you, Eleanor. Your inquiry has been securely dispatched to the Office of the Dean and registered under tracking code <strong>{submittedCode}</strong>.
              </span>
            </div>
            <button 
              onClick={() => setSubmittedCode(null)}
              className="text-slate-400 hover:text-slate-700 cursor-pointer font-bold px-2"
            >
              ✕
            </button>
          </div>
        )}

        {/* Feedback Grid: Compose Ticket & Ticket History */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
          {/* Left: Submit Feedback Form (7 Cols) */}
          <div className={`xl:col-span-7 rounded-2xl p-6 md:p-8 shadow-lg border flex flex-col gap-5 transition-colors ${
            isDark ? 'bg-[#1c1b1d] border-[#353437]' : 'bg-white border-slate-200/90'
          }`}>
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className={`font-headline-sm text-base md:text-lg font-bold flex items-center gap-2 ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}>
                <span className="material-symbols-outlined text-amber-600 text-[22px]">rate_review</span>
                <span>Submit Inquiries or Academy Feedback</span>
              </h3>
              <span className={`text-xs ${isDark ? 'text-[#99907c]' : 'text-slate-500'}`}>
                Confidential Channel
              </span>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {/* Category Selector */}
              <div className="flex flex-col gap-1.5">
                <label className={`font-label-sm text-xs font-semibold uppercase tracking-wider ${
                  isDark ? 'text-[#d0c5af]' : 'text-slate-700'
                }`}>
                  Department / Topic Category
                </label>
                <div className="relative">
                  <select 
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className={`w-full p-2.5 rounded-xl border text-xs md:text-sm font-medium focus:outline-none appearance-none cursor-pointer ${
                      isDark 
                        ? 'bg-[#201f22] border-[#353437] text-white focus:border-[#f2ca50]' 
                        : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-amber-600 focus:bg-white'
                    }`}
                  >
                    <option value="Curriculum & Academic Rigor">Curriculum &amp; Academic Rigor</option>
                    <option value="Campus Facilities & Innovation Labs">Campus Facilities &amp; Innovation Labs</option>
                    <option value="Transportation & Logistics">Executive Campus Logistics &amp; Transport</option>
                    <option value="Pastoral Care & Student Counseling">Pastoral Care &amp; Student Counseling</option>
                    <option value="Administrative Governance">Administrative Governance &amp; Policy</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-3 top-3 text-slate-400 pointer-events-none text-[18px]">
                    expand_more
                  </span>
                </div>
              </div>

              {/* Subject Line */}
              <div className="flex flex-col gap-1.5">
                <label className={`font-label-sm text-xs font-semibold uppercase tracking-wider ${
                  isDark ? 'text-[#d0c5af]' : 'text-slate-700'
                }`}>
                  Subject / Issue Summary
                </label>
                <input 
                  type="text"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="e.g. Schedule alignment for Robotics Olympiad and Physics Laboratory"
                  className={`w-full p-2.5 rounded-xl border text-xs md:text-sm font-medium focus:outline-none transition-colors ${
                    isDark 
                      ? 'bg-[#201f22] border-[#353437] text-white focus:border-[#f2ca50]' 
                      : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-amber-600 focus:bg-white'
                  }`}
                />
              </div>

              {/* Priority & Anonymous Radios */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className={`font-label-sm text-xs font-semibold uppercase tracking-wider ${
                    isDark ? 'text-[#d0c5af]' : 'text-slate-700'
                  }`}>
                    Inquiry Priority Tier
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setPriority('standard')}
                      className={`p-2.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                        priority === 'standard'
                          ? isDark ? 'bg-[#d4af37] text-[#3c2f00] border-[#d4af37]' : 'bg-amber-100 text-amber-900 border-amber-300'
                          : isDark ? 'bg-[#201f22] border-[#353437] text-[#d0c5af]' : 'bg-slate-50 border-slate-200 text-slate-600'
                      }`}
                    >
                      Standard Review
                    </button>
                    <button
                      type="button"
                      onClick={() => setPriority('urgent')}
                      className={`p-2.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                        priority === 'urgent'
                          ? 'bg-rose-100 text-rose-900 border-rose-400'
                          : isDark ? 'bg-[#201f22] border-[#353437] text-[#d0c5af]' : 'bg-slate-50 border-slate-200 text-slate-600'
                      }`}
                    >
                      Dean Urgent
                    </button>
                  </div>
                </div>

                {/* Anonymous Toggle */}
                <div className="flex flex-col justify-end">
                  <div className={`p-2.5 rounded-xl border flex items-center justify-between ${
                    isDark ? 'bg-[#201f22] border-[#353437]' : 'bg-slate-50 border-slate-200'
                  }`}>
                    <div className="flex flex-col">
                      <span className={`text-xs font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        Anonymous Submission
                      </span>
                      <span className={`text-[10px] ${isDark ? 'text-[#99907c]' : 'text-slate-500'}`}>
                        Withholds Eleanor Vance's ID
                      </span>
                    </div>
                    <input 
                      type="checkbox"
                      checked={isAnonymous}
                      onChange={(e) => setIsAnonymous(e.target.checked)}
                      className="accent-amber-600 h-4 w-4 rounded cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              {/* Detailed Feedback Description */}
              <div className="flex flex-col gap-1.5">
                <label className={`font-label-sm text-xs font-semibold uppercase tracking-wider ${
                  isDark ? 'text-[#d0c5af]' : 'text-slate-700'
                }`}>
                  Detailed Perspective or Inquiries
                </label>
                <textarea 
                  rows={4}
                  required
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  placeholder="Please elaborate on your observation, inquiry, or suggestion for academy leadership..."
                  className={`w-full p-3 rounded-xl border text-xs md:text-sm font-medium focus:outline-none resize-none leading-relaxed transition-colors ${
                    isDark 
                      ? 'bg-[#201f22] border-[#353437] text-white focus:border-[#f2ca50]' 
                      : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-amber-600 focus:bg-white'
                  }`}
                />
              </div>

              {/* Submit Ticket */}
              <button 
                type="submit"
                className={`w-full py-3 px-6 rounded-xl font-bold text-xs md:text-sm transition-all duration-300 shadow-md flex items-center justify-center gap-2 cursor-pointer ${
                  isDark
                    ? 'bg-[#d4af37] text-[#3c2f00] hover:bg-[#ffe088] shadow-[0_0_20px_rgba(212,175,55,0.3)]'
                    : 'bg-amber-700 hover:bg-amber-800 text-white'
                }`}
              >
                <span className="material-symbols-outlined text-[20px]">assignment_turned_in</span>
                <span>Register Inquiries with Dean</span>
              </button>
            </form>
          </div>

          {/* Right: Past Feedback / Case Tickets (5 Cols) */}
          <div className="xl:col-span-5 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h3 className={`font-headline-sm text-base md:text-lg font-bold ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}>
                Registered Inquiries
              </h3>
              <span className={`text-xs ${isDark ? 'text-[#99907c]' : 'text-slate-500'}`}>
                Current Status
              </span>
            </div>

            <div className="flex flex-col gap-3">
              {tickets.map((t) => (
                <div 
                  key={t.id}
                  className={`p-4 rounded-2xl border shadow-sm flex flex-col gap-2 transition-colors ${
                    isDark ? 'bg-[#1c1b1d] border-[#353437]' : 'bg-white border-slate-200/90'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className={`text-xs font-semibold block ${isDark ? 'text-[#f2ca50]' : 'text-amber-800'}`}>
                        {t.code} • {t.department}
                      </span>
                      <h4 className={`font-semibold text-xs md:text-sm mt-0.5 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        {t.subject}
                      </h4>
                    </div>
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold whitespace-nowrap border ${
                      t.status === 'Resolved'
                        ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20'
                        : isDark ? 'bg-[#d4af37]/20 text-[#f2ca50] border-[#d4af37]/40' : 'bg-amber-50 text-amber-900 border-amber-200'
                    }`}>
                      {t.status}
                    </span>
                  </div>

                  <p className={`text-xs leading-relaxed ${isDark ? 'text-[#d0c5af]' : 'text-slate-600'}`}>
                    {t.description}
                  </p>

                  <div className={`pt-2 flex items-center justify-between text-[11px] border-t ${
                    isDark ? 'border-[#2a2a2c] text-[#99907c]' : 'border-slate-100 text-slate-500'
                  }`}>
                    <span>Submitted: {t.submittedDate}</span>
                    <span className={`flex items-center gap-1 font-semibold ${
                      t.status === 'Resolved' ? 'text-emerald-600' : isDark ? 'text-[#f2ca50]' : 'text-slate-800'
                    }`}>
                      <span className="material-symbols-outlined text-[15px]">
                        {t.status === 'Resolved' ? 'check_circle' : 'chat_bubble'}
                      </span>
                      {t.assignedTo}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Direct Line Card */}
            <div className={`p-4 rounded-2xl border flex items-center gap-3.5 shadow-sm ${
              isDark ? 'bg-[#201f22] border-[#353437]' : 'bg-slate-100/90 border-slate-200'
            }`}>
              <span className={`material-symbols-outlined text-[28px] ${
                isDark ? 'text-[#f2ca50]' : 'text-amber-700'
              }`}>
                lock
              </span>
              <div className="flex flex-col text-xs">
                <span className={`font-bold font-title-sm text-sm ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Urgent Pastoral Concierge
                </span>
                <span className={isDark ? 'text-[#d0c5af]' : 'text-slate-600'}>
                  For immediate confidential student matters, contact the Headmaster's direct liaison at{' '}
                  <span className={`font-semibold underline cursor-pointer ${
                    isDark ? 'text-[#f2ca50]' : 'text-amber-800'
                  }`}>
                    concierge@aetheria.edu
                  </span>.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
