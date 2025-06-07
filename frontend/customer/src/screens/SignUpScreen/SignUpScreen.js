import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";

import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import { register } from "../../../utils/Api/authService";

const formData = global.FormData;

const SignUpScreen = () => {
  const navigation = useNavigation();

  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [date, setDate] = useState(null);

  const onSignInPressed = () => {
    navigation.navigate("SignIn");
  };

  const onRegisterPressed = async () => {
    if (confirmPassword != password) {
      alert("Passwords do not match");
      return;
    }

    let data = {
      name: fullname,
      username: username,
      password: password,
      phone_number: phoneNumber,
      birthday: date,
      address: address,

    };

    register(data).then((res) => {
      console.log(res);
      alert("Account created successfully");
      navigation.navigate("SignIn");
    })
      .catch((error) => {
        alert(error.response.data.message);
      });
  };

  return (
    <ScrollView>
      <View style={style.container}>
        <Text style={style.title}>Create an account</Text>

        <CustomInput
          placeholder="Email"
          value={username}
          setValue={setUsername}
          secure={false}
        ></CustomInput>
        <CustomInput
          placeholder="name"
          value={fullname}
          setValue={setFullname}
          secure={false}
        ></CustomInput>
        <CustomInput
          placeholder="Password"
          value={password}
          setValue={setPassword}
          secure={true}
        ></CustomInput>
        <CustomInput
          placeholder="Confirm Password"
          value={confirmPassword}
          setValue={setConfirmPassword}
          secure={true}
        ></CustomInput>
        <CustomInput
          placeholder="Phone Number"
          value={phoneNumber}
          setValue={setPhoneNumber}
          secure={false}
        ></CustomInput>

        <CustomInput
          value={date}
          setValue={setDate}
          placeholder="Nhập ngày sinh (YYYY-MM-DD)"
          secure={false}
        />


        <CustomInput
          placeholder="Address"
          value={address}
          setValue={setAddress}
          secure={false}
        ></CustomInput>

        <CustomButton
          text="Sign Up"
          onPress={onRegisterPressed}
          type="PRIMARY"
        ></CustomButton>
        <CustomButton
          text="Already has a account? Login here!"
          onPress={onSignInPressed}
          type="TERTIARY"
        ></CustomButton>
      </View>
    </ScrollView>
  );
};

const style = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    margin: 20,
    fontSize: 30,
    color: "#051C60",
    fontWeight: "bold",
  },
});

export default SignUpScreen;
