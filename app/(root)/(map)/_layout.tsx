import React from "react";
import { Stack } from "expo-router";

const MapLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="ride" options={{ headerShown: false }} />
      <Stack.Screen name="book_ride" options={{ headerShown: false }} />
    </Stack>
  );
};

export default MapLayout;
