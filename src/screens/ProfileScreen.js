import React from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
function ProfileScreen() {
  const navigation = useNavigation();
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
  // ... Rest of your profile component

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 29 }}
      >
        <View
          style={{ marginTop: 16, paddingHorizontal: 24, alignItems: 'center' }}
        >
          <View style={{ width: 128, height: 128, borderRadius: 60 }}>
            <Image
              style={{ width: '100%', height: '100%', borderRadius: 60 }}
              source={require('../assets/images/profileImg.png')}
            />
          </View>
          <View style={{ marginTop: 10, alignItems: 'center' }}>
            <Text style={{ fontSize: 24, textAlign: 'center' }}>{userData.name}</Text>
            <Text style={{ fontSize: 18, color: 'gray' }}>
              {userData.email}
            </Text>
          </View>
        </View>
        <View style={{ marginTop: 32 }}>
          <RenderInput title="Name" value={userData.name} />
          <RenderInput title="Email" value=  {userData.email} />
          <RenderInput title="Address" value="Amman" />
        </View>
        <TouchableOpacity
          style={{
            paddingVertical: 15,
            width: 320,
            alignSelf: 'center',
            backgroundColor: '#FF5A46',
            borderRadius: 5,
            marginTop: 0,
            fontSize: 10,
          }}
          onPress={() => navigation.navigate('SignIn')}
        >
          <Text
            style={{
              fontSize: 15,
              fontWeight: 'bold',
              textAlign: 'center',
              color: 'white',
            }}
          >
            Log out
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const RenderInput = ({ title, value }) => (
  <View style={{ marginBottom: 24, paddingHorizontal: 20 }}>
    <Text
      style={{
        color: '#142650',
        marginLeft: 10,
        marginBottom: 8,
        fontSize: 12,
        fontWeight: '600',
      }}
    >
      {title}
    </Text>
    <TextInput
      style={{
        padding: 16,
        backgroundColor: '#f7f7f7',
        color: 'gray',
        borderRadius: 15,
        marginBottom: 8,
      }}
      value={value}
      editable={false}
    />
  </View>
);

export default ProfileScreen;
