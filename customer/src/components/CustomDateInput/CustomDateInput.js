import React, { useState } from "react";
import { View, Button, Platform, StyleSheet, Text } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

const CustomDateInput = ({ date, setDate }) => {
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    setShow(Platform.OS === "ios"); // ios giữ picker mở, android đóng picker khi chọn
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  return (
    <View style={styles.container}>
      <Button onPress={() => setShow(true)} title={date ? date.toLocaleDateString() : "Chọn ngày"} />
      {show && (
        <DateTimePicker
          value={date || new Date()}
          mode="date"
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
});

export default CustomDateInput;
