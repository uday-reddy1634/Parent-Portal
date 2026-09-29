import { CourseMark, AttendanceRecord, LeaveRequest, FacultyMentor, CommendationArchive, FeedbackTicket, AppNotification } from '../types';

export const ASSETS = {
  logo: "https://lh3.googleusercontent.com/aida/AEtjO1XDbshw9HGjP-7IIKOWhRS9Dw5Tlus_fo8RXVht-j86IqEXFmm4lPx7uCVXIu8mOBoFCRG0X3jQ066uDHw-F74h9AezAo9LbzTUb1vBR_pj83zc0qsO5JhxpGyET9asYRBeQ8KNKCmrQstSCPx03tVQr2TuT0p_cD6Q13X3LHvyqbCFWNdcaprm8tkcnWFwWbnTB3Wd3wJugpqjtU4c2eLHkcgK0AFujXJ2QwENtvgB03tx-MjTfWoV3A",
  guardianAvatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDT-Efh4yK1rglcZNNNVAh3HoCPRIhrAPTdIyR6kXar-mfVpwK4ASgFAKIE0EyUiTnRcMxlKllK2lX5YPHhPmymTaX5OvZJ1dQkTruzFO977YYZQMwYyJ81mUr5PDHoCCJhbT-yO1NeIjfocXFsP-snCczS9tqsGVRWGVguDLRMPSoYTwFqYgaJT6Btj_34wL2EglMhCTBNGy6xDn6G43IW9ezzplqbWg36iUELnTCXl_PyQJ3jsflx",
  parentPhoto: "https://lh3.googleusercontent.com/aida-public/AB6AXuDT-Efh4yK1rglcZNNNVAh3HoCPRIhrAPTdIyR6kXar-mfVpwK4ASgFAKIE0EyUiTnRcMxlKllK2lX5YPHhPmymTaX5OvZJ1dQkTruzFO977YYZQMwYyJ81mUr5PDHoCCJhbT-yO1NeIjfocXFsP-snCczS9tqsGVRWGVguDLRMPSoYTwFqYgaJT6Btj_34wL2EglMhCTBNGy6xDn6G43IW9ezzplqbWg36iUELnTCXl_PyQJ3jsflx",
  studentPhoto: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=400",
  studentAvatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=400",
  drSterlingAvatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuALnQufp5bO-4ICzarX472iB_AO1i0_q16kbxVCf_yh4_ivHkDYLQRCmDdCuSUtkJTGT5ADKdwJebW89-adH0O1YCtd4WOhsKYaZhpj12MSOvUMXRimH1k0ehR3qg3bnv7DP8_Md7YUjDwhHZjEhGzAABGEhbVhtC2U8GjIwFt1-bA-lt-3bNZZDF7UHf1DAiz195H24LyRLhETFrzNwqEaCX-cqDZr4HL2Cx7CpiV3yCaFwggm0Jb_",
  drMarcusSterlingAvatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCEy0t-ZudprxY2VLQceIo0TpkcKI_soLFRAJMzHKMmzcwi0FSN-sPUxUBf-C60BqNcJzs_x7kz70nvyBheSsqN2JDiOBshZeBGnxbE3cnatDxjFc7Lz7ocfNdMU74Dep1Y5bUAvsSsBNi7h1ZVCyC4tA8GpdfvrKhufifBgihhJnESXgfDqf777-6IzWodC8r5msqahVJh5xgEKLtfUo2Bh9Z4AFmGJwZnYqDw1qjl9-rR7l4nR3Ob",
  profRostovaAvatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCqUqgT9w3zXyJ-GluSZr6ECE6l5OQ6FgoXbv2sx5N_fV40JYuFdCB826CZSShihRvth-ak8C3StCtyDwHfBL1wNN8PEtx3l1Q5LLUs9byAWkPlBMo2ohPJabMgW_HYsftA-Xe1kwjste2p24dihURW5IvLamnf-Y_PpN3ijw35e5G47QLYojfGTlc-Lq7A_NWGiPHhhc8-PP8erE3Y_MHxl0sODCjBH8c0OY4vfw2x2dshKbm8kXBD",
  mrHawthorneAvatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCXOrazt2EAu-lfBMHMeCisRLmxn2ZQ2QwLDLusIn_S5IYaKaYO5vO1Q3DY2FYsmzPwjKwikRx68w7T4KxAg1nMCtKYf3j9v_JFi2c520-FPKs7d96rCeB0I-jSu2Fxnhh2NVXBs7f0yrZabq1P65MeXMeg4KYXpqJpHdZp3WmTtxpDWigfhDk-Bzusl52J0ZloI3Bf19L1wTLLQcbIYvO0tuzocVkjkZar9tTKZDsBoSeEyVMps4f_",
  drThorneAvatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDZNnpwqAzQRbj4gRCxoshHj1vhu-HafNSh30E13Kq4q9K06Xc-juXvwtm3y_7C2btS9pbtqtyPxtLLjjp-pG2w1sFqpSU-wzPWrelVHtDSnoZTlc8ojKdjX2jyZ4fIyQ2zEP9jThzRpd6073uzCQv6nvM_yLdUNIAUrxLmyJCK1VOiNKqEIaJes9rvv16mi0g92OZoTmtZBoC9QioEhl6TovNv6ZDcqasWG9CFqPN31RYCz-uyLvdO",
  msClaraOswaldAvatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDL8bKg_aCTAx-szubProCqUFYH4hLLJ4ww-UB_G17k1mLdA-RSuAQ9exGj_9N5tHSsvYBJ2P8-EJBzWfewz6IEtCehtvR8eRYBdUOLhUUEJUw1ht0IYPGXspNrZEvQLVezin8cGXmcTe5B3xp8VSmUqrQojpu0FAQHtnGPKP2-Ruk1rsyMhSu3xC8NZNg-bjAOsz-ZxI5Eejl78CtMHy4MAZA2-ZpSyaT_VSEqp_0TFgYh-EyQs-rB",
  deanMontclaireAvatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAZE1365aZeopanjzZZDZ18wqnd76e8_ZIq9VLe49Tr2g07QJacQ8Gb7cfAhatziYUCxY2D-tlaG5VxMKYqfHKoWgVkwWKu3FaSaZNQ-OestlodPBlkU-Il70boI6hGsKYc7UY-2yPjw8B4v14NDoP0gFeJgl2mhn-Bi8EsHeIpkcWUtpeh7eruLdjvEVmmARD3oildLJOCreJiBbVrwlT-1rD1nq-9TIL7tm6Y-4cW_vRTkxxheeqn",
  autonomousSystemsWing: "https://lh3.googleusercontent.com/aida-public/AB6AXuDycWM61_zu6dAzBd7u1C36bqrhI_MV6QjQDeaGDNJZZwC0bLrDidMNHXvyAH8i-jWP_GvrxjA1ZI22u_jV7cFPwfmRo-Fj-wXKrTLQVQZGQQPHA2R7O71hO0vc9wJ8k8c6rb787gEnKTg9pMKFRSGCemEmydkYm4jbm8kYEong0lYjawWgH9OtvuYQcNhZ46kLMPqUqYv1dnLLHOoLQdTcJ347QjlxJRi0-IwCZKmfqD3BKJegnYji",
  foundersArchiveLibrary: "https://lh3.googleusercontent.com/aida-public/AB6AXuALTYQ1uWflVSDR0H4JBZiEO_pD264y0G_NH6X4qMIgtcLuulsTnwU_XLwXvOcLJ2ZSXuAYNVEZZm69YCLPm3ndz4VJq23U8sRoGJ5Rsl3vXXq4VShFwEldbzNHWXEajYratts8o8dix_FmV8t7I9qtEZ780cWtjR3iMEwjudAmyS-sApuV5Hw8XZvCuQR4SryV1NuF7ZuNgXXoK0sZOIlH6LI8sOyIxU0R-eARk63QCnILgHEjRwWz",
  keplerObservatoryLab: "https://lh3.googleusercontent.com/aida-public/AB6AXuAJlM6uTv3FgfrZsmnBmDiDRYNL4HXW96SiTQNe8Dve18RWXPcbAd2iFqxRtUuOsqDBifjXFPxvJc_de_lYCO5Mv4wWmUNpT-g6uo91a4CGaoqFqyC-LqlvZe3aRsHDPPZtY_9bOAUJ_RAe8dBeulFrKwzKhwqOdLW0Xir6la8f3yymy9WWk1NqZDcAz63rovlO9FJYqSjm9Gd7V2snmm6QatH0QbTBqnUBqDyOOx_aTvXw_HkpWPZ4",
  modernLibraryPod: "https://lh3.googleusercontent.com/aida-public/AB6AXuCgFezc_mRK6nBGIvnsGVrOF3ax9D1ZJLhTfnSrYfjgHR28eKTWJgd8t5B2Hwu5iB_PHFj5Yt4qCTF2-GpAkkMBYi1lPex8tSJcp_A66k4OH83RmxTJXLcV1dK2P-OvL7v2QRr_OO7ici2JliTqF5vlL8aE6A2Sftj8Hhn-rQyIZi64MUcyn1137CrydEuW4b6Q_R75TgXU_6DGpa2yJTfRFbxq6RwpAq0JiEzWf2p9L7WH-AEfQ6lQ",
  campusTwilightExterior: "https://lh3.googleusercontent.com/aida-public/AB6AXuD8vF_5xnEDc4_iRwQd_5GBdtYbdQsvOy1k4CiZXEi7mnWolCbjZkrYUCw3GQ_6wzMelnhJysCMtBJEAAag0RHgJl-VE9Berh1AUUhkNYwo14Vk0v2dLtcKAU9qOiz35Q7FIQ6PhArti5FXmvlds-5ESwT82xJBtmPSb9WI6riAIpV02BX8YKZMexayuKak5xp3j2XUe3CJ3CWexFCmc4dAQZsn2mwkBemac9iXcUZHf91qrjFPjpiz"
};

