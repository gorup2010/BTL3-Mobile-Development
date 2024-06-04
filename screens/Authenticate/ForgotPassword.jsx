import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  Platform,
  Alert,
  Dimensions,
  Image
} from "react-native";
import React, { useState } from "react";
import AuthInput from "../../components/AuthInput";
import { Button } from "@rneui/themed";
import { isValidEmail } from "../../utils/inputValidation";
import { SafeAreaView } from "react-native-safe-area-context";
// import { forgotPassword } from "../../utils/authenticate";
import LoadingOverlay from "./LoadingOverlay";
import Logo from "../../assets/Logo";

const screenHeight = Dimensions.get("window").height;

export default function ForgotPassword({ route, navigation }) {
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [invalidPhoneNumber, setInvalidPhoneNumber] = useState(false);
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [success, setSuccess] = useState(false);

  function clearErrorMessage() {
    setInvalidEmail(null);
  }

  async function forgotPasswordHandler() {
    clearErrorMessage();
    if (!InputChecking()) {
      return;
    }
    setIsLoading(true);
    try {
      const { message, sentEmail } = {
        message: "Muahaha",
        sentEmail: "Mua haha",
      };
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
  function goToSingIn() {
    navigation.replace("Authenticate", {
      screen: "Login",
    });
  }
  function updateEmail(text) {
    setEmail(text);
  }
  function InputChecking() {
    let error = true;
    const { isValid: isValidMail, message: emailMessage } = isValidEmail(email);
    if (!isValidMail) {
      setInvalidEmail(emailMessage);
    }

    if (!isValidMail) error = false;

    return error;
  }
  if (isLoading) return <LoadingOverlay message="Đang reset mật khẩu" />;
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      {!success ? (
        <View style={styles.container}>
          <View style={styles.img}>
            <Logo />
          </View>
          <View style={styles.content}>
            <Text style={styles.instruction}>
              Nhập email bạn đã dùng để đăng ký tài khoản vào đây. Chúng tôi sẽ
              gửi một mặt khẩu mới qua email đó.
            </Text>
          </View>
          <View style={styles.inputContainer}>
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
          </View>
          <View style={{ paddingHorizontal: "20%" }}>
            <Button onPress={forgotPasswordHandler}>Xác nhận</Button>
          </View>
        </View>
      ) : (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center", gap: 10 }}
        >
          <Image
            style={styles.modalImage}
            source={require("../../assets/Green-Check.png")}
          />
          <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 2 }}>
            Reset mặt khẩu thành công!
          </Text>
          <Text style={{ fontSize: 20, fontWeight: "300", marginBottom: 2 }}> Vui lòng kiểm tra hộp thư của bạn.</Text>
          <View>
            <Button onPress={goToSingIn}>Quay về trang chủ</Button>
          </View>
        </View>
      )}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    gap: 15,
  },
  modalImage: {
    width: 200,
    height: 200,
  },
  img: {
    width: "100%",
    height: (screenHeight * 20) / 100,
    alignItems: "center",
    justifyContent: "center",
  },
  inputContainer: {
    height: (screenHeight * 10) / 100,
    marginTop: 5,
    paddingHorizontal: "15%",
  },
  invalidInput: {
    textAlign: "right",
    color: "red",
  },
  content: {
    marginVertical: "1%",
  },
  instruction: {
    marginHorizontal: "5%",
    textAlign: "center",
    fontSize: 16,
  },
});
