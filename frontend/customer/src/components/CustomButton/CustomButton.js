import React from "react";
import { Text, StyleSheet, Pressable, useWindowDimensions } from "react-native";

const CustomButton = ({ text, onPress, type = "PRIMARY" }) => {
  const { height, width } = useWindowDimensions();

  return (
    <Pressable
      style={[
        style.container,
        style[`container_${type}`],
        { width: width * 0.7 },
      ]}
      onPress={onPress}
    >
      <Text style={[style.text, style[`text_${type}`]]}>{text}</Text>
    </Pressable>
  );
};

const style = StyleSheet.create({
  container: {
    padding: 10,
    alignItems: "center",

    margin: 10,
    borderRadius: 15,
  },
  container_PRIMARY: {
    backgroundColor: "blue",
  },
  container_TERTIARY: {
    borderWidth: 1,
  },

  text: {
    color: "white",
    fontWeight: "bold",
  },
  text_PRIMARY: {
    color: "white",
  },
  text_TERTIARY: {
    color: "black",
  },
});

export default CustomButton;
