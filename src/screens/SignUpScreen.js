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

import AsyncStorage from '@react-native-async-storage/async-storage';
import SocialSignInButtons from '../components/SocialSignInButtons';
import { useNavigation } from '@react-navigation/native';

const SignUpScreen = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleInput = (name, value) => {
    setUser({ ...user, [name]: value });
  };

  const navigation = useNavigation();

  const onSignUpPressed = () => {
    // Validation for the username
    if (user.name.trim() === '') {
      alert('Please enter a username.');
      return;
    }

    // Validation for the email using a basic regex pattern
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    if (!emailPattern.test(user.email)) {
      alert('Please enter a valid email.');
      return;
    }

    // Validation for the password length
    if (user.password.length < 6) {
      alert('Password should be at least 6 characters.');
      return;
    }

    // Confirm password validation
    if (user.password !== user.confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    // Your fetch call and further processing
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
          alert('You are registered.');
          navigation.navigate('SignIn');
        } else {
          alert('Please check your login information.');
        }
      })
      .catch((error) => {
        console.warn('Fetch error:', error.message);
      });
  };

  const onTermsOfUsePressed = () => {
    console.warn('hiii');
  };

  const onPrivacyPolicyPressed = () => {
    console.warn('hiii');
  };

  const onSignInPressed = () => {
    navigation.navigate('');
  };

  return (
    <ScrollView>
      <View style={Styles.root}>
        <Text style={Styles.title}>Create an account </Text>
        <CustomInput
          placeholder="UserName"
          value={user.name}
          name="name"
          setValue={(value) => handleInput('name', value)}
        />
        <CustomInput
          placeholder="Email"
          value={user.email}
          name="email"
          setValue={(value) => handleInput('email', value)}
        />
        <CustomInput
          placeholder="password"
          value={user.password}
          name="password"
          setValue={(value) => handleInput('password', value)}
          secureTextEntry
        />
        <CustomInput
          placeholder="Confirm  Password"
          value={user.confirmPassword}
          secureTextEntry
          name="confirmPassword"
          setValue={(value) => handleInput('confirmPassword', value)}
        />

        <CustomButton label="Sign Up" onPress={onSignUpPressed} />
        <Text style={Styles.text}>
          By register confirm that you accept our{' '}
          <Text style={Styles.link} onPress={onTermsOfUsePressed}>
            Terms of Use{' '}
          </Text>
          and{' '}
          <Text style={Styles.link} onPress={onPrivacyPolicyPressed}>
            Privacy Policy
          </Text>{' '}
        </Text>
        <SocialSignInButtons />
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
    color: '#051C60',
  },
  link: {
    color: '#FDB075',
  },
  text: {
    color: 'gray',
    marginVertical: 10,
  },
});

export default SignUpScreen;
