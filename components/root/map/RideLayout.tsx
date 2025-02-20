import icons from "@/constants/icons";
import { router } from "expo-router";
import React, { ReactNode, useMemo, useRef } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import Map from "./Map";
import BottomSheet from "@gorhom/bottom-sheet";
import CustomBottomSheet from "@/components/ui/CustomBottomSheet";

const RideLayout = ({
  title,
  children,
}: {
  title?: string;
  children: ReactNode;
}) => {
  const bottomSheetRef = useRef<BottomSheet | null>(null);
  const snapPoints = useMemo(() => ["50%", "80%"], []);
  return (
    <View className="flex-1 ">
      <View className="w-full h-screen bg-blue-400">
        <View className="flex flex-row items-center px-5 gap-x-5 absolute top-2  z-40  justify-start">
          <TouchableOpacity
            onPress={() => router.push("/(root)/(tabs)/home")}
            className="w-[40px] h-[40px] bg-white rounded-full flex items-center justify-center"
          >
            <Image
              source={icons.backArrow}
              alt="back_arrow"
              className=" size-5"
              tintColor="black"
            />
          </TouchableOpacity>
          {/* <Text className="text-black-300  font-semibold  text-xl ">
            {title ?? "Go back"}
          </Text> */}
        </View>
        <Map />
      </View>
      <CustomBottomSheet
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        scroll="base"
        isOpen={true}
        indicatorStyle={{ backgroundColor: "#FBBB00", width: 70 }}
        className="p-5 flex-1 "
      >
        {children}
      </CustomBottomSheet>
    </View>
  );
};

export default RideLayout;
