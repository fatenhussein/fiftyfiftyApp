import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { SafeAreaView } from 'react-native';
import Navigation from './src/navigation';

export default function App() {
  return (
    <SafeAreaView style={styles.root}>
 <Navigation/>
      <StatusBar />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#F8F9FF',
    // alignItems: 'center',
    // paddingTop:20,
  },
});
