// Manager-specific type definitions

export interface ManagerDashboardStats {
  totalMembers: number;
  activeMembers: number;
  totalRevenue: number;
  monthlyRevenue: number;
  classAttendanceRate: number;
  occupancyRate: number;
  staffCount: number;
  checkInsToday: number;
  activeClasses: number;
  revenueChange: number; // percentage change from last period
}

export interface MemberStats {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  membershipTier: "z-total" | "z-junior" | "z-weekend" | "z-senior";
  memberSince: string; // ISO date string
  lastActivity: string; // ISO date string
  checkInCount: number;
  complianceRate: number; // percentage
  status: "active" | "inactive" | "suspended" | "pending";
  profileImage?: string;
  notes?: string;
}

export interface StaffMember {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  role: "instructor" | "staff" | "manager";
  hireDate: string; // ISO date string
  clientCount: number;
  activeRoutines: number;
  classesPerWeek: number;
  performanceRating: number; // 1-5 stars
  specializations?: string[];
  profileImage?: string;
  status: "active" | "inactive" | "on-leave";
}

export interface ClassScheduleItem {
  id: string;
  name: string;
  description?: string;
  instructorId: string;
  instructorName: string;
  dayOfWeek: number; // 0-6 (Sunday-Saturday)
  startTime: string; // HH:mm format
  endTime: string; // HH:mm format
  duration: number; // minutes
  capacity: number;
  enrolled: number;
  waitlist?: number;
  occupancyRate: number; // percentage
  room?: string;
  classType: "yoga" | "strength" | "cardio" | "hiit" | "cycling" | "other";
  status: "scheduled" | "in-progress" | "completed" | "cancelled";
  recurrence?: "weekly" | "one-time";
}

export interface GymAnalytics {
  date: string; // ISO date string
  membersJoined: number;
  membersLeft: number;
  classesHeld: number;
  totalCheckIns: number;
  attendanceRate: number; // percentage
  revenue: number;
  expenses: number;
  profit: number;
  occupancyRate: number;
}

export interface RevenueBreakdown {
  membershipFees: number;
  personalTraining: number;
  supplements: number;
  merchandise: number;
  other: number;
  total: number;
}

export interface AttendanceReport {
  classId: string;
  className: string;
  instructor: string;
  date: string;
  capacity: number;
  attended: number;
  cancelled: number;
  noShows: number;
  attendanceRate: number;
}

export interface FacilitySettings {
  gymName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  email: string;
  website?: string;
  operatingHours: {
    monday: { open: string; close: string; closed?: boolean };
    tuesday: { open: string; close: string; closed?: boolean };
    wednesday: { open: string; close: string; closed?: boolean };
    thursday: { open: string; close: string; closed?: boolean };
    friday: { open: string; close: string; closed?: boolean };
    saturday: { open: string; close: string; closed?: boolean };
    sunday: { open: string; close: string; closed?: boolean };
  };
  maxCapacity: number;
  amenities: string[];
  timezone: string;
}

export interface PricingTier {
  tier: "z-total" | "z-junior" | "z-weekend" | "z-senior";
  name: string;
  monthlyPrice: number;
  features: string[];
  color: string;
  isActive: boolean;
}

export interface MemberActivity {
  id: string;
  memberId: string;
  memberName: string;
  activityType: "check-in" | "class-booked" | "class-attended" | "upgrade" | "downgrade" | "joined" | "cancelled";
  timestamp: string; // ISO date string
  details?: string;
  metadata?: Record<string, any>;
}

export interface ClassPerformance {
  classId: string;
  className: string;
  instructor: string;
  avgAttendance: number;
  avgRating: number;
  totalSessions: number;
  totalRevenue: number;
  popularityScore: number;
  trend: "up" | "down" | "stable";
}

export interface StaffPerformance {
  staffId: string;
  staffName: string;
  totalClasses: number;
  avgClassSize: number;
  avgRating: number;
  clientRetention: number; // percentage
  revenue: number;
  performanceScore: number;
}

export interface NotificationSettings {
  emailNotifications: {
    dailyReport: boolean;
    weeklyReport: boolean;
    membershipExpiring: boolean;
    lowClassAttendance: boolean;
    staffAbsences: boolean;
  };
  pushNotifications: {
    classCancellations: boolean;
    newMemberSignups: boolean;
    emergencyAlerts: boolean;
  };
  reportFrequency: "daily" | "weekly" | "monthly";
}

export interface ReportFilter {
  startDate: string;
  endDate: string;
  membershipTier?: "z-total" | "z-junior" | "z-weekend" | "z-senior" | "all";
  instructorId?: string;
  classType?: string;
  status?: string;
}

export interface ExportOptions {
  format: "pdf" | "csv" | "excel";
  reportType: "revenue" | "attendance" | "members" | "staff" | "analytics";
  dateRange: { start: string; end: string };
  includeCharts?: boolean;
}