export const COURSES_DATA: CourseMark[] = [
  {
    id: "ap-physics-c",
    name: "AP Physics C: Mechanics",
    category: "AP / College Board",
    mentor: "Dr. Alistair Sterling",
    mentorAvatar: ASSETS.drSterlingAvatar,
    score: 96.4,
    letterGrade: "A+",
    classAvg: 84.2,
    trajectoryDelta: "+3%",
    trajectoryType: "up",
    period: "Period 2",
    room: "Hall 401",
    weightFactor: "5.0 AP Scale",
    earnedQPA: "5.00",
    sparklinePoints: "M2 14 L15 12 L30 15 L45 8 L58 4",
    categories: [
      {
        name: "Midterm Exam (40%)",
        weight: "40%",
        score: "98/100",
        description: "Term 2 Exam — Top 1% in cohort",
        percentage: 98
      },
      {
        name: "Lab Practicum (35%)",
        weight: "35%",
        score: "95/100",
        description: "Rotational Inertia Apparatus",
        percentage: 95
      },
      {
        name: "Problem Sets (25%)",
        weight: "25%",
        score: "100%",
        description: "14 of 14 Completed on schedule",
        percentage: 100
      }
    ],
    recentDeliverables: [
      {
        title: "Oscillations & Simple Harmonic Motion Test",
        date: "Nov 18, 2024",
        score: "49 / 50 (98%)"
      },
      {
        title: "Conservation of Angular Momentum Laboratory",
        date: "Nov 09, 2024",
        score: "95 / 100 (95%)"
      }
    ],
    instructorNote: "Julian exhibits exceptional analytical maturity. His mathematical derivations for non-linear pendulum drag were among the most elegant seen in my tenure."
  },
  {
    id: "ap-calc-bc",
    name: "AP Calculus BC",
    category: "AP / College Board",
    mentor: "Prof. Clara Thorne",
    mentorAvatar: ASSETS.profRostovaAvatar,
    score: 98.1,
    letterGrade: "A+",
    classAvg: 81.6,
    trajectoryDelta: "+1%",
    trajectoryType: "up",
    period: "Period 1",
    room: "Math Wing 108",
    weightFactor: "5.0 AP Scale",
    earnedQPA: "5.00",
    sparklinePoints: "M2 10 L15 11 L30 7 L45 5 L58 3",
    categories: [
      {
        name: "Midterm Exam (50%)",
        weight: "50%",
        score: "99/100",
        description: "Taylor & Maclaurin Series",
        percentage: 99
      },
      {
        name: "Problem Sets (30%)",
        weight: "30%",
        score: "97%",
        description: "Advanced Integration Mastery",
        percentage: 97
      },
      {
        name: "Colloquium (20%)",
        weight: "20%",
        score: "100%",
        description: "Peer seminar demonstrations",
        percentage: 100
      }
    ],
    recentDeliverables: [
      {
        title: "Differential Equations and Logistic Growth Models",
        date: "Nov 22, 2024",
        score: "100 / 100 (100%)"
      }
    ],
    instructorNote: "Consistent highest performance in pure proofs and multi-variable integration techniques. Ready for university linear algebra."
  },
  {
    id: "ap-eng-lit",
    name: "AP English Literature",
    category: "AP / College Board",
    mentor: "Mr. David Hawthorne",
    mentorAvatar: ASSETS.mrHawthorneAvatar,
    score: 92.5,
    letterGrade: "A",
    classAvg: 85.4,
    trajectoryDelta: "Steady",
    trajectoryType: "steady",
    period: "Period 4",
    room: "Humanities Tower 3",
    weightFactor: "5.0 AP Scale",
    earnedQPA: "4.80",
    sparklinePoints: "M2 8 L15 9 L30 9 L45 10 L58 10",
    categories: [
      {
        name: "Essays & Prose (40%)",
        weight: "40%",
        score: "91%",
        description: "Comparative Romanticism essay",
        percentage: 91
      },
      {
        name: "Term Paper (35%)",
        weight: "35%",
        score: "94%",
        description: "Critique of Modernist Poetry",
        percentage: 94
      },
      {
        name: "Socratic Seminar (25%)",
        weight: "25%",
        score: "95%",
        description: "Active discourse & debate",
        percentage: 95
      }
    ],
    recentDeliverables: [
      {
        title: "King Lear Tragic Catharsis Research Thesis",
        date: "Nov 14, 2024",
        score: "94 / 100 (94%)"
      }
    ],
    instructorNote: "A thoughtful contributor whose prose elevates seminar inquiry. Julian has shown sharp improvement in stylistic brevity."
  },
  {
    id: "robotics-ai",
    name: "Advanced Robotics & AI Systems",
    category: "Honors Elective",
    mentor: "Dr. Aris Thorne",
    mentorAvatar: ASSETS.drThorneAvatar,
    score: 97.0,
    letterGrade: "A+",
    classAvg: 88.0,
    trajectoryDelta: "+4%",
    trajectoryType: "up",
    period: "Period 5",
    room: "Innovation Hub B",
    weightFactor: "4.5 Honors Scale",
    earnedQPA: "4.50",
    sparklinePoints: "M2 16 L15 14 L30 10 L45 8 L58 5",
    categories: [
      {
        name: "Capstone Project (50%)",
        weight: "50%",
        score: "98%",
        description: "Autonomous Spatial Mapping",
        percentage: 98
      },
      {
        name: "Hardware Labs (30%)",
        weight: "30%",
        score: "96%",
        description: "Microcontroller telemetry",
        percentage: 96
      },
      {
        name: "Code Verification (20%)",
        weight: "20%",
        score: "97%",
        description: "Neural net convergence tests",
        percentage: 97
      }
    ],
    recentDeliverables: [
      {
        title: "LiDAR SLAM Implementation Protocol",
        date: "Nov 25, 2024",
        score: "98 / 100 (98%)"
      }
    ],
    instructorNote: "Outstanding team lead during engineering sprint. Julian wrote 2,400 lines of rust-based sensor logic that operated with zero latency."
  },
  {
    id: "microeconomics-honors",
    name: "Microeconomics (Honors)",
    category: "Honors",
    mentor: "Mrs. Sarah Jenkins",
    mentorAvatar: ASSETS.deanMontclaireAvatar,
    score: 94.2,
    letterGrade: "A",
    classAvg: 86.2,
    trajectoryDelta: "+2%",
    trajectoryType: "up",
    period: "Period 6",
    room: "North Wing 204",
    weightFactor: "4.5 Honors Scale",
    earnedQPA: "4.50",
    sparklinePoints: "M2 13 L15 11 L30 9 L45 8 L58 6",
    categories: [
      {
        name: "Case Studies (40%)",
        weight: "40%",
        score: "93%",
        description: "Market Equilibrium & Elasticity",
        percentage: 93
      },
      {
        name: "Midterm Exam (35%)",
        weight: "35%",
        score: "95/100",
        description: "Game Theory & Monopolies",
        percentage: 95
      },
      {
        name: "Policy Quizzes (25%)",
        weight: "25%",
        score: "95%",
        description: "Weekly regulatory analyses",
        percentage: 95
      }
    ],
    recentDeliverables: [
      {
        title: "Oligopoly Pricing & Cournot Competition Model",
        date: "Nov 28, 2024",
        score: "96 / 100 (96%)"
      }
    ],
    instructorNote: "Grasps macroeconomic externalities with acute precision. Julian connects classical theories seamlessly to present-day central banking models."
  }
];

