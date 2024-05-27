import {View} from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import {incomeLst, expenseLst, transactionIconPaths} from './transactionIcon';
import ScrollList from './scrollList';
import PropTypes from 'prop-types';

const TransactionChoiceGrid = ({list, onPressFunc}) => {
  let chunks = [];
  // Iterate over the array in steps of 3
  for (let i = 0; i < list.length; i += 3) {
    // Slice out a chunk of 3 elements and push it to the chunks array
    chunks.push(list.slice(i, i + 3));
  }

  //console.log("List: ", list);
  //console.log("Chunks: ", chunks);
  //console.log("Hello");
  console.log("Function 1: ", func);

  return (
    <View style={{paddingVertical: 30}}>
      <ScrollList dataList= {chunks} opPressFunc={onPressFunc} opheight='100%' option='6'>
      </ScrollList>
    </View>
  );
}

TransactionChoiceGrid.propTypes = {
  onPressFunc: PropTypes.func.isRequired,
};

export default TransactionChoiceGrid;