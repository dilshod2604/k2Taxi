import React from "react";
import { View, Text, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDriverStore } from "@/store/useDriverStore";
import { useUserLocationStore } from "@/store/useUserLocationStore";
import { formatTime } from "@/lib/utils";
import icons from "@/constants/icons";
import CustomButton from "@/components/ui/CustomButton";

const BookRidePage = () => {
  const { userAddress, destinationAddress } = useUserLocationStore();
  const { drivers, selectredDriver } = useDriverStore();

  const driverDetails = drivers.filter(
    (driver) => driver.id === selectredDriver
  )[0];

  return (
    <SafeAreaView>
      <Text className="text-xl font-semibold mb-3 text-center">
        Информация о поездке
      </Text>

      <View className="flex flex-col w-full items-center justify-center mt-10">
        <Image
          source={{ uri: driverDetails?.profile_image_url }}
          className="w-28 h-28 rounded-full"
        />

        <View className="flex flex-row items-center justify-center mt-5 space-x-2">
          <Text className="text-lg font-semibold">
            {driverDetails?.title}
          </Text>
        </View>
      </View>

      <View className="flex flex-col w-full items-start justify-center py-3 px-5 rounded-3xl bg-general-600 mt-5">
        <View className="flex flex-row items-center justify-between w-full border-b border-white py-3">
          <Text className="text-lg font-normal">Цена поездки</Text>
          <Text className="text-lg font-normal text-[#0CC25F]">
            {driverDetails?.price} сом
          </Text>
        </View>

        <View className="flex flex-row items-center justify-between w-full border-b border-white py-3">
          <Text className="text-lg font-normal">Время подачи</Text>
          <Text className="text-lg font-normal">
            {formatTime(Math.round(driverDetails?.time!))}
          </Text>
        </View>

        <View className="flex flex-row items-center justify-between w-full py-3">
          <Text className="text-lg font-normal">Места в машине</Text>
          <Text className="text-lg font-medium">
            {driverDetails?.car_seats}
          </Text>
        </View>
      </View>

      <View className="flex flex-col w-full items-start justify-center mt-5">
        <View className="flex flex-row items-center justify-start mt-3 border-t border-b-[0.5px] border-neutral-400 w-full py-3">
          <Image source={icons.to} className="w-6 h-6" />
          <Text className="text-lg font-JakartaRegular ml-2">
            {userAddress}
          </Text>
        </View>

        <View className="flex flex-row items-center justify-start border-b-[0.5px] border-neutral-400 w-full py-3">
          <Image source={icons.point} className="w-6 h-6" />
          <Text className="text-lg font-JakartaRegular ml-2">
            {destinationAddress}
          </Text>
        </View>
      </View>
      <CustomButton title="Заказать" className="mt-5" />
    </SafeAreaView>
  );
};

export default BookRidePage;
