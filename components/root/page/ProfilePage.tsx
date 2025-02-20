import React from "react";
import icons from "@/constants/icons";
import {
  Image,
  ImageSourcePropType,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface SettingsItemProp {
  icon: ImageSourcePropType;
  title: string;
  onPress?: () => void;
  textStyle?: string;
  showArrow?: boolean;
}

const SetingsItem = ({
  title,
  icon,
  showArrow,
  onPress,
  textStyle,
}: SettingsItemProp) => (
  <TouchableOpacity
    className="flex flex-row  items-center justify-between"
    onPress={onPress}
  >
    <View className="flex flex-row gap-x-6 ">
      <Image source={icon} className="size-6" />
      <Text className={`text-lg font-medium ${textStyle}`}>{title}</Text>
    </View>
    {showArrow && <Image source={icons.rightArrow} className="size-5" />}
  </TouchableOpacity>
);

const ProfilePage = () => {
  return (
    <SafeAreaView className="flex-1 w-full px-4">
      <ScrollView
        showsVerticalScrollIndicator={false}
      >
        <View className="w-full flex flex-row items-center justify-between py-4">
          <Text className="text-black-300 font-semibold text-lg">Профиль</Text>
          <Image
            source={icons.bell}
            resizeMode="contain"
            className="size-5"
          />
        </View>
        <View className="flex w-full items-center gap-y-4">
          <View className="flex flex-col items-center relative mt-5 ">
            <Image
              source={icons.avatar}
              resizeMode="contain"
              className="rounded-full size-32"
            />
            <TouchableOpacity className=" absolute right-0 bottom-0">
              <Image
                source={icons.edit}
                resizeMode="contain"
                tintColor="#FBBB00"
                className="size-9"
              />
            </TouchableOpacity>
          </View>
          <Text className="text-black-300  font-semibold text-2xl w-full text-center ">
            Dilshod
          </Text>
        </View>
        <View className="flex flex-col w-full py-6 gap-y-6 border-y-[0.5px] border-neutral-300 mt-5">
          <SetingsItem
            title="Мои заказы"
            icon={icons.booking}
            showArrow={true}
            textStyle="text-black-300"
          />
          <SetingsItem
            title="Платежи"
            icon={icons.payments}
            showArrow={true}
            textStyle="text-black-300"
          />
        </View>
        <View className="flex flex-col w-full py-6 gap-y-6">
          <SetingsItem
            title="Мои заказы"
            icon={icons.booking}
            showArrow={true}
            textStyle="text-black-300"
          />
          <SetingsItem
            title="Профиль"
            icon={icons.myprofile}
            showArrow={true}
            textStyle="text-black-300"
          />
          <SetingsItem
            title="Уведемления"
            icon={icons.bell}
            showArrow={true}
            textStyle="text-black-300"
          />
          <SetingsItem
            title="Безопасность"
            icon={icons.security}
            showArrow={true}
            textStyle="text-black-300"
          />
          <SetingsItem
            title="Язык"
            icon={icons.language}
            showArrow={true}
            textStyle="text-black-300"
          />
          <SetingsItem
            title="Помощ"
            icon={icons.help}
            showArrow={true}
            textStyle="text-black-300"
          />
          <SetingsItem
            title="Выйти"
            icon={icons.logout}
            showArrow={false}
            textStyle="text-danger"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfilePage;
