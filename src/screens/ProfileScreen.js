import { Text, View } from 'react-native'
import React, { Component } from 'react'
import BottomTab from '../navigation/TabNavigator';
export class ProfileScreen extends Component {
  render() {
    return (
        <View style={{ flex: 1 }}>
        <Text>HomeScreen Header or any other content you want above tabs</Text>
        
        {/* Render the BottomTab navigator */}
        {/* <BottomTab /> */}
        
        {/* Any other content you want below tabs can go here */}
      </View>
    )
  }
}

export default ProfileScreen