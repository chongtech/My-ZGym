# My-ZGym Mobile Application

## Overview

My-ZGym is a cross-platform mobile fitness application built with React Native and Expo. The app serves three distinct user roles: gym members, instructors, and managers, with the members section being the primary focus. Members can book classes, track their fitness progress, view their workout history, and manage their gym membership. The application features a modern UI with support for both light and dark themes, smooth animations, and a native-like experience across iOS, Android, and web platforms.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React Native with Expo SDK 54
- Uses Expo's new architecture with React Compiler experimental support
- Follows a component-based architecture with reusable UI components
- Implements path aliases (`@/` for client, `@shared/` for shared code) for cleaner imports

**Navigation System**: React Navigation v7
- **Root Stack**: Controls authentication flow and profile completion
  - Conditionally renders Login → Profile Completion → Main Tab Navigator based on auth state
  - Uses native stack navigator for iOS-like transitions
- **Tab Navigation**: Four primary tabs (Home, Schedule, Progress, Profile) with persistent bottom tab bar
  - Each tab contains its own stack navigator for nested navigation
  - iOS uses blur effect for tab bar, Android uses solid background
- **Stack per Tab**: Each tab has its own navigation stack allowing independent navigation histories

**State Management**:
- **Auth Context**: React Context API manages global authentication state, user profile, and role-based access
- **TanStack Query (React Query)**: Handles server state, data fetching, and caching (configured but endpoints not yet implemented)
- **AsyncStorage**: Persists authentication tokens and user session data locally

**UI/UX Patterns**:
- **Theme System**: Custom theme hook supporting light/dark modes with brand colors (primary red #E74C3C, secondary dark blue #2C3E50)
- **Animations**: React Native Reanimated for smooth, native-performance animations on buttons, cards, and transitions
- **Keyboard Handling**: Platform-aware keyboard avoidance using react-native-keyboard-controller (native) and standard ScrollView (web)
- **Safe Area Management**: Proper inset handling for notches, home indicators, and tab bars across all screens
- **Error Boundaries**: Class-based error boundary component with dev-mode error details and production fallback UI

**Component Library**:
- Themed components (ThemedView, ThemedText) automatically adapt to light/dark mode
- Reusable Button component with variants (primary, secondary, outline) and loading states
- Card component with elevation system and press animations
- Header components with blur effects on iOS

### Backend Architecture

**Server Framework**: Express.js with TypeScript
- RESTful API structure (routes prefixed with `/api`)
- CORS configured for Replit deployment domains
- Request body parsing with raw body capture for webhooks
- Static file serving for production web builds

**Development vs Production**:
- **Development**: Runs separate Metro bundler and Express server concurrently
- **Production**: Pre-builds static Expo web bundle, serves via Express
- Custom build script handles Expo static export and asset management

**Data Layer**:
- **ORM**: Drizzle ORM configured for PostgreSQL
- **Schema Definition**: Centralized in `shared/schema.ts` for type safety across client and server
- **Storage Abstraction**: IStorage interface with in-memory implementation (MemStorage) for development, designed to swap with database-backed implementation
- **Type Safety**: Zod schemas for runtime validation, generated from Drizzle schemas using drizzle-zod

**Current Schema**:
- Users table with username/password authentication (placeholder for production auth system)
- Schema designed to extend with member profiles, class bookings, workout tracking, etc.

### Authentication & Authorization

**Mock Authentication System** (Development):
- Context-based auth with three mock user roles: member, instructor, manager
- Email/password authentication with AsyncStorage persistence
- Profile completion flow enforced for incomplete user profiles
- Designed to integrate with Supabase Auth (configured for email/password, Apple Sign-In, Google Sign-In)

**Profile System**:
- Required fields: Full name, phone, emergency contact details
- Optional fields: Profile photo, date of birth, fitness goals
- Profile completion modal (non-dismissible) blocks access until completed
- Member-specific data: membership tier (bronze/silver/gold), expiry date, member since date

**Planned Auth Integration**:
- Supabase authentication for production
- Social login support (Apple for iOS, Google cross-platform)
- Role-based routing (members → mobile app, instructors → tablet UI, managers → web panel)

### External Dependencies

**Expo SDK Modules**:
- `expo-splash-screen`: Custom splash screen with adaptive icons
- `expo-blur`: Native blur effects for iOS UI elements
- `expo-image`: Optimized image loading and caching
- `expo-haptics`: Tactile feedback for user interactions
- `expo-web-browser`: In-app browser for OAuth flows
- `expo-linking`: Deep linking and URL scheme handling

**Third-Party Libraries**:
- `@tanstack/react-query`: Server state management and data synchronization
- `react-native-reanimated`: High-performance animations with worklets
- `react-native-gesture-handler`: Native gesture recognition
- `react-native-keyboard-controller`: Advanced keyboard handling
- `react-native-safe-area-context`: Safe area insets for modern devices
- `drizzle-orm` + `drizzle-zod`: Type-safe ORM and validation
- `zod`: Runtime type validation and schema definitions

**Database**:
- PostgreSQL (configured via Drizzle, connection via `DATABASE_URL` environment variable)
- Migrations directory: `./migrations`
- Schema location: `./shared/schema.ts`

**Deployment Platform**:
- Replit-optimized with environment variable handling for deployment domains
- Custom proxy configuration for Expo dev server in Replit environment
- Static build process for production web deployment

**Build Tools**:
- Babel with module resolver for path aliases
- TypeScript for type safety across client and server
- ESLint with Expo configuration and Prettier integration
- Custom build scripts for Expo static export