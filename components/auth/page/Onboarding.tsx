import { View, Text, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import Swiper from "react-native-swiper";
import { useEffect, useRef, useState } from "react";
import { onboarding } from "@/constants";
import CustomButton from "../../ui/CustomButton";
import * as SecureStore from "expo-secure-store";

const Onboarding = () => {
  const swiperRef = useRef<Swiper>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const lastSlide = activeIndex === onboarding.length - 1;

  const handleSkip = async () => {
    await SecureStore.setItemAsync("hasOnboarded", "true");
    router.replace("/(auth)/start");
  };

  useEffect(() => {
    const checkHasOnboarded = async () => {
      const status = await SecureStore.getItemAsync("hasOnboarded");
      if (status==="true") {
      
      }
    };
    checkHasOnboarded();
  }, []);
  return (
    <SafeAreaView className="flex h-[90%] items-center justify-between bg-white">
      <TouchableOpacity
        onPress={handleSkip}
        className="w-full flex justify-end items-end p-5"
      >
        <Text className="text-black text-md font-bold">Skip</Text>
      </TouchableOpacity>

      <Swiper
        ref={swiperRef}
        loop={false}
        dot={
          <View className="w-[32px] h-[4px] mx-1 bg-[#E2E8F0] rounded-full" />
        }
        activeDot={
          <View className="w-[32px] h-[4px] mx-1 bg-[#0286FF] rounded-full" />
        }
        onIndexChanged={(index) => setActiveIndex(index)}
      >
        {onboarding.map((el, index) => (
          <View key={index} className="flex items-center justify-center">
            {el.image && (
              <Image
                className="w-[100%] h-[300px]"
                source={el.image}
                resizeMode="contain"
              />
            )}

            <View className="flex flex-row items-center justify-center w-full mt-10">
              <Text className="text-black text-3xl font-bold mx-10 text-center">
                {el.title}
              </Text>
            </View>
            <Text className="text-lg font-semibold text-center text-[#858585] mx-10 mt-3">
              {el.description}
            </Text>
          </View>
        ))}
      </Swiper>
      <CustomButton
        title={lastSlide ? "Get Started" : "Next"}
        onPress={() =>
          lastSlide ? handleSkip() : swiperRef.current?.scrollBy(1)
        }
        className="w-11/12 mt-10"
      />
    </SafeAreaView>
  );
};

export default Onboarding;
