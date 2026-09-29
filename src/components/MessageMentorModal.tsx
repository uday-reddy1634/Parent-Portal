import React, { useState } from 'react';
import { ThemeMode } from '../types';
import { FACULTY_MENTORS } from '../data/mockData';

interface MessageMentorModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme: ThemeMode;
  initialFacultyName?: string;
}

export const MessageMentorModal: React.FC<MessageMentorModalProps> = ({
  isOpen,
  onClose,
  theme,
  initialFacultyName
}) => {
  const [faculty, setFaculty] = useState(initialFacultyName || FACULTY_MENTORS[0].name);
  const [subject, setSubject] = useState('Inquiry regarding Term 2 Rotational Dynamics Lab defense');
  const [message, setMessage] = useState('Dear Dr. Sterling, Julian has been preparing rigorously for the upcoming Lab defense on Oct 22. Could we confirm if the rubric requires supplemental LaTeX derivation proofs? Warm regards, Eleanor Vance.');
  const [sent, setSent] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => {
      setSent(false);
      onClose();
    }, 2000);
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

        {sent ? (
          <div className="py-8 flex flex-col items-center justify-center text-center">
            <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-3 shadow-lg ${
              isDark ? 'bg-[#d4af37] text-[#3c2f00]' : 'bg-amber-100 text-amber-800'
            }`}>
              <span className="material-symbols-outlined text-[32px]">forward_to_inbox</span>
            </div>
            <h3 className="font-headline-sm text-xl font-bold">Message Dispatched</h3>
            <p className={`font-body-sm text-sm mt-1 max-w-sm ${isDark ? 'text-[#d0c5af]' : 'text-slate-600'}`}>
              Your message has been securely sent to {faculty}'s encrypted faculty inbox.
            </p>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-2 mb-1">
              <span className={`w-2 h-2 rounded-full ${isDark ? 'bg-[#f2ca50]' : 'bg-amber-600'}`}></span>
              <span className={`font-label-sm text-xs uppercase tracking-wider font-semibold ${
                isDark ? 'text-[#f2ca50]' : 'text-amber-700'
              }`}>
                Direct Mentor Comms
              </span>
            </div>
            <h2 className="font-headline-sm text-2xl font-bold tracking-tight mb-4">
              Message Faculty Mentor
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
              <div className="flex flex-col gap-1">
                <label className={`font-label-sm text-xs font-semibold uppercase tracking-wider ${
                  isDark ? 'text-[#d0c5af]' : 'text-slate-700'
                }`}>
                  Recipient Faculty
                </label>
                <select
                  value={faculty}
                  onChange={(e) => setFaculty(e.target.value)}
                  className={`w-full p-2.5 rounded-xl border text-sm font-medium focus:outline-none transition-colors ${
                    isDark 
                      ? 'bg-[#201f22] border-[#353437] text-white focus:border-[#d4af37]' 
                      : 'bg-slate-50 border-slate-200 text-slate-800 focus:border-amber-600'
                  }`}
                >
                  {FACULTY_MENTORS.map((m) => (
                    <option key={m.id} value={m.name}>
                      {m.name} ({m.role})
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label className={`font-label-sm text-xs font-semibold uppercase tracking-wider ${
                  isDark ? 'text-[#d0c5af]' : 'text-slate-700'
                }`}>
                  Subject Line
                </label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className={`w-full p-2.5 rounded-xl border text-sm font-medium focus:outline-none ${
                    isDark 
                      ? 'bg-[#201f22] border-[#353437] text-white focus:border-[#d4af37]' 
                      : 'bg-slate-50 border-slate-200 text-slate-800 focus:border-amber-600'
                  }`}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className={`font-label-sm text-xs font-semibold uppercase tracking-wider ${
                  isDark ? 'text-[#d0c5af]' : 'text-slate-700'
                }`}>
                  Correspondence
                </label>
                <textarea
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className={`w-full p-2.5 rounded-xl border text-sm font-medium focus:outline-none resize-none leading-relaxed ${
                    isDark 
                      ? 'bg-[#201f22] border-[#353437] text-white focus:border-[#d4af37]' 
                      : 'bg-slate-50 border-slate-200 text-slate-800 focus:border-amber-600'
                  }`}
                />
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-colors cursor-pointer ${
                    isDark 
                      ? 'border-[#353437] text-[#d0c5af] hover:bg-[#201f22]' 
                      : 'border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`px-5 py-2 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer shadow-md ${
                    isDark
                      ? 'bg-[#d4af37] text-[#3c2f00] hover:bg-[#ffe088]'
                      : 'bg-amber-700 hover:bg-amber-800 text-white'
                  }`}
                >
                  Send Transmission
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};
