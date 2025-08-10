import { Link } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';

export default function Profile() {
  return (
    <View>
      <Text>profile</Text>
      <Link href='/notifications'> Notification screens</Link>
    </View>
  )
}