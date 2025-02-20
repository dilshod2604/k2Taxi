import { ActivityIndicator, Image, ScrollView, Text, View } from "react-native";
import { useState } from "react";
import InputField from "@/components/ui/InputField";
import CustomButton from "@/components/ui/CustomButton";
import { Link, useRouter } from "expo-router";
import { useSignUpUserMutation } from "@/redux/api/auth";
import * as SecureStore from "expo-secure-store";
import Toast from "react-native-toast-message";

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

const SignUpPage = () => {
  const { push } = useRouter();
  const [signUpUser, { isLoading }] = useSignUpUserMutation();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onSubmit = async () => {
    try {
      const res = await signUpUser(form);
      if (res.data) {
        await SecureStore.setItemAsync("userId", res.data.id.toString());
        setForm({
          email: "",
          name: "",
          password: "",
        });
        Toast.show({
          type: "success",
          text1: "Success",
          text2: "Account created successfully!",
        });
        push("/(auth)/signIn");
      } else if (
        res.error &&
        typeof res.error === "object" &&
        "status" in res.error &&
        (res.error as { status: number }).status === 400
      ) {
        Toast.show({
          type: "error",
          text1: "Warning",
          text2: "This emaail is already exists",
        });
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Failed to create account. Please try again.",
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
          Создайте ваш аккаунт
        </Text>
        <View className="flex items-center  gap-y-5">
          <InputField
            label="Имя"
            value={form.name}
            placeholder="Введите вашу имя"
            icon={require("../../../assets/icons/profile.png")}
            inputStyle="placeholder:text-neutral-500 "
            onChangeText={(value) => setForm({ ...form, name: value })}
          />
          <InputField
            label="Email"
            value={form.email}
            placeholder="Введите вашу электроную почту "
            icon={require("../../../assets/icons/email.png")}
            inputStyle="placeholder:text-neutral-500 "
            onChangeText={(value) => setForm({ ...form, email: value })}
          />
          <InputField
            label="Пароль"
            value={form.password}
            placeholder="Введите ваш пароль"
            icon={require("../../../assets/icons/lock.png")}
            inputStyle="placeholder:text-neutral-500 "
            secureTextEntry={true}
            onChangeText={(value) => setForm({ ...form, password: value })}
          />
        </View>

        <View className="flex items-center  w-full">
          <CustomButton
            disabled={isLoading}
            title="Регистрация"
            className="w-11/12 p-4 gap-x-4"
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

        <View className="flex flex-row items-center gap-x-2 ">
          <Text className="text-lg font-semibold text-center text-[#858585]">
            Уже есть аккаунт?
          </Text>
          <Link
            href={"/(auth)/signIn"}
            className="text-lg font-semibold text-center text-blue-500 hover:text-blue-600"
          >
            Войти
          </Link>
        </View>
      </View>
    </ScrollView>
  );
};

export default SignUpPage;
