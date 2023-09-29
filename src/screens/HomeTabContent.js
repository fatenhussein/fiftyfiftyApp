import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
const offersImg = require('../assets/images/offersHome.png');
const homeIconsData = [
  { icon: require('../assets/images/fuel.png'), label: 'Fuel' },
  { icon: require('../assets/images/car-wash.png'), label: 'Car Wash' },
  { icon: require('../assets/images/battery.png'), label: 'Battery' },
  { icon: require('../assets/images/tire-pressure.png'), label: 'Tyers' },
  { icon: require('../assets/images/oil-bottle.png'), label: 'Engine oil' },
  { icon: require('../assets/images/no-fuel.png'), label: 'Emergency\noil' },
  // ... other icons and labels
];

const HomeTabContent = () => {
  const COLORS = {
    primary: '#FF5A46', // orange
    secondary: '#CDCDD2',
    white: '#fff', // gray
  };

  const [userData, setUserData] = useState([]);


  useEffect(() => {
    // Fetch user data from local storage
    AsyncStorage.getItem('userData')
      .then((data) => {
        const storedData = JSON.parse(data);
        if (storedData && storedData.id) {
          // If the ID exists, fetch user data from the API
          return fetchUserFromAPI(storedData.id);
        }
      })
      .catch((error) => {
        console.warn('Failed to fetch user data from local storage:', error);
      });
  }, []);

  const fetchUserFromAPI = (userId) => {
    // Define your API endpoint and replace with the below URL
    const apiUrl = `http://192.168.8.135:2000/api/v1/customers/${userId}`;

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        // Save the user's information to state
        setUserData(data.customer);
        // console.warn(data.customer);
      })
      .catch(error => {
        console.warn('Error fetching user from API:', error);
      });
  };
  const renderIconImages = () => {
    return homeIconsData.map((data, index) => (
      <TouchableOpacity key={index} style={styles.iconButton}>
        <View
          style={{
            width: 80,
            height: 80,
            borderRadius: 20,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: COLORS.white,

            // iOS shadow properties
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 3,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,

            // Android shadow
            elevation: 5,
          }}
        >
          <Image source={data.icon} style={styles.iconImage} />
        </View>
        <Text
          style={{
            textAlign: 'center',
            marginTop: 10,
            fontSize: 13,
            fontWeight: '600',
            color: 'rgba(0, 0, 0, 0.7)',
          }}
       
        >
          {data.label} {/* This is dynamic now */}
        </Text>
      </TouchableOpacity>
    ));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hi, {userData.name}</Text>
          <Text style={styles.subGreeting}> Fuel delivered to your door. Order now!</Text>
        </View>
        <Image source={offersImg} style={styles.offersImage} />
      </View>

      {/* <Image
        source={require("../assets/images/fuel.png")}
        style={styles.centerImage}
      /> */}

      <View style={styles.servicesContainer}>
        <View style={styles.iconsContainer}>{renderIconImages()}</View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    gap: 20,
  },
  greeting: {
    fontSize: 32,
  },
  subGreeting: {
    color: 'gray',
    fontSize: 18,
    marginTop: 8,
  },
  offersImage: {
    // Additional styles for the offers image, if needed
  },
  centerImage: {
    alignSelf: 'center',
    width: 240,
    height: 120,
    borderRadius: 15,
    marginTop: 20,
  },
  subjectsContainer: {
    padding: 10,
  },
  subjectsText: {
    fontSize: 28,
  },
  iconsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 20,
  },
  iconButton: {
    margin: 8,
  },
  iconImage: {
    width: 40, // Or any desired size
    height: 40,
  },
});

export default HomeTabContent;
