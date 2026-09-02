import { Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from '../screens/home/HomeScreen';
import ResumesScreen from '../screens/resume/ResumeScreen';
import JobsScreen from '../screens/jobs/JobsScreen';
import AssistantScreen from '../screens/assistant/AssistantScreen';

const Tab = createBottomTabNavigator();

export default function MainNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,

        tabBarStyle: {
          backgroundColor: '#111820',
          borderTopColor: '#28313C',
          height: 64,
          paddingBottom: 8,
          paddingTop: 8,
        },

        tabBarActiveTintColor: '#F5B942',
        tabBarInactiveTintColor: '#6F7B88',

        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Início',
          tabBarIcon: ({ color }) => (
            <Text style={{ color, fontSize: 22 }}>
              ⌂
            </Text>
          ),
        }}
      />

      <Tab.Screen
        name="Resumes"
        component={ResumesScreen}
        options={{
          title: 'Currículos',
          tabBarIcon: ({ color }) => (
            <Text style={{ color, fontSize: 22 }}>
              ▣
            </Text>
          ),
        }}
      />

      <Tab.Screen
        name="Jobs"
        component={JobsScreen}
        options={{
          title: 'Vagas',
          tabBarIcon: ({ color }) => (
            <Text style={{ color, fontSize: 22 }}>
              ⌕
            </Text>
          ),
        }}
      />

      <Tab.Screen
        name="Assistant"
        component={AssistantScreen}
        options={{
          title: 'Solaris IA',
          tabBarIcon: ({ color }) => (
            <Text style={{ color, fontSize: 22 }}>
              ✦
            </Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
}