export const ATTENDANCE_RECORDS: AttendanceRecord[] = [
  {
    id: "rec-1",
    date: "Oct 21, 2026",
    dayName: "Wednesday • Current Day",
    status: "present",
    statusLabel: "Present",
    periodsCompleted: "4 / 6 Completed",
    periodsDetail: "(P5 in session)",
    remarks: "Standard instructional schedule; regular morning roll confirmed.",
    verifiedOfficial: "Dr. Julian Sterling",
    officialRole: "Homeroom Master"
  },
  {
    id: "rec-2",
    date: "Oct 20, 2026",
    dayName: "Tuesday",
    status: "present",
    statusLabel: "Present",
    periodsCompleted: "6 / 6 Full Day",
    periodsDetail: "All standard periods",
    remarks: "All standard periods attended. Physics Lab honors session completed.",
    verifiedOfficial: "Ms. Clara Oswald",
    officialRole: "Registrar"
  },
  {
    id: "rec-3",
    date: "Oct 14, 2026",
    dayName: "Wednesday",
    status: "excused",
    statusLabel: "Excused Absence",
    periodsCompleted: "0 / 6 (Excused)",
    periodsDetail: "Medical leave",
    remarks: "Orthodontic Surgical Procedure",
    verifiedOfficial: "Ms. Clara Oswald",
    officialRole: "Approved Guardian Request",
    attachmentName: "Thorne_Clinic_MedicalNote.pdf"
  },
  {
    id: "rec-4",
    date: "Oct 07, 2026",
    dayName: "Wednesday",
    status: "tardy",
    statusLabel: "Tardy (18 min)",
    periodsCompleted: "5 / 6 Full (P1 Late)",
    periodsDetail: "Arrived 08:48 AM",
    remarks: "Arrived 08:48 AM due to regional transit delay. Guardian notice verified.",
    verifiedOfficial: "Dean Harrison",
    officialRole: "Gate Marshall"
  },
  {
    id: "rec-5",
    date: "Sep 24, 2026",
    dayName: "Thursday",
    status: "excused",
    statusLabel: "Official Academy Duty",
    periodsCompleted: "Excused (Academic)",
    periodsDetail: "Varsity Debate",
    remarks: "Regional Debate Tournament Representation (1st Place Ribbon)",
    verifiedOfficial: "Dr. Kenneth Sterling",
    officialRole: "Dean of Academics"
  },
  {
    id: "rec-6",
    date: "Sep 18, 2026",
    dayName: "Friday",
    status: "present",
    statusLabel: "Present",
    periodsCompleted: "6 / 6 Full Day",
    periodsDetail: "All sessions",
    remarks: "Full participation in engineering seminar and AP Lit colloquium.",
    verifiedOfficial: "Dr. Julian Sterling",
    officialRole: "Homeroom Master"
  },
  {
    id: "rec-7",
    date: "Sep 12, 2026",
    dayName: "Wednesday",
    status: "present",
    statusLabel: "Present",
    periodsCompleted: "6 / 6 Full Day",
    periodsDetail: "All sessions",
    remarks: "Standard attendance ledger verified.",
    verifiedOfficial: "Ms. Clara Oswald",
    officialRole: "Registrar"
  }
];

