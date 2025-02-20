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

export default function TabLayout() {
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
        },
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: '#8E8E93',
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
        name="account"
        options={{
          title: 'Profile',
          tabBarIcon: ({ focused, color, size }) => 
            focused ? <ProfileFilledIcon size={size} color={color} /> : <ProfileIcon size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}