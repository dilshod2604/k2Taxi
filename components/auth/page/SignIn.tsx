import { ActivityIndicator, Image, ScrollView, Text, View } from "react-native";
import { useState } from "react";
import InputField from "@/components/ui/InputField";
import CustomButton from "@/components/ui/CustomButton";
import { Link, useRouter } from "expo-router";
import { useSignInUserMutation } from "@/redux/api/auth";
import Toast from "react-native-toast-message";
import * as SecureStore from "expo-secure-store";

const GoogleIcon = () => {
  return (
    <View className="h-5 w-5">
      <Image
        source={require("../../../assets/icons/google_icon.png")}
        resizeMode="contain"
        className="w-5 h-5"
      />
    </View>
  );
};

const Loading = () => {
  return <ActivityIndicator size="small" className="text-white" />;
};

const SignInPage = () => {
  const [signInUser, { isLoading }] = useSignInUserMutation();
  const { push } = useRouter();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const onSubmit = async () => {
    try {
      const res = await signInUser(form);
      if (res.data) {
        await SecureStore.setItemAsync("accessToken", res.data.token);
        setForm({
          email: "",
          password: "",
        });
        Toast.show({
          type: "success",
          text1: "Success",
          text2: "Your account loged in successfully!",
        });
        push("/(root)/(tabs)/home");
      } else if (res.error) {
        console.log(res.error);
        Toast.show({
          type: "error",
          text1: "Warning",
          text2: "Please write the correct email and password",
        });
      }
    } catch (error) {
      console.log(error);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Failed to log in your  account. Please try again.",
      });
    }
  };

  return (
    <ScrollView className="flex-1 border">
      <View
        className="flex-1 w-full min-h-screen
      p-6 items-center justify-center gap-y-[30px]
      "
      >
        <Text className="text-black text-3xl font-bold mx-10 text-center">
          Добро пожаловать
        </Text>
        <View className="flex items-center  gap-y-5">
          <InputField
            label="Email"
            placeholder="Введите вашу электроную почту "
            icon={require("../../../assets/icons/email.png")}
            inputStyle="placeholder:text-neutral-500 "
            onChangeText={(value) => setForm({ ...form, email: value })}
          />
          <InputField
            label="Пароль"
            placeholder="Введите ваш пароль"
            icon={require("../../../assets/icons/lock.png")}
            inputStyle="placeholder:text-neutral-500 "
            secureTextEntry={true}
            onChangeText={(value) => setForm({ ...form, password: value })}
          />
        </View>

        <View className="flex items-center  w-full">
          <CustomButton
            title="Войти"
            disabled={isLoading}
            className="w-11/12 p-4"
            onPress={onSubmit}
            IconRight={isLoading ? () => <Loading /> : undefined}
          />
          <View className="flex-row items-center my-4">
            <View className="flex-1 h-[1px] bg-gray-300" />
            <Text className="mx-2 text-gray-500">Или</Text>
            <View className="flex-1 h-[1px] bg-gray-300" />
          </View>
          <CustomButton
            title="Войти с Google"
            className="w-11/12 bg-white gap-x-4 p-4 "
            IconLeft={GoogleIcon}
            textVariant="primary"
          />
        </View>

        <View className="flex items-center ">
          <Text className="text-lg font-semibold text-center text-[#858585]">
            Если у вас нет аккаунта,Пожалуйста
          </Text>
          <Link
            href={"/(auth)/signUp"}
            className="text-lg font-semibold text-center text-blue-500 hover:text-blue-600"
          >
            Зарегистрируйтесь
          </Link>
        </View>
      </View>
    </ScrollView>
  );
};

export default SignInPage;
