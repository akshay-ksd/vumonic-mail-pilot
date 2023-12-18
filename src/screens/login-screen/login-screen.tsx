import { View, Text, TouchableOpacity, TextInput } from 'react-native'
import React, { useState } from 'react'
import styles from './style'
import LoginPopUp from './template/gmail-login-pop-up/LoginPopUp'
import Home from '../home/home'
const LoginScreen = () => {
  const [showPass, setShowPass] = useState(false);
  const [loginPop, setPop] = useState(false);
  const [home, setHome] = useState(false);
  const [password, setPassword] = useState("")
  const [email,setEmail] = useState("")

  const login = () => {
    setPop(!loginPop)
  }

  const openModel = () => {
    setShowPass(true)
  }

  const loginPage = () => {
    setPop(false)
    setHome(true)
  }

  const generatedPassword = (p: any) => {
    setPop(false)
    setShowPass(true)
    setPassword(p)
  }

  return (
    <>
      {
        home ?
          <Home />
          :
          <View style={styles.container}>
            <View style={{ width: "70%", height: 50, backgroundColor: "#fff", borderRadius: 10, paddingHorizontal: "2%" }}>
              <TextInput placeholder='Enter Gmail' placeholderTextColor={"gray"} style={{ fontWeight: "600", color: "gray" }} onChangeText={(e)=>setEmail(e)}/>
            </View>
            {
              showPass && (
                <View style={{ width: "70%", height: 50, backgroundColor: "#fff", borderRadius: 10, paddingHorizontal: "2%", marginTop: 10 }}>
                  <TextInput placeholder='Enter App Password' placeholderTextColor={"gray"} style={{ fontWeight: "600", color: "gray" }} value={password} />
                </View>)}
            <TouchableOpacity style={styles.button} onPress={login}>
              <Text style={styles.text}>Login</Text>
            </TouchableOpacity>

            {
              loginPop && (
                <LoginPopUp openModel={openModel} generatedPassword={generatedPassword} email={email}/>
              )
            }
            {/* {
              showPass && (
                <View style={{ width: "100%", height: 100, position: "absolute", bottom: 0, zIndex: 20000, backgroundColor: "blue", elevation: 5, alignItems: "center", justifyContent: "space-evenly", flexDirection: "row" }}>
                  <View style={{ width: "70%", height: 50, backgroundColor: "#fff", borderRadius: 10, paddingHorizontal: "2%", marginTop: "5%" }}>
                    <TextInput placeholder='Enter App Password' placeholderTextColor={"gray"} style={{ fontWeight: "600", color: "gray" }} value={password}/>
                  </View>
                  <TouchableOpacity style={{ width: 100, height: 50, borderRadius: 10, backgroundColor: "white", alignItems: "center", justifyContent: "center", marginTop: "5%" }} onPress={loginPage}>
                    <Text style={{ fontSize: 18, fontWeight: "700", color: "black" }}>Next</Text>
                  </TouchableOpacity>
                </View>
              )
            } */}
          </View>
      }
    </>

  )
}

export default LoginScreen