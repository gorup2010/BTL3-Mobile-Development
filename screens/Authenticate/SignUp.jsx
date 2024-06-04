import {
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
} from "react-native";

import React, { useState, useEffect } from "react";
import AuthInput from "../../components/AuthInput";
import { Button } from "@rneui/themed";
import Logo from "../../assets/Logo";
import LoadingOverlay from "./LoadingOverlay";
// import { signUp } from "../../utils/authenticate";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  isValidEmail,
  isValidPassword,
  isValidUsername,
} from "../../utils/inputValidation";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { signUp } from "../../services/authenticate";

const screenHeight = Dimensions.get("window").height;

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
      } = await signUp(username, email, password);
      setIsLoading(false);
      setSuccess(true);
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
  function goToLogin() {
    navigation.navigate("Login");
  }
  if (isLoading) return <LoadingOverlay />;
  return (
    <KeyboardAwareScrollView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <View style={styles.container}>
        {success ? (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center", height: screenHeight }}
          >
            <Image
              style={styles.modalImage}
              source={require("../../assets/Green-Check.png")}
            />
            <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 2 }}>
              Hoàn tất đăng ký!
            </Text>
            <View style={{ height: "10%", paddingHorizontal: "15%" }}>
              <Button onPress={goToLogin} size="md">
                Quay về trang đăng nhập.
              </Button>
            </View>
          </View>
        ) : (
          <>
            <View style={styles.imageContainer}>
              <Logo />
            </View>
            <View style={{ height: (screenHeight * 65) / 100 }}>
              <View style={{ paddingHorizontal: "10%" }}>
                <Text
                  style={{
                    fontSize: 27,
                    paddingBottom: 10,
                    fontWeight: "bold",
                  }}
                >
                  Chào mừng bạn
                </Text>
                <Text
                  style={{
                    fontSize: 15,
                    paddingBottom: 35,
                    fontWeight: "300",
                  }}
                >
                  Hãy đăng ký để trải nghiệm ứng dụng
                </Text>
                <Text style={styles.text}>Địa chỉ email</Text>
                <AuthInput
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
                  placeholder="Nhập username"
                  keyboardType="text"
                  value={username}
                  onUpdateValue={updateUsername}
                  onFocus={() => setInvalidUsername(null)}
                />
                {invalidUsername && (
                  <Text style={styles.invalidInput}>{invalidUsername} *</Text>
                )}
                <Text style={styles.text}>Mật khẩu</Text>

                <AuthInput
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
            </View>
            <View style={{ height: "10%", paddingHorizontal: "10%" }}>
              <Button onPress={signUpHandler} size="md">
                ĐĂNG KÝ
              </Button>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                marginBottom: 20,
                marginTop: 20,
                height: (screenHeight * 5) / 100,
              }}
            >
              <Text style={[styles.text]}>Bạn đã có tài khoản? </Text>
              <Text
                onPress={goToLogin}
                style={[styles.text, { color: "#EF7A6D" }]}
              >
                Đăng nhập tại đây
              </Text>
            </View>
          </>
        )}
      </View>
    </KeyboardAwareScrollView>
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
    height: (screenHeight * 20) / 100,
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
  },
  modalImage: {
    width: 200,
    height: 200,
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
    fontSize: 16,
    marginVertical: "1%",
  },
});
