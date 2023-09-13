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
  const [confirmPassword, setconfirmPassword] = '';



 
  const [user, setUser] = useState({
    name:'',
    email: '',
    password: '',
    confirmPassword:''
    

  });

  const handleInput = (name, value) => {
    setUser({ ...user, [name]: value });
  };



  const navigation = useNavigation();


 


  const onSignUpPressed = () => {

    fetch('http://192.168.8.135:2000/api/v1/customers/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((errorInfo) => Promise.reject(errorInfo));
        }
        return response.json();
      })
      .then((result) => {
        console.warn(result);
        if (result.state === 'success') {
          console.warn('You are logged in.');
          navigation.navigate('Home');
        } else {
          alert('Please check your login information.');
        }
      })
      .catch((error) => {
        console.warn('Fetch error:', error.message);
      });
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
          name="name"
          setValue={(value) => handleInput('name', value)}

        />
        <CustomInput placeholder="Email" 
        value={email}  
        name="email"   
          setValue={(value) => handleInput('email', value)}/>
        <CustomInput
          placeholder="password"
          value={passwoed}
          name="password"    
           setValue={(value) => handleInput('password', value)}
          secureTextEntry
        />
        <CustomInput
          placeholder="Confirm  Password"
          value={confirmPassword}
        
          secureTextEntry

          name="confirmPassword"    
          setValue={(value) => handleInput('confirmPassword', value)}
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
