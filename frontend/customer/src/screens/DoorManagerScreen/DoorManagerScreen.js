import React from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";
import WebView from "react-native-webview";

import { get } from "../../../utils/Api";
import CustomButton from "../../components/CustomButton/CustomButton";

const formData = global.FormData;

const DoorManagerScreen = () => {
  const onOpenDoorPressed = () => {
    get("/control/unlock").then((res) => {
      //console.log(res);
      alert("Door opened");
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <WebView
        style={{ marginTop: 20, width: "100%", height: "100%" }}
        source={{
          uri: "http://192.168.137.241:81/stream",
        }}
        originWhitelist={["*"]}
      ></WebView>

      <CustomButton text="Open door" onPress={onOpenDoorPressed}></CustomButton>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "70%",
    paddingTop: 22,
    justifyContent: "center",
  },
  image: {
    width: 200,
    height: 200,
  },
});

export default DoorManagerScreen;
