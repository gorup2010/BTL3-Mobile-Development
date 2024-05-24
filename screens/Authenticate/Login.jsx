import {
  Alert,
  StyleSheet,
  Text,
  View,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import color from "../../constants/color";
import Logo from "../../assets/Logo";
import AuthInput from "../../components/AuthInput";
import { useEffect, useState } from "react";
import { Button } from "@rneui/themed";
import { isValidEmail, isValidPassword } from "../../utils/inputValidation";
import { useDispatch } from "react-redux";
import { authActions } from "../../redux/auth/authSlice";
import LoadingOverlay from "./LoadingOverlay";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";

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
    const storedToken = await AsyncStorage.getItem("CtimeToken");
    const storedId = await AsyncStorage.getItem("CtimeId");
    if (storedToken) {
      disPatch(authActions.login({ token: storedToken, id: storedId }));
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
      } = { token: "1234", message: "Hello", id: "12334" };
      disPatch(authActions.login({ token: authToken, id: id }));
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
    const { isValid: isValidMail, message: emailMessage } =
      isValidEmail(email);
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
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.imageContainer}>
          <Logo />
        </View>
        <View style={{ paddingHorizontal: "13%", marginTop: "2%" }}>
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
              paddingBottom: 5,
              fontWeight: "300",
            }}
          >
            Địa chỉ email
          </Text>
          <AuthInput
            icon1="call-outline"
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
            icon1="key-outline"
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
        </View>
        <View style={styles.textContainer}>
          <Text onPress={goToResetPage} style={styles.text}>
            Quên mật khẩu
          </Text>
        </View>

        <View style={{ alignItems: "center", marginTop: "2%" }}>
          <Button onPress={loginHandler}>ĐĂNG NHẬP</Button>
          <Text
            style={[styles.text, { color: "black", paddingVertical: "1.5%" }]}
          >
            Hoặc
          </Text>
          <Button onPress={goToHomePage}>SỬ DỤNG NGAY</Button>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            paddingVertical: "2%",
            marginBottom: 0,
            marginTop: "2%",
          }}
        >
          <Text style={[styles.text, { color: "black" }]}>
            Bạn chưa có tài khoản?
          </Text>
          <Text onPress={signUpButtonHandler} style={styles.text}>
            Đăng ký tại đây
          </Text>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
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
    height: "25%",
  },
  image: {
    maxWidth: "100%",
    maxHeight: "30%",
    resizeMode: "cover",
  },
  text: {
    color: color.text_blue,
    padding: "1%",
    fontSize: 14,
  },
  textContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingRight: "14%",
    paddingVertical: "1.5%",
  },
  invalidInput: {
    textAlign: "right",
    color: "red",
    paddingBottom: 5,
  },
});
