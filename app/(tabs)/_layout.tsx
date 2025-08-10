import { COLORS } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";

export default function TabLayout() {
    
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarInactiveTintColor: COLORS.grey,
        tabBarActiveTintColor: COLORS.primary,
        tabBarStyle: {
            backgroundColor: "black",
            borderTopWidth: 0,
            position: "absolute",
            elevation: 0,
            paddingBottom: 8,
            height: 40
        }
      }}
    >
      <Tabs.Screen
        options={{
          tabBarIcon: ({ size, color }) => (
            <Ionicons color={color} size={size} name="home" />
          ),
        }}
        name="index"
      />
      <Tabs.Screen
        options={{
          tabBarIcon: ({ size, color }) => (
            <Ionicons color={color} size={size} name="bookmark" />
          ),
        }}
        name="bookmarks"
      />
      <Tabs.Screen
        options={{
          tabBarIcon: ({ size, color }) => (
            <Ionicons color={COLORS.primary} size={size} name="add-circle" />
          ),
        }}
        name="create"
      />
      <Tabs.Screen
        options={{
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="heart" color={color} size={size} />
          ),
        }}
        name="notifications"
      />

      <Tabs.Screen
        options={{
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="person-circle" size={size} color={color} />
          ),
        }}
        name="profile"
      />
    </Tabs>
  );
}
