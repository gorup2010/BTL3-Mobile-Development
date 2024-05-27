import React, {useState, useEffect, useCallback } from 'react';
import {View, Text, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from 'react-native-elements';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useFocusEffect, useRoute } from '@react-navigation/native';
// import components
import InfoBox from '../components/infoBox';
import ScrollList from '../components/scrollList';

const planList = ({navigation}) => {
  const [defaultPlan, setDefaultPlan] = useState("Kế hoach chính");
  const [planLst, setPlanLst] = useState([]);
  // Get infoBox data from local storage. Run every time Screen is focused
  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
      try {
        const storedDefaultPlan = await AsyncStorage.getItem('default_plan');
        if (storedDefaultPlan !== null) {
          setDefaultPlan(storedDefaultPlan);
        }
        const storedPlanLst = await AsyncStorage.getItem('plan_lst');
        if (storedPlanLst !== null) {
          setPlanLst(JSON.parse(storedPlanLst));
        }
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };
    fetchData();

    return () => {
      console.log('Danh sách ví is unfocused');
    };
  }, [])
);

  return (
    <View style={styles.container}>
      <View style={{alignSelf: 'flex-end', padding: 20}}>
        <Button
        
          buttonStyle={{borderRadius: 30, width: 40, height: 40, backgroundColor: '#00D2EE'}}
          icon={<MaterialIcons name="add" color="#ffffff" size={20} />}
          onPress={() => navigation.navigate('THÊM KẾ HOẠCH')}  
        > 
        </Button>
      </View>
      <ScrollList dataList={planLst} default_wallet={defaultPlan} navigation={navigation} opheight="85%" option="4">
      </ScrollList>
      
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#ffffff",
  },
});
export default planList;