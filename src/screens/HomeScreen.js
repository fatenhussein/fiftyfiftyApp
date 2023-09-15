import React from 'react';
import { View, Text } from 'react-native';
import BottomTab from '../navigation/TabNavigator'; // Adjust the path to where your BottomTab navigator is located

const HomeScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      <Text>HomeScreen Header or any other content you want above tabs</Text>
      
      {/* Render the BottomTab navigator */}
      <BottomTab />
      
      {/* Any other content you want below tabs can go here */}
    </View>
  );
}

export default HomeScreen;


