import React from "react";
import { Image } from "react-native"; // <-- Import Image
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeTabContent from "../screens/HomeTabContent";
import ProfileScreen from "../screens/ProfileScreen";

const homeIcon = require("../assets/images/Home.png");
const offersIcon  = require("../assets/images/offers.png");
const profileIcon  = require("../assets/images/profile.png");




const Tab = createBottomTabNavigator();

// Make sure to define COLORS or import it if it's defined elsewhere.
const COLORS = {
  primary: "#FF5A46", // orange
    secondary: "#CDCDD2",   // gray

};

const BottomTab = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeTabContent} // <-- Use HomeTabContent as the component
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={homeIcon}
              resizeMode="contain"
              style={{
                width: 25,
                height: 25,
                tintColor: focused ? COLORS.primary : COLORS.secondary,
              }}
            />
          ),
          
            tabBarLabel: () => null,  // <-- This hides the label
            headerShown: false,
          
        }}
      />

<Tab.Screen
        name="offers"
        component={ProfileScreen} // <-- Use HomeTabContent as the component
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={offersIcon}
              resizeMode="contain"
              style={{
                width: 25,
                height: 25,
                tintColor: focused ? COLORS.primary : COLORS.secondary,
              }}
            />
          ),
          
            tabBarLabel: () => null,  // <-- This hides the label
            headerShown: false,
          
        }}
      />

<Tab.Screen
        name="profile"
        component={ProfileScreen} // <-- Use HomeTabContent as the component
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={profileIcon}
              resizeMode="contain"
              style={{
                width: 30,
                height: 30,
                tintColor: focused ? COLORS.primary : COLORS.secondary,
              }}
            />
          ),
          
            tabBarLabel: () => null,  // <-- This hides the label
            headerShown: false,
          
        }}
      />


    </Tab.Navigator>
  );
}

export default BottomTab;
