import {
  View,
  Image,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
} from 'react-native';
import LoginIcon from '../assets/images/login.png';
import React, { useState } from 'react';

import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import SocialSignInButtons from '../components/SocialSignInButtons';
import { useNavigation } from '@react-navigation/native';

import AsyncStorage from '@react-native-async-storage/async-storage';

const SignInScreen = () => {
  const { height } = useWindowDimensions();
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const isValidEmail = (email) => {
    // A simple regex for email validation
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    return emailRegex.test(email);
  };

  const isValidPassword = (password) => {
    // Check if the password length is greater than or equal to 6
    return password.length >= 6;
  };

  const handleInput = (name, value) => {
    setUser({ ...user, [name]: value });
  };

  const onSignInPressed = () => {
    //console.warn(user);
    if (!isValidEmail(user.email)) {
      alert('Please enter a valid email.');
      return;
    }

    if (!isValidPassword(user.password)) {
      alert('Password should be at least 6 characters.');
      return;
    }
    fetch('http://192.168.8.135:2000/api/v1/customers/signIn', {
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
        // console.warn(result);
        AsyncStorage.setItem('userData', JSON.stringify(result));
        if (result.status === 'success') {
          //console.warn('You are logged in.');
          navigation.navigate('Home');
        } else {
          alert('Please check your login information.');
        }
      })
      .catch((error) => {
        console.log('Fetch error:', error);
        alert('Please check your login information.');
      });
  };

  const onForgotPasswordPressed = () => {
    console.warn('hiii');
  };

  const onSignUpPressed = () => {
    navigation.navigate('SignUp');
  };

  return (
    <ScrollView>
      <View style={Styles.root}>
        <Image
          source={LoginIcon}
          style={[Styles.LoginIcon, { height: height * 0.2 }]}
        />
        <CustomInput
          placeholder="UserName"
          name="email"
          value={user.email}
          setValue={(value) => handleInput('email', value)}
        />
        <CustomInput
          placeholder="password"
          name="password"
          value={user.password}
          setValue={(value) => handleInput('password', value)}
          secureTextEntry
        />

        <CustomButton label="Sign In" onPress={onSignInPressed} />

        <CustomButton
          label="Forgot Password ?"
          onPress={onForgotPasswordPressed}
          type="tertiary"
        />
        <SocialSignInButtons />

        <CustomButton
          label="Don't have an account ?"
          onPress={onSignUpPressed}
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
});

export default SignInScreen;
