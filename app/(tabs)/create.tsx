// import { COLORS } from "@/constants/theme";
// import { styles } from "@/styles/create.styles";
// import { useUser } from "@clerk/clerk-expo";
// import { Ionicons } from "@expo/vector-icons";
// import * as FileSystem from 'expo-file-system';
// import * as ImagePicker from "expo-image-picker";
// import { useRouter } from "expo-router";
// import React, { useState } from "react";
// import {
//   ActivityIndicator,
//   KeyboardAvoidingView,
//   Platform,
//   ScrollView,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from "react-native";

// import { api } from "@/convex/_generated/api";
// import { useMutation } from "convex/react";
// import { Image } from "expo-image";

// export default function CreateScreen() {

//   const router = useRouter();
//   const { user } = useUser();

//   const [caption, setCaption] = useState("");
//   const [selectedImage, setSelectedImage] = useState<string | null>(null);
//   const [isSharing, setIsSharing] = useState(false);

//   const pickImage = async () => {
//     const result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: "images",
//       allowsEditing: true,
//       aspect: [1, 1],
//       quality: 0.8,
//     });
//     if (!result.canceled) setSelectedImage(result.assets[0].uri);
//   };

//   const generateUploadUrl = useMutation(api.posts.generateUploadUrl);
// const createPost = useMutation(api.posts.createPost);

// const handleShare =  async () => {

//   if(!selectedImage) return;

//   try {

//     setIsSharing(true);
//     const uploadUrl = await generateUploadUrl();

//     const uploadResult = await FileSystem.uploadAsync(uploadUrl, selectedImage, {
//       httpMethod: "POST",
//       uploadType: FileSystem.FileSystemUploadType.BINARY_CONTENT,
//       mimeType: "image/jpeg",
//     });

//     if((await uploadResult).status !== 200) throw new Error("Failed to upload image");
//     const { storageId } = JSON.parse((uploadResult).body)

//     await createPost({storageId, caption});

//     router.push("/(tabs)")
//   } catch (error) {
//     console.log("Error sharing post:", error);
//   } finally{
//     setIsSharing(false)
//   }
// }

//   if (!selectedImage) {
//     return (
//       <View style={styles.container}>
//         <View style={styles.header}>
//           <TouchableOpacity onPress={() => router.back}>
//             <Ionicons name="arrow-back" size={28} color={COLORS.primary} />
//           </TouchableOpacity>
//           <Text style={styles.headerTitle}>Create a new post</Text>
//           <View style={{ width: 28 }} />
//         </View>

//         <TouchableOpacity
//           style={styles.emptyImageContainer}
//           onPress={pickImage}
//         >
//           <Ionicons name="image-outline" size={50} color={COLORS.grey} />
//           <Text style={styles.emptyImageText}>Select an Image</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   }

//   console.log("Selected Image", selectedImage);

//   return (
//     <KeyboardAvoidingView
//       behavior={Platform.OS === "ios" ? "padding" : "height"}
//       keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
//       style={styles.container}
//     >
//       <View style={styles.contentContainer}>
//       <View style={styles.header}>
//         <TouchableOpacity
//           onPress={() => {
//             setSelectedImage(null);
//             setCaption("");
//           }}
//         >
//           <Ionicons
//             name="close-outline"
//             size={28}
//             color={isSharing ? COLORS.grey : COLORS.white}
//           />
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>New Post</Text>
//         <TouchableOpacity onPress={handleShare}
//         style={[styles.shareButton, isSharing && styles.shareButtonDisabled]}
//         disabled={isSharing || !selectedImage}
//       >
//         {isSharing ? (
//           <ActivityIndicator size="small" color={COLORS.primary} />
//         ) : (
//           <Text style={styles.shareText}>Share</Text>
//         )}
//       </TouchableOpacity>
//       </View>

//       <ScrollView contentContainerStyle={styles.scrollContent}
//       contentOffset={{x: 0, y: 20}}
//       bounces={false}
//       keyboardShouldPersistTaps="handled"
//       >

//         <View style={[styles.content, isSharing && styles.contentDisabled]}>

//           <View style={styles.imageSection}>
//             <Image source={selectedImage} transition={200} contentFit="cover" style={styles.previewImage} />
//           </View>

//           <View style={styles.inputSection}>  
//             <View style={styles.captionContainer}>
//               <Image source={user?.imageUrl} 
//               style={styles.userAvatar} contentFit="cover" transition={200} />
//               <TextInput style={styles.captionInput}
//               placeholder="Enter your post caption"
//               placeholderTextColor={COLORS.grey}
//               multiline
//               value={caption}
//               onChangeText={setCaption}
//               editable={!isSharing}
//                />
//             </View>
//           </View>
//         </View>

//       </ScrollView>
//       </View>
//     </KeyboardAvoidingView>
//   );
// }

import { COLORS } from "@/constants/theme";
import { styles } from "@/styles/create.styles";
import { useUser } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Easing,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import { Image } from "expo-image";

