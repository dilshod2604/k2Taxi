import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useDriverStore } from "@/store/useDriverStore";
import { formatTime } from "@/lib/utils";

const DriversCard = () => {
  const { drivers, selectredDriver, setSelectedDriver } = useDriverStore();

  return (
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
      <View className="flex flex-row gap-x-2 ">
        {drivers.map((item) => (
          <TouchableOpacity
            onPress={() => setSelectedDriver(item.id)}
            key={item.id}
            className={` w-[100px] h-[100px] rounded-md relative  ${
              selectredDriver === item.id
                ? "bg-neutral-200 border-2 border-[#FBBB00] "
                : "bg-neutral-100"
            } `}
          >
            <Image
              source={{ uri: item.car_image_url }}
              resizeMode="cover"
              className="w-full h-[70px]"
            />
            <View className="absolute w-[90%] flex flex-col items-start bottom-1 bg-white p-1 right-1 left-1  rounded-md ">
              <Text className="text-black-300 text-[10px] font-semibold">
                {formatTime(Math.round(item.time!))}
              </Text>
              <Text className="text-black-300 text-[12px] font-semibold">
                {item.type}
              </Text>
              <Text className="text-black-300 text-[10px] font-semibold">
                {item.price} сом
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

export default DriversCard;
