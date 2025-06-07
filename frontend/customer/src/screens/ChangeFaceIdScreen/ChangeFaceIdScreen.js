import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  Image,
  Pressable,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

import axios from "axios";

import { get, post } from "../../../utils/Api";
import CustomInput from "../../components/CustomInput/CustomInput";
import CustomButton from "../../components/CustomButton/CustomButton";

const formData = global.FormData;

const ChangeFaceIdScreen = () => {
  const [image, setImage] = useState(null);
  const [toggle, setToggle] = useState(false);
  const [password, setPassword] = useState(null);
  const [onChangeData, setOnChangeData] = useState(false);

  useEffect(() => {
    get("/config").then((res) => {
      setPassword(res.data.config_password);
    });
  }, []);

  const faceRecognition = async () => {
    await ImagePicker.requestCameraPermissionsAsync();

    let result = await ImagePicker.launchCameraAsync({
      cameraType: ImagePicker.CameraType.front,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      await saveImage(result.assets[0].uri);
    }
  };

  const saveImage = async (uri) => {
    try {
      setImage(uri);
    } catch (error) {
      console.log(error);
    }
  };

  const sendData = async (uri) => {
    if (uri) {
      const formData = new FormData();
      formData.append("image", {
        uri: image,
        name: "config.jpg",
        type: "image/jpeg",
      });
      const config = {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      axios
        .post(
          "http://172.20.10.6:2701/api/v1/control/image",
          formData,
          config
        )
        .then((res) => {
          setImage(uri);
          console.log("Success: " + res.data);
        })
        .catch((error) => {
          console.log("Error: " + error);
        });

      setOnChangeData(!onChangeData);
    }

    try {
      post("/config", { password });
    } catch (error) {
      throw error;
    }
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={{
          uri: image
            ? image
            : `http://172.20.10.6:2701/api/v1/control/image?timestamp=${new Date().getTime()}`,
        }}
      ></Image>
      {onChangeData ? (
        <>
          <Pressable style={styles.faceIdButton} onPress={faceRecognition}>
            <Text style={{ color: "white", fontWeight: "bold" }}>
              Change FaceId
            </Text>
          </Pressable>
          <CustomInput
            value={password}
            setValue={setPassword}
            secure={true}
          ></CustomInput>

          <SafeAreaView style={{ marginTop: 20 }}>
            <CustomButton
              text="Submit"
              onPress={() => {
                sendData(image);
              }}
            ></CustomButton>
            <CustomButton
              text="Cancel"
              onPress={() => setOnChangeData(!onChangeData)}
            ></CustomButton>
          </SafeAreaView>
        </>
      ) : (
        <>
          <Pressable onPress={() => setToggle(!toggle)}>
            <Text style={styles.password}>
              Current password:{" "}
              <Text style={{ visible: "hidden" }}>
                {toggle ? password : "******"}
              </Text>
            </Text>
          </Pressable>

          <CustomButton
            text="Change Config Data"
            onPress={() => setOnChangeData(!onChangeData)}
          ></CustomButton>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "80%",
    paddingTop: 22,
    alignItems: "center",
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 10,
  },
  password: {
    marginTop: 20,
    marginBottom: 20,

    paddingVertical: 10,
    paddingHorizontal: 40,

    borderWidth: 1,
    borderRadius: 15,
  },
  faceIdButton: {
    marginBottom: 20,

    paddingVertical: 10,
    paddingHorizontal: 40,

    borderWidth: 1,
    borderRadius: 15,

    backgroundColor: "blue",
  },
});

export default ChangeFaceIdScreen;
