import React from "react";
import images from "@/constants/images";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import { Image, TouchableOpacity } from "react-native";
import { clsx } from "clsx";

const PremiumButton = ({ className }: { className?: string }) => {
  return (
    <TouchableOpacity
      className={clsx("rounded-2xl overflow-hidden", className)}
    >
      <LinearGradient
        colors={["#9333ea", "#ec4899"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="px-3 py-2 flex flex-row items-center gap-x-2"
      >
        <Image
          source={images.premium}
          resizeMode="contain"
          className="size-7"
        />
        <Link href="/" className="font-bold text-white">
          Plus
        </Link>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default PremiumButton;
