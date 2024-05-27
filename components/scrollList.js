import React from 'react';
import { View, StyleSheet, Text, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import {ListItem1, ListItem2, ListItem3, ListItem4, ListItem5, ListItem6} from './listItem.js';
import PropTypes from 'prop-types';

const ScrollList = ({ dataList, default_wallet, navigation, option, plan, isExpense, onPressFunc ,opheight='65%' }) => {
  const height_style = {
    height: opheight,
  };

  console.log("Function 1: ", onPressFunc);

  return (
    <View style={styles.card}>
      <FlatList
        style={height_style}
        data={dataList}
        renderItem={({ item }) => 
          ((option == "1" || option == null) ? (<ListItem1 title={item.title} default_op={item.default_op} balance={item.balance} default_wallet={default_wallet} navigation={navigation}/>) : 
            ((option == "2") ? (<ListItem2 type={item.type} date={item.date} isExpense={item.isExpense} value={item.value} navigation={navigation}/>) : 
              ((option == "3") ? (<ListItem3 type={item.type} isExpense={isExpense} value={item.value} navigation={navigation}/>) : 
                ((option == "4") ? (<ListItem4 title={item.title} default_plan={default_wallet} navigation={navigation}/>) : 
                  ((option == "5") ? (<ListItem5 type={item.type} plan={plan} target={item.target} navigation={navigation}/>) :
                    ((option == "6") ? (<ListItem6 list={item} onPressFunc={onPressFunc} navigation={navigation}/>) : null
                  )
                  )
                )
              )
            )
          )
        }
        keyExtractor={item => item.title}
      />
    </View>
  );
};

ScrollList.propTypes = {
  onPressFunc: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
  },
});

export default ScrollList;
