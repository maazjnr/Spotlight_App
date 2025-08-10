import { Link } from "expo-router";
import { View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "black"
      }}
    >
      <Link style={{
        color: "white",
        fontSize: 14,
        fontWeight: "light"
      }} href='/profile'>Spotlight</Link>
    </View>
  );
}
