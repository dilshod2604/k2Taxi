import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { IButtonProps } from "@/schema/auth/AuthUI";

const getBg = (variant: IButtonProps["bgVariant"]) => {
  switch (variant) {
    case "secondary":
      return "bg-gray-500";
    case "danger":
      return "bg-red-500";
    case "success":
      return "bg-green-500";
    case "outline":
      return "bg-transparent border-neutral-300 border-[0.5px]";
    default:
      return "bg-[#FBBB00]";
  }
};

const getTextVariant = (variant: IButtonProps["textVariant"]) => {
  switch (variant) {
    case "primary":
      return "text-black-300";
    case "secondary":
      return "text-gray-100";
    case "danger":
      return "text-red-100";
    case "success":
      return "text-green-100";
    default:
      return "text-white";
  }
};
const CustomButton = ({
  onPress,
  title,
  bgVariant = "primary",
  textVariant = "defauld",
  IconLeft,
  IconRight,
  className,
  disabled,
  ...props
}: IButtonProps) => {
  return (
    <TouchableOpacity
    
      onPress={onPress}
      className={`w-sm rounded-full p-3 flex flex-row justify-center items-center shadow-md  shadow-neutral-400/70 ${getBg(
        bgVariant
      )} ${className}`}
      disabled={disabled}
      {...props}
    >
      {IconLeft && <IconLeft />}
      <Text className={`text-lg font-bold ${getTextVariant(textVariant)}`}>
        {title}
      </Text>
      {IconRight && <IconRight />}
    </TouchableOpacity>
  );
};

export default CustomButton;
