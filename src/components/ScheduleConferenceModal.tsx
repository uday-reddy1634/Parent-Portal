import React, { useState } from 'react';
import { ThemeMode } from '../types';
import { FACULTY_MENTORS } from '../data/mockData';

interface ScheduleConferenceModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme: ThemeMode;
}

export const ScheduleConferenceModal: React.FC<ScheduleConferenceModalProps> = ({
  isOpen,
  onClose,
  theme
}) => {
  const [selectedFaculty, setSelectedFaculty] = useState(FACULTY_MENTORS[0].name);
  const [date, setDate] = useState('2024-11-08');
  const [timeSlot, setTimeSlot] = useState('03:30 PM - 04:00 PM');
  const [format, setFormat] = useState<'in-person' | 'virtual'>('in-person');
  const [notes, setNotes] = useState('Discussion regarding Julian\'s physics Olympiad trajectory and university recommendations.');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
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

        {isSuccess ? (
          <div className="py-8 flex flex-col items-center justify-center text-center">
            <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-3 shadow-lg ${
              isDark ? 'bg-[#d4af37] text-[#3c2f00]' : 'bg-amber-100 text-amber-800'
            }`}>
              <span className="material-symbols-outlined text-[32px]">check_circle</span>
            </div>
            <h3 className="font-headline-sm text-xl font-bold">Conference Confirmed</h3>
            <p className={`font-body-sm text-sm mt-1 max-w-sm ${isDark ? 'text-[#d0c5af]' : 'text-slate-600'}`}>
              Your appointment with {selectedFaculty} on {date} at {timeSlot} has been added to the calendar.
            </p>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-2 mb-1">
              <span className={`w-2 h-2 rounded-full ${isDark ? 'bg-[#f2ca50]' : 'bg-amber-600'}`}></span>
              <span className={`font-label-sm text-xs uppercase tracking-wider font-semibold ${
                isDark ? 'text-[#f2ca50]' : 'text-amber-700'
              }`}>
                Academic Advisory Session
              </span>
            </div>
            <h2 className="font-headline-sm text-2xl font-bold tracking-tight mb-4">
              Schedule Faculty Conference
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
              <div className="flex flex-col gap-1">
                <label className={`font-label-sm text-xs font-semibold uppercase tracking-wider ${
                  isDark ? 'text-[#d0c5af]' : 'text-slate-700'
                }`}>
                  Select Faculty Member
                </label>
                <select
                  value={selectedFaculty}
                  onChange={(e) => setSelectedFaculty(e.target.value)}
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
                  <option value="Dr. Genevieve Montclaire">Dr. Genevieve Montclaire (Dean of Curricula)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className={`font-label-sm text-xs font-semibold uppercase tracking-wider ${
                    isDark ? 'text-[#d0c5af]' : 'text-slate-700'
                  }`}>
                    Date
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
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
                    Time Window
                  </label>
                  <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className={`w-full p-2.5 rounded-xl border text-sm font-medium focus:outline-none ${
                      isDark 
                        ? 'bg-[#201f22] border-[#353437] text-white focus:border-[#d4af37]' 
                        : 'bg-slate-50 border-slate-200 text-slate-800 focus:border-amber-600'
                    }`}
                  >
                    <option value="09:00 AM - 09:30 AM">09:00 AM - 09:30 AM</option>
                    <option value="11:15 AM - 11:45 AM">11:15 AM - 11:45 AM</option>
                    <option value="03:30 PM - 04:00 PM">03:30 PM - 04:00 PM</option>
                    <option value="04:30 PM - 05:00 PM">04:30 PM - 05:00 PM</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className={`font-label-sm text-xs font-semibold uppercase tracking-wider ${
                  isDark ? 'text-[#d0c5af]' : 'text-slate-700'
                }`}>
                  Meeting Modality
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setFormat('in-person')}
                    className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      format === 'in-person'
                        ? isDark
                          ? 'bg-[#d4af37] text-[#3c2f00] border-[#d4af37]'
                          : 'bg-amber-100 text-amber-900 border-amber-300'
                        : isDark
                          ? 'bg-[#201f22] border-[#353437] text-[#d0c5af]'
                          : 'bg-slate-50 border-slate-200 text-slate-600'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[16px]">domain</span>
                    Campus Chamber
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormat('virtual')}
                    className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      format === 'virtual'
                        ? isDark
                          ? 'bg-[#d4af37] text-[#3c2f00] border-[#d4af37]'
                          : 'bg-amber-100 text-amber-900 border-amber-300'
                        : isDark
                          ? 'bg-[#201f22] border-[#353437] text-[#d0c5af]'
                          : 'bg-slate-50 border-slate-200 text-slate-600'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[16px]">videocam</span>
                    Executive Video Line
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className={`font-label-sm text-xs font-semibold uppercase tracking-wider ${
                  isDark ? 'text-[#d0c5af]' : 'text-slate-700'
                }`}>
                  Agenda & Focus Points
                </label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className={`w-full p-2.5 rounded-xl border text-sm font-medium focus:outline-none resize-none leading-relaxed ${
                    isDark 
                      ? 'bg-[#201f22] border-[#353437] text-white focus:border-[#d4af37]' 
                      : 'bg-slate-50 border-slate-200 text-slate-800 focus:border-amber-600'
                  }`}
                  placeholder="Outline areas for review..."
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
                  Confirm Reservation
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};
