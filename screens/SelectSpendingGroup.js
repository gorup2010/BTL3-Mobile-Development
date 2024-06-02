// screens/Movies.js
import React, { useState } from 'react';
import { View, Text, Image, FlatList, StyleSheet,Dimensions, TouchableOpacity } from 'react-native';
import {expenseLst,transactionIconPaths} from '../components/transactionIcon';

export default function SelectSpendingGroup({ route, navigation }) {
  const [numColumns] = useState(3); // Số cột mặc định là 3
  const { onSelectItem } = route.params;
  const handleItemPress = (item) => {
      onSelectItem(item);
      navigation.goBack('CHỌN NHÓM CHI TIÊU');
    };
  return (
    <View style={styles.container}>
      <FlatList
        data={expenseLst}
        keyExtractor={(item) => item}
        numColumns={3}
        renderItem={({item }) => (
        <TouchableOpacity style={styles.item} onPress={() => handleItemPress(item)}>
          <View style={styles.item}>
            <Image source={transactionIconPaths[item]} style={styles.image} />
            <Text style={styles.text}>{item}</Text>
          </View>
          </TouchableOpacity>
          )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 30,
    backgroundColor: '#FFF',
  },
  item: {
    alignItems: 'center',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  image: {
    width: 50,
    height: 50,
    marginHorizontal: 35,
    marginBottom: 10,
    maxWidth: (Dimensions.get('window').width / 3) - 20,
  },
  text: {
    fontSize: 18,
    maxWidth: (Dimensions.get('window').width / 3) - 10,
  },
});