import {
  View,
  Image,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
  Text,
} from 'react-native';
import LoginIcon from '../assets/images/login.png';
import React, { useState } from 'react';

import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';

import SocialSignInButtons from '../components/SocialSignInButtons';
import { useNavigation } from '@react-navigation/native';



const SignUpScreen = () => {
  const [username, setUserName] = '';
  const [email, setEmail] = '';
  const [passwoed, setPassword] = '';
  const [confirmPasswoed, setconfirmPasswoed] = '';


  const navigation = useNavigation();

  const onSignUpPressed = () => {

    navigation.navigate("Home")
    console.warn('hiii');
  };
  
  
  const onTermsOfUsePressed = ()=>{
      console.warn('hiii');  
  }
  
  const onPrivacyPolicyPressed =()=>{
      console.warn('hiii');    
  }
  
  
  const onSignInPressed =()=>{

    navigation.navigate("")
  
  }



  return (
    <ScrollView>
      <View style={Styles.root}>
        <Text style={Styles.title}>Create an account </Text>
        <CustomInput
          placeholder="UserName"
          value={username}
          setValue={setUserName}
        />
        <CustomInput placeholder="Email" value={email} setValue={setEmail} />
        <CustomInput
          placeholder="password"
          value={passwoed}
          setValue={setPassword}
          secureTextEntry
        />
        <CustomInput
          placeholder="Confirm  Password"
          value={confirmPasswoed}
          setValue={setconfirmPasswoed}
          secureTextEntry
        />
        <CustomButton label="Sign Up" onPress={onSignUpPressed} />
        <Text style={Styles.text}>
          By register confirm that you accept our{' '}
          <Text style={Styles.link} onPress={onTermsOfUsePressed}>Terms of Use </Text>and{' '}
          <Text style={Styles.link} onPress={onPrivacyPolicyPressed}>Privacy Policy</Text>{' '}
        </Text>
    <SocialSignInButtons/>
    <CustomButton
          label="Do you have an account ?"
          onPress={onSignInPressed}
          type="tertiary"
        />
      </View>
    </ScrollView>
  );
};

const Styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    padding: 20,
    paddingTop: 45,
  },
  logo: {
    maxHeight: 100,
    width: '70%',
    maxWidth: 300,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 25,
    marginBottom: 20,
    fontWeight: 'bold',
    color:"#051C60"
  },
  link: {
    color:"#FDB075"
  },
  text:{
  color:"gray",
  marginVertical:10  }
});

export default SignUpScreen;
