import React, { useState, useEffect, useCallback } from 'react';
import { View, Alert, Text, StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useFocusEffect, useRoute } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// import components
import ScrollList from '../components/scrollList';
import transactionIconPaths from '../components/transactionIcon';

const showConfirmDeleteDialog = (navigation, type, plan) =>
  Alert.alert(
    'Xác nhận xóa mục tiêu',
    'Bạn có chắc chắn muốn xóa mục tiêu này?',
    [
      {
        text: 'Không',
        style: 'cancel',
      },
      {
        text: 'Có',
        onPress: async () => {
          await deleteTarget(type, plan);
          navigation.navigate('CHI TIẾT KẾ HOẠCH', {planName: plan});
        },
      },
    ],
    {
      cancelable: true,
    }
  );

const deleteTarget = async (type, plan) => {
  try {
    let storedPlanLst = await AsyncStorage.getItem('plan_lst');
    if (storedPlanLst == null) {
      return;
    } else {
      storedPlanLst = JSON.parse(storedPlanLst);
    }
    let storedPlan = null;
    for (let i in storedPlanLst) {
      if (storedPlanLst[i]['title'] == plan) {
        storedPlan = storedPlanLst[i];
      }
    } 
    let storedPlanTargetLst = storedPlan['target_lst'];
    storedPlanTargetLst = storedPlanTargetLst.filter((item) => item['type'] !== type);
    let totalTarget = 0;
    for (let i in storedPlanTargetLst) {
      totalTarget += parseInt(storedPlanTargetLst[i]['target']);
    }
    storedPlan['target'] = totalTarget.toString();
    storedPlan['target_lst'] = storedPlanTargetLst;
    await AsyncStorage.setItem('plan_lst', JSON.stringify(storedPlanLst));
  } catch (error) {
    console.error('Error fetching data: ', error);
  }
};

const planTargetDetail = ({ navigation }) => {
  const route = useRoute();
  const { type } = route.params;
  const { planName } = route.params;

  const [target, setTarget] = useState('0');
  const [note, setNote] = useState('');

  useFocusEffect(
    useCallback(async () => {
      const fetchData = async () => {
        try {
          const storedPlanLst = JSON.parse(
            await AsyncStorage.getItem('plan_lst')
          );
          //console.log("Plan List: ", storedPlanLst);
          let currTarget = '0';
          let currNote = '';
          let targetLst = [];
          for (let i in storedPlanLst) {
            if (storedPlanLst[i]['title'] == planName) {
              targetLst = storedPlanLst[i]['target_lst'];
              break;
            }
          }

          for (let i in targetLst) {
            if (targetLst[i]['type'] == type) {
              setTarget(targetLst[i]['target']);
              setNote(targetLst[i]['note']);
            }
          }
        } catch (error) {
          console.error('Error fetching data: ', error);
        }
      };
      await fetchData();

      return () => {
        console.log('Chi tiết mục tiêu is unfocused');
      };
    }, [])
  );

  //console.log('curr target: ', target);
  //console.log('note: ', note);

  return (
    <View style={styles.container}>
      <View style={styles.infocon}>
        <View style={styles.smallcon}>
          <Image source={transactionIconPaths[type]} />

          <Text
            style={{
              paddingHorizontal: 10,
              fontWeight: 'bold',
              fontStyle: 'italic',
              fontSize: 20,
              color: '#181818',
            }}>
            {type}
          </Text>
        </View>
        <View style={styles.smallcon}>
          <Text style={styles.info_title}>Mục tiêu: </Text>
          <Text
            style={{
              paddingHorizontal: 5,
              fontSize: 12,
              color: '#EF736D',
              fontWeight: 'bold',
            }}>
            -{target} VND
          </Text>
        </View>
        <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', width: '90%', height: 400, alignItems: 'flex-start', paddingVertical: 10,}}>
          <Text style={styles.info_title}>Ghi chú: </Text>
          <Text style={{ paddingHorizontal: 5, fontSize: 12, width: '65%' }}>
            {note}
          </Text>
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            alignSelf: 'center',

          }}>
          <View style={{padding: 5}}>
            <Button
              buttonStyle={{
                borderRadius: 30,
                width: 150,
                height: 50,
                backgroundColor: '#00D2EE',
              }}
              title = 'Sửa'
              onPress={() =>
                navigation.navigate('CHỈNH SỬA MỤC TIÊU', { type: type, planName: planName })
              }></Button>
          </View>
          <View style={{padding: 5}}>
            <Button
              buttonStyle={{
                borderRadius: 30,
                width: 150,
                height: 50,
                backgroundColor: '#EF7A6D',
                
              }}
              title = 'Xóa'
              onPress={() =>
                showConfirmDeleteDialog(navigation, type, planName)
              }></Button>
          </View>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  info_title: {
    fontSize: 12,
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  smallcon: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '90%',
    alignItems: 'center',
    paddingVertical: 10,
  },
  infocon: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    width: '100%',
    height: '30%',
    alignItems: 'center',
    padding: 3,
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
});
export default planTargetDetail;
