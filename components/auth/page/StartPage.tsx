import { View, Text, Image } from "react-native";
import CustomButton from "@/components/ui/CustomButton";
import { Link, router } from "expo-router";

const GoogleIcon = () => {
  return (
    <Image
      source={require("../../../assets/icons/google_icon.png")}
      resizeMode="contain"
      className="w-5 h-5"
    />
  );
};

const StartPage = () => {
  return (
    <View className="flex-1 flex  h-full  items-center justify-center p-5  gap-y-[36px]">
      <View className="relative flex items-center justify-center w-[250px] h-[250px] overflow-hidden">
        <Image
          source={require("../../../assets/images/group.png")}
          className="w-[250px] h-[250px]  "
          resizeMode="contain"
        />
        <Image
          source={require("../../../assets/images/k2taxi_1.png")}
          className="w-[70px] h-[70px] absolute "
          resizeMode="contain"
        />
      </View>
      <View className="flex items-center gap-2">
        <Text className="text-black text-3xl font-bold mx-10 text-center">
          Давайте начнем!
        </Text>
        <Text className="text-lg font-semibold text-center text-[#858585] mx-10 mt-3">
          Зарегистрируйтесь или войдите в систему, чтобы узнать, какой
          автомобиль лучше всего подходит вам.
        </Text>
      </View>
      <View className="flex items-center  w-full">
        <CustomButton
          title="Регистрация"
          className="w-11/12"
          onPress={() => router.push("/(auth)/signUp")}
        />
        <View className="flex-row items-center my-4">
          <View className="flex-1 h-[1px] bg-gray-300" />
          <Text className="mx-2 text-gray-500">Или</Text>
          <View className="flex-1 h-[1px] bg-gray-300" />
        </View>
        <CustomButton
          title="Войти с Google"
          className="w-11/12 bg-white gap-x-4 "
          IconLeft={GoogleIcon}
          textVariant="primary"
        />
      </View>

      <View className="flex items-center">
        <Text className="text-lg font-semibold text-center text-[#858585]">
          Если у вас нет аккаунта,Пожалуйста
        </Text>
        <Link
          href={"/(auth)/signUp"}
          className="text-lg font-semibold text-center text-blue-500  hover:text-blue-600"
        >
          Зарегистрируйтесь
        </Link>
      </View>
    </View>
  );
};

export default StartPage;
