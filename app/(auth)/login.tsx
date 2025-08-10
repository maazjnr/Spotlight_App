import { COLORS } from "@/constants/theme";
import { styles } from "@/styles/auth.styles";
import { useSSO } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

export default function Login() {

  const { startSSOFlow } = useSSO();
  const router = useRouter(); 

  const handleGoogleSignIn = async () => {
    try {
    const  {setActive, createdSessionId} = await startSSOFlow({ 
        strategy: "oauth_google",
      })

      if(setActive && createdSessionId){
        setActive({session: createdSessionId});
        router.replace("/(tabs)")
      }

    } catch (error) {
      console.log("Error during Google Sign-In:", error);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.brandSection}>
        <View style={styles.logoContainer}>
          <Ionicons name="leaf" size={32} color={COLORS.primary} />
        </View>
        <Text style={styles.appName}>Spotlight</Text>
        <Text style={styles.tagline}>Don&apos;t miss anything</Text>
      </View>

      <View style={styles.illustrationContainer}>
        <Image
          style={styles.illustration}
          resizeMode="cover"
          source={require("../../assets/images/auth-bg-2.png")}
        />
      </View>

      <View>
        <View style={styles.loginSection}>
          <TouchableOpacity
            style={styles.googleButton}
            onPress={() => handleGoogleSignIn()}
            activeOpacity={0.9}
          >
            <View style={styles.googleIconContainer}>
              <Ionicons name="logo-google" size={20} color={COLORS.surface} />
            </View>
            <Text style={styles.googleButtonText}>Continue with google</Text>
          </TouchableOpacity>

          <Text style={styles.termsText}>
            By Continuing you agree to our Terms snd Conditions and Privacy
          </Text>
        </View>
      </View>
    </View>
  );
}