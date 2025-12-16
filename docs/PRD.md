# My-ZGym - Product Requirements Document (PRD)

**Version:** 1.0  
**Last Updated:** December 9, 2025  
**Author:** ChongTechnologies  
**Status:** In Development

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Product Vision](#2-product-vision)
3. [Target Audience](#3-target-audience)
4. [User Personas](#4-user-personas)
5. [Feature Requirements](#5-feature-requirements)
6. [Technical Architecture](#6-technical-architecture)
7. [Design System](#7-design-system)
8. [User Flows](#8-user-flows)
9. [Data Models](#9-data-models)
10. [API Specifications](#10-api-specifications)
11. [Security Requirements](#11-security-requirements)
12. [Performance Requirements](#12-performance-requirements)
13. [Accessibility Requirements](#13-accessibility-requirements)
14. [Release Plan](#14-release-plan)
15. [Success Metrics](#15-success-metrics)
16. [Appendix](#16-appendix)

---

## 1. Executive Summary

### 1.1 Product Overview

**My-ZGym** is a cross-platform mobile fitness application designed to revolutionize the gym experience for members, instructors, and managers. The application provides a seamless interface for class booking, workout tracking, progress monitoring, and membership management.

### 1.2 Key Objectives

- **Members**: Simplified class booking, workout tracking, and progress visualization
- **Instructors**: Efficient class management and member interaction (Tablet UI)
- **Managers**: Comprehensive gym operations oversight (Web Panel)

### 1.3 Business Goals

| Goal | Target | Timeline |
|------|--------|----------|
| User Acquisition | 1,000 active members | Q2 2025 |
| Daily Active Users | 40% of registered users | Q3 2025 |
| Class Booking Rate | 75% utilization | Q4 2025 |
| User Retention | 85% monthly retention | Q4 2025 |

---

## 2. Product Vision

### 2.1 Vision Statement

> "Empowering fitness journeys through seamless technology, making every gym visit more productive, trackable, and rewarding."

### 2.2 Mission

To create the most intuitive and comprehensive gym companion app that:
- Eliminates friction in class booking
- Provides meaningful progress insights
- Builds a connected gym community
- Supports all stakeholders (members, instructors, managers)

### 2.3 Value Proposition

| Stakeholder | Value Delivered |
|-------------|-----------------|
| **Members** | Easy booking, progress tracking, personalized recommendations |
| **Instructors** | Class management, attendance tracking, member insights |
| **Managers** | Operations dashboard, analytics, member management |
| **Gym Business** | Increased engagement, reduced churn, operational efficiency |

---

## 3. Target Audience

### 3.1 Primary Market

- **Demographics**: Adults 18-55 years old
- **Geography**: Urban and suburban areas
- **Behavior**: Regular gym-goers (3+ times/week)
- **Tech Savviness**: Smartphone users, comfortable with mobile apps

### 3.2 Market Segments

| Segment | Description | Needs |
|---------|-------------|-------|
| **Fitness Enthusiasts** | Regular gym visitors, goal-oriented | Progress tracking, class variety |
| **Casual Members** | 1-2 visits/week, flexible schedule | Easy booking, reminders |
| **Group Class Lovers** | Prefer structured classes | Class schedules, instructor info |
| **Personal Training Clients** | Work with trainers | Session booking, progress sharing |

---

## 4. User Personas

### 4.1 Alex - The Dedicated Member

| Attribute | Detail |
|-----------|--------|
| **Age** | 32 |
| **Occupation** | Software Engineer |
| **Gym Frequency** | 5x per week |
| **Goals** | Build muscle, improve stamina |
| **Pain Points** | Forgetting workouts, inconsistent progress tracking |
| **Needs** | Detailed workout logs, progress charts, class reminders |

### 4.2 Sarah - The Group Fitness Enthusiast

| Attribute | Detail |
|-----------|--------|
| **Age** | 28 |
| **Occupation** | Marketing Manager |
| **Gym Frequency** | 4x per week (classes) |
| **Goals** | Stay fit, social fitness experience |
| **Pain Points** | Classes filling up, not knowing instructor schedules |
| **Needs** | Easy class booking, waitlists, instructor profiles |

### 4.3 Mike - The Fitness Instructor

| Attribute | Detail |
|-----------|--------|
| **Age** | 35 |
| **Occupation** | Certified Personal Trainer |
| **Classes** | 15+ per week |
| **Goals** | Engage members, grow client base |
| **Pain Points** | Managing multiple classes, tracking attendance |
| **Needs** | Class management tools, member engagement features |

### 4.4 Jane - The Gym Manager

| Attribute | Detail |
|-----------|--------|
| **Age** | 42 |
| **Occupation** | Gym Operations Manager |
| **Responsibilities** | Staff, members, facilities |
| **Goals** | Maximize occupancy, member satisfaction |
| **Pain Points** | Lack of real-time insights, manual reporting |
| **Needs** | Dashboard analytics, member management, reporting |

---

## 5. Feature Requirements

### 5.1 Feature Priority Matrix

| Priority | Feature | User Role | Status |
|----------|---------|-----------|--------|
| P0 | Authentication (Email, Social) | All | 🟡 In Progress |
| P0 | Profile Management | All | ✅ Complete |
| P0 | Dashboard | Members | ✅ Complete |
| P0 | Class Schedule View | Members | ✅ Complete |
| P1 | Class Booking | Members | 🔴 Planned |
| P1 | Progress Tracking | Members | ✅ Complete |
| P1 | Workout Logging | Members | 🔴 Planned |
| P2 | Notifications | All | 🟡 In Progress |
| P2 | QR Check-in | Members | 🟡 In Progress |
| P2 | Achievement System | Members | 🔴 Planned |
| P3 | Instructor Dashboard | Instructors | 🔴 Planned |
| P3 | Manager Web Panel | Managers | 🔴 Planned |

### 5.2 Detailed Feature Specifications

#### 5.2.1 Authentication System

**Description**: Secure user authentication with multiple sign-in options.

| Requirement ID | Description | Priority |
|----------------|-------------|----------|
| AUTH-001 | Email/password registration | P0 |
| AUTH-002 | Email/password login | P0 |
| AUTH-003 | Apple Sign-In (iOS) | P0 |
| AUTH-004 | Google Sign-In | P1 |
| AUTH-005 | Password reset via email | P1 |
| AUTH-006 | Session persistence | P0 |
| AUTH-007 | Secure token storage | P0 |
| AUTH-008 | Role-based routing | P0 |

**Acceptance Criteria**:
- [ ] Users can register with valid email and password (min 8 chars)
- [ ] Users receive email verification
- [ ] Social login buttons follow platform guidelines
- [ ] Sessions persist across app restarts
- [ ] Users are routed based on role after login

#### 5.2.2 Member Dashboard

**Description**: Central hub for members showing key information and quick actions.

| Requirement ID | Description | Priority |
|----------------|-------------|----------|
| DASH-001 | Personalized greeting | P0 |
| DASH-002 | Membership card display | P0 |
| DASH-003 | Quick action buttons | P0 |
| DASH-004 | Today's schedule preview | P1 |
| DASH-005 | Recent activity feed | P1 |
| DASH-006 | Notifications badge | P2 |

**Acceptance Criteria**:
- [ ] Dashboard loads within 2 seconds
- [ ] Membership tier (Bronze/Silver/Gold) displayed correctly
- [ ] Quick actions navigate to correct screens
- [ ] Up to 3 upcoming classes shown
- [ ] Last 5 activities displayed

#### 5.2.3 Class Schedule & Booking

**Description**: Browse, filter, and book gym classes.

| Requirement ID | Description | Priority |
|----------------|-------------|----------|
| SCHED-001 | Weekly calendar view | P0 |
| SCHED-002 | Class filtering by type | P0 |
| SCHED-003 | Class details view | P0 |
| SCHED-004 | Book class functionality | P1 |
| SCHED-005 | Cancel booking | P1 |
| SCHED-006 | Waitlist system | P2 |
| SCHED-007 | Push notifications for reminders | P2 |

**Acceptance Criteria**:
- [ ] Calendar shows 7-day week view
- [ ] Filters: All, Yoga, HIIT, Strength, Cardio
- [ ] Class card shows: time, name, instructor, duration, spots
- [ ] Booking confirmation with haptic feedback
- [ ] 24-hour cancellation policy enforced

#### 5.2.4 Progress Tracking

**Description**: Visualize fitness progress over time.

| Requirement ID | Description | Priority |
|----------------|-------------|----------|
| PROG-001 | Stats overview grid | P0 |
| PROG-002 | Weekly activity chart | P1 |
| PROG-003 | Achievement badges | P2 |
| PROG-004 | Workout history list | P1 |
| PROG-005 | Personal records | P2 |
| PROG-006 | Goal setting | P2 |

**Acceptance Criteria**:
- [ ] Stats: Total workouts, classes attended, calories, PRs
- [ ] Bar chart showing last 7 days of activity
- [ ] Achievements unlocked with animation
- [ ] Workout details accessible from history

#### 5.2.5 Profile Management

**Description**: User profile and settings management.

| Requirement ID | Description | Priority |
|----------------|-------------|----------|
| PROF-001 | Profile photo upload | P1 |
| PROF-002 | Personal info editing | P0 |
| PROF-003 | Emergency contact | P0 |
| PROF-004 | Notification preferences | P1 |
| PROF-005 | Theme toggle (Light/Dark/Auto) | P1 |
| PROF-006 | Membership details | P0 |
| PROF-007 | Change password | P1 |
| PROF-008 | Delete account | P1 |
| PROF-009 | Logout | P0 |

**Acceptance Criteria**:
- [ ] Profile photo cropped to circle
- [ ] Required fields: Full name, phone, emergency contact
- [ ] Theme changes apply immediately
- [ ] Delete requires double confirmation

---

## 6. Technical Architecture

### 6.1 System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER                             │
├─────────────────┬─────────────────┬─────────────────────────────┤
│   iOS App       │   Android App   │         Web App             │
│  (React Native) │  (React Native) │      (Expo Web)             │
└────────┬────────┴────────┬────────┴──────────────┬──────────────┘
         │                 │                       │
         └─────────────────┼───────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│                       API GATEWAY                               │
│                    (Express.js + REST)                          │
└─────────────────────────────┬───────────────────────────────────┘
                              │
         ┌────────────────────┼────────────────────┐
         │                    │                    │
         ▼                    ▼                    ▼
┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│   Supabase      │  │   PostgreSQL    │  │   File Storage  │
│   (Auth)        │  │   (Drizzle ORM) │  │   (Supabase)    │
└─────────────────┘  └─────────────────┘  └─────────────────┘
```

### 6.2 Technology Stack

| Layer | Technology | Version |
|-------|------------|---------|
| **Mobile Framework** | React Native | 0.81.5 |
| **Development Platform** | Expo SDK | 54 |
| **Navigation** | React Navigation | 7.x |
| **State Management** | React Context + TanStack Query | 5.x |
| **Backend Runtime** | Node.js | 20.x |
| **Backend Framework** | Express.js | 4.21 |
| **Database ORM** | Drizzle ORM | 0.39 |
| **Database** | PostgreSQL | 15.x |
| **Authentication** | Supabase Auth | - |
| **Validation** | Zod | 3.24 |
| **Language** | TypeScript | 5.9 |

### 6.3 Frontend Architecture

```
client/
├── App.tsx                    # Application root
├── index.js                   # Entry point
├── components/                # Reusable UI components
│   ├── Button.tsx            # Button variants
│   ├── Card.tsx              # Card with elevation
│   ├── ThemedText.tsx        # Theme-aware text
│   ├── ThemedView.tsx        # Theme-aware container
│   ├── HeaderTitle.tsx       # Navigation header
│   ├── ErrorBoundary.tsx     # Error handling
│   ├── ErrorFallback.tsx     # Error UI
│   ├── Spacer.tsx            # Layout spacing
│   └── KeyboardAwareScrollViewCompat.tsx
├── screens/                   # Screen components
│   ├── HomeScreen.tsx        # Dashboard
│   ├── LoginScreen.tsx       # Authentication
│   ├── RegisterScreen.tsx    # Registration
│   ├── ProfileCompletionScreen.tsx
│   ├── ScheduleScreen.tsx    # Class schedule
│   ├── ProgressScreen.tsx    # Fitness tracking
│   └── ProfileScreen.tsx     # Settings
├── navigation/               # Navigation configuration
│   ├── RootStackNavigator.tsx
│   ├── MainTabNavigator.tsx
│   ├── HomeStackNavigator.tsx
│   ├── ScheduleStackNavigator.tsx
│   ├── ProgressStackNavigator.tsx
│   └── ProfileStackNavigator.tsx
├── context/                  # React Context providers
│   └── AuthContext.tsx       # Authentication state
├── hooks/                    # Custom React hooks
│   ├── useTheme.ts          # Theme management
│   └── ...
├── constants/               # App constants
│   └── Colors.ts            # Color palette
├── lib/                     # Utilities
│   └── api.ts              # API client
└── data/                    # Mock data
    └── mockData.ts
```

### 6.4 Backend Architecture

```
server/
├── index.ts                 # Server entry point
├── routes.ts               # API route definitions
├── storage.ts              # Storage abstraction
└── templates/              # Email templates

shared/
└── schema.ts               # Database schema (Drizzle)
```

### 6.5 Database Schema

```sql
-- Users Table
CREATE TABLE users (
  id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
  username TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL
);

-- Members Table (Planned)
CREATE TABLE members (
  id VARCHAR PRIMARY KEY REFERENCES users(id),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone TEXT,
  emergency_contact_name TEXT,
  emergency_contact_phone TEXT,
  profile_photo_url TEXT,
  date_of_birth DATE,
  membership_tier VARCHAR(10) CHECK (tier IN ('bronze', 'silver', 'gold')),
  membership_expiry DATE,
  member_since DATE DEFAULT CURRENT_DATE,
  is_profile_complete BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Member Health Profile Table (Onboarding Data)
CREATE TABLE member_health_profiles (
  id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
  member_id VARCHAR NOT NULL REFERENCES members(id) ON DELETE CASCADE,

  -- Physical Metrics (Step 2 - Height Screen)
  sex VARCHAR(10) CHECK (sex IN ('male', 'female')),
  height_cm DECIMAL(5,2), -- Height in centimeters (e.g., 170.5)
  height_unit VARCHAR(5) DEFAULT 'cm' CHECK (height_unit IN ('cm', 'ft')),

  -- Weight Data (Weight Screen & Goal Weight Screen)
  current_weight_kg DECIMAL(5,2), -- Current weight in kg (e.g., 75.5)
  goal_weight_kg DECIMAL(5,2), -- Goal weight in kg
  weight_unit VARCHAR(5) DEFAULT 'kg' CHECK (weight_unit IN ('kg', 'lbs')),

  -- Fitness Profile (Experience Screen)
  experience_level VARCHAR(20) CHECK (experience_level IN ('beginner', 'intermediate', 'advanced')),

  -- Demographics (Age Screen)
  age INTEGER CHECK (age >= 14 AND age <= 100),

  -- Training Preferences (Frequency Screen)
  training_frequency VARCHAR(20) CHECK (training_frequency IN ('1_day', '2_days', '3_days', '4_days', '5_days', '6_days', 'everyday')),

  -- Fitness Goals (Step 3 Screen)
  main_goal VARCHAR(30) CHECK (main_goal IN ('stronger', 'muscle', 'lean', 'weight_loss', 'health', 'performance')),

  -- Calculated Metrics
  current_bmi DECIMAL(4,2), -- Calculated BMI based on current weight
  goal_bmi DECIMAL(4,2), -- Calculated BMI based on goal weight
  weight_difference_kg DECIMAL(5,2), -- Difference between current and goal weight

  -- Profile Completion Status
  onboarding_completed BOOLEAN DEFAULT FALSE,
  onboarding_skipped BOOLEAN DEFAULT FALSE,
  onboarding_completed_at TIMESTAMP,

  -- Audit Fields
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX idx_member_health_profiles_member_id ON member_health_profiles(member_id);
CREATE INDEX idx_member_health_profiles_onboarding_completed ON member_health_profiles(onboarding_completed);

-- Classes Table (Planned)
CREATE TABLE classes (
  id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  instructor_id VARCHAR REFERENCES users(id),
  class_type VARCHAR(20),
  duration_minutes INTEGER,
  max_capacity INTEGER,
  difficulty VARCHAR(10),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Class Schedule Table (Planned)
CREATE TABLE class_schedule (
  id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
  class_id VARCHAR REFERENCES classes(id),
  scheduled_date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  spots_available INTEGER,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Bookings Table (Planned)
CREATE TABLE bookings (
  id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
  member_id VARCHAR REFERENCES members(id),
  schedule_id VARCHAR REFERENCES class_schedule(id),
  status VARCHAR(15) CHECK (status IN ('confirmed', 'cancelled', 'waitlisted')),
  booked_at TIMESTAMP DEFAULT NOW(),
  cancelled_at TIMESTAMP
);

-- Workouts Table (Planned)
CREATE TABLE workouts (
  id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
  member_id VARCHAR REFERENCES members(id),
  name TEXT NOT NULL,
  duration_minutes INTEGER,
  calories_burned INTEGER,
  notes TEXT,
  workout_date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMP DEFAULT NOW()
);
```

---

## 7. Design System

### 7.1 Brand Colors

| Color | HEX | Usage |
|-------|-----|-------|
| **Primary** | `#E74C3C` | CTAs, active states, brand elements |
| **Secondary** | `#2C3E50` | Headers, navigation, dark accents |
| **Accent** | `#F39C12` | Highlights, warnings, special elements |
| **Success** | `#27AE60` | Confirmations, positive states |
| **Warning** | `#F39C12` | Alerts, cautions |
| **Error** | `#E74C3C` | Errors, destructive actions |

### 7.2 UI Colors (Light/Dark Mode)

| Element | Light Mode | Dark Mode |
|---------|------------|-----------|
| Background | `#FFFFFF` | `#1A1A1A` |
| Surface | `#F8F9FA` | `#2A2A2A` |
| Text Primary | `#2C3E50` | `#FFFFFF` |
| Text Secondary | `#7F8C8D` | `#B0B0B0` |
| Border | `#E0E0E0` | `#3A3A3A` |

### 7.3 Typography

| Style | Font | Size | Weight | Usage |
|-------|------|------|--------|-------|
| H1 | System | 28pt | Bold | Screen titles |
| H2 | System | 22pt | Semibold | Section headers |
| H3 | System | 18pt | Semibold | Card titles |
| Body Large | System | 17pt | Regular | Important text |
| Body | System | 15pt | Regular | General text |
| Caption | System | 13pt | Regular | Labels, hints |
| Button | System | 16pt | Semibold | Button text |

### 7.4 Spacing Scale

| Token | Value | Usage |
|-------|-------|-------|
| xs | 4pt | Tight spacing |
| sm | 8pt | Component internal spacing |
| md | 12pt | Default spacing |
| lg | 16pt | Section spacing |
| xl | 24pt | Large gaps |
| xxl | 32pt | Page margins |

### 7.5 Component Specifications

#### Buttons

| Variant | Background | Text | Border | Height |
|---------|------------|------|--------|--------|
| Primary | Primary (#E74C3C) | White | None | 48pt |
| Secondary | Transparent | Primary | 1pt Primary | 48pt |
| Text | None | Primary | None | 44pt |

#### Cards

- Background: Surface color
- Border radius: 12pt
- Padding: 16pt
- Shadow (floating): offset {0, 2}, opacity 0.10, radius 2

#### Inputs

- Height: 52pt
- Border: 1pt solid Border color
- Border radius: 8pt
- Padding: 12pt horizontal
- Focus state: Primary border
- Error state: Error border

#### Tab Bar

- Height: 56pt + safe area bottom
- Background: Surface with blur (iOS)
- Active icon: Primary color
- Inactive icon: Text Secondary
- Icon size: 24pt

### 7.6 Icons

- **Library**: Feather Icons (@expo/vector-icons)
- **Tab icons**: 24pt
- **Header icons**: 20pt
- **Inline icons**: 18pt
- **Rule**: No emojis in UI

---

## 8. User Flows

### 8.1 Authentication Flow

```
┌─────────────┐
│  App Start  │
└──────┬──────┘
       │
       ▼
┌─────────────────┐     ┌─────────────────┐
│ Check Stored    │────▶│ Valid Session?  │
│ Auth Token      │     └────────┬────────┘
└─────────────────┘              │
                          Yes ◀──┴──▶ No
                           │         │
                           ▼         ▼
                  ┌─────────────┐  ┌─────────────┐
                  │ Check Role  │  │ Login Screen│
                  └──────┬──────┘  └──────┬──────┘
                         │                │
            ┌────────────┼────────────┐   │
            │            │            │   │
            ▼            ▼            ▼   │
       ┌─────────┐ ┌──────────┐ ┌──────────┐   │
       │ Member  │ │Instructor│ │ Manager  │   │
       │Dashboard│ │Tablet UI │ │Web Panel │   │
       └─────────┘ └──────────┘ └──────────┘   │
            ▲                                   │
            │                                   │
            └───────────────────────────────────┘
                     (After Login)
```

### 8.2 Profile Completion Flow

```
┌─────────────────────┐
│ Login Successful    │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐     ┌─────────────────────┐
│ isProfileComplete?  │────▶│        Yes          │
└──────────┬──────────┘     └──────────┬──────────┘
           │ No                        │
           ▼                           ▼
┌─────────────────────┐     ┌─────────────────────┐
│ Profile Completion  │     │     Dashboard       │
│ Modal (Mandatory)   │     │                     │
└──────────┬──────────┘     └─────────────────────┘
           │
           ▼
┌─────────────────────┐
│ Fill Required Fields│
│ - Full Name         │
│ - Phone             │
│ - Emergency Contact │
│ - Profile Photo     │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ Submit & Navigate   │
│ to Dashboard        │
└─────────────────────┘
```

### 8.3 Class Booking Flow

```
┌─────────────────┐
│ Schedule Screen │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Select Date     │
│ (Week Selector) │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Apply Filters   │
│ (Optional)      │
└────────┬────────┘
         │
         ▼
┌─────────────────────┐
│ Browse Class List   │
└────────┬────────────┘
         │
         ▼
┌─────────────────────┐     ┌─────────────────────┐
│ Tap Class Card      │────▶│ Class Details Modal │
└─────────────────────┘     └────────┬────────────┘
                                     │
                    ┌────────────────┼────────────────┐
                    │                │                │
                    ▼                ▼                ▼
             ┌───────────┐    ┌───────────┐    ┌───────────┐
             │ Spots     │    │ Full -    │    │ Already   │
             │ Available │    │ Join Wait │    │ Booked    │
             └─────┬─────┘    └─────┬─────┘    └─────┬─────┘
                   │                │                │
                   ▼                ▼                ▼
             ┌───────────┐    ┌───────────┐    ┌───────────┐
             │ Book Now  │    │ Waitlist  │    │ Cancel    │
             │ Button    │    │ Button    │    │ Button    │
             └─────┬─────┘    └─────┬─────┘    └─────┬─────┘
                   │                │                │
                   ▼                ▼                ▼
             ┌───────────────────────────────────────────┐
             │         Confirmation + Haptic Feedback    │
             └───────────────────────────────────────────┘
```

---

## 9. Data Models

### 9.1 User Model

```typescript
interface User {
  id: string;
  email: string;
  role: 'member' | 'instructor' | 'manager';
  fullName: string;
  phone?: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  profilePhoto?: string;
  memberSince: string;
  membershipTier: 'bronze' | 'silver' | 'gold';
  membershipExpiry: string;
  isProfileComplete: boolean;
}
```

### 9.2 Class Model

```typescript
interface GymClass {
  id: string;
  name: string;
  description: string;
  type: 'yoga' | 'hiit' | 'strength' | 'cardio' | 'other';
  instructor: {
    id: string;
    name: string;
    photo?: string;
  };
  duration: number; // minutes
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  maxCapacity: number;
}
```

### 9.3 Schedule Model

```typescript
interface ClassSchedule {
  id: string;
  classId: string;
  class: GymClass;
  date: string; // ISO date
  startTime: string; // HH:mm
  endTime: string; // HH:mm
  spotsAvailable: number;
  isBookedByUser: boolean;
  isOnWaitlist: boolean;
}
```

### 9.4 Booking Model

```typescript
interface Booking {
  id: string;
  userId: string;
  scheduleId: string;
  schedule: ClassSchedule;
  status: 'confirmed' | 'cancelled' | 'waitlisted' | 'completed';
  bookedAt: string;
  cancelledAt?: string;
}
```

### 9.5 Workout Model

```typescript
interface Workout {
  id: string;
  userId: string;
  name: string;
  type: 'cardio' | 'strength' | 'flexibility' | 'mixed';
  duration: number; // minutes
  caloriesBurned?: number;
  exercises?: Exercise[];
  notes?: string;
  date: string;
}

interface Exercise {
  name: string;
  sets?: number;
  reps?: number;
  weight?: number; // kg
  duration?: number; // seconds
}
```

### 9.6 Member Health Profile Model (Onboarding Data)

```typescript
interface MemberHealthProfile {
  id: string;
  memberId: string;

  // Physical Metrics (Collected in OnboardingStep2 & OnboardingHeight)
  sex: 'male' | 'female';
  heightCm: number; // Height in centimeters (e.g., 170.5)
  heightUnit: 'cm' | 'ft';

  // Weight Data (Collected in OnboardingWeight & OnboardingGoalWeight)
  currentWeightKg: number; // Current weight in kg (e.g., 75.5)
  goalWeightKg: number; // Goal weight in kg
  weightUnit: 'kg' | 'lbs';

  // Fitness Profile (Collected in OnboardingExperience)
  experienceLevel: 'beginner' | 'intermediate' | 'advanced';

  // Demographics (Collected in OnboardingAge)
  age: number; // Between 14 and 100

  // Training Preferences (Collected in OnboardingFrequency)
  trainingFrequency: '1_day' | '2_days' | '3_days' | '4_days' | '5_days' | '6_days' | 'everyday';

  // Fitness Goals (Collected in OnboardingStep3)
  mainGoal: 'stronger' | 'muscle' | 'lean' | 'weight_loss' | 'health' | 'performance';

  // Calculated Metrics
  currentBmi: number; // Calculated: weight / (height in meters)²
  goalBmi: number; // Calculated: goalWeight / (height in meters)²
  weightDifferenceKg: number; // currentWeight - goalWeight

  // Profile Completion Status
  onboardingCompleted: boolean;
  onboardingSkipped: boolean;
  onboardingCompletedAt?: string; // ISO timestamp

  // Audit Fields
  createdAt: string;
  updatedAt: string;
}

// Onboarding Flow Data Structure (Route Params)
interface OnboardingData {
  // Step 2 (Sex Selection)
  sex?: 'male' | 'female';

  // Height Screen
  height?: number; // in cm

  // Weight Screen
  currentWeight?: number; // in kg

  // Goal Weight Screen
  goalWeight?: number; // in kg

  // Experience Screen
  experienceLevel?: 'beginner' | 'intermediate' | 'advanced';

  // Age Screen
  age?: number;

  // Frequency Screen
  frequency?: '1_day' | '2_days' | '3_days' | '4_days' | '5_days' | '6_days' | 'everyday';

  // Step 3 (Main Goal)
  mainGoal?: 'stronger' | 'muscle' | 'lean' | 'weight_loss' | 'health' | 'performance';
}
```

---

## 10. API Specifications

### 10.1 Authentication Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login user |
| POST | `/api/auth/logout` | Logout user |
| POST | `/api/auth/refresh` | Refresh token |
| POST | `/api/auth/forgot-password` | Request password reset |
| POST | `/api/auth/reset-password` | Reset password |

### 10.2 User Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/users/me` | Get current user profile |
| PATCH | `/api/users/me` | Update user profile |
| POST | `/api/users/me/photo` | Upload profile photo |
| DELETE | `/api/users/me` | Delete account |

### 10.3 Class Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/classes` | List all classes |
| GET | `/api/classes/:id` | Get class details |
| GET | `/api/classes/schedule` | Get class schedule |
| GET | `/api/classes/schedule/:date` | Get schedule for date |

### 10.4 Booking Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/bookings` | List user bookings |
| POST | `/api/bookings` | Create booking |
| DELETE | `/api/bookings/:id` | Cancel booking |
| POST | `/api/bookings/:id/waitlist` | Join waitlist |

### 10.5 Progress Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/progress/stats` | Get user statistics |
| GET | `/api/progress/workouts` | List user workouts |
| POST | `/api/progress/workouts` | Log new workout |
| GET | `/api/progress/achievements` | Get user achievements |

### 10.6 Onboarding / Health Profile Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/users/me/health-profile` | Get user's health profile and onboarding data |
| POST | `/api/users/me/health-profile` | Create or update health profile (onboarding data) |
| PATCH | `/api/users/me/health-profile` | Partially update health profile |
| POST | `/api/users/me/onboarding/complete` | Mark onboarding as completed |
| POST | `/api/users/me/onboarding/skip` | Mark onboarding as skipped |

**Request Body Example (POST /api/users/me/health-profile):**
```json
{
  "sex": "male",
  "heightCm": 175.0,
  "heightUnit": "cm",
  "currentWeightKg": 75.5,
  "goalWeightKg": 70.0,
  "weightUnit": "kg",
  "experienceLevel": "intermediate",
  "age": 30,
  "trainingFrequency": "3_days",
  "mainGoal": "weight_loss"
}
```

**Response Example:**
```json
{
  "success": true,
  "data": {
    "id": "uuid-123",
    "memberId": "member-uuid",
    "sex": "male",
    "heightCm": 175.0,
    "currentWeightKg": 75.5,
    "goalWeightKg": 70.0,
    "currentBmi": 24.7,
    "goalBmi": 22.9,
    "weightDifferenceKg": 5.5,
    "experienceLevel": "intermediate",
    "age": 30,
    "trainingFrequency": "3_days",
    "mainGoal": "weight_loss",
    "onboardingCompleted": true,
    "onboardingCompletedAt": "2025-12-15T10:30:00Z",
    "createdAt": "2025-12-15T10:30:00Z",
    "updatedAt": "2025-12-15T10:30:00Z"
  }
}
```

---

## 11. Security Requirements

### 11.1 Authentication Security

| Requirement | Implementation |
|-------------|----------------|
| Password hashing | bcrypt with salt rounds >= 12 |
| Session tokens | JWT with 1-hour expiry |
| Refresh tokens | Secure, HTTP-only cookies |
| Rate limiting | 5 login attempts per 15 minutes |
| MFA support | TOTP optional for managers |

### 11.2 Data Protection

| Requirement | Implementation |
|-------------|----------------|
| Data encryption | TLS 1.3 for transit, AES-256 for rest |
| PII handling | Encrypted storage, minimal collection |
| Token storage | Secure storage (Keychain/Keystore) |
| Input validation | Zod schemas on all endpoints |
| SQL injection | Parameterized queries via Drizzle |

### 11.3 Compliance

- GDPR compliant data handling
- Right to data export
- Right to deletion
- Privacy policy required
- Terms of service required

---

## 12. Performance Requirements

### 12.1 Response Times

| Metric | Target | Maximum |
|--------|--------|---------|
| API response (p50) | 100ms | 300ms |
| API response (p95) | 200ms | 500ms |
| Screen load | 1s | 2s |
| First Contentful Paint | 1.5s | 3s |
| Time to Interactive | 2s | 4s |

### 12.2 Capacity

| Metric | Target |
|--------|--------|
| Concurrent users | 1,000 |
| API requests/minute | 10,000 |
| Database connections | 100 pool |
| Uptime | 99.9% |

### 12.3 Mobile Performance

| Metric | Target |
|--------|--------|
| App size | < 50MB |
| Memory usage | < 150MB |
| Battery impact | Low |
| Offline capability | Basic features |

---

## 13. Accessibility Requirements

### 13.1 WCAG 2.1 AA Compliance

| Requirement | Implementation |
|-------------|----------------|
| Color contrast | Minimum 4.5:1 for text |
| Touch targets | Minimum 44pt x 44pt |
| Screen readers | Full VoiceOver/TalkBack support |
| Dynamic type | Respect system font size |
| Focus indicators | Visible focus states |
| Error announcements | Accessible error messages |

### 13.2 Motion Sensitivity

- Respect `prefers-reduced-motion`
- Disable springs and bounces
- Provide static alternatives

### 13.3 Internationalization

- RTL layout support
- Date/time localization
- Number formatting
- Initial languages: English, Portuguese

---

## 14. Release Plan

### 14.1 Phase 1 - MVP (Q1 2025)

**Target Date**: January 31, 2025

| Feature | Status |
|---------|--------|
| Authentication (Email) | ✅ Complete |
| Profile management | ✅ Complete |
| Dashboard | ✅ Complete |
| Schedule viewing | ✅ Complete |
| Progress viewing | ✅ Complete |
| Theme support | ✅ Complete |

### 14.2 Phase 2 - Core Features (Q2 2025)

**Target Date**: April 30, 2025

| Feature | Status |
|---------|--------|
| Supabase Auth integration | 🔴 Planned |
| Class booking system | 🔴 Planned |
| Workout logging | 🔴 Planned |
| Push notifications | 🔴 Planned |
| Social login | 🔴 Planned |

### 14.3 Phase 3 - Enhanced Experience (Q3 2025)

**Target Date**: July 31, 2025

| Feature | Status |
|---------|--------|
| QR check-in | 🟡 In Progress |
| Achievement system | 🔴 Planned |
| Waitlist management | 🔴 Planned |
| Instructor profiles | 🔴 Planned |
| Class reviews/ratings | 🔴 Planned |

### 14.4 Phase 4 - Platform Expansion (Q4 2025)

**Target Date**: October 31, 2025

| Feature | Status |
|---------|--------|
| Instructor tablet UI | 🔴 Planned |
| Manager web panel | 🔴 Planned |
| Analytics dashboard | 🔴 Planned |
| Reporting system | 🔴 Planned |
| API for integrations | 🔴 Planned |

---

## 15. Success Metrics

### 15.1 Key Performance Indicators (KPIs)

| Metric | Q1 Target | Q2 Target | Q3 Target | Q4 Target |
|--------|-----------|-----------|-----------|-----------|
| Registered users | 500 | 1,000 | 2,000 | 5,000 |
| Daily Active Users | 100 | 300 | 600 | 1,500 |
| Class booking rate | - | 50% | 65% | 75% |
| User retention (30-day) | 60% | 70% | 80% | 85% |
| App store rating | 4.0 | 4.2 | 4.5 | 4.7 |
| Crash-free sessions | 98% | 99% | 99.5% | 99.9% |

### 15.2 User Satisfaction Metrics

| Metric | Target |
|--------|--------|
| NPS Score | > 50 |
| CSAT Score | > 4.0/5.0 |
| Support tickets/user | < 0.5/month |
| Feature request implementation | > 30%/quarter |

### 15.3 Technical Metrics

| Metric | Target |
|--------|--------|
| API uptime | 99.9% |
| Average response time | < 200ms |
| Error rate | < 0.1% |
| Deploy frequency | Weekly |

---

## 16. Appendix

### 16.1 Test Accounts

| Email | Password | Role | Profile Status |
|-------|----------|------|----------------|
| member@zgym.com | member123 | Member | Complete |
| instructor@zgym.com | instructor123 | Instructor | Complete |
| manager@zgym.com | manager123 | Manager | Complete |
| new@zgym.com | new123 | Member | Incomplete |

### 16.2 Environment Variables

```env
# Database
DATABASE_URL=postgresql://user:password@host:5432/myzgym

# Supabase
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# App Configuration
EXPO_PUBLIC_DOMAIN=your-domain.com
NODE_ENV=development|production
```

### 16.3 Glossary

| Term | Definition |
|------|------------|
| **Member** | End user who uses the gym and the app |
| **Instructor** | Gym staff who leads classes |
| **Manager** | Gym administrator with full access |
| **Booking** | Reserved spot in a class |
| **Waitlist** | Queue for full classes |
| **PR** | Personal Record - best achievement |

### 16.4 References

- [React Native Documentation](https://reactnative.dev/)
- [Expo Documentation](https://docs.expo.dev/)
- [Supabase Documentation](https://supabase.com/docs)
- [Drizzle ORM Documentation](https://orm.drizzle.team/)
- [React Navigation Documentation](https://reactnavigation.org/)

---

**Document Control**

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | Dec 9, 2025 | ChongTechnologies | Initial PRD |

---

*This document is confidential and intended for internal use only.*
