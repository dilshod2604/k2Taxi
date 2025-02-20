import icons from "@/constants/icons";
import React from "react";
import { Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ChatPage = () => {
  return (
    <SafeAreaView className="flex-1  flex flex-col items-center justify-center">
      <View className="items-center">
        <Image source={icons.chat3d} className="w-[100px] h-[100px]" />
      </View>
    </SafeAreaView>
  );
};

export default ChatPage;
