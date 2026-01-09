# My-ZGym - Product Requirements Document (PRD)

**Version:** 3.0
**Last Updated:** January 6, 2026
**Author:** ChongTechnologies
**Status:** In Development - Core Features Complete

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

- **Members**: Personalized onboarding, training programs, workout tracking, progress visualization, supplement shopping
- **Instructors**: Complete client management, workout/program creation, physical assessments, and schedule management (Mobile App)
- **Managers**: Comprehensive gym operations oversight (Web Panel - Planned)
- **E-commerce**: Integrated shop for supplements, apparel, equipment, and accessories

### 1.3 Business Goals

| Goal | Target | Timeline |
|------|--------|----------|
| User Acquisition | 1,000 active members | Q2 2026 |
| Daily Active Users | 40% of registered users | Q3 2026 |
| Class Booking Rate | 75% utilization | Q4 2026 |
| User Retention | 85% monthly retention | Q4 2026 |
| E-commerce Revenue | $10k/month supplement sales | Q4 2026 |

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
| **Members** | Personalized onboarding, training programs, workout tracking, progress visualization, supplement shopping |
| **Instructors** | Client management, workout/program builder, physical assessments, schedule oversight |
| **Managers** | Operations dashboard, analytics, member management (Planned) |
| **Gym Business** | Increased engagement, reduced churn, operational efficiency, additional revenue stream |

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
| P0 | Member Onboarding Flow (10 screens) | Members | ✅ Complete |
| P0 | Dashboard | Members | ✅ Complete |
| P0 | Instructor Dashboard | Instructors | ✅ Complete |
| P0 | Client Management | Instructors | ✅ Complete |
| P0 | Workout Routine Builder | Instructors | ✅ Complete |
| P0 | Training Program Builder | Instructors | ✅ Complete |
| P0 | Physical Assessment System | Instructors | ✅ Complete |
| P0 | Program Assignment | Instructors | ✅ Complete |
| P0 | Member Training Plan View | Members | ✅ Complete |
| P0 | Exercise Library (32+ exercises) | All | ✅ Complete |
| P0 | Class Schedule View | Members | ✅ Complete |
| P0 | E-commerce Shop | Members | ✅ Complete |
| P0 | Product Catalog & Categories | Members | ✅ Complete |
| P0 | Shopping Cart & Checkout | Members | ✅ Complete |
| P1 | Instructor Schedule View | Instructors | ✅ Complete |
| P1 | Progress Tracking | Members | ✅ Complete |
| P1 | Class Booking | Members | 🔴 Planned |
| P1 | Workout Logging | Members | 🔴 Planned |
| P2 | Notifications | All | 🟡 In Progress |
| P2 | QR Check-in | Members | 🟡 In Progress |
| P2 | Achievement System | Members | 🔴 Planned |
| P2 | Order History & Tracking | Members | 🔴 Planned |
| P3 | Manager Web Panel | Managers | 🔴 Planned |
| P3 | Backend API Integration | All | 🔴 Planned |
| P3 | Payment Gateway Integration | All | 🔴 Planned |

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
- [x] Profile photo cropped to circle
- [x] Required fields: Full name, phone, emergency contact
- [x] Theme changes apply immediately
- [x] Delete requires double confirmation

#### 5.2.6 Instructor Dashboard

**Description**: Central hub for instructors showing key metrics and today's schedule.

| Requirement ID | Description | Priority |
|----------------|-------------|----------|
| INST-DASH-001 | Display instructor name and greeting | P0 |
| INST-DASH-002 | Show total clients count | P0 |
| INST-DASH-003 | Show active routines count | P0 |
| INST-DASH-004 | Show sessions this week | P0 |
| INST-DASH-005 | Show check-ins today | P0 |
| INST-DASH-006 | Display today's scheduled sessions | P0 |
| INST-DASH-007 | Gradient header design | P1 |

