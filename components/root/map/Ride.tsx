import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import GoogleSearchInput from "@/components/ui/GoogleSearchInput";
import icons from "@/constants/icons";
import { useUserLocationStore } from "@/store/useUserLocationStore";
import CustomButton from "@/components/ui/CustomButton";
import * as Location from "expo-location";
import { router } from "expo-router";
import { useDriverStore } from "@/store/useDriverStore";
import { ScrollView } from "react-native-gesture-handler";
import DriversCard from "./DriversCard";

const RidePage = () => {
  const [hasPermissions, setHasPermissions] = useState<boolean>(false);
  const {
    setDestinationLocation,
    setUserLocation,
    userAddress,
    destinationAddress,
  } = useUserLocationStore();

  const handleUserLocationPress = (location: {
    latitude: number;
    longitude: number;
    address: string;
  }) => {
    setUserLocation({
      latitude: location.latitude,
      longitude: location.longitude,
      address: location.address,
    });
  };
  const handleDestinationLocationPress = (location: {
    latitude: number;
    longitude: number;
    address: string;
  }) => {
    setDestinationLocation({
      latitude: location.latitude,
      longitude: location.longitude,
      address: location.address,
    });
  };

  const findMyLocationPress = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setHasPermissions(false);
      return;
    }
    const location = await Location.getCurrentPositionAsync();
    const address = await Location.reverseGeocodeAsync({
      latitude: location.coords?.latitude!,
      longitude: location.coords?.longitude!,
    });
    if (location && address) {
      setUserLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        address: `${address[0].name} ${address[0].region}`,
      });
    }
  };
  return (
    <View className="flex flex-col">
      <DriversCard />
      <GoogleSearchInput
        initialLocation={userAddress!}
        placeholder="Откуда поедете"
        icon={icons.target}
        handlePress={(location) => handleUserLocationPress(location)}
        showRightButton={true}
        renderRightButton={() => {
          return (
            <TouchableOpacity
              className=" w-[30px] h-[30px] rounded-md border-2 border-red-500 bg-[#FBBB00]  flex items-center justify-center"
              onPress={findMyLocationPress}
            >
              <Image
                source={icons.my_location}
                className="size-6"
                resizeMode="contain"
              />
            </TouchableOpacity>
          );
        }}
      />

      <GoogleSearchInput
        placeholder="Куда поедете"
        icon={icons.map}
        handlePress={(location) => handleDestinationLocationPress(location)}
        initialLocation={destinationAddress!}
      />
      <CustomButton
        title="Заказать"
        className="rounded-2xl  mt-5"
        onPress={() => router.push("/(root)/(map)/book_ride")}
      />
    </View>
  );
};

export default RidePage;
