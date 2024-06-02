import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';
const SetDate = ({ value, onChange, dateStyle }) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const handleConfirm = (selectedDate) => {
    setDatePickerVisibility(false);
    onChange(selectedDate.toLocaleDateString('vi-VN')); // Định dạng ngày tháng năm theo tiếng Việt
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  return (
   <TouchableOpacity onPress={()=> (showDatePicker())}>
    <View style={styles.inputbox}>
      <Icon name="event" size={30} color="#5E5F65" style={styles.icon} />
      <TextInput
        style={styles.input}
        placeholder="Nhấp vào để chọn"
        value={value}
        editable={false}
      />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        display={Platform.OS === 'ios' ? 'spinner' : 'default'}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  inputbox: {
      flexDirection: 'row',
      height: 44,
      width: 310,
      borderColor: '#323941',
      borderWidth: 1,
      borderRadius: 20,
      paddingHorizontal: 20,
      fontSize: 20,
      marginLeft: 20,
    },
    icon: {
       color: '#5E5F65',
       alignItems: 'center',
       justifyContent: 'center',
       paddingVertical: 5,
    },
    input: {
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: 15,
      paddingHorizontal: 10,
      fontSize: 20,
      marginLeft: 3,
      color: "#323941"
    },
});

export default SetDate;