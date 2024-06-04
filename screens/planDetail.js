import React, { useState, useEffect, useCallback } from 'react';
import { View, Alert, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useFocusEffect, useRoute } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// import components
import ScrollList from '../components/scrollList';

const showConfirmDeleteDialog = (navigation, name) =>
  Alert.alert(
    'Xác nhận xóa kế hoạch',
    'Bạn có chắc chắn muốn xóa kế hoạch này?',
    [
      {
        text: 'Không',
        style: 'cancel',
      },
      {
        text: 'Có',
        onPress: async () => {
          await deletePlan(name);
          navigation.navigate('DANH SÁCH KẾ HOẠCH');
        },
      },
    ],
    {
      cancelable: true,
    }
  );

const deletePlan = async (name) => {
  try {
    let storedPlanLst = await AsyncStorage.getItem('plan_lst');
    if (storedPlanLst == null) {
      return;
    } else {
      storedPlanLst = JSON.parse(storedPlanLst);
    }
    storedPlanLst = storedPlanLst.filter((item) => item['title'] !== name);
    await AsyncStorage.setItem('plan_lst', JSON.stringify(storedPlanLst));
  } catch (error) {
    console.error('Error fetching data: ', error);
  }
};

const planDetail = ({ navigation }) => {
  const route = useRoute();
  const { planName } = route.params;

  const [name, setName] = useState('');
  const [target, setTarget] = useState('0');
  const [des, setDes] = useState('');
  const [defaultPlan, setDefaultPlan] = useState('Kế hoạch chính');
  const [plan, setPlan] = useState([]);

  useFocusEffect(
    useCallback(async () => {
      const fetchData = async () => {
        try {
          setName(planName);
          const storedPlanLst = JSON.parse(
            await AsyncStorage.getItem('plan_lst')
          );
          //console.log("Plan List: ", storedPlanLst);
          let currTarget = '0';
          let description = '';
          let plan_index = 0;
          for (let i in storedPlanLst) {
            if (storedPlanLst[i]['title'] == planName) {
              plan_index = i;
              currTarget = storedPlanLst[i]['target'];
              description = storedPlanLst[i]['des'];
              break;
            }
          }

          const storedDefaultPlan = await AsyncStorage.getItem('default_plan');
          if (storedDefaultPlan !== null) {
            setDefaultPlan(storedDefaultPlan);
          }

          await setPlan(storedPlanLst[plan_index]);
          await setTarget(currTarget);
          await setDes(description);
        } catch (error) {
          console.error('Error fetching data: ', error);
        }
      };
      await fetchData();

      return () => {
        console.log('Chi tiết kế hoạch is unfocused');
      };
    }, [route.params])
  );

  //console.log("curr target: ", target);
  //console.log("des: ", des);

  return (
    <View style={styles.container}>
      <View style={styles.infocon}>
        <View style={styles.smallcon}>
          <Text style={{ fontWeight: 'bold', fontSize: 15, color: '#5E5F65' }}>
            Thông tin
          </Text>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <View style={{}}>
              <Button
                buttonStyle={{
                  borderRadius: 30,
                  width: 40,
                  height: 40,
                  backgroundColor: '#00D2EE',
                }}
                icon={<MaterialIcons name="edit" color="#ffffff" size={20} />}
                onPress={() =>
                  navigation.navigate('CHỈNH SỬA KẾ HOẠCH', { planName: name })
                }></Button>
            </View>
            <View style={{ padding: 5 }}>
              <Button
                buttonStyle={{
                  borderRadius: 30,
                  width: 40,
                  height: 40,
                  backgroundColor: '#EF7A6D',
                }}
                icon={
                  <MaterialIcons
                    name="delete-outline"
                    color="#ffffff"
                    size={20}
                  />
                }
                onPress={() =>
                  showConfirmDeleteDialog(navigation, name)
                }></Button>
            </View>
          </View>
        </View>
        <View style={styles.smallcon}>
          <View style={{ display: 'flex', flexDirection: 'row' }}>
            <Text style={styles.info_title}>Tên kế hoạch: </Text>
            <Text style={styles.info}>{name}</Text>
          </View>
          <Text
            style={{
              fontStyle: 'italic',
              color: '#5E5F65',
              fontSize: 12,
            }}>
            {defaultPlan == name ? 'đang áp dụng' : ''}
          </Text>
        </View>
        <View style={styles.smallcon}>
          <Text style={styles.info_title}>Tổng chi tiêu tháng dự tính: </Text>
          <Text style={{ fontSize: 12, color: '#EF736D', fontWeight: 'bold' }}>
            -{target} VND
          </Text>
        </View>
        <View style={styles.smallcon}>
          <Text style={styles.info_title}>Mục đích sử dụng: </Text>
          <Text style={{ fontSize: 12, width: '65%' }}>{des}</Text>
        </View>
      </View>
      <View style={styles.smallcon}>
    
        <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width:'100%'}}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 15,
              color: '#5E5F65',
              paddingVertical: 3,
            }}>
            Danh sách mục tiêu
          </Text>
          <Button
            buttonStyle={{
              borderRadius: 30,
              width: 40,
              height: 40,
              backgroundColor: '#00D2EE',
            }}
            icon={<MaterialIcons name="add" color="#ffffff" size={20} />}
            onPress={() => navigation.navigate('THÊM MỤC TIÊU', {planName: planName})}></Button>
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}></View>
      </View>
      <ScrollList
        dataList={plan['target_lst']}
        plan={planName}
        navigation={navigation}
        option="5"
        opheight='63%'></ScrollList>
    </View>
  );
};
const styles = StyleSheet.create({
  info: {
    fontSize: 12,
  },
  info_title: {
    fontSize: 12,
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  smallcon: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    alignItems: 'center',
    padding: 3,
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
export default planDetail;
