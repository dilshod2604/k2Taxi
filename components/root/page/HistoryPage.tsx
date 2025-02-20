import { Image, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import icons from "@/constants/icons";

const HistoryPage = () => {
  return (
    <SafeAreaView className="flex-1  flex flex-col items-center justify-center">
      <View className="items-center">
        <Image source={icons.empty} className="w-[100px] h-[100px]" />
      </View>
    </SafeAreaView>
  );
};

export default HistoryPage;
