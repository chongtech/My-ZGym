# My-ZGym Mobile App - Design Guidelines (Members Section)

## Architecture

### Authentication & Routing
**Auth Methods:** Email/Password (Supabase), Apple Sign-In (iOS required), Google Sign-In

**Flow:**
1. Login/Signup → Detect role from DB
2. Members → Dashboard | Instructors → Tablet UI | Managers → Web Panel
3. Check profile completeness → If incomplete: Profile Completion (modal, non-dismissible)
4. Required fields: Full Name, Phone, Emergency Contact, Profile Photo

**Account Actions:**
- Logout: Profile → Settings → Log Out (confirmation alert)
- Delete: Profile → Settings → Account → Delete (double confirmation)

### Navigation
**Bottom Tab Bar (4 tabs):**
1. **Home** - Dashboard, quick actions
2. **Schedule** - Classes, bookings
3. **Progress** - Tracking, stats
4. **Profile** - Settings, account

**Behavior:** Tab bar persistent (except modals), each tab has navigation stack

---

## Screens

### Splash Screen
- Centered Z-Gym logo, gradient background
- Duration: 2-3s or until auth loaded
- No header/footer, fade to login/dashboard

### Login/Signup
- No header, top inset: `insets.top + 24pt`, bottom: `insets.bottom + 24pt`
- Tab switcher (Login/Sign Up), email, password fields
- Sign Up adds: Confirm Password
- Social login: Apple (black), Google (white w/logo)
- Footer: "Forgot Password?" | Privacy Policy | Terms

### Profile Completion (Modal)
- Header: "Complete Your Profile" (centered), Submit button (right, disabled until valid)
- Photo picker (circular, centered, tap to select)
- Fields: Full Name*, Phone*, Emergency Name*, Emergency Phone*, DOB, Fitness Goals (chips)
- Bottom inset: `insets.bottom + 24pt`

### Home Tab - Dashboard
**Header:** Transparent, greeting + notification icon (right)  
**Insets:** Top: `headerHeight + 24pt`, Bottom: `tabBarHeight + 24pt`

**Sections:**
- Greeting: "Welcome back, [Name]!" + avatar
- Membership card: ID, tier badge (Gold/Silver/Bronze), expiry
- Quick actions (horizontal): Book Class, Check Schedule, Track Workout
- Today's Schedule (max 3 classes)
- Recent activity (last 5 workouts)

### Schedule Tab
**Header:** "Schedule", search icon (right)  
**Insets:** Top: `24pt`, Bottom: `tabBarHeight + 24pt`

**Components:**
- Week selector (horizontal, Mon-Sun)
- Filter chips: All, Yoga, HIIT, Strength, Cardio
- Class list (grouped by time):
  - Time, class name, instructor photo/name
  - Duration, difficulty, spots available
  - "Book" button or "Booked" badge
- Empty state: "No classes scheduled"

### Progress Tab
**Header:** "My Progress", calendar icon (right)  
**Insets:** Top: `24pt`, Bottom: `tabBarHeight + 24pt`

**Components:**
- Stats grid (2-col): Workouts, Classes, Calories, PRs
- Weekly chart (bar, 7 days)
- Achievement badges (horizontal scroll)
- Recent workouts: Date, name, duration, instructor, chevron
- Empty state: "Start your fitness journey!"

### Profile Tab
**Header:** "Profile", settings icon (right)  
**Insets:** Top: `24pt`, Bottom: `tabBarHeight + 24pt`

**Sections:**
- Header: Large photo, full name, member since, edit button
- **Personal Info:** Email, phone, emergency contact
- **Preferences:** Notifications, theme (Light/Dark/Auto), language
- **Membership:** Plan details, upgrade/renew
- **Account:** Change password, logout, delete account

---

## Design System

### Colors
**Brand:**
- Primary: `#E74C3C` | Secondary: `#2C3E50` | Accent: `#F39C12`

**UI (Light/Dark):**
- Background: `#FFFFFF` / `#1A1A1A`
- Surface: `#F8F9FA` / `#2A2A2A`
- Text Primary: `#2C3E50` / `#FFFFFF`
- Text Secondary: `#7F8C8D` / `#B0B0B0`
- Border: `#E0E0E0` / `#3A3A3A`
- Success: `#27AE60` | Warning: `#F39C12` | Error: `#E74C3C`

### Typography
- **H1:** System, 28pt, Bold (screen titles)
- **H2:** System, 22pt, Semibold (sections)
- **H3:** System, 18pt, Semibold (cards)
- **Body Large:** 17pt, Regular | **Body:** 15pt, Regular
- **Caption:** 13pt, Regular | **Button:** 16pt, Semibold

### Spacing
xs: 4pt | sm: 8pt | md: 12pt | lg: 16pt | xl: 24pt | xxl: 32pt

### Components

**Buttons:**
- Primary: Filled Primary, white text, 48pt height, 12pt radius
- Secondary: Outlined Primary, Primary text, 48pt height, 12pt radius
- Text: No bg, Primary text, 44pt height
- Press: opacity 0.7

**Cards:**
- Surface bg, 12pt radius, 16pt padding
- Shadow (floating cards only): offset {0, 2}, opacity 0.10, radius 2

**Inputs:**
- 52pt height, 1pt border, 8pt radius, 12pt padding
- Focus: Primary border | Error: Error border

**Tab Bar:**
- 56pt + `insets.bottom`, Surface bg (blur)
- Active: Primary | Inactive: Text Secondary
- Icons: Feather, 24pt

**Nav Header:**
- Transparent, H2 title, 44pt + `insets.top`
- Icons: Feather, 20pt

### Visual Assets

**Icons:** Feather only (@expo/vector-icons)
- Tab: 24pt | Header: 20pt | Inline: 18pt
- **No emojis**

**Required Assets:**
1. Z-Gym logo (fetch from URL, convert local)
2. Profile avatars (4): Athlete silhouettes, flat geometric, circular, brand colors
3. Tier badges: Gold/Silver/Bronze icons

**Illustrations:** Minimal line art (Secondary color) for empty states

### Interactions

**Touch:**
- All: opacity 0.7 on press
- Buttons: scale 0.98, spring back
- Lists: subtle bg highlight
- Min touch target: 44pt

**Animations:**
- Transitions: 300ms | Tab switch: 200ms cross-fade
- Loading: Skeleton screens (shimmer)
- Success: Checkmark (scale + fade)

**Loading:**
- Initial: Logo + spinner
- Content: Skeleton screens
- Buttons: Spinner replaces text, disabled

### Accessibility (WCAG AA)
- Touch targets: 44pt min
- Contrast: 4.5:1 text
- Screen reader: Labels on all interactive elements
- Dynamic type: Support iOS sizes
- VoiceOver: Proper heading hierarchy
- Reduced motion: Respect system pref, disable springs
- Forms: Error announcements, required field markers, logical tab order

---

**Platform:** iOS-first (HIG), Android via Material Design variants