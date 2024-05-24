import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from '@rneui/themed';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';


export default function HomeScreen() {
  const deleteAsyncStorage = async () => {
    await AsyncStorage.clear();
    console.log("Successfully logged out");
  }

  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <Button onPress={deleteAsyncStorage}>Logout</Button>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
