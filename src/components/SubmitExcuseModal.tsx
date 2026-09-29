import React, { useState } from 'react';
import { ThemeMode, LeaveRequest } from '../types';

interface SubmitExcuseModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme: ThemeMode;
  onSubmitSuccess: (newRequest: LeaveRequest) => void;
}

export const SubmitExcuseModal: React.FC<SubmitExcuseModalProps> = ({
  isOpen,
  onClose,
  theme,
  onSubmitSuccess
}) => {
  const [category, setCategory] = useState('Medical Illness / Surgical Appointment');
  const [startDate, setStartDate] = useState('2026-10-22');
  const [endDate, setEndDate] = useState('2026-10-23');
  const [reason, setReason] = useState('Dental specialist procedure and post-op recovery as advised by oral surgeon.');
  const [fileAttached, setFileAttached] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      const newReq: LeaveRequest = {
        id: `lx-${Math.floor(1000 + Math.random() * 9000)}`,
        trackingNumber: `LX-${Math.floor(1000 + Math.random() * 9000)}`,
        title: category.split('/')[0].trim(),
        category,
        dates: `${startDate} to ${endDate}`,
        status: 'Under Review',
        submittedDate: 'Oct 21, 2026',
        submittedBy: 'Eleanor Vance',
        assignedStaff: 'Registrar Assigned',
        notes: reason
      };
      onSubmitSuccess(newReq);
      setSubmitting(false);
      onClose();
    }, 1200);
  };

  const isDark = theme === 'dark';

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className={`w-full max-w-xl rounded-2xl p-6 shadow-2xl border transition-all duration-300 relative ${
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

        <div className="flex flex-col gap-1 mb-4">
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${isDark ? 'bg-[#f2ca50]' : 'bg-amber-600'}`}></span>
            <span className={`font-label-sm text-xs uppercase tracking-wider font-semibold ${
              isDark ? 'text-[#f2ca50]' : 'text-amber-700'
            }`}>
              Official Leave Request
            </span>
          </div>
          <h3 className="font-headline-sm text-2xl font-bold tracking-tight">
            Submit Absence / Medical Excuse
          </h3>
          <p className={`font-body-sm text-xs ${isDark ? 'text-[#d0c5af]' : 'text-slate-500'}`}>
            Submissions are reviewed within 4 academic hours by the Registrar & Grade Dean.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Student Readonly Pill */}
          <div className={`p-3 rounded-xl flex items-center justify-between border ${
            isDark ? 'bg-[#201f22] border-[#353437]' : 'bg-slate-50 border-slate-200'
          }`}>
            <div className="flex items-center gap-2.5">
              <span className={`material-symbols-outlined text-[20px] ${
                isDark ? 'text-[#f2ca50]' : 'text-amber-700'
              }`}>
                person
              </span>
              <span className="font-body-md text-sm font-semibold">Julian Vance (Grade 11-A)</span>
            </div>
            <span className={`font-label-sm text-xs font-semibold ${
              isDark ? 'text-[#c8cee3]' : 'text-slate-500'
            }`}>
              Student ID: #AV-8802
            </span>
          </div>

          {/* Excuse Category */}
          <div className="flex flex-col gap-1">
            <label className={`font-label-sm text-xs font-semibold uppercase tracking-wider ${
              isDark ? 'text-[#d0c5af]' : 'text-slate-700'
            }`}>
              Absence Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className={`w-full p-2.5 rounded-xl border text-sm font-medium focus:outline-none ${
                isDark 
                  ? 'bg-[#201f22] border-[#353437] text-white focus:border-[#d4af37]' 
                  : 'bg-slate-50 border-slate-200 text-slate-800 focus:border-amber-600'
              }`}
            >
              <option value="Medical Illness / Surgical Appointment">Medical Illness / Surgical Appointment</option>
              <option value="Official Academic Competition / Model UN">Official Academic Competition / Model UN</option>
              <option value="Family Emergency / Bereavement">Family Emergency / Bereavement</option>
              <option value="Religious Observance">Religious Observance</option>
              <option value="University Admissions Campus Visit">University Admissions Campus Visit</option>
            </select>
          </div>

          {/* Date Range */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
              <label className={`font-label-sm text-xs font-semibold uppercase tracking-wider ${
                isDark ? 'text-[#d0c5af]' : 'text-slate-700'
              }`}>
                From Date
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
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
                To Date (Inclusive)
              </label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className={`w-full p-2.5 rounded-xl border text-sm font-medium focus:outline-none ${
                  isDark 
                    ? 'bg-[#201f22] border-[#353437] text-white focus:border-[#d4af37]' 
                    : 'bg-slate-50 border-slate-200 text-slate-800 focus:border-amber-600'
                }`}
              />
            </div>
          </div>

          {/* Reason Description */}
          <div className="flex flex-col gap-1">
            <label className={`font-label-sm text-xs font-semibold uppercase tracking-wider ${
              isDark ? 'text-[#d0c5af]' : 'text-slate-700'
            }`}>
              Detailed Explanation
            </label>
            <textarea
              rows={3}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Provide contextual notes for faculty instructors..."
              className={`w-full p-2.5 rounded-xl border text-sm font-medium focus:outline-none resize-none leading-relaxed ${
                isDark 
                  ? 'bg-[#201f22] border-[#353437] text-white focus:border-[#d4af37]' 
                  : 'bg-slate-50 border-slate-200 text-slate-800 focus:border-amber-600'
              }`}
            />
          </div>

          {/* File Upload Area */}
          <div className="flex flex-col gap-1">
            <label className={`font-label-sm text-xs font-semibold uppercase tracking-wider ${
              isDark ? 'text-[#d0c5af]' : 'text-slate-700'
            }`}>
              Supporting Documentation (Optional)
            </label>
            <div
              onClick={() => setFileAttached(!fileAttached)}
              className={`p-4 rounded-xl border border-dashed flex flex-col items-center justify-center text-center cursor-pointer transition-colors ${
                fileAttached
                  ? isDark ? 'bg-[#2a2a2c] border-[#f2ca50]' : 'bg-amber-50 border-amber-400'
                  : isDark ? 'bg-[#201f22] border-[#353437] hover:bg-[#2a2a2c]' : 'bg-slate-50 border-slate-300 hover:bg-slate-100'
              }`}
            >
              <span className={`material-symbols-outlined text-[26px] ${
                fileAttached ? (isDark ? 'text-[#f2ca50]' : 'text-amber-700') : (isDark ? 'text-[#99907c]' : 'text-slate-400')
              }`}>
                {fileAttached ? 'task' : 'cloud_upload'}
              </span>
              <span className={`font-title-sm text-xs mt-1 font-semibold ${
                fileAttached ? (isDark ? 'text-[#f2ca50]' : 'text-amber-800') : (isDark ? 'text-white' : 'text-slate-800')
              }`}>
                {fileAttached ? 'Medical_Certificate_Oct2026.pdf attached' : 'Click to Upload Medical Certificate or Letter'}
              </span>
              <span className={`font-label-sm text-[10px] ${isDark ? 'text-[#99907c]' : 'text-slate-400'}`}>
                PDF, JPG, PNG up to 15MB
              </span>
            </div>
          </div>

          {/* Modal Actions */}
          <div className="flex items-center justify-end gap-3 pt-2">
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
              disabled={submitting}
              className={`px-5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer shadow-md flex items-center gap-1.5 ${
                isDark
                  ? 'bg-[#d4af37] text-[#3c2f00] hover:bg-[#ffe088]'
                  : 'bg-amber-700 hover:bg-amber-800 text-white'
              }`}
            >
              {submitting ? (
                <>
                  <span className="material-symbols-outlined text-[16px] animate-spin">sync</span>
                  <span>Transmitting...</span>
                </>
              ) : (
                <span>Transmit Excuse Authorization</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
