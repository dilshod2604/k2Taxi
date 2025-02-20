import React, { useEffect, useState } from "react";
import drivers from "@/constants/drivers";
import icons from "@/constants/icons";
import {
  calculateDriverTimes,
  calculateRegion,
  generateMarkersFromData,
} from "@/lib/map";
import { useDriverStore } from "@/store/useDriverStore";
import { useUserLocationStore } from "@/store/useUserLocationStore";
import clsx from "clsx";
import {
  ActivityIndicator,
  Image,
  ImageResizeMode,
  ImageSourcePropType,
  View,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";
import MapViewDirections from "react-native-maps-directions";

const MapIcon = ({
  icon,
  className,
  resizeMode,
  iconStyle,
}: {
  icon: ImageSourcePropType;
  className?: string;
  resizeMode?: ImageResizeMode | undefined;
  iconStyle?: string;
}) => {
  return (
    <View className={className}>
      <Image
        source={icon}
        resizeMode={resizeMode}
        className={clsx("size-7", iconStyle)}
      />
    </View>
  );
};

const Map = () => {
  const [markers, setMarkers] = useState<MarkerData[]>([]);

  const {
    userAddress,
    userLatitude,
    userLongitude,
    destionationLatitude,
    destionationLongitude,
    destinationAddress,
  } = useUserLocationStore();

  const { setDrivers, setSelectedDriver, selectredDriver } = useDriverStore();

  const region = calculateRegion({
    userLatitude,
    userLongitude,
    destinationLatitude: destionationLatitude,
    destinationLongitude: destionationLongitude,
  });

  useEffect(() => {
    if (Array.isArray(drivers.drivers)) {
      if (!userLatitude || !userLongitude) {
        return;
      }
      const newMarkers = generateMarkersFromData({
        data: drivers.drivers,
        userLatitude,
        userLongitude,
      });

      setMarkers(newMarkers);
    }
  }, [drivers.drivers]);

  useEffect(() => {
    if (
      markers.length > 0 &&
      destionationLatitude !== undefined &&
      destionationLongitude !== undefined
    ) {
      calculateDriverTimes({
        markers,
        userLatitude,
        userLongitude,
        destinationLatitude: destionationLatitude,
        destinationLongitude: destionationLongitude,
      }).then((drivers) => {
        setDrivers(drivers as MarkerData[]);
      });
    }
  }, [
    markers,
    destionationLatitude,
    destionationLongitude,
    userLatitude,
    userLongitude,
  ]);

  if (!userAddress && !destinationAddress) {
    return (
      <SafeAreaView className="flex flex-1 w-full items-center justify-center">
        <ActivityIndicator size="large" color="#FBBB00" />
      </SafeAreaView>
    );
  }
  return (
    <MapView
      style={{ width: "100%", height: "100%" }}
      showsMyLocationButton={true}
      showsUserLocation
      userInterfaceStyle="light"
        showsCompass
      initialRegion={region}
      showsPointsOfInterest={false}
      provider="google"
    >
      {userAddress && (
        <Marker
          coordinate={{
            latitude: userLatitude ?? 0,
            longitude: userLongitude ?? 0,
          }}
          title="your address"
        >
          {userAddress && destinationAddress && (
            <MapIcon
              icon={icons.my_location}
              resizeMode="contain"
              iconStyle="size-5"
              className="w-[30px] h-[30px] flex flex-row justify-center items-center   bg-[#FBBB00] rounded-md border-2 border-red-500 "
            />
          )}
        </Marker>
      )}
      {destinationAddress && destionationLatitude && (
        <>
          <Marker
            coordinate={{
              latitude: destionationLatitude!,
              longitude: destionationLongitude!,
            }}
            title="your address"
          >
            {userAddress && destinationAddress && (
              <MapIcon
                icon={icons.finish}
                className="w-[30px] h-[30px] flex flex-row justify-center   bg-[#FBBB00] rounded-md border-2 border-white"
                iconStyle="size-7"
                resizeMode="contain"
              />
            )}
          </Marker>
          <MapViewDirections
            origin={{
              latitude: userLatitude!,
              longitude: userLongitude!,
            }}
            destination={{
              latitude: destionationLatitude!,
              longitude: destionationLongitude!,
            }}
            apikey={process.env.EXPO_PUBLIC_GOOGLE_API_KEY!}
            strokeColor={"#FBBB00"}
            strokeWidth={6}
          />
        </>
      )}

      {markers.map((marker) => (
        <Marker
          key={marker.id}
          coordinate={{
            latitude: marker.latitude,
            longitude: marker.longitude,
          }}
          title={marker.title}
        >
          <MapIcon
            icon={icons.taxi}
            className={`w-[30px] h-[30px] flex items-center justify-center ${selectredDriver===marker.id?"border-2 rounded-lg bg-white border-[#fbbb00] ":""}`}
            iconStyle="size-8"
            resizeMode="contain"
          />
        </Marker>
      ))}
    </MapView>
  );
};

export default Map;
