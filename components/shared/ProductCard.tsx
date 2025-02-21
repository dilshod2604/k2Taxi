import React, { useState } from "react";
import {
  Image,
  ImageResizeMode,
  ImageSourcePropType,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import clsx from "clsx";
import { IProduct } from "@/constants/products";
import icons from "@/constants/icons";

const ProductCards = ({
  item,
  className,
  imageStyle,
  resizeMode,
  onPress,
}: {
  item: IProduct;
  className?: string;
  imageStyle?: string;
  textStyle?: string;
  resizeMode?: ImageResizeMode;
  onPress?: () => void;
}) => {
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
  };
  return (
    <TouchableOpacity
      className={clsx("bg-neutral-200", className)}
      onPress={onPress}
      style={{ width: "48%", height: 200, display: "flex", rowGap: 10 }}
    >
      <View style={{ height: 100 }}>
        <Image
          source={item.image}
          className={clsx(imageStyle)}
          alt={item.name}
          resizeMode={resizeMode}
        />
      </View>
      <View className="w-full flex  px-3 items-center ">
        <Text className="text-black-300 font-bold ">{item.name}</Text>
        <Text className="text-neutral-500">{item.type}</Text>
      </View>
      <View className="flex flex-row justify-between px-3">
        <View className="fex flex-row">
          <Image source={icons.star} resizeMode="contain" className="size-5" />
          <Text>{item.rating}</Text>
        </View>
        <TouchableOpacity onPress={handleFavorite}>
          <Image
            source={isFavorite ? icons.heart_red : icons.heart_black}
            resizeMode="contain"
            className="size-7"
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCards;
