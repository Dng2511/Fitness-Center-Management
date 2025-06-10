import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import moment from "moment";
import { getProfile } from "../../../utils/Api/profile";

const AccessLogScreen = () => {
  const [name, setName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [error, setError] = useState(false);
  const [currentDate, setCurrentDate] = useState(moment());

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

  const goToPreviousMonth = () => {
    setCurrentDate(currentDate.clone().subtract(1, 'month'));
  };

  const goToNextMonth = () => {
    setCurrentDate(currentDate.clone().add(1, 'month'));
  };

  const renderCalendar = () => {
    const startOfMonth = currentDate.clone().startOf('month');
    const endOfMonth = currentDate.clone().endOf('month');
    const startOfWeek = startOfMonth.clone().startOf('week');
    const endOfWeek = endOfMonth.clone().endOf('week');
    
    const today = moment();
    const calendar = [];
    const current = startOfWeek.clone();

    // Header với tên tháng và nút điều hướng
    calendar.push(
      <View key="header" style={styles.calendarHeader}>
        <TouchableOpacity onPress={goToPreviousMonth} style={styles.navButton}>
          <Text style={styles.navButtonText}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.monthText}>
          {currentDate.format('MMMM YYYY')}
        </Text>
        <TouchableOpacity onPress={goToNextMonth} style={styles.navButton}>
          <Text style={styles.navButtonText}>›</Text>
        </TouchableOpacity>
      </View>
    );

    // Header các ngày trong tuần
    const weekDays = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
    calendar.push(
      <View key="weekdays" style={styles.weekDaysRow}>
        {weekDays.map((day, index) => (
          <Text key={index} style={styles.weekDayText}>{day}</Text>
        ))}
      </View>
    );

    // Các ngày trong tháng
    while (current.isSameOrBefore(endOfWeek, 'day')) {
      const week = [];
      for (let i = 0; i < 7; i++) {
        const day = current.clone();
        const isCurrentMonth = day.isSame(currentDate, 'month');
        const isToday = day.isSame(today, 'day');
        
        week.push(
          <TouchableOpacity 
            key={day.format('YYYY-MM-DD')} 
            style={[
              styles.dayCell,
              isToday && styles.todayCell,
              !isCurrentMonth && styles.otherMonthCell
            ]}
          >
            <Text style={[
              styles.dayText,
              isToday && styles.todayText,
              !isCurrentMonth && styles.otherMonthText
            ]}>
              {day.format('D')}
            </Text>
          </TouchableOpacity>
        );
        current.add(1, 'day');
      }
      
      calendar.push(
        <View key={current.format('YYYY-MM-DD')} style={styles.weekRow}>
          {week}
        </View>
      );
    }

    return calendar;
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.card}>
        <Text style={styles.title}>Xin chào! {name || "(Không có tên)"}</Text>
        {error ? (
          <Text style={styles.text}>Không thể tải thông tin người dùng.</Text>
        ) : (
          <>
            <Text style={styles.text}>
              Đây là lịch của bạn
            </Text>
          </>
        )}
      </View>

      <View style={styles.calendarCard}>
        <Text style={styles.calendarTitle}>Lịch</Text>
        {renderCalendar()}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    marginHorizontal: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#333",
    textAlign: 'center',
  },
  text: {
    fontSize: 16,
    marginBottom: 8,
    color: "#555",
    textAlign: 'center',
  },
  calendarCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  calendarTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#333",
    textAlign: 'center',
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  navButton: {
    //padding: 8,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  monthText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  weekDaysRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  weekDayText: {
    flex: 1,
    textAlign: 'center',
    fontSize: 12,
    fontWeight: 'bold',
    color: '#666',
    paddingVertical: 6,
  },
  weekRow: {
    flexDirection: 'row',
  },
  dayCell: {
    flex: 1,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 1,
    borderRadius: 6,
  },
  todayCell: {
    backgroundColor: '#007AFF',
  },
  otherMonthCell: {
    opacity: 0.3,
  },
  dayText: {
    fontSize: 14,
    color: '#333',
  },
  todayText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  otherMonthText: {
    color: '#ccc',
  },
});

export default AccessLogScreen;