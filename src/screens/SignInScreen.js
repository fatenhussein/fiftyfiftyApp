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
import axios from 'axios';

const SignInScreen = () => {
  const { height } = useWindowDimensions();
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const handleInput = (name, value) => {
    setUser({ ...user, [name]: value });
  };

  const onSignInPressed = () => {
    console.warn(user);

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
        console.warn(result);
        if (result.status === 'success') {
          console.warn('You are logged in.');
          navigation.navigate('Home');
        } else {
          alert('Please check your login information.');
        }
      })
      .catch((error) => {
        console.warn('Fetch error:', error);
      });
  };

  const onForgotPasswordPressed = () => {
    console.warn('hiii');
  };

  const onSignUpPressed = () => {
    navigation.navigate('SignUp');
    console.warn('hiii');
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
          label="Do you have an account ?"
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
