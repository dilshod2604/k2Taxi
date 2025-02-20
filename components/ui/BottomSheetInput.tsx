import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import clsx from "clsx";
import React, { useState } from "react";
import {
  ColorValue,
  Image,
  ImageResizeMode,
  ImageSourcePropType,
  NativeSyntheticEvent,
  Pressable,
  Text,
  TextInputFocusEventData,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from "react-native";

interface IconType {
  icon: ImageSourcePropType;
  iconSolid?: ImageSourcePropType;
  iconStyle?: string;
  tintiColor?: ColorValue | undefined;
  resizeMode?: ImageResizeMode | undefined;
}
interface BottomSheetInputProps {
  value?: string;
  placeholderText: string;
  inputStyle?: string;
  className?: string;
  iconLeft?: IconType;
  iconRight?: IconType;
  showInputClearButton?: boolean;
  clearButtonStyle?: string;
  RightButton?: React.ComponentType<TouchableOpacityProps>;
  inputId: string;
  onPress?: () => void;
  onChangeText?: ((text: string) => void) | undefined;
  clearPress?: () => void;
}
const BottomSheetInput = ({
  value,
  placeholderText,
  inputStyle,
  className,
  iconLeft,
  iconRight,
  showInputClearButton = false,
  clearButtonStyle,
  RightButton,
  inputId,
  onPress,
  onChangeText,
  clearPress,
}: BottomSheetInputProps) => {
  const [focusedInput, setFocusedInput] = useState<string | null>(null);
  const onFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setFocusedInput(inputId);
  };
  const onBlur = () => {
    setFocusedInput(null);
  };
  return (
    <View className="w-full">
      <Pressable
        className={clsx(
          "flex flex-row items-center bg-neutral-100 rounded-xl",
          className
        )}
      >
        <View className="flex flex-row items-center">
          {iconLeft && (
            <Image
              source={focusedInput ? iconLeft.iconSolid : iconLeft.icon}
              className={iconLeft.iconStyle}
              resizeMode={iconLeft.resizeMode}
              tintColor={iconLeft.tintiColor}
            />
          )}
          <View className="flex flex-row gap-x-4 items-center">
            <BottomSheetTextInput
              value={value}
              className={clsx("px-4 placeholder:text-neutral-600", inputStyle)}
              placeholder={placeholderText}
              onFocus={onFocus}
              onBlur={onBlur}
              onChangeText={onChangeText}
            />
          </View>
          {iconRight && (
            <Image
              source={focusedInput ? iconRight.iconSolid : iconRight.icon}
              className={iconRight.iconStyle}
              resizeMode={iconRight.resizeMode}
              tintColor={iconRight.tintiColor}
            />
          )}
        </View>
        {showInputClearButton && value!.length > 0 && (
          <TouchableOpacity onPress={clearPress}>
            <Text className={clsx("text-neutral-500", clearButtonStyle)}>
              ✖️
            </Text>
          </TouchableOpacity>
        )}
        {focusedInput && RightButton && <RightButton />}
      </Pressable>
    </View>
  );
};

export default BottomSheetInput;
