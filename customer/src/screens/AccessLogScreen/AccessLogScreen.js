import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import moment from "moment";
import { getProfile } from "../../../utils/Api/profile";

const AccessLogScreen = () => {
  const [name, setName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    getProfile()
      .then((res) => {
        const memberInfo = res.data?.memberInfo;
        if (memberInfo) {
          setName(memberInfo.name);
          setBirthday(memberInfo.birthday);
        } else {
          setError(true);
        }
      })
      .catch((err) => {
        console.log("Lỗi khi gọi API:", err);
        setError(true);
      });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Xin chào! {name || "(Không có tên)"}</Text>
        {error ? (
          <Text style={styles.text}>Không thể tải thông tin người dùng.</Text>
        ) : (
          <>
            <Text style={styles.text}>
              {birthday
                ? moment(birthday).format("DD/MM/YYYY")
                : "(Không có ngày sinh)"}
            </Text>
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "90%",
    alignItems: "center",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4, // dùng cho Android
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#333",
  },
  text: {
    fontSize: 18,
    marginBottom: 8,
    color: "#555",
  },
});

export default AccessLogScreen;
