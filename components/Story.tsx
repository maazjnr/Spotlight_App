// import { styles } from '@/styles/feed.styles';
// import { Image } from 'expo-image';
// import React from 'react';
// import { TouchableOpacity, View } from 'react-native';

// type Story = {
//     id: string;
//     username: string;
//     avatar: string;
//     hasStory: boolean
// }
// export default function Story ({story}: {story: Story})  {
//   return (
//     <TouchableOpacity style={styles.storyWrapper}>
//         <View style={[styles.storyRing, !story.hasStory && styles.noStory]}>
//             <Image source={{uri: story.avatar}} style={styles.storyAvatar} />
//         </View>
//     </TouchableOpacity>
//   )
// }

import { styles } from '@/styles/feed.styles';
import React, { useRef } from 'react';
import { Animated, TouchableOpacity } from 'react-native';

type Story = {
    id: string;
    username: string;
    avatar: string;
    hasStory: boolean;
}

export default function Story({ story }: { story: Story }) {
    const scaleAnim = useRef(new Animated.Value(1)).current;
    const opacityAnim = useRef(new Animated.Value(1)).current;
    const pulseAnim = useRef(new Animated.Value(1)).current;

    // Slightly less bold tap animation
    const handlePressIn = () => {
        Animated.parallel([
            Animated.spring(scaleAnim, {
                toValue: 0.9,
                friction: 4,
                tension: 50,
                useNativeDriver: true,
            }),
            Animated.timing(opacityAnim, {
                toValue: 0.7,
                duration: 150,
                useNativeDriver: true,
            }),
        ]).start();
    };

    const handlePressOut = () => {
        Animated.parallel([
            Animated.spring(scaleAnim, {
                toValue: 1,
                friction: 4,
                tension: 50,
                useNativeDriver: true,
            }),
            Animated.timing(opacityAnim, {
                toValue: 1,
                duration: 150,
                useNativeDriver: true,
            }),
        ]).start();
    };

    // Slightly less bold pulsing animation for stories with hasStory: true
    React.useEffect(() => {
        if (story.hasStory) {
            Animated.loop(
                Animated.sequence([
                    Animated.timing(pulseAnim, {
                        toValue: 1.1,
                        duration: 600,
                        useNativeDriver: true,
                    }),
                    Animated.timing(pulseAnim, {
                        toValue: 0.975,
                        duration: 600,
                        useNativeDriver: true,
                    }),
                ])
            ).start();
        }
    }, [story.hasStory]);

    return (
        <TouchableOpacity
            style={styles.storyWrapper}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            activeOpacity={1}
        >
            <Animated.View
                style={[
                    styles.storyRing,
                    !story.hasStory && styles.noStory,
                    {
                        transform: [{ scale: story.hasStory ? pulseAnim : 1 }],
                        opacity: opacityAnim,
                    },
                ]}
            >
                <Animated.Image
                    source={{ uri: story.avatar }}
                    style={[styles.storyAvatar, { transform: [{ scale: scaleAnim }] }]}
                />
            </Animated.View>
        </TouchableOpacity>
    );
}