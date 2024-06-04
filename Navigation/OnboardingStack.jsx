import React from "react";
import Onboarding from "react-native-onboarding-swiper";
import Boarding1 from "../assets/Boarding1";
import Boarding2 from "../assets/Boarding2";
import Boarding3 from "../assets/Boarding3";
import { Button } from 'react-native-elements';
import { View, Modal, Text, StyleSheet, DatePickerAndroid } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Square = ({ isLight, selected }) => {
  let backgroundColor;
  if (isLight) {
    backgroundColor = selected ? "rgba(0, 0, 0, 0.8)" : "rgba(0, 0, 0, 0.3)";
  } else {
    backgroundColor = selected ? "#fff" : "rgba(255, 255, 255, 0.5)";
  }
  return (
    <View
      style={{
        width: 6,
        height: 6,
        marginHorizontal: 3,
        backgroundColor,
      }}
    />
  );
};

const Next = ({ isLight, ...props }) => (
  <Button
    title={"Next"}
    buttonStyle={{
      backgroundColor: "white",
    }}
    containerViewStyle={{
      marginVertical: 10,
      marginHorizontal: 10,
      paddingVertical: 10,
      paddingHorizontal: 10,
      width: 70,
      backgroundColor: "white",
    }}
    titleStyle={{ color: "black" }}
    {...props}
  />
);

const Done = ({ isLight, ...props }) => (
  <Button
    title={"Start"}
    type="clear"
    buttonStyle={{
      backgroundColor: "white",
    }}
    containerViewStyle={{
      marginVertical: 10,
      marginHorizontal: 10,
      paddingVertical: 10,
      paddingHorizontal: 10,
      width: 70,
      backgroundColor: "white",
    }}
    titleStyle={{ color: "black" }}
    {...props}
  />
);

const Skip = ({ isLight, skipLabel, ...props }) => (
  <Button
    title={"Skip"}
    buttonStyle={{
      backgroundColor: "white",
    }}
    containerViewStyle={{
      marginVertical: 10,
      marginHorizontal: 10,
      paddingVertical: 10,
      paddingHorizontal: 10,
      width: 70,
    }}
    titleStyle={{ color: "black" }}
    {...props}
  />
);

export default function OnBoardingStack({ navigation }) {
  return (
    <Onboarding
        onSkip={async () => {
          await AsyncStorage.setItem('isFirstLaunch', "false");
          console.log("Skip onboarding");
          navigation.navigate("Authenticate");
        }}
        onDone={async () => {
          await AsyncStorage.setItem('isFirstLaunch', "false");
          console.log("Done onboarding");
          navigation.navigate("Authenticate");
        }}
        bottomBarColor={"white"}
        DotComponent={Square}
        NextButtonComponent={Next}
        SkipButtonComponent={Skip}
        DoneButtonComponent={Done}
        pages={[
          {
            backgroundColor: "#fff",
            image: <Boarding1 />,
            title: "Biết tiền đi về đâu với\n báo cáo thu chi",
            subtitle:
              "Cung cấp báo cáo thu chi theo tháng, \ntuần, ngày đúng yêu cầu của bạn, giúp \ndễ dàng theo dõi và lập kế hoạch trong \ntương lai",
          },
          {
            backgroundColor: "#fff",
            image: <Boarding2 />,
            title: "Cùng nhau hợp tác \ncùng nhau tiến lên",
            subtitle:
              "Chia sẻ kế hoạch thu chi cá nhân với \nbạn bè xung quanh để cùng nhau xây \ndựng kế hoạch chi tiêu một cách hợp lí \nvà hiệu quả",
          },
          {
            backgroundColor: "#fff",
            image: <Boarding3 />,
            title: "Đặt kế hoạch thu chi \ntránh dùng quá tay ",
            subtitle:
              "Đặt mục tiêu thu chi giúp bạn kiểm soát \nlượng tiền sử dụng. Tự động thông báo \nnếu chi tiêu vượt mức kế hoạch",
          },
        ]}
      />
  );
  /*return (
    <Tab.Navigator
      tabBar={() => null}
      screenOptions={{
        gestureEnabled: true,
        animation: "slide_from_right",
        contentStyle: { backgroundColor: "white" },
        headerShown: false,
        tabBarIndicatorShown: false,
      }}
    >
      <Tab.Screen name="OnBoarding1" component={Onboarding} />
      <Tab.Screen name="OnBoarding2" component={Onboarding} />
      <Tab.Screen name="OnBoarding3" component={Onboarding} />
    </Tab.Navigator>
  );*/
}

const styles = StyleSheet.create({});
