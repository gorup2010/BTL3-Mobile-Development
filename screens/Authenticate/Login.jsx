import {
  Alert,
  StyleSheet,
  Text,
  View,
  Platform,
  KeyboardAvoidingView,
  Dimensions
} from "react-native";
import Logo from "../../assets/Logo";
import AuthInput from "../../components/AuthInput";
import { useEffect, useState } from "react";
import { Button } from "@rneui/themed";
import { isValidEmail, isValidPassword } from "../../utils/inputValidation";
import LoadingOverlay from "./LoadingOverlay";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import { login } from "../../services/authenticate";

const screenHeight = Dimensions.get('window').height;

export default function Login({ navigation }) {
  const [isLoading, setIsLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [invalidEmail, setInvalidEmail] = useState(null);
  const [invalidPassword, setInvalidPassword] = useState(null);
  useEffect(() => {
    getToken();
  }, [navigation]);

  async function getToken() {
    const storedToken = await AsyncStorage.getItem("MoneyTrackerToken");
    const storedId = await AsyncStorage.getItem("MoneyTrackerId");
    if (storedToken) {
      //disPatch(authActions.login({ token: storedToken, id: storedId }));
      goToHomePage();
    }
    setIsLoading(false);
  }

  async function loginHandler() {
    clearErrorMessage();
    if (logInforChecking()) return;
    setIsLoading(true);

    try {
      const {
        token: authToken,
        message,
        id,
      } = await login(email, password);
      // disPatch(authActions.login({ token: authToken, id: id }));
      
      await AsyncStorage.setItem("MoneyTrackerToken", authToken)
      await AsyncStorage.setItem("MoneyTrackerId", id)
      
      goToHomePage();
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      if (error.response) {
        const errorData = error.response.data;
        Alert.alert("Thông báo", errorData.message + ".");
        return;
      }
      Alert.alert("Thông báo", error.message);
    }
  }
  function clearErrorMessage() {
    setInvalidPassword(null);
    setInvalidEmail(null);
  }
  function goToResetPage() {
    navigation.navigate("ForgotPassword");
  }
  function logInforChecking() {
    const { isValid: isValidPass, message: passwordMessage } =
      isValidPassword(password);
    const { isValid: isValidMail, message: emailMessage } = isValidEmail(email);
    if (!isValidMail) {
      setInvalidEmail(emailMessage);
    }
    if (!isValidPass) {
      setInvalidPassword(passwordMessage);
    }
    if (!isValidMail || !isValidPass) return true;
  }
  function updateEmail(text) {
    setEmail(text);
  }
  function updatePassword(text) {
    setPassword(text);
  }
  function signUpButtonHandler() {
    navigation.navigate("Signup");
  }
  function goToHomePage() {
    navigation.replace("Main");
  }
  if (isLoading) {
    return <LoadingOverlay />;
  }
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
          <View style={styles.imageContainer}>
            <Logo />
          </View>
          <View
            style={{ paddingHorizontal: "10%", marginTop: "2%", marginBottom: "2%", height: screenHeight * 42 / 100 }}
          >
            <Text
              style={{
                fontSize: 27,
                paddingBottom: 10,
                fontWeight: "bold",
              }}
            >
              Xin chào
            </Text>
            <Text
              style={{
                fontSize: 15,
                paddingBottom: 40,
                fontWeight: "300",
              }}
            >
              Đăng nhập vào tài khoản của bạn
            </Text>
            <Text
              style={{
                fontSize: 15,
                fontWeight: "300",
              }}
            >
              Địa chỉ email
            </Text>
            <AuthInput
              placeholder="Nhập email"
              value={email}
              keyboardType={"email-address"}
              onUpdateValue={updateEmail}
              onFocus={() => setInvalidEmail(null)}
            />
            {invalidEmail && (
              <Text style={styles.invalidInput}>{invalidEmail} *</Text>
            )}
            <Text
              style={{
                fontSize: 15,
                paddingBottom: 5,
                fontWeight: "300",
              }}
            >
              Mặt khẩu
            </Text>
            <AuthInput
              placeholder="Nhập mật khẩu"
              icon2={true}
              secure={true}
              value={password}
              onUpdateValue={updatePassword}
              onFocus={() => setInvalidPassword(null)}
            />
            {invalidPassword && (
              <Text style={styles.invalidInput}>{invalidPassword} *</Text>
            )}
            <View style={styles.textContainer}>
            <Text onPress={goToResetPage} style={styles.text}>
              Quên mật khẩu
            </Text>
          </View>
          </View>
  
          <View
            style={{ alignItems: "center", marginTop: "2%", height: screenHeight * 30 / 100 }}
          >
            <Button onPress={loginHandler}>ĐĂNG NHẬP</Button>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              paddingVertical: "2%",
              marginBottom: 0,
              marginTop: "2%",
              height: screenHeight * 10 / 100,
            }}
          >
            <Text style={[styles.text, { color: "black" }]}>
              Chưa có tài khoản?
            </Text>
            <Text onPress={signUpButtonHandler} style={styles.text}>
              Đăng ký tại đây
            </Text>
          </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    padding: 0,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: screenHeight * 20 / 100,
  },
  image: {
    maxWidth: "100%",
    maxHeight: "30%",
    resizeMode: "cover",
  },
  text: {
    color: "#EF7A6D",
    padding: "1%",
    fontSize: 14,
    fontWeight: "300",
  },
  textContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  invalidInput: {
    textAlign: "right",
    color: "red",
    fontWeight: "300",
  },
});