export const LEAVE_REQUESTS: LeaveRequest[] = [
  {
    id: "lx-4891",
    trackingNumber: "LX-4891",
    title: "Ivy League Model UN Delegation",
    category: "Official Academic Competition",
    dates: "Nov 12 – Nov 14, 2026 (3 School Days)",
    status: "Under Review",
    submittedDate: "Oct 19, 2026",
    submittedBy: "Eleanor Vance",
    assignedStaff: "Registrar Assigned",
    notes: "Delegate on UN Security Council representing France at Princeton Model UN."
  },
  {
    id: "lx-4210",
    trackingNumber: "LX-4210",
    title: "Specialist Orthodontic Surgery",
    category: "Medical / Dental Procedure",
    dates: "Oct 14, 2026 (1 Full Day)",
    status: "Approved & Logged",
    submittedDate: "Oct 10, 2026",
    submittedBy: "Eleanor Vance",
    assignedStaff: "Ms. Clara Oswald",
    notes: "Verified Dr. Aris Thorne medical note on file."
  }
];

export const FACULTY_MENTORS: FacultyMentor[] = [
  {
    id: "dr-sterling",
    name: "Dr. Marcus Sterling",
    role: "AP Physics C • STEM Chair",
    department: "Department of Advanced Physics",
    fellowTitle: "Aetheria Faculty Senior Fellow",
    avatar: ASSETS.drMarcusSterlingAvatar,
    gradeBadge: "Julian's Grade: 98% (Exemplary)",
    latestNote: "Julian demonstrated outstanding theoretical modeling on quantum kinetic vectors.",
    honorsIssuedCount: 3,
    subjectBadge: "Physics Mastery & Research Mentorship",
    iconName: "science"
  },
  {
    id: "prof-rostova",
    name: "Prof. Elena Rostova",
    role: "AP Calculus BC",
    department: "Department of Mathematics",
    fellowTitle: "Olympiad Chief Coach",
    avatar: ASSETS.profRostovaAvatar,
    gradeBadge: "Julian's Grade: 96% (High Honors)",
    latestNote: "Devoted extra weekend coaching for the International Mathematical Olympiad qualifiers.",
    honorsIssuedCount: 4,
    subjectBadge: "Inspiring Olympiad Mentorship",
    iconName: "calculate"
  },
  {
    id: "mr-hawthorne",
    name: "Mr. David Hawthorne",
    role: "AP English Literature",
    department: "Department of Humanities & Rhetoric",
    fellowTitle: "Socratic Society Director",
    avatar: ASSETS.mrHawthorneAvatar,
    gradeBadge: "Julian's Grade: 94% (Distinction)",
    latestNote: "Praising Julian's comparative thesis on Dante and post-modern existential literature.",
    honorsIssuedCount: 2,
    subjectBadge: "Critical Discourse & Essay Guidance",
    iconName: "menu_book"
  },
  {
    id: "dr-thorne",
    name: "Dr. Aris Thorne",
    role: "Advanced Robotics Lab",
    department: "Department of Engineering & Robotics",
    fellowTitle: "Innovation Hub Director",
    avatar: ASSETS.drThorneAvatar,
    gradeBadge: "Julian's Grade: 99% (Summa)",
    latestNote: "Supervised Julian's autonomous navigation drone presentation before regional engineering panel.",
    honorsIssuedCount: 5,
    subjectBadge: "Technological Ingenuity & Guidance",
    iconName: "smart_toy"
  }
];

