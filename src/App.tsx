/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { TabType, ThemeMode, AppNotification, LeaveRequest } from './types';
import { INITIAL_NOTIFICATIONS, LEAVE_REQUESTS } from './data/mockData';
import { Sidebar } from './components/Sidebar';
import { TopBar } from './components/TopBar';
import { MobileBottomNav } from './components/MobileBottomNav';
import { Footer } from './components/Footer';
import { DashboardScreen } from './screens/DashboardScreen';
import { AcademicMarksScreen } from './screens/AcademicMarksScreen';
import { AttendanceScreen } from './screens/AttendanceScreen';
import { ThankTeachersScreen } from './screens/ThankTeachersScreen';
import { FeedbackSupportScreen } from './screens/FeedbackSupportScreen';
import { ScheduleConferenceModal } from './components/ScheduleConferenceModal';
import { MessageMentorModal } from './components/MessageMentorModal';
import { TranscriptModal } from './components/TranscriptModal';
import { SubmitExcuseModal } from './components/SubmitExcuseModal';
import { NotificationsModal } from './components/NotificationsModal';
import { StudentProfileModal } from './components/StudentProfileModal';
import { HandbookModal } from './components/HandbookModal';

export default function App() {
  const [currentTab, setCurrentTab] = useState<TabType>('dashboard');
  const [theme, setTheme] = useState<ThemeMode>('light');
  const [notifications, setNotifications] = useState<AppNotification[]>(INITIAL_NOTIFICATIONS);
  const [leaveQueue, setLeaveQueue] = useState<LeaveRequest[]>(LEAVE_REQUESTS);
  const [preselectedTeacher, setPreselectedTeacher] = useState<string>('Dr. Marcus Sterling');

  // Sidebar Layout States
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Modals state
  const [isScheduleConferenceOpen, setIsScheduleConferenceOpen] = useState(false);
  const [isMessageMentorOpen, setIsMessageMentorOpen] = useState(false);
  const [isTranscriptModalOpen, setIsTranscriptModalOpen] = useState(false);
  const [isExcuseModalOpen, setIsExcuseModalOpen] = useState(false);
  const [isNotificationsModalOpen, setIsNotificationsModalOpen] = useState(false);
  const [isStudentProfileModalOpen, setIsStudentProfileModalOpen] = useState(false);
  const [handbookModalType, setHandbookModalType] = useState<'handbook' | 'privacy' | null>(null);

  // Sync document root class for dark mode styling
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const handleMarkAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const handleAddLeaveRequest = (newRequest: LeaveRequest) => {
    setLeaveQueue(prev => [newRequest, ...prev]);
  };

  const handleSelectTeacherForCommendation = (teacherName: string) => {
    setPreselectedTeacher(teacherName);
  };

  const isDark = theme === 'dark';

  return (
    <div className={`min-h-screen flex font-sans transition-colors duration-300 overflow-x-hidden ${
      isDark ? 'bg-[#131315] text-[#e5e1e4]' : 'bg-[#F8FAFC] text-slate-800'
    }`}>
      {/* Executive Left Sidebar ("dashboard side not up") */}
      <Sidebar
        currentTab={currentTab}
        onTabChange={setCurrentTab}
        theme={theme}
        onToggleTheme={toggleTheme}
        notifications={notifications}
        onOpenNotifications={() => setIsNotificationsModalOpen(true)}
        onOpenStudentProfile={() => setIsStudentProfileModalOpen(true)}
        onOpenScheduleConference={() => setIsScheduleConferenceOpen(true)}
        onOpenMessageMentor={() => setIsMessageMentorOpen(true)}
        onOpenTranscript={() => setIsTranscriptModalOpen(true)}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(prev => !prev)}
        isMobileOpen={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      {/* Main Content Viewport Area */}
      <div className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ease-in-out ${
        isSidebarCollapsed ? 'lg:pl-20' : 'lg:pl-72 xl:pl-76'
      }`}>
        {/* Contextual Top Bar with Hamburger, Scholar Status, Notifications & Theme */}
        <TopBar
          currentTab={currentTab}
          theme={theme}
          onToggleTheme={toggleTheme}
          notifications={notifications}
          onOpenNotifications={() => setIsNotificationsModalOpen(true)}
          onOpenStudentProfile={() => setIsStudentProfileModalOpen(true)}
          onOpenScheduleConference={() => setIsScheduleConferenceOpen(true)}
          onOpenMobileSidebar={() => setIsMobileSidebarOpen(true)}
        />

        {/* Content Screens Container */}
        <main className="w-full flex-1 flex flex-col pb-20 lg:pb-8">
          {currentTab === 'dashboard' && (
            <DashboardScreen
              theme={theme}
              onNavigateTab={setCurrentTab}
              onOpenScheduleConference={() => setIsScheduleConferenceOpen(true)}
              onOpenMessageMentor={() => setIsMessageMentorOpen(true)}
              onOpenTranscript={() => setIsTranscriptModalOpen(true)}
              onSelectTeacherForCommendation={handleSelectTeacherForCommendation}
            />
          )}

          {currentTab === 'academic-marks-reports' && (
            <AcademicMarksScreen
              theme={theme}
              onOpenTranscriptModal={() => setIsTranscriptModalOpen(true)}
            />
          )}

          {currentTab === 'attendance' && (
            <AttendanceScreen
              theme={theme}
              onOpenExcuseModal={() => setIsExcuseModalOpen(true)}
              onOpenTranscriptModal={() => setIsTranscriptModalOpen(true)}
              leaveQueue={leaveQueue}
            />
          )}

          {currentTab === 'thank-teachers' && (
            <ThankTeachersScreen
              theme={theme}
              preselectedTeacher={preselectedTeacher}
              defaultSubTab="recognition"
              onNavigateToFeedback={() => setCurrentTab('feedback-support')}
            />
          )}

          {currentTab === 'feedback-support' && (
            <FeedbackSupportScreen
              theme={theme}
            />
          )}
        </main>

        {/* Footer */}
        <Footer 
          theme={theme} 
          onTabChange={setCurrentTab}
          onOpenHandbook={() => setHandbookModalType('handbook')}
          onOpenPrivacy={() => setHandbookModalType('privacy')}
        />
      </div>

      {/* Mobile Bottom Navigation Bar (Phone Devices) */}
      <MobileBottomNav
        currentTab={currentTab}
        onTabChange={setCurrentTab}
        theme={theme}
      />

      {/* Modals & Overlays */}
      <ScheduleConferenceModal
        isOpen={isScheduleConferenceOpen}
        onClose={() => setIsScheduleConferenceOpen(false)}
        theme={theme}
      />

      <MessageMentorModal
        isOpen={isMessageMentorOpen}
        onClose={() => setIsMessageMentorOpen(false)}
        theme={theme}
        initialFacultyName={preselectedTeacher}
      />

      <TranscriptModal
        isOpen={isTranscriptModalOpen}
        onClose={() => setIsTranscriptModalOpen(false)}
        theme={theme}
      />

      <SubmitExcuseModal
        isOpen={isExcuseModalOpen}
        onClose={() => setIsExcuseModalOpen(false)}
        theme={theme}
        onSubmitSuccess={handleAddLeaveRequest}
      />

      <NotificationsModal
        isOpen={isNotificationsModalOpen}
        onClose={() => setIsNotificationsModalOpen(false)}
        theme={theme}
        notifications={notifications}
        onMarkAllAsRead={handleMarkAllNotificationsRead}
      />

      <StudentProfileModal
        isOpen={isStudentProfileModalOpen}
        onClose={() => setIsStudentProfileModalOpen(false)}
        theme={theme}
      />

      <HandbookModal
        isOpen={!!handbookModalType}
        onClose={() => setHandbookModalType(null)}
        theme={theme}
        type={handbookModalType || 'handbook'}
      />
    </div>
  );
}
