// Physical Assessment Types for Instructor Module

export type AssessmentType = 'initial' | 'progress';
export type PhotoAngle = 'front' | 'side' | 'back';
export type PerformanceTestType =
    | '1RM Bench Press'
    | '1RM Squat'
    | '1RM Deadlift'
    | 'Push-ups (60s)'
    | 'Sit-ups (60s)'
    | 'Plank Hold'
    | 'Sit and Reach'
    | 'VO2 Max'
    | 'Custom';

/**
 * Body composition metrics
 */
export interface BodyComposition {
    weight: number; // kg
    bodyFatPercentage?: number; // %
    muscleMassPercentage?: number; // %
    bmi: number; // calculated from weight and height
}

/**
 * Body measurements in centimeters
 */
export interface BodyMeasurements {
    chest?: number; // cm
    waist?: number; // cm
    hips?: number; // cm
    leftArm?: number; // cm
    rightArm?: number; // cm
    leftThigh?: number; // cm
    rightThigh?: number; // cm
}

/**
 * Physical performance test result
 */
export interface PerformanceTest {
    id: string;
    testType: PerformanceTestType;
    customTestName?: string; // Used when testType is 'Custom'
    value: number;
    unit: string; // e.g., 'kg', 'reps', 'seconds', 'cm'
    notes?: string;
}

/**
 * Progress photo with metadata
 */
export interface AssessmentPhoto {
    id: string;
    photoUrl: string;
    angle: PhotoAngle;
    uploadedAt: string; // ISO date string
}

/**
 * Onboarding data reference (for initial assessments)
 */
export interface OnboardingData {
    sex: 'male' | 'female';
    height: number; // cm
    currentWeight: number; // kg
    goalWeight: number; // kg
    age: number;
    experienceLevel: 'beginner' | 'intermediate' | 'advanced';
    trainingFrequency: string; // e.g., '3_days', '5_days'
}

/**
 * Main physical assessment interface
 */
export interface PhysicalAssessment {
    id: string;
    memberId: string;
    instructorId: string;
    assessmentDate: string; // ISO date string
    assessmentType: AssessmentType;

    // Onboarding data (populated for initial assessment, stored for reference)
    onboardingData?: OnboardingData;

    // Assessment metrics
    bodyComposition: BodyComposition;
    bodyMeasurements: BodyMeasurements;
    performanceTests: PerformanceTest[];
    photos: AssessmentPhoto[];

    // Instructor notes and recommendations
    instructorNotes?: string;
    recommendations?: string;

    // Metadata
    createdAt: string; // ISO date string
    updatedAt?: string; // ISO date string
}

/**
 * Assessment summary for list views
 */
export interface AssessmentSummary {
    memberId: string;
    memberName: string;
    memberPhoto?: string;
    lastAssessmentDate?: string;
    totalAssessments: number;
    hasInitialAssessment: boolean;
    latestWeight?: number;
    weightChange?: number; // Change from initial to latest
}
