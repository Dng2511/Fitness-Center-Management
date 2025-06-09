import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { createStaticNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import HomeScreen from "./src/screens/HomeScreen";
import SignInScreen from "./src/screens/SignInScreen";
import SignUpScreen from "./src/screens/SignUpScreen";

export default function App() {
  const [username, setUsername] = useState(null);

  useEffect(() => {
    async function checkUser() {
      let user = await AsyncStorage.getItem("user");
      user = JSON.parse(user);
      //console.log(user);
      if (user) {
        //console.log("User Found");
        setUsername(user.email);
      } else {
        //console.log("User Not Found");
      }
    }

    checkUser();
  }, []);

  const LogInStack = createStackNavigator({
    screens: {
      Home: HomeScreen,
      SignIn: SignInScreen,
      SignUp: SignUpScreen,
    },
    initialRouteName: username ? "Home" : "SignIn",
    screenOptions: {
      headerShown: false,
    },
  });

  const Navigation = createStaticNavigation(LogInStack);

  return (
    <View style={styles.container}>
      <Navigation />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FBFC",
  },
});
