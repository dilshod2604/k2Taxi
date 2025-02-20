import { create } from "zustand";
interface DriverState {
  drivers: MarkerData[];
  selectredDriver: number | null;
  setSelectedDriver: (driverId: number) => void;
  setDrivers: (drivers: MarkerData[]) => void;
  selCleareDrivers: () => void;
}
export const useDriverStore = create<DriverState>((set) => ({
  drivers: [] as MarkerData[],
  selectredDriver: null,
  setSelectedDriver: (driverId) => set({ selectredDriver: driverId }),
  setDrivers: (drivers) => set({ drivers: drivers }),
  selCleareDrivers: () => set({ selectredDriver: null }),
}));
