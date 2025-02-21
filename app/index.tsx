import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { useGetUsersQuery } from "@/redux/api/auth";
import { ActivityIndicator, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  const [hasOnboarded, setHasOnboarded] = useState<boolean | null>(null);
  const [userId, setUserId] = useState<number | null>(null);

  const { data, isLoading, isError, error } = useGetUsersQuery(userId ?? 0, {
    skip: !userId,
  });

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const status = await SecureStore.getItemAsync("hasOnboarded");
        if (isMounted) setHasOnboarded(status === "true");

        const id = await SecureStore.getItemAsync("userId");
        console.log("id", id);
        if (id && isMounted) {
          setUserId(parseInt(id));
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  if (hasOnboarded === null || isLoading) {
    return (
      <SafeAreaView className="flex flex-1 w-full items-center justify-center">
        <ActivityIndicator size="large" color="#FBBB00" />
      </SafeAreaView>
    );
  }

  if (
    isError &&
    typeof error === "object" &&
    "data" in error! &&
    (error as { data: { error: string } }).data.error === "User not found"
  ) {
    return <Redirect href="/(auth)/start" />;
  }

  // if (!data) {
  //   return (
  //     <Redirect href={hasOnboarded ? "/(auth)/start" : "/(auth)/onboarding"} />
  //   );
  // }

  return <Redirect href="/(root)/(tabs)/home" />;
}
