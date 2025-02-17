import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "white",
        headerShown: false,
        tabBarLabelStyle: {
          fontSize: 14,
          fontWeight: "bold", 
        },
        tabBarStyle: {
          backgroundColor: "#82CBAF",
          borderRadius: 20, 
          height: 60, 
          paddingBottom: 10, 
          ...Platform.select({
            ios: {
              position: "absolute", 
            },
          }),
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => <MaterialIcons name="home" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Idosos',
          tabBarIcon: ({ color, size }) => <MaterialIcons name="list" size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}
