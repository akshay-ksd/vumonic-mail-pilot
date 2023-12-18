import { View, Text, Alert, ActivityIndicator } from 'react-native'
import React, { FC, useState } from 'react'
import WebView from 'react-native-webview'
import styles from './style'
import Header from '../../molecules/header/header'
const LoginPopUp: FC<any> = (props) => {

  const [url, setUrl] = useState("https://myaccount.google.com/signinoptions/two-step-verification");
  const [generate, setGenerate] = useState(false)
  const [loading, setLoading] = useState(false);

  const handleNavigationStateChange = (newNavState: any) => {
    const redirectedUrl = newNavState.url;
    console.log("redirectedUrl",redirectedUrl)
    if (redirectedUrl.includes('https://mail.google.com/mail/mu/mp')) {
      console.log("yess")
      // The user has successfully logged in
      // console.log('User logged in successfully!');
      setGenerate(false);
    }
  };

  const handleNavigationStateChange1 = (newNavState: any) => {
    const redirectedUrl = newNavState.url;
    console.log("redirectedUrl",redirectedUrl)
    // const redirectedUrl = newNavState.url;
    // if (redirectedUrl.includes('https://mail.google.com/mail/mu/mp')) {  
    //   setGenerate(true)
    // }
    props.openModel()
  }

  const _onMessage = (event: any) => {
    const res = JSON.parse(event.nativeEvent.data);
    if(res?.message){
      props.generatedPassword(res?.message)
    }else{
      setGenerate(true)
    }
  };

  const _onMessage1 = (event: any) => {
    const res = JSON.parse(event.nativeEvent.data);
    if(res?.message){
      setGenerate(false)
    }else{
      // setGenerate(true)
    }
  };

  const jsCode =`
  const targetDiv = document.querySelector('.Oc4Wwb');
  if (targetDiv) {
    window.ReactNativeWebView.postMessage(JSON.stringify({ type: "click", message: false }));
  }else{
    document.querySelector('.AeBiU-LgbsSe').removeAttribute('disabled');
    document.getElementById('i5').value = 'YourValueHere';

    setTimeout(() => {
      document.querySelector('.AeBiU-LgbsSe').click();
      setTimeout(() => {
        const divElement = document.querySelector('div[dir="ltr"]');

        // Get the text content of each span element
        const spanValues = Array.from(divElement.querySelectorAll('span')).map(span => span.textContent);

        // Send a message to ReactNativeWebView with the span values
        window.ReactNativeWebView.postMessage(JSON.stringify({ type: "click", message: spanValues.join("") }));
      }, 100);
    }, 100);
    true;
  }
`;

const jsCode1 = `
  // Check if the element with class "H3APie" is present in the elements
  const verificationElement = document.querySelector('.H3APie');

  if (verificationElement) {
    // If the element is present, log a message or perform any other action
    window.ReactNativeWebView.postMessage(JSON.stringify({ type: "click", message: true }));
  } else {
    // If the element is not present, log a different message or handle it accordingly
    console.log("2-Step Verification information not found.");
  }
  true;
`;


  return (
    <View style={styles.container}>
      <Header />
      {
        generate ?
          <View style={{ flex: 1 }}>
            <WebView source={{ uri: url }}
              style={{ flex: 1 }}
              onNavigationStateChange={handleNavigationStateChange}
              originWhitelist={['*']}
              javaScriptEnabledAndroid={true}
              injectedJavaScript={jsCode1}
              onMessage={_onMessage1} 
               />
            {
              loading && (
                <View style={{ width: "100%", height: "100%", backgroundColor: "blue", position: "absolute", bottom: 0, alignItems: "center", justifyContent: "center" }}>
                  <ActivityIndicator color={"white"} size={30} />
                  <Text style={{ fontSize: 20, fontWeight: "700", color: "white" }}>Please Wait</Text>
                </View>
              )
            }

          </View>
          :
          <View style={{ flex: 1 }}>
            <WebView source={{ uri: "https://myaccount.google.com/apppasswords" }}
              style={{ height: 1 }}
              onNavigationStateChange={handleNavigationStateChange1}
              originWhitelist={['*']}
              javaScriptEnabledAndroid={true}
              injectedJavaScript={jsCode}
              onMessage={_onMessage} />
            {/* <View style={{ width: "100%", height: "100%", backgroundColor: "blue", position: "absolute", bottom: 0, alignItems: "center", justifyContent: "center" }}>
              <ActivityIndicator color={"white"} size={30} />
              <Text style={{ fontSize: 20, fontWeight: "700", color: "white" }}>Authenticating</Text>
            </View> */}
          </View>

      }
    </View>
  )
}

export default LoginPopUp

// https://accounts.google.com/v3/signin/challenge/pwd?TL=AHNYTISE5Dt2KikDqDQxwElnj53k6LeRl-IMBtAAUOqB60j1BjXieSfwPwp0wkWR&btmpl=mobile&checkConnection=youtube%3A835%3A0&checkedDomains=youtube&cid=2&continue=https%3A%2F%2Fmail.google.com%2Fmail%2F%3Fview&dsh=S436220677%3A1700722079958659&emr=1&flowEntry=ServiceLogin&flowName=GlifWebSignIn&ifkv=ASKXGp183ExmiZNpigtN--PNu5N3Vm77-JriHwXbx11SQrxkBSEeVPbevwuqo9ClDr7Zy9a1W5w5Ig&ltmpl=ecobx&osid=1&pstMsg=1&scc=1&service=mail&theme=glif
