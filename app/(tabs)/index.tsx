
// import { useAuth } from "@clerk/clerk-react";
// import { Text, TouchableOpacity, View } from "react-native";

// export default function Index() {
//   return (
//     <View
//       style={{
//         flex: 1,
//         justifyContent: "center",
//         alignItems: "center",
//         backgroundColor: "black"
//       }}
//     >
//       <Link style={{
//         color: "white",
//         fontSize: 14,
//         fontWeight: "light"
//       }} href='/profile'>Spotlight</Link>
//     </View>
//   );
// }

import { useAuth } from '@clerk/clerk-expo';
import { Text, TouchableOpacity, View } from 'react-native';

export default function Index() {
  const { signOut } = useAuth();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
      }}
    >
      <TouchableOpacity onPress={() => signOut()}>
        <Text style={{ color: 'white' }}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
}