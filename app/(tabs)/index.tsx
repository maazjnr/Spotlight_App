
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

import Story from '@/components/Story';
import { STORIES } from '@/constants/mock-data';
import { COLORS } from '@/constants/theme';
import { styles } from '@/styles/feed.styles';
import { useAuth } from '@clerk/clerk-expo';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';


export default function Index() {
  const { signOut } = useAuth();

  return (
    <View style={styles.container}
    >
      <View style={styles.header}>
      <Text style={styles.headerTitle}>Spotlight</Text>
      <TouchableOpacity onPress={() => signOut()}>
        <Ionicons name='log-out-outline' size={20} color={COLORS.primary} />
      </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} horizontal style={styles.storiesContainer}>
        
       {STORIES.map((story) => (
        <Story story={story} key={story.id} />
       ))}
      </ScrollView>
    </View>
  );
}