export default function CreateScreen() {
  const router = useRouter();
  const { user } = useUser();

  const [caption, setCaption] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isSharing, setIsSharing] = useState(false);

  // Animation setup for sharing overlay
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const spinAnim = useRef(new Animated.Value(0)).current;

  // Animation setup for selected image
  const imageScaleAnim = useRef(new Animated.Value(0.8)).current;
  const imageOpacityAnim = useRef(new Animated.Value(0)).current;

  // Start sharing animation
  useEffect(() => {
    if (isSharing) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.loop(
          Animated.timing(spinAnim, {
            toValue: 1,
            duration: 1000,
            easing: Easing.linear,
            useNativeDriver: true,
          })
        ),
      ]).start();
    } else {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        easing: Easing.in(Easing.ease),
        useNativeDriver: true,
      }).start();
    }
  }, [isSharing]);

  // Start image selection animation
  useEffect(() => {
    if (selectedImage) {
      Animated.parallel([
        Animated.spring(imageScaleAnim, {
          toValue: 1,
          friction: 8,
          tension: 40,
          useNativeDriver: true,
        }),
        Animated.timing(imageOpacityAnim, {
          toValue: 1,
          duration: 2000,
          easing: Easing.in(Easing.bounce),
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [selectedImage]);

  const spin = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "images",
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });
    if (!result.canceled) {
      // Reset animations before setting new image
      imageScaleAnim.setValue(0.8);
      imageOpacityAnim.setValue(0);
      setSelectedImage(result.assets[0].uri);
    }
  };

  const generateUploadUrl = useMutation(api.posts.generateUploadUrl);
  const createPost = useMutation(api.posts.createPost);

  const handleShare = async () => {
    if (!selectedImage) return;

    try {
      setIsSharing(true);
      const uploadUrl = await generateUploadUrl();

      const uploadResult = await FileSystem.uploadAsync(uploadUrl, selectedImage, {
        httpMethod: "POST",
        uploadType: FileSystem.FileSystemUploadType.BINARY_CONTENT,
        mimeType: "image/jpeg",
      });

      if ((await uploadResult).status !== 200) throw new Error("Failed to upload image");
      const { storageId } = JSON.parse((uploadResult).body);

      await createPost({ storageId, caption });

      router.push("/(tabs)");
    } catch (error) {
      console.log("Error sharing post:", error);
    } finally {
      setIsSharing(false);
    }
  };

  if (!selectedImage) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={28} color={COLORS.primary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Create a new post</Text>
          <View style={{ width: 28 }} />
        </View>

        <TouchableOpacity style={styles.emptyImageContainer} onPress={pickImage}>
          <Ionicons name="image-outline" size={50} color={COLORS.grey} />
          <Text style={styles.emptyImageText}>Select an Image</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
      style={styles.container}
    >
      <View style={styles.contentContainer}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => {
              setSelectedImage(null);
              setCaption("");
            }}
          >
            <Ionicons
              name="close-outline"
              size={28}
              color={isSharing ? COLORS.grey : COLORS.white}
            />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>New Post</Text>
          <TouchableOpacity
            onPress={handleShare}
            style={[styles.shareButton, isSharing && styles.shareButtonDisabled]}
            disabled={isSharing || !selectedImage}
          >
            {isSharing ? (
              <Ionicons name="sync-outline" size={24} color={COLORS.primary} />
            ) : (
              <Text style={styles.shareText}>Done</Text>
            )}
          </TouchableOpacity>
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          contentOffset={{ x: 0, y: 20 }}
          bounces={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={[styles.content, isSharing && styles.contentDisabled]}>
            <View style={styles.imageSection}>
              <Animated.View
                style={{
                  transform: [{ scale: imageScaleAnim }],
                  opacity: imageOpacityAnim,
                  width: "100%",
                  height: "100%",
                }}
              >
                <Image
                  source={selectedImage}
                  contentFit="cover"
                  style={styles.previewImage}
                />
              </Animated.View>
            </View>

            <View style={styles.inputSection}>
              <View style={styles.captionContainer}>
                <Image
                  source={user?.imageUrl}
                  style={styles.userAvatar}
                  contentFit="cover"
                  transition={200}
                />
                <TextInput
                  style={styles.captionInput}
                  placeholder="Enter your post caption"
                  placeholderTextColor={COLORS.grey}
                  multiline
                  value={caption}
                  onChangeText={setCaption}
                  editable={!isSharing}
                />
              </View>
            </View>
          </View>
        </ScrollView>

        {isSharing && (
          <Animated.View
            style={[
              styles.loadingOverlay,
              {
                opacity: fadeAnim,
              },
            ]}
          >
            <Animated.View
              style={{
                transform: [{ rotate: spin }],
              }}
            >
              <Ionicons name="sync-outline" size={60} color={COLORS.white} />
            </Animated.View>
            <Text style={styles.loadingText}>Sharing...</Text>
          </Animated.View>
        )}
      </View>
    </KeyboardAvoidingView>
  );
}