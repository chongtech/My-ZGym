import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from '@/hooks/useTheme';
import { BrandColors } from '@/constants/theme';

// Screens (will be created)
import InstructorAssessmentsScreen from '@/screens/instructor/InstructorAssessmentsScreen';
import AssessmentBuilderScreen from '@/screens/instructor/AssessmentBuilderScreen';
import AssessmentDetailScreen from '@/screens/instructor/AssessmentDetailScreen';

export type InstructorAssessmentsStackParamList = {
    InstructorAssessments: undefined;
    AssessmentBuilder: {
        memberId: string;
        assessmentId?: string; // Optional: for editing existing assessment
    };
    AssessmentDetail: {
        memberId: string;
    };
};

const Stack = createNativeStackNavigator<InstructorAssessmentsStackParamList>();

export default function InstructorAssessmentsStackNavigator() {
    const { theme } = useTheme();

    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: theme.backgroundRoot,
                },
                headerTintColor: theme.text,
                headerTitleStyle: {
                    fontWeight: '600',
                },
                headerShadowVisible: false,
            }}
        >
            <Stack.Screen
                name="InstructorAssessments"
                component={InstructorAssessmentsScreen}
                options={{
                    title: 'Avaliações Físicas',
                    headerLargeTitle: true,
                }}
            />
            <Stack.Screen
                name="AssessmentBuilder"
                component={AssessmentBuilderScreen}
                options={{
                    title: 'Nova Avaliação',
                    presentation: 'modal',
                }}
            />
            <Stack.Screen
                name="AssessmentDetail"
                component={AssessmentDetailScreen}
                options={{
                    title: 'Histórico de Avaliações',
                }}
            />
        </Stack.Navigator>
    );
}
