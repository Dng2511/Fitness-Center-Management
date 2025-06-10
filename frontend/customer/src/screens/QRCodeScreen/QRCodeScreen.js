import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  SafeAreaView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import QRCode from "react-native-qrcode-svg";

import CustomButton from "../../components/CustomButton/CustomButton";

const QRCodeScreen = () => {
  const [token, setToken] = useState("");
  const [toggle, setToggle] = useState(false);
  const [password, setPassword] = useState(null);
  const [onChangeData, setOnChangeData] = useState(false);

  useEffect(() => {
    const loadToken = async () => {
      const storedToken = await AsyncStorage.getItem("token");
      console.log(storedToken)
      setToken(storedToken || "");
    };
    loadToken();

    // Lấy password cũ nếu cần
    // get("/config").then((res) => setPassword(res.data.config_password));
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.qrContainer}>
        {token ? (
          <QRCode value={token} size={250} />
        ) : (
          <Text>Loading</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "90%",
    paddingTop: 22,
    justifyContent: "center",
    alignItems: "center",
  },
  qrContainer: {
    marginVertical: 10,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
  },
});

export default QRCodeScreen;
