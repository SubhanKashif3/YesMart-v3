import { Link, Redirect } from "expo-router";
import { Button, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import "./global.css"
export default function Index() {
  return (
   <SafeAreaView>
    <View>
      <Text className="text-xl bg-yellow-500">Hello  World! Guys</Text>
      <Link href="/home">Go to Home</Link>
    </View>
   </SafeAreaView>
  );
}

