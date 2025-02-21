import React from "react";
import { products } from "@/constants/products";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import ProductCards from "./shared/ProductCard";

const Products = () => {
  return (
    <View style={style.container}>
      {products.map((item, index) => (
        <ProductCards
          item={item}
          className="rounded-xl"
          imageStyle="w-full h-full"
          resizeMode="contain"
        />
      ))}
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-between",
    rowGap: 5,
    marginBottom: 100,
  },
});
export default Products;
