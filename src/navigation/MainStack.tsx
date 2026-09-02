import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MainNavigator from './MainNavigator';

import ProfileScreen from '../screens/profile/ProfileScreen';
import ApplicationsScreen from '../screens/applications/ApplicationsScreen';
import CreateResumeScreen from '../screens/resume/CreateResumeScreen';
import ResumeDetailsScreen from '../screens/resume/ResumeDetailsScreen';
import EditResumeScreen from '../screens/resume/EditResumeScreen';

const Stack = createNativeStackNavigator();

export default function MainStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: '#0B0F14',
        },
      }}
    >
      <Stack.Screen
        name="MainTabs"
        component={MainNavigator}
      />

      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
      />

      <Stack.Screen
        name="Applications"
        component={ApplicationsScreen}
      />

      <Stack.Screen
        name="CreateResume"
        component={CreateResumeScreen}
      />

      <Stack.Screen
        name="ResumeDetails"
        component={ResumeDetailsScreen}
      />

      <Stack.Screen
        name="EditResume"
        component={EditResumeScreen}
      />
    </Stack.Navigator>
  );
}