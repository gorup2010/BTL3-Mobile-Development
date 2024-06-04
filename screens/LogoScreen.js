// LoadingScreen.js
import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const LogoScreen = () => {
  return (
    <View style={styles.container}>
      {/* Replace 'logo.png' with the path to your app's logo */}
      <Image
        source={require('../assets/Logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', // Change to your preferred background color
  },
  logo: {
    width: 200, // Adjust width and height as needed
    height: 200,
  },
});

export default LogoScreen;