export const COMMENDATION_ARCHIVES: CommendationArchive[] = [
  {
    id: "comm-1",
    toFaculty: "Prof. Elena Rostova",
    initials: "ER",
    date: "Nov 14, 2024",
    honorCategory: "Olympiad Preparation Honors",
    parentNote: "Thank you for curating advanced topological proofs for Julian during the olympiad trials. His confidence has visibly grown under your tutelage.",
    facultyResponse: {
      date: "Nov 16, 2024",
      message: "Dear Mrs. Vance, it is an absolute privilege. Julian possesses remarkable spatial intuition. Thank you for your warm words; they are cherished."
    },
    status: "Placed in Faculty Dossier",
    deanNotified: true
  },
  {
    id: "comm-2",
    toFaculty: "Mr. David Hawthorne",
    initials: "DH",
    date: "Oct 28, 2024",
    honorCategory: "Rhetoric Distinction",
    parentNote: "Our family deeply appreciates the thorough annotations and thoughtful feedback on Julian's comparative literature essay.",
    facultyResponse: {
      date: "Oct 30, 2024",
      message: "Julian's passion for classical motifs enlivens our seminar room daily. Grateful for your continued partnership."
    },
    status: "Placed in Faculty Dossier",
    deanNotified: true
  }
];

export const FEEDBACK_TICKETS: FeedbackTicket[] = [
  {
    id: "tkt-8842",
    code: "TKT-8842",
    department: "Facilities & Labs",
    subject: "STEM Fabrication Lab Access Hours",
    description: "Request to prolong evening studio access for Grade 11 Honors robotics team ahead of state trials.",
    status: "In Review by Dean",
    submittedDate: "Nov 18, 2024",
    assignedTo: "Dean Hargrove",
    priority: "standard",
    isAnonymous: false
  },
  {
    id: "tkt-7910",
    code: "TKT-7910",
    department: "Campus Logistics",
    subject: "North Campus Shuttle Arrival Coordination",
    description: "Adjusted express morning shuttle departure by 12 minutes to accommodate morning zero-period symposia.",
    status: "Resolved",
    submittedDate: "Oct 12, 2024",
    assignedTo: "Fleet Director Vance",
    priority: "standard",
    isAnonymous: false
  },
  {
    id: "tkt-7201",
    code: "TKT-7201",
    department: "Pastoral & Counseling",
    subject: "AP Capstone Early Scheduling Advisory",
    description: "Consultation completed with Head Counselor Dr. Albright regarding Julian's Senior year university matrix.",
    status: "Resolved",
    submittedDate: "Sep 04, 2024",
    assignedTo: "Dr. Albright",
    priority: "standard",
    isAnonymous: false
  }
];

export const INITIAL_NOTIFICATIONS: AppNotification[] = [
  {
    id: "notif-1",
    title: "Commendation Registered",
    message: "Your recognition note to Dr. Sterling has been added to the Faculty Merit Ledger.",
    timestamp: "10 mins ago",
    type: "commendation",
    read: false
  },
  {
    id: "notif-2",
    title: "Symposium Invitation RSVP",
    message: "Term 2 Parent Guild Symposium on Nov 04, 2024 at 6:30 PM EST. Reception in Great Rotunda.",
    timestamp: "2 hours ago",
    type: "symposium",
    read: false
  },
  {
    id: "notif-3",
    title: "Official Gradebook Audit Updated",
    message: "Term 2 weighted marks synchronized. Julian holds rank #4 in cohort.",
    timestamp: "1 day ago",
    type: "academic",
    read: true
  },
  {
    id: "notif-4",
    title: "Attendance Check Completed",
    message: "Gate check-in recorded at 08:22 AM. P1 through P4 present.",
    timestamp: "2 days ago",
    type: "attendance",
    read: true
  }
];
