import { StatusBar, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  return (
    <SafeAreaView className="flex h-full w-full items-center justify-center bg-white">
      <Text className="text-red-500">
        Open up App.js to start working on your app!
      </Text>
      <StatusBar />
    </SafeAreaView>
  );
}
