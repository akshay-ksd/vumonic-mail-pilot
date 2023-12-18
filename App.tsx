import { View, Text, StatusBar } from 'react-native'
import React from 'react'
import LoginScreen from './src/screens/login-screen/login-screen'
const App = () => {
  return (
    <View style={{ flex: 1 }}>
      <StatusBar backgroundColor={"white"} />
      <LoginScreen />
    </View>
  )
}

export default App