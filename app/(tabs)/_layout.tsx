import { Tabs } from 'expo-router';
import { Platform } from 'react-native';
import {
  HomeIcon,
  HomeFilledIcon,
  OrdersIcon,
  OrdersFilledIcon,
  CalendarIcon,
  CalendarFilledIcon,
  ProfileIcon,
  ProfileFilledIcon,
} from '../../components/icons';
import { useTheme } from '../context/theme';

export default function TabLayout() {
  const { isDark } = useTheme();
  
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          ...Platform.select({
            ios: {
              shadowColor: '#000',
              shadowOffset: { width: 0, height: -3 },
              shadowOpacity: 0.1,
              shadowRadius: 3,
            },
            android: {
              elevation: 8,
            },
          }),
          backgroundColor: isDark ? '#1C1C1E' : '#fff',
          borderTopColor: isDark ? '#2C2C2E' : '#E5E5EA',
        },
        tabBarActiveTintColor: isDark ? '#0A84FF' : '#007AFF',
        tabBarInactiveTintColor: isDark ? '#8E8E93' : '#8E8E93',
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused, color, size }) => 
            focused ? <HomeFilledIcon size={size} color={color} /> : <HomeIcon size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="orders"
        options={{
          title: 'Orders',
          tabBarIcon: ({ focused, color, size }) => 
            focused ? <OrdersFilledIcon size={size} color={color} /> : <OrdersIcon size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="schedule"
        options={{
          title: 'Schedule',
          tabBarIcon: ({ focused, color, size }) => 
            focused ? <CalendarFilledIcon size={size} color={color} /> : <CalendarIcon size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="Profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ focused, color, size }) => 
            focused ? <ProfileFilledIcon size={size} color={color} /> : <ProfileIcon size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}