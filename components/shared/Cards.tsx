import React from "react";
import {
  Image,
  ImageResizeMode,
  ImageSourcePropType,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import clsx from "clsx";

const Cards = ({
  image,
  className,
  title,
  imageStyle,
  textStyle,
  resizeMode,
  onPress,
}: {
  image?: ImageSourcePropType;
  className?: string;
  title?: string;
  imageStyle?: string;
  textStyle?: string;
  resizeMode?: ImageResizeMode;
  onPress?: () => void;
}) => {
  return (
    <TouchableOpacity
      className={clsx("bg-neutral-200 ", className)}
      onPress={onPress}
    >
      <Image
        source={image}
        className={clsx(imageStyle)}
        alt={title}
        resizeMode={resizeMode}
      />
      <Text className={clsx("text-black-300", textStyle)}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Cards;
