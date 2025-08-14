import InitialLayout from '@/components/initialLayout';
import ClerkAndConvexProvider from '@/providers/ClerkAndConvexProvider';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function RootLayout() {
  return (
    <ClerkAndConvexProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: 'black' }}>
        <InitialLayout />
      </SafeAreaView>
    </ClerkAndConvexProvider>
  );
}