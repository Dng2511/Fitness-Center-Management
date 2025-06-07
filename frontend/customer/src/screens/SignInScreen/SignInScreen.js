import React, { useState } from "react";
import { View, Image, StyleSheet, useWindowDimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Logo from "../../../assets/images/key.png";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import { login } from "../../../utils/Api/authService";

const SignInScreen = () => {
  const navigation = useNavigation();
  const { height, width } = useWindowDimensions();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onSignInPressed = async () => {
    login({ username, password }).then(async ({ data }) => {
      await AsyncStorage.setItem("username", JSON.stringify(data.role));
      await AsyncStorage.setItem("token", data.access_token);
      navigation.navigate("Home");
    }).catch((error) => {
      console.log(error);
      console.log()
      alert(error);
    });
  };

  const onSignUpPressed = () => {
    navigation.navigate("SignUp");
  };

  return (
    <View style={style.container}>
      <Image
        source={Logo}
        style={[style.logo, { height: height * 0.5, width: width * 0.7 }]}
      ></Image>

      <CustomInput
        placeholder="Email"
        value={username}
        setValue={setUsername}
        secure={false}
      ></CustomInput>
      <CustomInput
        placeholder="Password"
        value={password}
        setValue={setPassword}
        secure={true}
      ></CustomInput>

      <CustomButton
        text="Sign In"
        onPress={onSignInPressed}
        type="PRIMARY"
      ></CustomButton>
      <CustomButton
        text="Don't have one yet? Create one here!"
        onPress={onSignUpPressed}
        type="TERTIARY"
      ></CustomButton>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    margin: 20,
    maxWidth: 200,
    maxHeight: 200,
  },
});

export default SignInScreen;
