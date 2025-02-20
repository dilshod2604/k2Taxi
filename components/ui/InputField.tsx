import { InputFieldProps } from "@/schema/auth/AuthUI";
import { useState } from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  TextInput,
  Image,
  Platform,
  Keyboard,
} from "react-native";

import { FontAwesome } from "@expo/vector-icons";

const InputField = ({
  label,
  labelStyle,
  labelShow,
  containerStyle,
  inputStyle,
  icon,
  secureTextEntry = false,
  iconStyle,
  className,
  ...props
}: InputFieldProps) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="w-full items-start">
          {labelShow && (
            <Text className={`text-[17px] font-semibold mb-2 ${labelStyle}`}>
              {label}
            </Text>
          )}
          <View
            className={`flex  flex-row relative  justify-start items-center bg-neutral-200 w-full border border-neutral-100 rounded-full p-3 focus:border-[#FBBB00] ${containerStyle}`}
          >
            {icon && <Image source={icon} className={`w-6 h-6 ${iconStyle}`} />}
            <TextInput
              className={`w-full flex-1 p-2 text-[15px] font-semibold   ${inputStyle}`}
              secureTextEntry={showPassword}
              {...props}
            />
            {secureTextEntry && (
              <FontAwesome
                name={showPassword ? "eye-slash" : "eye"}
                size={20}
                onPress={togglePasswordVisibility}
                color={"gray"}
                style={{ position: "absolute", right: 16 }}
              />
            )}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default InputField;
