import { View, Text } from 'react-native'
import React from 'react'
import styles from './style'

const Header = () => {
  return (
    <View style={styles.container}>
      <Text style={{fontSize:20}}>Login Securely</Text>
    </View>
  )
}

export default Header