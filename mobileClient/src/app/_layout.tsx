import "../global.css";
import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack>
      {/* Screens and route groups */}
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="search/[query]" options={{ title: "Search" }} />
      <Stack.Screen name="index" options={{ title: "Home" }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
