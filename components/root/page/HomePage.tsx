import { useGetUsersQuery } from "@/redux/api/auth";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Text,
  View,
  FlatList,
  ActivityIndicator,
  ScrollView,
  Image,
  TouchableOpacity,
  ImageSourcePropType,
  Button,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as SecureStore from "expo-secure-store";
import images from "@/constants/images";
import Cards from "@/components/shared/Cards";
import CustomButton from "@/components/ui/CustomButton";
import icons from "@/constants/icons";
import PremiumButton from "@/components/shared/PremiumButton";
import CustomBottomSheet from "@/components/ui/CustomBottomSheet";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetTextInput,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheetInput from "@/components/ui/BottomSheetInput";
import { router } from "expo-router";
import * as Location from "expo-location";
import { useUserLocationStore } from "@/store/useUserLocationStore";
import GoogleSearchInput from "@/components/ui/GoogleSearchInput";

const ButtonIcon = ({
  className,
  icon,
}: {
  className: string;
  icon: ImageSourcePropType;
}) => <Image source={icon} className={className} resizeMode="cover" />;

const HomePage = () => {
  const [userId, setIserId] = useState<string>();
  const sheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["80%"], []);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [hasPermissions, setHasPermissions] = useState<boolean>(false);
  const { setUserLocation, userAddress, setDestinationLocation } =
    useUserLocationStore();

  useEffect(() => {
    const fetchUserId = async () => {
      const id = await SecureStore.getItemAsync("userId");
      if (id) {
        setIserId(id);
      }
    };
    fetchUserId();

    const requestLocation = async () => {
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
    requestLocation();
  }, []);

  const { data, isLoading, isError } = useGetUsersQuery(parseInt(userId!));

  const handleOpenBottomSheet = () => {
    sheetRef.current?.expand();
    setIsOpen(!isOpen);
  };

  if (isLoading) {
    return (
      <SafeAreaView className="flex flex-1 w-full items-center justify-center">
        <ActivityIndicator size="large" color="#FBBB00" />
      </SafeAreaView>
    );
  }

  // if (isError && !data) {
  //   return <Redirect href={"/(auth)/start"} />;
  // }

  const handleSerachInputPress = (location: {
    latitude: number;
    longitude: number;
    address: string;
  }) => {
    setDestinationLocation({
      latitude: location.latitude,
      longitude: location.longitude,
      address: location.address,
    });
    router.push("/(root)/(map)/ride");
  };
  return (
    <SafeAreaView className="flex-1">
      <View className=" w-full h-[70px] rounded-b-3xl bg-white fixed top-0 left-0 flex items-center flex-row justify-between px-4">
        <TouchableOpacity
          className="w-[40px] h-[40px] rounded-full flex items-center justify-center"
          onPress={() => router.push("/(root)/(tabs)/profile")}
        >
          <Image
            source={images.avatar}
            resizeMode="contain"
            className="size-[40px] "
          />
        </TouchableOpacity>
        <View className="flex flex-row items-center gap-x-4">
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[130px] h-[50px]  "
          />
          <PremiumButton />
        </View>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="flex flex-col flex-1 px-4 gap-y-7"
      >
        <View className="flex flex-row items-center gap-x-4 mt-5 pr-4 ">
          <Cards
            image={images.delivery}
            className="p-4 rounded-lg bg-neutral-100 h-[100px] w-[50%] relative "
            imageStyle="w-full h-full"
            resizeMode="cover"
            title="Доставка"
            textStyle="w-full text-center absolute bottom-[-20px]"
          />
          <Cards
            image={images.navigator}
            className="p-4 rounded-lg bg-neutral-100 h-[100px] w-[50%] relative "
            imageStyle="w-full h-full"
            resizeMode="cover"
            title="Навигатор"
            textStyle="w-full text-center absolute bottom-[-20px]"
          />
        </View>
        <View className=" flex flex-col gap-y-[40px]">
          <Cards
            image={images.taxi}
            className="p-4 rounded-lg bg-neutral-100 h-[100px] w-full relative"
            imageStyle="w-full h-full"
            resizeMode="contain"
            title="Такси"
            textStyle="w-full text-center absolute bottom-[-20px]"
            // onPress={() => router.push("/(root)/(map)/ride")}
          />
          <CustomButton
            onPress={handleOpenBottomSheet}
            title="Куда едем?"
            className=" rounded-2xl bg-neutral-200 justify-between overflow-hidden mx-5"
            textVariant="primary"
            IconRight={() => (
              <ButtonIcon icon={icons.rightArrow} className="size-5" />
            )}
            IconLeft={() => (
              <ButtonIcon icon={icons.taxiIcon} className="w-[60px] h-full" />
            )}
          />
        </View>
      </ScrollView>
      <CustomBottomSheet
        snapPoints={snapPoints}
        ref={sheetRef}
        indicatorStyle={{ backgroundColor: "#FBBB00", width: 100 }}
        scroll="base"
        isOpen={isOpen}
        className="flex-1 flex flex-col p-2  "
        enablePanDownToClose={true}
      >
        <View className="flex-1 p-4  ">
          <GoogleSearchInput
            placeholder="Откуда поедете"
            icon={icons.target}
            initialLocation={userAddress!}
          />
          <GoogleSearchInput
            placeholder="Куда поедете"
            icon={icons.map}
            handlePress={(location) => handleSerachInputPress(location)}
          />
        </View>
      </CustomBottomSheet>
    </SafeAreaView>
  );
};
export default HomePage;
