import React from "react";
import { Tabs } from "expo-router";
import { Image, ImageSourcePropType, Text, View } from "react-native";
import Home from "./home";
import icons from "@/constants/icons";

const TabIcon = ({
  icon,
  focused,
  title,
}: {
  icon?: ImageSourcePropType;
  focused?: boolean;
  title?: string;
}) => (
  <View className="flex-1 flex flex-col items-center mt-3 h-full">
    <Image
      source={icon}
      resizeMode="contain"
      className="size-[30px] "
      tintColor={focused ? "#FBBB00" : "#ffffff"}
    />
    <View
      className={`w-5 h-2 rounded-full ${focused ? "bg-primary" : ""} mt-1`}
    />
  </View>
);

const _layout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#0D0B26",
          height: 70,
          borderRadius: 50,
          position: "absolute",
          bottom: 10,
          marginInline: 10,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon icon={icons.home} title="Главная" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon icon={icons.chat} title="Главная" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon icon={icons.history} title="Главная" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon icon={icons.profile} title="Главная" focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
};

export default _layout;
