export type TabType = 
  | 'dashboard' 
  | 'attendance' 
  | 'academic-marks-reports' 
  | 'thank-teachers' 
  | 'feedback-support';

export type ThemeMode = 'light' | 'dark';

export interface CourseMark {
  id: string;
  name: string;
  category: string;
  mentor: string;
  mentorAvatar: string;
  score: number;
  letterGrade: string;
  classAvg: number;
  trajectoryDelta: string;
  trajectoryType: 'up' | 'steady';
  period: string;
  room: string;
  weightFactor: string;
  earnedQPA: string;
  sparklinePoints: string;
  categories: {
    name: string;
    weight: string;
    score: string;
    description: string;
    percentage: number;
  }[];
  recentDeliverables: {
    title: string;
    date: string;
    score: string;
  }[];
  instructorNote: string;
}

export interface AttendanceRecord {
  id: string;
  date: string;
  dayName: string;
  status: 'present' | 'excused' | 'tardy' | 'unexcused';
  statusLabel: string;
  periodsCompleted: string;
  periodsDetail: string;
  remarks: string;
  verifiedOfficial: string;
  officialRole: string;
  attachmentName?: string;
}

export interface LeaveRequest {
  id: string;
  trackingNumber: string;
  title: string;
  category: string;
  dates: string;
  status: 'Under Review' | 'Approved & Logged' | 'Action Required';
  submittedDate: string;
  submittedBy: string;
  assignedStaff: string;
  notes: string;
}

export interface FacultyMentor {
  id: string;
  name: string;
  role: string;
  department: string;
  fellowTitle: string;
  avatar: string;
  gradeBadge: string;
  latestNote: string;
  honorsIssuedCount: number;
  subjectBadge: string;
  iconName: string;
}

export interface CommendationArchive {
  id: string;
  toFaculty: string;
  initials: string;
  date: string;
  honorCategory: string;
  parentNote: string;
  facultyResponse?: {
    date: string;
    message: string;
  };
  status: string;
  deanNotified: boolean;
}

export interface FeedbackTicket {
  id: string;
  code: string;
  department: string;
  subject: string;
  description: string;
  status: 'In Review by Dean' | 'Resolved' | 'Assigned';
  submittedDate: string;
  assignedTo: string;
  priority: 'standard' | 'urgent';
  isAnonymous: boolean;
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  type: 'academic' | 'attendance' | 'symposium' | 'commendation';
  read: boolean;
}
