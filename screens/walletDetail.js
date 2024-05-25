import React, {useState, useEffect, useCallback} from 'react';
import {View, Alert, Text, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useFocusEffect, useRoute } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


// import components
import ScrollList from '../components/scrollList';

const showConfirmDeleteDialog = (navigation, name, balance) => 
    Alert.alert(
      'Xác nhận xóa ví',
      'Bạn có chắc chắn muốn xóa ví này?',
      [
        {
          text: 'Không',
          style: 'cancel',
        },
        {
          text: 'Có',
          onPress: async () => {
            await deleteWallet(name, balance);
            navigation.navigate('DANH SÁCH VÍ');
          },
        },
      ],
      {
        cancelable: true,
      },
    );
  
  const deleteWallet = async (name, balance) => {
    try {
      let storedWalletLst = await AsyncStorage.getItem('wallet_lst');
      let currBalance = await AsyncStorage.getItem('curr_balance');
      if (storedWalletLst == null) {
        return;
      } else {
        storedWalletLst = JSON.parse(storedWalletLst);
      }
      storedWalletLst = storedWalletLst.filter(item => item['title'] !== name);
      await AsyncStorage.setItem('wallet_lst', JSON.stringify(storedWalletLst));
      await AsyncStorage.setItem('curr_balance', (parseInt(currBalance) - parseInt(balance)).toString());
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  }


const walletDetail = ({navigation}) => {
  const route = useRoute();
  const { walletName } = route.params;

  const [name, setName] = useState(walletName);
  const [balance, setBalance] = useState("0");
  const [des, setDes] = useState("");
  const [defaultWallet, setDefaultWallet] = useState("Ví chính");
  const [wallet, setWallet] = useState([]);

  useFocusEffect(
    useCallback(async () => {
      const fetchData = async () => {
      try {
        const storedWalletLst = JSON.parse(await AsyncStorage.getItem('wallet_lst'));
        let currBalance = "0";
        let description = '';
        let wallet_index = 0;
        for (let i in storedWalletLst) {
          
          if (storedWalletLst[i]['title'] == name) {  
            wallet_index = i;
            //console.log(storedWalletLst[wallet_index]);
            currBalance = storedWalletLst[i]['balance'];
            description = storedWalletLst[i]['des'];
            break;
          }
        }
        await setWallet(storedWalletLst[wallet_index]);
        await setBalance(currBalance);
        await setDes(description);
        
        const storedDefaultWallet = await AsyncStorage.getItem('default_wallet');
        if (storedDefaultWallet !== null) {
          setDefaultWallet(storedDefaultWallet);
        }
        
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };
    await fetchData();

    return () => {
      console.log('Chi tiết ví is unfocused');
    };
  }, [])
);
  
  return (
    <View style={styles.container}>
      <View style={styles.infocon}>
      <View style={styles.smallcon}>
        <Text style={{fontWeight: 'bold', fontSize: 15, color: '#5E5F65'}}>Thông tin</Text>
        <Text style={{fontStyle: 'italic', color: '#5E5F65', fontSize: 12, padding: 20}}>{(defaultWallet==name)? "mặc định" : ""}</Text>
        <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center',}}>
        <View style={{}}>
          <Button
            buttonStyle={{borderRadius: 30, width: 40, height: 40, backgroundColor: '#00D2EE'}}
            icon={<MaterialIcons name="edit" color="#ffffff" size={20} />}
            onPress={() => navigation.navigate('CHỈNH SỬA VÍ', {walletName: name})}  
          > 
          </Button>
        </View>
        <View style={{padding: 5}}>
          <Button
            buttonStyle={{borderRadius: 30, width: 40, height: 40, backgroundColor: '#EF7A6D'}}
            icon={<MaterialIcons name="delete-outline" color="#ffffff" size={20} />}
            onPress={() => showConfirmDeleteDialog(navigation, name, balance)}
          > 
          </Button>
        </View>
      </View>
    </View>
    <View style={styles.smallcon}>
      <View style={{display: 'flex', flexDirection: 'row',}}>
        <Text style={styles.info_title}>Tên ví: </Text>
        <Text style={styles.info}>{name}</Text>
      </View>
      <View style={{display: 'flex', flexDirection: 'row',}}>
        <Text style={styles.info_title}>Số dư ví: </Text>
        <Text style={{fontSize: 12, color: '#00E879', fontWeight: 'bold'}}>{balance} VND</Text>
      </View>
    </View>
    <View style={styles.smallcon}>
      <Text style={styles.info_title}>Mục đích sử dụng: </Text>
      <Text style={{fontSize: 12, width: '65%'}}>{des}</Text>
    </View>
    </View>
    <View style={styles.smallcon}>
      <Text style={{fontWeight: 'bold', fontSize: 15, color: '#5E5F65', paddingVertical:3}}>Lịch sử thay đổi</Text>
      <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center',}}>
      </View>
    </View>
    <ScrollList dataList={wallet['transaction_lst']} default_wallet={defaultWallet} navigation={navigation} option="2">
    </ScrollList>
  </View>
    
  );
};
const styles = StyleSheet.create({
  info: {
    fontSize: 12
  },
  info_title: {
    fontSize: 12,
    fontWeight: 'bold',
    fontStyle: 'italic'
  },
  smallcon: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    alignItems: 'center',
    padding: 3
  },
  infocon: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    width: '100%',
    height: '30%',
    alignItems: 'center',
    padding: 3
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: "#ffffff",
  },
});
export default walletDetail;