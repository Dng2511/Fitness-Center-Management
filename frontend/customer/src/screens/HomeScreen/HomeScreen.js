import { useFonts, loadAsync } from "expo-font";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { TabBar, Icon } from "@ant-design/react-native";

import AccessLogScreen from "../AccessLogScreen";
import DoorManagerScreen from "../DoorManagerScreen";
import ChangeCardIdScreen from "../ChangeCardIdScreen";
import QRCodeScreen from "../QRCodeScreen";
import ProfileScreen from "../ProfileScreen";

const HomeScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    loadAsync({
      antoutline: require("@ant-design/icons-react-native/fonts/antoutline.ttf"),
    });
  }, []);

  const [selectedTab, setSelectedTab] = useState("Log");
  const onChangeTab = (tabName) => {
    setSelectedTab(tabName);
  };

  const TabBarIcon = ({ iconName, onFocus }) => {
    return (
      <Icon
        name={iconName}
        style={{ fontSize: 20, color: onFocus ? "blue" : "" , textAlign: "center", width: 24}}
      />
    );
  };

  const renderContent = (pageText) => {
    switch (pageText) {
      case "Access Log Page":
        return (
          <View
            style={{
              marginTop: 50,
              alignItems: "center",
              backgroundColor: "white",
            }}
          >
            <AccessLogScreen></AccessLogScreen>
          </View>
        );

      case "Open/Close doors Page":
        return (
          <View
            style={{
              marginTop: 50,
              alignItems: "center",
              backgroundColor: "white",
              paddingBottom: 60
            }}
          >
            <DoorManagerScreen></DoorManagerScreen>
          </View>
        );

      case "QR Code Page":
        return (
          <View
            style={{
              marginTop: 50,
              alignItems: "center",
              backgroundColor: "white",
              paddingBottom: 60
            }}
          >
            <QRCodeScreen></QRCodeScreen>
          </View>
        );

      case "Profile Page":
        return (
          <View
            style={{
              marginTop: 50,
              alignItems: "center",
              backgroundColor: "white",
              paddingBottom: 60
            }}
          >
            <ProfileScreen></ProfileScreen>
          </View>
        );

      default:
        return (
          <View
            style={{
              marginTop: 50,
              alignItems: "center",
              backgroundColor: "white",
              paddingBottom: 60
            }}
          >
            <AccessLogScreen></AccessLogScreen>
          </View>
        );
    }
  };

  const onLogout = async () => {
    await AsyncStorage.removeItem("user");
    await AsyncStorage.removeItem("token")

    navigation.navigate("SignIn");
  };

  return (
    <View style={{ flex: 1 }}>
      <TabBar
        unselectedTintColor="#949494"
        tintColor="#33A3F4"
        barTintColor="#f5f5f5"
        tabBarPosition="bottom"
        style={{ height: 90 }}
      >
        <TabBar.Item
          title="Home"
          icon={
            <TabBarIcon
              iconName="audit"
              onFocus={selectedTab === "Log" ? true : false}
            />
          }
          selected={selectedTab === "Log"}
          onPress={() => onChangeTab("Log")}
        >
          {renderContent("Access Log Page")}
        </TabBar.Item>


        <TabBar.Item
          icon={
            <TabBarIcon
              iconName="qrcode" // ← đổi từ "video-camera" sang "qrcode"
              onFocus={selectedTab === "QRCode" ? true : false}
            />
          }
          title="QR Code"
          selected={selectedTab === "QRCode"}
          onPress={() => onChangeTab("QRCode")}
        >
          {renderContent("QR Code Page")}
        </TabBar.Item>

        <TabBar.Item
          icon={
            <TabBarIcon
              iconName="profile" // ← đổi từ "video-camera" sang "qrcode"
              onFocus={selectedTab === "Profile" ? true : false}
            />
          }
          title="Tôi"
          selected={selectedTab === "Profile"}
          onPress={() => onChangeTab("Profile")}
        >
          {renderContent("Profile Page")}
        </TabBar.Item>

        
      </TabBar>
    </View>
  );
};

export default HomeScreen;
