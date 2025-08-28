import { COLORS } from "@/constants/theme";
import { styles } from "@/styles/feed.styles";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { Link } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const Post = ({ post }: { post: any }) => {
  console.log("Username", post.author.username);

  return (
    <View style={styles.post}>
      <View style={styles.postHeader}>
        <Link href="/(tabs)/profile">
          <TouchableOpacity style={styles.postActionsLeft}>
            <Image
              source={post.author.image}
              style={styles.postAvatar}
              transition={200}
              contentFit="cover"
            />
            <Text style={styles.postUsername}>{post.author.username}</Text>
          </TouchableOpacity>
        </Link>

        <TouchableOpacity>
          <Ionicons name="ellipsis-horizontal" size={20} color={COLORS.white} />
        </TouchableOpacity>

        {/* <TouchableOpacity>
          <Ionicons name="trash-outline" size={20} color={COLORS.white} />
        </TouchableOpacity> */}
      </View>

      <Image
        source={post.imageUrl}
        style={styles.postImage}
        transition={200}
        contentFit="cover"
      />

      <View style={styles.postActions}>
        <View style={styles.postActionsLeft}>
          <TouchableOpacity>
            <Ionicons name="heart-outline" color={COLORS.white} size={22} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons
              name="chatbubble-outline"
              color={COLORS.white}
              size={20}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity>
          <Ionicons name="bookmark-outline" color={COLORS.white} size={20} />
        </TouchableOpacity>
      </View>

      <View style={styles.postInfo}>
        <Text style={styles.likesText}>be the first to like</Text>
        {post.caption && (
          <View style={styles.captionContainer}>
            <Text style={styles.captionUsername}>{post.author.username}</Text>
            <Text style={styles.captionText}>{post.caption}</Text>
          </View>
        )}

        <TouchableOpacity>
            <Text style={styles.commentText}>View all 2 comments</Text>
        </TouchableOpacity>
            <Text style={styles.timeAgo}>2 hour ago</Text>
      </View>
    </View>
  );
};

export default Post;