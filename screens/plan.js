import { createStackNavigator } from '@react-navigation/stack';

import planList from './planList';
import planAdd from './planAdd';
import planTargetAdd from './planTargetAdd';
import planDetail from './planDetail';
import planTargetDetail from './planTargetDetail';
import planEdit from './planEdit';
import planTargetEdit from './planTargetEdit';


const Stack = createStackNavigator();

const plan = () => {
  return  (
    <Stack.Navigator  
      screenOptions={{ 
        headerTitleAlign: 'center',
        cardStyle: {
            backgroundColor: '#ffffff',
        },
      }}
    >
      <Stack.Screen name="DANH SÁCH KẾ HOẠCH" component={planList} options={{headerLeft: ()=> null}}/>
      <Stack.Screen name="THÊM KẾ HOẠCH" component={planAdd} />
      <Stack.Screen name="CHI TIẾT KẾ HOẠCH" component={planDetail} />
      <Stack.Screen name="CHỈNH SỬA KẾ HOẠCH" component={planEdit} />
      <Stack.Screen name="CHI TIẾT MỤC TIÊU" component={planTargetDetail} />
      <Stack.Screen name="CHỈNH SỬA MỤC TIÊU" component={planTargetEdit} />
      <Stack.Screen name="THÊM MỤC TIÊU" component={planTargetAdd} />
    </Stack.Navigator>
  );
}

export default plan;