**Acceptance Criteria**:
- [x] Dashboard loads within 2 seconds
- [x] All 4 stat cards displayed with icons
- [x] Today's sessions sorted by time
- [x] Navigation to detail screens from cards
- [x] Gradient header (#E8FF2B to #F5F5F5)

#### 5.2.7 Client Management (Instructor)

**Description**: Comprehensive client management for instructors.

| Requirement ID | Description | Priority |
|----------------|-------------|----------|
| CLIENT-001 | List all assigned clients | P0 |
| CLIENT-002 | Display client compliance rate | P0 |
| CLIENT-003 | Show last workout date | P0 |
| CLIENT-004 | Display current program | P0 |
| CLIENT-005 | View client details | P0 |
| CLIENT-006 | Assign programs to clients | P0 |
| CLIENT-007 | Search/filter clients | P1 |
| CLIENT-008 | View client assessment history | P1 |

**Acceptance Criteria**:
- [x] Display 12+ clients in scrollable list
- [x] Show membership tier badges (Gold/Silver/Bronze)
- [x] Compliance rate visualization (65-95%)
- [x] Client detail view with full information
- [x] Program assignment modal with selection
- [x] Search functionality for client filtering

#### 5.2.8 Workout Routine Builder

**Description**: Create and manage workout routines with exercises.

| Requirement ID | Description | Priority |
|----------------|-------------|----------|
| ROUTINE-001 | Create new workout routine | P0 |
| ROUTINE-002 | Add exercises from library | P0 |
| ROUTINE-003 | Specify sets, reps, rest for each exercise | P0 |
| ROUTINE-004 | Set routine difficulty level | P0 |
| ROUTINE-005 | Set routine category | P0 |
| ROUTINE-006 | Assign routine to clients | P0 |
| ROUTINE-007 | Reorder exercises | P1 |
| ROUTINE-008 | Preview routine before saving | P1 |

**Acceptance Criteria**:
- [x] Access to 32+ exercises library
- [x] Exercise selection with search/filter
- [x] Order badge for exercise sequence
- [x] Sets, reps, rest configuration per exercise
- [x] Difficulty: beginner/intermediate/advanced
- [x] Categories: strength, hypertrophy, cardio, etc.
- [x] Multi-client assignment via ClientSelector
- [x] 8 template routines available

#### 5.2.9 Training Program Builder

**Description**: Create comprehensive multi-week training programs.

| Requirement ID | Description | Priority |
|----------------|-------------|----------|
| PROGRAM-001 | Create training program | P0 |
| PROGRAM-002 | Set program duration (weeks) | P0 |
| PROGRAM-003 | Build weekly schedule (7 days) | P0 |
| PROGRAM-004 | Assign routines to specific days | P0 |
| PROGRAM-005 | Mark rest days | P0 |
| PROGRAM-006 | Assign program to multiple clients | P0 |
| PROGRAM-007 | Set program difficulty and category | P0 |
| PROGRAM-008 | Edit existing programs | P1 |

**Acceptance Criteria**:
- [x] Program name and description fields
- [x] Duration selector (weeks)
- [x] 7-day weekly schedule builder
- [x] Routine assignment per day
- [x] Rest day toggle
- [x] Multi-client assignment
- [x] 3 template programs available
- [x] Program stats display (duration, frequency)

#### 5.2.10 Physical Assessment System

**Description**: Conduct and track client physical assessments.

| Requirement ID | Description | Priority |
|----------------|-------------|----------|
| ASSESS-001 | Create initial assessment | P0 |
| ASSESS-002 | Create progress assessment | P0 |
| ASSESS-003 | Record body composition (weight, BF%, muscle%) | P0 |
| ASSESS-004 | Record body measurements (7 points) | P0 |
| ASSESS-005 | Conduct performance tests | P0 |
| ASSESS-006 | Add instructor notes | P0 |
| ASSESS-007 | View assessment history | P0 |
| ASSESS-008 | Compare progress over time | P1 |
| ASSESS-009 | Add assessment photos | P1 |

**Acceptance Criteria**:
- [x] Differentiate initial vs progress assessment
- [x] Body composition: weight (kg), body fat %, muscle mass %, BMI
- [x] Measurements: chest, waist, hips, left/right arms, left/right thighs (cm)
- [x] Performance tests: 1RM, push-ups, sit-ups, plank, flexibility, VO2 max, custom
- [x] Text area for instructor notes and recommendations
- [x] Client search for assessment creation
- [x] Assessment history display per client
- [x] Status badges (Assessed/Create)

#### 5.2.11 Instructor Schedule Management

**Description**: View and manage instructor's weekly schedule.

| Requirement ID | Description | Priority |
|----------------|-------------|----------|
| SCHED-INST-001 | Weekly schedule view | P0 |
| SCHED-INST-002 | Display personal training sessions | P0 |
| SCHED-INST-003 | Display group classes | P0 |
| SCHED-INST-004 | Show available slots | P0 |
| SCHED-INST-005 | Display client names for sessions | P0 |
| SCHED-INST-006 | Show session duration and time | P0 |

**Acceptance Criteria**:
- [x] 7-day week view
- [x] 20+ sessions displayed
- [x] Session types: personal_training, class, available
- [x] Client assignment shown
- [x] Time slots from morning to evening
- [x] Recurring session indicators

#### 5.2.12 Member Training Plan View

**Description**: Members view their assigned training program.

| Requirement ID | Description | Priority |
|----------------|-------------|----------|
| MEMBER-PLAN-001 | Display current active program | P0 |
| MEMBER-PLAN-002 | Show current week and progress | P0 |
| MEMBER-PLAN-003 | 7-day calendar view | P0 |
| MEMBER-PLAN-004 | Display daily workout details | P0 |
| MEMBER-PLAN-005 | Show rest days | P0 |
| MEMBER-PLAN-006 | Start workout button | P0 |
| MEMBER-PLAN-007 | Track completed workouts | P1 |

**Acceptance Criteria**:
- [x] Program name and instructor display
- [x] Week progress indicator (e.g., "Week 2 of 8")
- [x] Completed workouts counter
- [x] 7-day view with workout/rest indicators
- [x] Daily workout details: name, exercises, duration, difficulty
- [x] "Start Workout" button with gradient styling
- [x] No-plan scenario with guidance message
- [x] Rest day messaging with recovery tips

#### 5.2.13 Member Onboarding Flow

**Description**: Comprehensive 10-screen onboarding flow to collect member health profile and fitness goals.

| Requirement ID | Description | Priority |
|----------------|-------------|----------|
| ONBOARD-001 | Welcome screen with app introduction | P0 |
| ONBOARD-002 | Sex selection (male/female) | P0 |
| ONBOARD-003 | Height input with visual reference | P0 |
| ONBOARD-004 | Current weight input | P0 |
| ONBOARD-005 | Goal weight input with BMI calculation | P0 |
| ONBOARD-006 | Experience level selection | P0 |
| ONBOARD-007 | Age input with validation | P0 |
| ONBOARD-008 | Training frequency selection | P0 |
| ONBOARD-009 | Main fitness goal selection | P0 |
| ONBOARD-010 | Summary and plan generation | P0 |
| ONBOARD-011 | Skip option with warning | P0 |
| ONBOARD-012 | Progress indicator throughout flow | P0 |

**Acceptance Criteria**:
- [x] 10 sequential onboarding screens
- [x] Step 1: Welcome with app overview
- [x] Step 2: Sex selection with body illustrations
- [x] Height screen: Unit toggle (cm/ft), visual representation
- [x] Weight screen: Unit toggle (kg/lbs), visual slider
- [x] Goal weight screen: BMI calculation and display
- [x] Experience screen: Beginner/Intermediate/Advanced with descriptions
- [x] Age screen: Numeric input with 14-100 validation
- [x] Frequency screen: 1-7 days per week selection
- [x] Step 3: Main goal selection (6 options: stronger, muscle, lean, weight loss, health, performance)
- [x] Step 4: Summary with personalized recommendations
- [x] Skip functionality with confirmation modal
- [x] Progress bar showing completion percentage
- [x] Data persistence across screens
- [x] Visual assets for body parts and exercises
- [x] Smooth transitions between screens

**Visual Assets**:
- Body anatomy illustrations (abs, arms, back, chest, fullbody, glutes, legs, shoulders)
- Gender-specific height references (man_height.png, woman_height.png)
- Exercise demonstration images

#### 5.2.14 E-commerce Shop

**Description**: Integrated shop for supplements, apparel, equipment, and accessories.

| Requirement ID | Description | Priority |
|----------------|-------------|----------|
| SHOP-001 | Product catalog with grid layout | P0 |
| SHOP-002 | Category filtering (all, supplements, apparel, equipment, accessories) | P0 |
| SHOP-003 | Product cards with image, name, price | P0 |
| SHOP-004 | Product rating display | P0 |
| SHOP-005 | Stock availability indicator | P0 |
| SHOP-006 | Add to cart functionality | P0 |
| SHOP-007 | Product detail screen | P0 |
| SHOP-008 | Shopping cart management | P0 |
| SHOP-009 | Checkout flow | P0 |
| SHOP-010 | Search functionality | P1 |
| SHOP-011 | Product reviews | P2 |
| SHOP-012 | Order history | P2 |

**Acceptance Criteria**:
- [x] Shop screen with horizontal category filter
- [x] 4 product categories with icons
- [x] Product grid (2 columns) with responsive layout
- [x] Product cards showing: image, name, brand, price, rating, stock status
- [x] Star rating display (0-5 stars)
- [x] "Add to Cart" quick action button
- [x] Product detail screen with full description
- [x] Checkout screen with order summary
- [x] Price calculation and total display
- [x] Stock validation before purchase
- [x] Mock product data (20+ products)
- [x] Category icons from Feather icons
- [x] Theming support (light/dark mode)

**Product Categories**:
- Supplements (protein powders, pre-workout, vitamins)
- Apparel (gym shirts, shorts, hoodies)
- Equipment (resistance bands, dumbbells, yoga mats)
- Accessories (water bottles, gym bags, towels)

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
│   ├── KeyboardAwareScrollViewCompat.tsx
│   └── instructor/           # Instructor-specific components
│       ├── ClientSelector.tsx      # Multi-select client picker
│       ├── ProgramAssignmentModal.tsx  # Program assignment UI
│       ├── RoutineCard.tsx         # Routine display card
│       └── ClientCard.tsx          # Client display card
├── screens/                   # Screen components
│   ├── member/               # Member screens
│   │   ├── HomeScreen.tsx            # Member dashboard
│   │   ├── MemberWorkoutsScreen.tsx  # Training plan view
│   │   ├── WorkoutsScreen.tsx        # Workout history
│   │   ├── ScheduleScreen.tsx        # Class schedule
│   │   ├── ProgressScreen.tsx        # Progress tracking
│   │   ├── ProfileScreen.tsx         # Settings
│   │   ├── ShopScreen.tsx            # E-commerce shop (NEW)
│   │   ├── ProductDetailScreen.tsx   # Product details (NEW)
│   │   └── CheckoutScreen.tsx        # Checkout flow (NEW)
│   ├── instructor/           # Instructor screens
│   │   ├── InstructorDashboardScreen.tsx    # Instructor dashboard
│   │   ├── InstructorClientsScreen.tsx      # Client list
│   │   ├── ClientDetailScreen.tsx           # Client details
│   │   ├── InstructorWorkoutsScreen.tsx     # Routines list
│   │   ├── WorkoutBuilderScreen.tsx         # Routine builder
│   │   ├── InstructorProgramsScreen.tsx     # Programs list
│   │   ├── ProgramBuilderScreen.tsx         # Program builder
│   │   ├── InstructorAssessmentsScreen.tsx  # Assessments list
│   │   ├── AssessmentBuilderScreen.tsx      # Assessment creator
│   │   ├── AssessmentDetailScreen.tsx       # Assessment history
│   │   ├── InstructorScheduleScreen.tsx     # Schedule view
│   │   └── ExerciseLibraryScreen.tsx        # Exercise selection
│   ├── onboarding/           # Onboarding screens (NEW)
│   │   ├── OnboardingStep1Screen.tsx        # Welcome
│   │   ├── OnboardingStep2Screen.tsx        # Sex selection
│   │   ├── OnboardingHeightScreen.tsx       # Height input
│   │   ├── OnboardingWeightScreen.tsx       # Current weight
│   │   ├── OnboardingGoalWeightScreen.tsx   # Goal weight
│   │   ├── OnboardingExperienceScreen.tsx   # Experience level
│   │   ├── OnboardingAgeScreen.tsx          # Age input
│   │   ├── OnboardingFrequencyScreen.tsx    # Training frequency
│   │   ├── OnboardingStep3Screen.tsx        # Main goal
│   │   └── OnboardingStep4Screen.tsx        # Summary
│   └── auth/                 # Authentication screens
│       ├── LoginScreen.tsx
│       ├── RegisterScreen.tsx
│       └── ProfileCompletionScreen.tsx
├── navigation/               # Navigation configuration
│   ├── RootStackNavigator.tsx            # Root navigation with onboarding
│   ├── MainTabNavigator.tsx              # Member tabs (5 tabs)
│   ├── InstructorTabNavigator.tsx        # Instructor tabs (6 tabs)
│   ├── InstructorDashboardStackNavigator.tsx
│   ├── InstructorClientsStackNavigator.tsx
│   ├── InstructorWorkoutsStackNavigator.tsx
│   ├── InstructorAssessmentsStackNavigator.tsx
│   ├── InstructorScheduleStackNavigator.tsx
│   ├── HomeStackNavigator.tsx
│   ├── WorkoutsStackNavigator.tsx        # Member workouts (NEW)
│   ├── ScheduleStackNavigator.tsx
│   ├── ProgressStackNavigator.tsx
│   ├── ProfileStackNavigator.tsx
│   └── ShopStackNavigator.tsx            # E-commerce navigation (NEW)
├── context/                  # React Context providers
│   └── AuthContext.tsx       # Authentication state
├── hooks/                    # Custom React hooks
│   ├── useTheme.ts          # Theme management
│   └── ...
├── constants/               # App constants
│   └── theme.ts             # Theme system and color palette
├── types/                   # TypeScript types
│   ├── assessment.ts        # Assessment interfaces
│   └── shop.ts              # E-commerce types (NEW)
├── lib/                     # Utilities
│   └── api.ts              # API client
└── data/                    # Mock data
    └── mockData.ts          # Comprehensive mock data (1500+ lines)
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

**Current Implementation Status**: Basic users table implemented. Additional tables pending backend integration.

```sql
-- Users Table (✅ IMPLEMENTED)
CREATE TABLE users (
  id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
  username TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL
);

-- Members Table (🔴 Planned)
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

-- Exercises Library table
CREATE TABLE exercises (
  id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  muscle_group VARCHAR(50),
  equipment VARCHAR(50),
  video_url TEXT,
  is_custom BOOLEAN DEFAULT FALSE,
  created_by VARCHAR REFERENCES users(id), -- Only if is_custom is TRUE
  created_at TIMESTAMP DEFAULT NOW()
);

-- Workout Routines (Templates)
CREATE TABLE workout_routines (
  id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
  instructor_id VARCHAR REFERENCES users(id),
  name TEXT NOT NULL,
  description TEXT,
  difficulty VARCHAR(20) CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')),
  category VARCHAR(30) CHECK (category IN ('strength', 'hypertrophy', 'cardio', 'functional', 'powerlifting', 'mixed')),
  estimated_duration_minutes INTEGER,
  is_template BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Routine Exercises (Join table with usage details)
CREATE TABLE routine_exercises (
  id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
  routine_id VARCHAR REFERENCES workout_routines(id) ON DELETE CASCADE,
  exercise_id VARCHAR REFERENCES exercises(id),
  order_index INTEGER NOT NULL,
  sets INTEGER,
  reps_min INTEGER,
  reps_max INTEGER,
  rest_seconds INTEGER,
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Training Programs (Macro-cycles)
CREATE TABLE training_programs (
  id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
  instructor_id VARCHAR REFERENCES users(id),
  name TEXT NOT NULL,
  description TEXT,
  duration_weeks INTEGER NOT NULL,
  difficulty VARCHAR(20),
  category VARCHAR(30),
  is_template BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Weekly Schedule for Programs (Which routine on which day)
CREATE TABLE program_schedule (
  id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
  program_id VARCHAR REFERENCES training_programs(id) ON DELETE CASCADE,
  day_of_week INTEGER CHECK (day_of_week BETWEEN 0 AND 6), -- 0=Monday, 6=Sunday
  routine_id VARCHAR REFERENCES workout_routines(id), -- NULL means rest day
  is_rest_day BOOLEAN DEFAULT FALSE,
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Program Assignments (Active plans for members)
CREATE TABLE program_assignments (
  id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
  program_id VARCHAR REFERENCES training_programs(id),
  member_id VARCHAR REFERENCES members(id),
  instructor_id VARCHAR REFERENCES users(id),
  start_date DATE NOT NULL,
  end_date DATE,
  status VARCHAR(20) CHECK (status IN ('active', 'completed', 'cancelled')),
  current_week INTEGER DEFAULT 1,
  assigned_at TIMESTAMP DEFAULT NOW(),
  completed_at TIMESTAMP
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

### 9.7 Exercise and Routine Models (✅ IMPLEMENTED)

```typescript
// Exercise Definition
interface Exercise {
  id: string;
  name: string;
  category: 'strength' | 'cardio' | 'flexibility' | 'balance' | 'plyometric';
  muscleGroups: string[]; // ['chest', 'triceps'] or ['back', 'biceps']
  equipment: string; // 'barbell', 'dumbbell', 'bodyweight', etc.
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  description: string;
  instructions: string[];
}

// Exercise within a Routine
interface RoutineExercise {
  exerciseId: string;
  sets: number;
  reps: number;
  restSeconds: number;
  orderIndex: number;
  notes?: string;
}

// Workout Routine Template
interface WorkoutRoutine {
  id: string;
  instructorId: string;
  name: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: 'strength' | 'hypertrophy' | 'cardio' | 'functional' | 'powerlifting' | 'mixed';
  durationMinutes: number;
  exercises: RoutineExercise[];
  isTemplate: boolean;
  createdAt: string;
  updatedAt: string;
}
```

### 9.8 Training Program Models (✅ IMPLEMENTED)

```typescript
// Daily Schedule Item
interface ProgramDaySchedule {
  dayOfWeek: number; // 0-6 (Monday-Sunday)
  routineId: string | null; // null if rest day
  isRestDay: boolean;
}

// Training Program (Macro-cycle)
interface TrainingProgram {
  id: string;
  instructorId: string;
  name: string;
  description: string;
  durationWeeks: number;
  weeklySchedule: ProgramDaySchedule[]; // 7 days
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: 'strength' | 'hypertrophy' | 'cardio' | 'functional' | 'powerlifting' | 'mixed';
  isTemplate: boolean;
  createdAt: string;
  updatedAt: string;
}

// Program Assignment to Client
interface ProgramAssignment {
  id: string;
  programId: string;
  clientId: string;
  instructorId: string;
  startDate: string;
  endDate: string;
  status: 'active' | 'completed' | 'cancelled';
  currentWeek: number;
  completedWorkouts: number;
  totalWorkouts: number;
  assignedAt: string;
  completedAt?: string;
}
```

### 9.9 Physical Assessment Models (✅ IMPLEMENTED)

```typescript
// Body Composition Data
interface BodyComposition {
  weight: number; // kg
  bodyFatPercentage: number;
  muscleMassPercentage: number;
  bmi: number;
}

// Body Measurements
interface BodyMeasurements {
  chest: number; // cm
  waist: number; // cm
  hips: number; // cm
  leftArm: number; // cm
  rightArm: number; // cm
  leftThigh: number; // cm
  rightThigh: number; // cm
}

// Performance Test
interface PerformanceTest {
  id: string;
  testType: '1rm_bench' | '1rm_squat' | '1rm_deadlift' | 'pushups_60s' |
            'situps_60s' | 'plank_hold' | 'sit_and_reach' | 'vo2_max' | 'custom';
  value: number;
  unit: string; // 'kg', 'reps', 'seconds', 'cm', 'ml/kg/min'
  customTestName?: string;
  notes?: string;
}

// Assessment Photo
interface AssessmentPhoto {
  id: string;
  photoUrl: string;
  angle: 'front' | 'side' | 'back';
  uploadedAt: string;
}

// Physical Assessment
interface PhysicalAssessment {
  id: string;
  memberId: string;
  instructorId: string;
  assessmentDate: string;
  assessmentType: 'initial' | 'progress';
  bodyComposition: BodyComposition;
  bodyMeasurements: BodyMeasurements;
  performanceTests: PerformanceTest[];
  photos: AssessmentPhoto[];
  instructorNotes: string;
  recommendations: string;
  createdAt: string;
  updatedAt: string;
}
```

### 9.10 Instructor Client Model (✅ IMPLEMENTED)

```typescript
interface InstructorClient {
  id: string;
  fullName: string;
  email: string;
  profilePhoto?: string;
  membershipTier: 'bronze' | 'silver' | 'gold';
  assignedAt: string;
  lastWorkout?: string;
  complianceRate: number; // 0-100
  currentProgram?: {
    id: string;
    name: string;
    weeklyFrequency: number;
  };
  notes?: string; // Instructor notes about client
}
```

### 9.11 Instructor Schedule Model (✅ IMPLEMENTED)

```typescript
interface ScheduleSession {
  id: string;
  instructorId: string;
  clientId?: string;
  clientName?: string;
  dayOfWeek: number; // 0-6
  date?: string; // ISO date for specific sessions
  startTime: string; // HH:mm
  endTime: string;
  durationMinutes: number;
  sessionType: 'personal_training' | 'class' | 'available';
  recurring: boolean;
  notes?: string;
}
```

### 9.12 E-commerce Shop Models (✅ IMPLEMENTED)

```typescript
// Product Model
interface ShopProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'supplements' | 'apparel' | 'equipment' | 'accessories';
  imageUrl?: string;
  stock: number;
  inStock: boolean;
  brand?: string;
  rating?: number; // 0-5
  reviewCount?: number;
}

