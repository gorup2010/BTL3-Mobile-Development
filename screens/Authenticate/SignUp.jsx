import {
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

import React, { useState, useEffect } from "react";
import AuthInput from "../../components/AuthInput";
import color from "../../constants/color";
import { Button } from "@rneui/themed";
import Logo from "../../assets/Logo";
import LoadingOverlay from "./LoadingOverlay";
// import { signUp } from "../../utils/authenticate";
import { SafeAreaView } from "react-native-safe-area-context";
import { Modal } from "react-native";
import { useDispatch } from "react-redux";
import { authActions } from "../../redux/auth/authSlice";
import {
  isValidEmail,
  isValidPassword,
  isValidUsername,
} from "../../utils/inputValidation";

export default function SignUp({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [invalidPassword, setInvalidPassword] = useState(false);
  const [invalidUsername, setInvalidUsername] = useState(false);
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [invalidConfirmPassword, setInvalidConfirmPassword] = useState(false);
  const [success, setSuccess] = useState(false);
  const disPatch = useDispatch();
  const [timeLeft, setTimeLeft] = useState();
  useEffect(() => {
    if (timeLeft == 0) {
      goToHomePage();
    }
    if (!timeLeft) return;
    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [timeLeft]);

  function goToHomePage() {
    navigation.replace("Main");
  }

  function signUpInforChecking() {
    let error = true;
    const {
      isValid: isValidPass,
      message: passwordMessage,
      isValidConfirm,
      confirmMessage,
    } = isValidPassword(password, confirmPassword);
    const { isValid: isValidUser, message: userMessage } =
      isValidUsername(username);

    const { isValid: isValidMail, message: emailMessage } = isValidEmail(email);
    if (!isValidUser) {
      setInvalidUsername(userMessage);
    }
    if (!isValidMail) {
      setInvalidEmail(emailMessage);
    }
    if (!isValidPass) {
      setInvalidPassword(passwordMessage);
    }

    if (!isValidConfirm) {
      setInvalidConfirmPassword(confirmMessage);
    }
    if (!isValidPass || !isValidUser || !isValidMail || !isValidConfirm)
      error = false;

    return error;
  }
  async function signUpHandler() {
    clearErrorMessage();
    if (!signUpInforChecking()) {
      return;
    }

    setIsLoading(true);
    try {
      const {
        token: authToken,
        message,
        id,
      } = { token: "123456", message: "", id: "mmmemm" };
      disPatch(authActions.login({ token: authToken, id: id }));
      setIsLoading(false);
      setSuccess(true);
      setTimeLeft(3);
    } catch (error) {
      if (error.response) {
        const errorData = error.response.data;
        Alert.alert("Thông báo", errorData.message);
        return;
      }
      Alert.alert("Thông báo", error.message);
    } finally {
      setIsLoading(false);
    }
  }
  function clearErrorMessage() {
    setInvalidUsername(null);
    setInvalidEmail(null);
    setInvalidPassword(null);
    setInvalidConfirmPassword(null);
  }
  function updateUsername(text) {
    setUsername(text);
  }
  function updatePassword(text) {
    setPassword(text);
  }

  function updateEmail(text) {
    setEmail(text);
  }
  function updateConfirmPassword(text) {
    setConfirmPassword(text);
  }
  function signUpButtonHandler() {
    navigation.navigate("Login");
  }
  if (isLoading) return <LoadingOverlay />;
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <View style={styles.container}>
        {success && (
          <Modal animationType="slide" transparent={true} visible={success}>
            <SafeAreaView style={styles.centeredView}>
              <View style={styles.modalView}>
                <Image
                  style={styles.modalImage}
                  source={require("../../assets/Green-Check.png")}
                />
                <Text style={styles.title}>THÀNH CÔNG</Text>
                <Text style={[styles.content]}>
                  Bạn đã đăng ký tài khoản thành công
                </Text>
                <Text style={[styles.content]}>
                  {" "}
                  Tự động chuyển đến trang chủ trong {timeLeft} giây
                </Text>
              </View>
            </SafeAreaView>
          </Modal>
        )}
        <View style={styles.imageContainer}>
          <Logo />
        </View>
        <View style={{ height: "68%" }}>
          <View style={{ paddingHorizontal: "15%" }}>
            <Text style={styles.text}>Địa chỉ email</Text>
            <AuthInput
              icon1="mail-outline"
              placeholder="Nhập email"
              keyboardType="email-address"
              value={email}
              onUpdateValue={updateEmail}
              onFocus={() => setInvalidEmail(null)}
            />
            {invalidEmail && (
              <Text style={styles.invalidInput}>{invalidEmail} *</Text>
            )}
            <Text style={styles.text}>Tên người dùng</Text>
            <AuthInput
              icon1="call-outline"
              placeholder="Nhập username"
              keyboardType="phone-pad"
              value={username}
              onUpdateValue={updateUsername}
              onFocus={() => setInvalidUsername(null)}
            />
            {invalidUsername && (
              <Text style={styles.invalidInput}>{invalidUsername} *</Text>
            )}
            <Text style={styles.text}>Mật khẩu</Text>

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
              <Text style={styles.invalidInput}> {invalidPassword} *</Text>
            )}
            <Text style={styles.text}>Nhập lại mật khẩu</Text>

            <AuthInput
              icon1="key-outline"
              placeholder="Nhập lại mật khẩu"
              icon2={true}
              secure={true}
              value={confirmPassword}
              onUpdateValue={updateConfirmPassword}
              onFocus={() => setInvalidConfirmPassword(null)}
            />
            {invalidConfirmPassword && (
              <Text style={styles.invalidInput}>
                {invalidConfirmPassword} *
              </Text>
            )}
          </View>
          <Button onPress={signUpHandler}>ĐĂNG KÝ</Button>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginBottom: 20,
            marginTop: 20,
            height: "10%",
          }}
        >
          <Text style={[styles.text]}>
            Bạn đã có tài khoản?
          </Text>
          <Text onPress={signUpButtonHandler} style={[styles.text, {color: "red"}]}>
            Đăng nhập tại đây
          </Text>
        </View>
      </View>
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
    height: "25%",
    resizeMode: "cover",
  },
  image: {
    width: 300,
    height: 200,
  },
  text: {
    // color: color.text_blue,
    // padding: 2,
    fontSize: 15,
    paddingBottom: 5,
    fontWeight: "300",
  },
  textContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingRight: 70,
    paddingVertical: 10,
  },
  invalidInput: {
    textAlign: "right",
    color: "red",
    paddingBottom: 5,
  },
  modalImage: {
    width: 50,
    height: 50,
  },
  modalContainer: {
    backgroundColor: "white",
    alignItems: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: "20%",
  },
  modalView: {
    margin: 30,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 10,
  },
  title: {
    textAlign: "center",
    fontSize: 14,
    marginVertical: "1%",
  },
  content: {
    textAlign: "center",
    fontSize: 14,
    marginVertical: "1%",
  },
});
