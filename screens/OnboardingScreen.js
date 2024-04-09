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
            title: "Onboarding",
            subtitle: "Done with React Native Onboarding Swiper",
          },
          {
            backgroundColor: "#fff",
            image: <Text>Trang 2</Text>,
            title: "Onboarding",
            subtitle: "Done with React Native Onboarding Swiper",
          },
          {
            backgroundColor: "#fff",
            image: <Text>Trang 3</Text>,
            title: "Onboarding",
            subtitle: "Done with React Native Onboarding Swiper",
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
