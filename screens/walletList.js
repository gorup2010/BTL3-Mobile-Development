// screens/walletList.js
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

// import components
import InfoBox from '../components/infoBox';

const walletList = () => {
  return (
    <View style={styles.container}>
      <InfoBox balance="12" income="23" spending="50" target="12"/>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default walletList;