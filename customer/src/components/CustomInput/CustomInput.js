import React from "react";
import { View, TextInput, StyleSheet, useWindowDimensions } from "react-native";

const CustomInput = ({ value, setValue, placeholder, secure, size = 0.05 }) => {
  const { height, width } = useWindowDimensions();

  return (
    <View style={style.container}>
      <TextInput
        style={[style.input, { width: width * 0.7, height: height * size }]}
        value={value}
        onChangeText={setValue}
        placeholder={placeholder}
        secureTextEntry={secure}
      ></TextInput>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 15,

    marginVertical: 5,
    paddingHorizontal: 10,
  },
  input: {
    //margin: 12,
  },
});

export default CustomInput;
