import { StyleSheet, Text, View } from "react-native";
import Onboarding from "react-native-onboarding-swiper";
import Boarding1 from "../assets/Boarding1";
import Boarding2 from "../assets/Boarding2";
import Boarding3 from "../assets/Boarding3";


export default function OnboardingScreen() {
  return (
    <View style={styles.container}>
      <Onboarding
        pages={[
          {
            backgroundColor: "#fff",
            image: <Boarding1 />,
            title: "Biết tiền đi về đâu với\n báo cáo thu chi",
            subtitle: "Cung cấp báo cáo thu chi theo tháng, \ntuần, ngày đúng yêu cầu của bạn, giúp \ndễ dàng theo dõi và lập kế hoạch trong \ntương lai",
          },
          {
            backgroundColor: "#fff",
            image: <Boarding2 />,
            title: "Cùng nhau hợp tác \ncùng nhau tiến lên",
            subtitle: "Chia sẻ kế hoạch thu chi cá nhân với \nbạn bè xung quanh để cùng nhau xây \ndựng kế hoạch chi tiêu một cách hợp lí \nvà hiệu quả",
          },
          {
            backgroundColor: "#fff",
            image: <Boarding3 />,
            title: "Đặt kế hoạch thu chi \ntránh dùng quá tay ",
            subtitle: "Đặt mục tiêu thu chi giúp bạn kiểm soát \nlượng tiền sử dụng. Tự động thông báo \nnếu chi tiêu vượt mức kế hoạch",
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
