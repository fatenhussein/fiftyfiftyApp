import { View, Text } from 'react-native'
import React from 'react'
import CustomButton from './CustomButton'


const onForgotPasswordPressed = () => {
    console.warn('hiii');
  };
  
  const onSignInFacebook = () => {
    console.warn('hiii');
  };
  
  const onSignInGoogle = () => {
    console.warn('hiii');
  };

  
const SocialSignInButtons = () => {
  return (
    <>
       <CustomButton
          label="Sign In with Facebook "
          onPress={onSignInFacebook}
          bgColor="#E7EAF4"
          fgColor="#4765A9"
        />
        <CustomButton
          label="Sign In with Google"
          onPress={onSignInGoogle}
          bgColor="#FAE9EA"
          fgColor="#DD4D44"
        />

     
    </>
  )
}

export default SocialSignInButtons;