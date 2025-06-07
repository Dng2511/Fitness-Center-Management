import axios from "axios"
import AsyncStorage from '@react-native-async-storage/async-storage';

export const Http = axios.create({
    baseURL: "http://192.168.1.3:8000",
})

Http.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});