// Category Model
interface ShopCategory {
  key: string;
  label: string;
  icon: string; // Feather icon name
}

// Cart Item Model
interface CartItem {
  product: ShopProduct;
  quantity: number;
}

// Order Model
interface ShopOrder {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  orderDate: string;
  deliveryDate?: string;
  shippingAddress?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  paymentMethod?: string;
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

### 10.6 Onboarding / Health Profile Endpoints (🔴 Planned)

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

### 10.7 Instructor - Client Management Endpoints (🔴 Planned)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/instructor/clients` | List all assigned clients |
| GET | `/api/instructor/clients/:id` | Get client details |
| GET | `/api/instructor/clients/:id/assessments` | Get client assessment history |
| GET | `/api/instructor/clients/:id/programs` | Get client's program assignments |
| PATCH | `/api/instructor/clients/:id/notes` | Update instructor notes for client |

### 10.8 Instructor - Workout Routine Endpoints (🔴 Planned)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/instructor/routines` | List instructor's workout routines |
| GET | `/api/instructor/routines/:id` | Get routine details |
| POST | `/api/instructor/routines` | Create new routine |
| PATCH | `/api/instructor/routines/:id` | Update routine |
| DELETE | `/api/instructor/routines/:id` | Delete routine |
| GET | `/api/exercises` | Get exercise library |

### 10.9 Instructor - Training Program Endpoints (🔴 Planned)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/instructor/programs` | List instructor's training programs |
| GET | `/api/instructor/programs/:id` | Get program details |
| POST | `/api/instructor/programs` | Create new program |
| PATCH | `/api/instructor/programs/:id` | Update program |
| DELETE | `/api/instructor/programs/:id` | Delete program |
| POST | `/api/instructor/programs/:id/assign` | Assign program to clients |
| DELETE | `/api/instructor/programs/assignments/:id` | Remove program assignment |

### 10.10 Instructor - Assessment Endpoints (🔴 Planned)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/instructor/assessments` | List all assessments by instructor |
| GET | `/api/instructor/assessments/:clientId` | Get assessments for specific client |
| POST | `/api/instructor/assessments` | Create new assessment |
| PATCH | `/api/instructor/assessments/:id` | Update assessment |
| DELETE | `/api/instructor/assessments/:id` | Delete assessment |
| POST | `/api/instructor/assessments/:id/photos` | Upload assessment photos |

### 10.11 Instructor - Schedule Endpoints (🔴 Planned)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/instructor/schedule` | Get instructor's schedule |
| GET | `/api/instructor/schedule/:date` | Get schedule for specific date |
| POST | `/api/instructor/schedule/sessions` | Create new session |
| PATCH | `/api/instructor/schedule/sessions/:id` | Update session |
| DELETE | `/api/instructor/schedule/sessions/:id` | Delete session |

### 10.12 Instructor - Dashboard Endpoints (🔴 Planned)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/instructor/stats` | Get instructor dashboard statistics |
| GET | `/api/instructor/today` | Get today's sessions and highlights |

### 10.13 Member - Training Program Endpoints (🔴 Planned)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/member/programs/active` | Get member's active training program |
| GET | `/api/member/programs/history` | Get program assignment history |
| POST | `/api/member/programs/:assignmentId/workouts/:workoutId/complete` | Mark workout as completed |
| GET | `/api/member/programs/:assignmentId/progress` | Get program progress details |

### 10.14 E-commerce Shop Endpoints (🔴 Planned)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/shop/products` | List all products with pagination |
| GET | `/api/shop/products/:id` | Get product details |
| GET | `/api/shop/products/category/:category` | Get products by category |
| GET | `/api/shop/categories` | List all product categories |
| POST | `/api/shop/cart` | Add item to cart |
| GET | `/api/shop/cart` | Get user's cart |
| PATCH | `/api/shop/cart/:itemId` | Update cart item quantity |
| DELETE | `/api/shop/cart/:itemId` | Remove item from cart |
| POST | `/api/shop/checkout` | Process checkout |
| GET | `/api/shop/orders` | Get user's order history |
| GET | `/api/shop/orders/:id` | Get order details |
| POST | `/api/shop/products/:id/review` | Add product review |
| GET | `/api/shop/products/:id/reviews` | Get product reviews |

**Request Body Example (POST /api/shop/checkout):**
```json
{
  "items": [
    {
      "productId": "prod-123",
      "quantity": 2
    }
  ],
  "shippingAddress": {
    "street": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zipCode": "10001",
    "country": "USA"
  },
  "paymentMethod": "credit_card"
}
```

**Response Example:**
```json
{
  "success": true,
  "data": {
    "orderId": "order-456",
    "status": "pending",
    "total": 89.98,
    "estimatedDelivery": "2026-01-15",
    "trackingNumber": null
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

### 14.1 Phase 1 - MVP (Q1 2025) ✅ COMPLETE

**Target Date**: January 31, 2025
**Status**: ✅ Completed December 2025

| Feature | Status |
|---------|--------|
| Authentication (Email) | ✅ Complete |
| Profile management | ✅ Complete |
| Member Dashboard | ✅ Complete |
| Schedule viewing | ✅ Complete |
| Progress viewing | ✅ Complete |
| Theme support | ✅ Complete |

### 14.2 Phase 2 - Instructor Module (December 2025) ✅ COMPLETE

**Target Date**: December 31, 2025
**Status**: ✅ Completed December 19, 2025

| Feature | Status |
|---------|--------|
| Instructor Dashboard | ✅ Complete |
| Client Management System | ✅ Complete |
| Workout Routine Builder | ✅ Complete |
| Training Program Builder | ✅ Complete |
| Physical Assessment System | ✅ Complete |
| Program Assignment to Clients | ✅ Complete |
| Exercise Library (32+ exercises) | ✅ Complete |
| Instructor Schedule View | ✅ Complete |
| Member Training Plan View | ✅ Complete |
| ClientSelector Component | ✅ Complete |
| ProgramAssignmentModal | ✅ Complete |
| InstructorTabNavigator (6 tabs) | ✅ Complete |

**Key Achievements**:
- 12 new instructor screens implemented
- 4 new instructor-specific components
- 6 new navigation stacks for instructor module
- Complete mock data structure for testing
- Comprehensive TypeScript type definitions
- Full UI/UX implementation with theming support

### 14.3 Phase 3 - Member Experience Enhancement (January 2026) ✅ COMPLETE

**Target Date**: January 15, 2026
**Status**: ✅ Completed January 6, 2026

| Feature | Status |
|---------|--------|
| Member Onboarding Flow (10 screens) | ✅ Complete |
| Health Profile Collection | ✅ Complete |
| Body Metrics Input (Height, Weight, BMI) | ✅ Complete |
| Fitness Goal Selection | ✅ Complete |
| Experience Level Assessment | ✅ Complete |
| Training Frequency Planning | ✅ Complete |
| E-commerce Shop Integration | ✅ Complete |
| Product Catalog with Categories | ✅ Complete |
| Shopping Cart Functionality | ✅ Complete |
| Checkout Flow | ✅ Complete |
| Product Rating & Reviews Display | ✅ Complete |
| Onboarding Visual Assets | ✅ Complete |
| Enhanced Theme System | ✅ Complete |

**Key Achievements**:
- 10 comprehensive onboarding screens with smooth UX flow
- Complete health profile data collection system
- BMI calculation and goal tracking
- 13 onboarding visual assets (body parts, exercises, height references)
- Full e-commerce module with 3 screens
- 20+ mock products across 4 categories
- Shopping cart and checkout implementation
- Product rating and review system UI
- Enhanced theming with new color gradients
- 1500+ lines of comprehensive mock data
- Complete TypeScript type definitions for shop
- ShopStackNavigator with 3 screens

### 14.4 Phase 4 - Backend Integration (Q1 2026)

**Target Date**: March 31, 2026
**Status**: 🔴 Planned

| Feature | Status |
|---------|--------|
| Supabase Auth integration | 🔴 Planned |
| API endpoint implementation | 🔴 Planned |
| Database migration and seeding | 🔴 Planned |
| Real-time data synchronization | 🔴 Planned |
| Image upload for assessments | 🔴 Planned |
| Push notifications | 🔴 Planned |
| Social login | 🔴 Planned |
| Payment gateway integration (Stripe/PayPal) | 🔴 Planned |
| Order processing backend | 🔴 Planned |

### 14.5 Phase 5 - Member Features (Q2 2026)

**Target Date**: June 30, 2026
**Status**: 🔴 Planned

| Feature | Status |
|---------|--------|
| Class booking system | 🔴 Planned |
| Workout logging and tracking | 🔴 Planned |
| Achievement system | 🔴 Planned |
| Progress photo comparison | 🔴 Planned |
| Workout history with analytics | 🔴 Planned |
| Personal records tracking | 🔴 Planned |

### 14.6 Phase 6 - Enhanced Experience (Q3 2026)

**Target Date**: September 30, 2026
**Status**: 🔴 Planned

| Feature | Status |
|---------|--------|
| QR check-in | 🔴 Planned |
| Waitlist management | 🔴 Planned |
| Class reviews/ratings | 🔴 Planned |
| Social features (feed, challenges) | 🔴 Planned |
| Nutrition tracking integration | 🔴 Planned |

### 14.7 Phase 7 - Platform Expansion (Q4 2026)

**Target Date**: December 31, 2026
**Status**: 🔴 Planned

| Feature | Status |
|---------|--------|
| Manager web panel | 🔴 Planned |
| Analytics dashboard | 🔴 Planned |
| Reporting system | 🔴 Planned |
| API for third-party integrations | 🔴 Planned |
| Multi-gym support | 🔴 Planned |

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
| **Instructor** | Gym professional who creates programs, routines, and conducts assessments |
| **Manager** | Gym administrator with full access |
| **Booking** | Reserved spot in a class |
| **Waitlist** | Queue for full classes |
| **PR** | Personal Record - best achievement |
| **Routine** | Single workout template with exercises, sets, and reps |
| **Program** | Multi-week training plan with weekly schedule |
| **Assessment** | Physical evaluation including body composition, measurements, and performance tests |
| **Compliance Rate** | Percentage of assigned workouts completed by a client |
| **Assignment** | Active program assigned to a member by an instructor |
| **Onboarding** | Initial setup flow for new members to collect health profile and goals |
| **BMI** | Body Mass Index - calculated from height and weight |
| **Health Profile** | Member's physical metrics, goals, and training preferences collected during onboarding |
| **Shop** | E-commerce section for purchasing supplements, apparel, equipment, and accessories |
| **Cart** | Shopping cart containing products ready for checkout |
| **Order** | Completed purchase transaction with delivery tracking |

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
| 2.0 | Dec 19, 2025 | ChongTechnologies | Major update: Instructor Module complete, updated architecture, new data models, API specifications, release plan |
| 3.0 | Jan 6, 2026 | ChongTechnologies | Major update: Member onboarding flow, E-commerce shop, enhanced features |

**Version 3.0 Summary of Changes**:
- Added comprehensive Member Onboarding Flow documentation (10 screens)
- Added complete E-commerce Shop module (3 screens, full catalog system)
- Updated feature priority matrix with 13+ new completed features
- Added detailed feature specifications for onboarding (section 5.2.13)
- Added detailed feature specifications for shop (section 5.2.14)
- Updated technical architecture with onboarding and shop screens
- Added new data models: ShopProduct, ShopCategory, CartItem, ShopOrder
- Added shop API endpoints (section 10.14)
- Added Phase 3 completion to release plan (Member Experience Enhancement)
- Updated navigation structure with WorkoutsStackNavigator and ShopStackNavigator
- Added 13 onboarding visual assets to documentation
- Added 20+ shop mock products documentation
- Updated glossary with onboarding and e-commerce terms
- Updated business goals with e-commerce revenue targets
- Enhanced theme system documentation with new gradients
- Updated statistics: 11,500+ lines added across 86 files

---

*This document is confidential and intended for internal use only.*
