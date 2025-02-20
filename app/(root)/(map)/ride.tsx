import { View, Text } from "react-native";
import React from "react";
import RideLayout from "@/components/root/map/RideLayout";
import RidePage from "@/components/root/map/Ride";

const Ride = () => {
  return (
    <RideLayout>
      <RidePage />
    </RideLayout>
  );
};

export default Ride;
