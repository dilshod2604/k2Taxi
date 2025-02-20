import { create } from "zustand";

interface UserLocationState {
  userLatitude: number | null;
  userLongitude: number | null;
  userAddress: string | null;
  destionationLatitude: number | null;
  destionationLongitude: number | null;
  destinationAddress: string | null;
  setUserLocation: ({
    latitude,
    longitude,
    address,
  }: {
    latitude: number;
    longitude: number;
    address: string;
  }) => void;
  setDestinationLocation: ({
    latitude,
    longitude,
    address,
  }: {
    latitude: number;
    longitude: number;
    address: string;
  }) => void;
}
export const useUserLocationStore = create<UserLocationState>((set) => ({
  userLatitude: null,
  userLongitude: null,
  userAddress: null,
  destionationLatitude: null,
  destionationLongitude: null,
  destinationAddress: null,
  setUserLocation: ({ latitude, longitude, address }) => {
    set(() => ({
      userLatitude: latitude,
      userLongitude: longitude,
      userAddress: address,
    }));
  },
  setDestinationLocation: ({ latitude, longitude, address }) => {
    set(() => ({
      destionationLatitude: latitude,
      destionationLongitude: longitude,
      destinationAddress: address,
    }));
  },
}));
