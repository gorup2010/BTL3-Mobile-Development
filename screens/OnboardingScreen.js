import { StyleSheet, Text, View } from "react-native";
import Onboarding from "react-native-onboarding-swiper";
import Image2 from "../assets/Image2.svg"
import Image1 from "../assets/Moneyverse Home Office.svg"
import Image3 from "../assets/Moneyverse Bussines Calendar.svg"


export default function OnboardingScreen() {
  return (
    <View style={styles.container}>
      <Onboarding
        pages={[
          {
            backgroundColor: "#fff",
            image: <Image1 />,
            title: "Onboarding",
            subtitle: "Done with React Native Onboarding Swiper",
          },
          {
            backgroundColor: "#fff",
            image: <Text>Foo</Text>,
            title: "Onboarding",
            subtitle: "Done with React Native Onboarding Swiper",
          },
          {
            backgroundColor: "#fff",
            image: <Text>Foo</Text>,
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
