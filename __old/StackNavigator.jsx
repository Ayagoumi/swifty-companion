import { View, Text } from 'react-native'
import React from 'react'
import { StyleSheet, TextInput, SafeAreaView } from 'react-native'
import { createNativeStackNavigator } from 'react-native-screens/native-stack'

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Details" component={Details} />
    </Stack.Navigator>
  )
}