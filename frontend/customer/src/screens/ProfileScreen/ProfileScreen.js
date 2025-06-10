import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
import { getProfile } from "../../../utils/Api/profile";
import { getPackages } from "../../../utils/Api/package";

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [packages, setPackages] = useState([])
  const [name, setName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(true);
  const [userPackageId, setUserPackageId] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    loadUserProfile();
  }, []);

  const loadUserProfile = async () => {
    try {
      setLoading(true);
      const packRes = await getPackages();
      setPackages(packRes.data?.content);
      const response = await getProfile();
      const memberInfo = response.data?.memberInfo;
      
      if (memberInfo) {
        setName(memberInfo.name || "");
        setBirthday(memberInfo.birthday || "");
        setEmail(response.data?.username || "");
        setPhone(memberInfo.phone_number || "");
        setUserPackageId(memberInfo.package_id || null)
        setError(false);

      } else {
        setError(true);
      }
    } catch (err) {
      console.log("Lỗi khi tải thông tin profile:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  // Tạo avatar từ tên
  const generateAvatar = (fullName) => {
    if (!fullName) return "?";
    
    const nameParts = fullName.trim().split(" ");
    if (nameParts.length === 1) {
      return nameParts[0].charAt(0).toUpperCase();
    } else {
      // Lấy chữ cái đầu của tên và họ
      const firstName = nameParts[0].charAt(0).toUpperCase();
      const lastName = nameParts[nameParts.length - 1].charAt(0).toUpperCase();
      return firstName + lastName;
    }
  };

  // Tạo màu avatar từ tên
  const generateAvatarColor = (fullName) => {
    if (!fullName) return "#007AFF";
    
    const colors = [
      "#007AFF", "#5856D6", "#AF52DE", "#FF2D92",
      "#FF3B30", "#FF9500", "#FFCC02", "#34C759",
      "#00C7BE", "#007AFF", "#5AC8FA", "#007AFF"
    ];
    
    let hash = 0;
    for (let i = 0; i < fullName.length; i++) {
      hash = fullName.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    return colors[Math.abs(hash) % colors.length];
  };

  const handleEditProfile = () => {
    // Điều hướng đến màn hình chỉnh sửa profile
    navigation.navigate("EditProfile", {
      currentData: { name, birthday, email, phone }
    });
  };

  const handleLogout = () => {
    Alert.alert(
      "Đăng xuất",
      "Bạn có chắc chắn muốn đăng xuất?",
      [
        {
          text: "Hủy",
          style: "cancel"
        },
        {
          text: "Đăng xuất",
          style: "destructive",
          onPress: async () => {
            try {
              await AsyncStorage.removeItem("user");
              await AsyncStorage.removeItem("token");
              navigation.navigate("SignIn");
            } catch (error) {
              console.log("Lỗi khi đăng xuất:", error);
            }
          }
        }
      ]
    );
  };

  const handleRefresh = () => {
    loadUserProfile();
  };

  // Render package item
  const renderPackageItem = (pkg) => {
    const isUserPackage = pkg.id === userPackageId;
    
    return (
      <View 
        key={pkg.id} 
        style={[
          styles.packageItem,
          isUserPackage && styles.activePackageItem
        ]}
      >
        <View style={styles.packageHeader}>
          <Text style={[
            styles.packageName,
            isUserPackage && styles.activePackageText
          ]}>
            {pkg.package_name || "Gói dịch vụ"}
          </Text>
          {isUserPackage && (
            <View style={styles.checkmarkContainer}>
              <Text style={styles.checkmark}>✓</Text>
            </View>
          )}
        </View>
        
        <Text style={[
          styles.packagePrice,
          isUserPackage && styles.activePackageText
        ]}>
          {pkg.price ? `${pkg.price.toLocaleString()} VNĐ` : "Liên hệ"}
        </Text>
        
        {pkg.description && (
          <Text style={[
            styles.packageDescription,
            isUserPackage && styles.activePackageSubtext
          ]}>
            {pkg.description}
          </Text>
        )}
        
        {pkg.duration && (
          <Text style={[
            styles.packageDuration,
            isUserPackage && styles.activePackageSubtext
          ]}>
            Thời hạn: {pkg.duration} ngày
          </Text>
        )}
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Đang tải thông tin...</Text>
        </View>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header với Avatar */}
      <View style={styles.headerContainer}>
        <View style={[
          styles.avatarContainer,
          { backgroundColor: generateAvatarColor(name) }
        ]}>
          <Text style={styles.avatarText}>
            {generateAvatar(name)}
          </Text>
        </View>
        <Text style={styles.nameText}>{name || "Chưa có tên"}</Text>
      </View>

      {/* Packages Section */}
      <View style={styles.packagesSection}>
        <Text style={styles.sectionTitle}>Gói dịch vụ</Text>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.packagesContainer}
        >
          {packages && packages.length > 0 ? (
            packages.map(renderPackageItem)
          ) : (
            <View style={styles.noPackagesContainer}>
              <Text style={styles.noPackagesText}>Không có gói dịch vụ nào</Text>
            </View>
          )}
        </ScrollView>
      </View>

      {/* Thông tin cá nhân */}
      <View style={styles.infoCard}>
        <Text style={styles.cardTitle}>Thông tin cá nhân</Text>
        
        {error ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>Không thể tải thông tin người dùng</Text>
            <TouchableOpacity onPress={handleRefresh} style={styles.retryButton}>
              <Text style={styles.retryText}>Thử lại</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <View style={styles.infoRow}>
              <View style={styles.infoIcon}>
                <Text style={styles.iconText}>👤</Text>
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Họ và tên</Text>
                <Text style={styles.infoValue}>{name || "Chưa cập nhật"}</Text>
              </View>
            </View>

            <View style={styles.infoRow}>
              <View style={styles.infoIcon}>
                <Text style={styles.iconText}>📦</Text>
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Gói đăng ký</Text>
                <Text style={styles.infoValue}>
                  {packages?.find(pkg => pkg.id === userPackageId)?.name || "Chưa đăng ký"}
                </Text>
              </View>
            </View>

            <View style={styles.infoRow}>
              <View style={styles.infoIcon}>
                <Text style={styles.iconText}>🎂</Text>
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Ngày sinh</Text>
                <Text style={styles.infoValue}>
                  {birthday ? moment(birthday).format("DD/MM/YYYY") : "Chưa cập nhật"}
                </Text>
              </View>
            </View>

            <View style={styles.infoRow}>
              <View style={styles.infoIcon}>
                <Text style={styles.iconText}>📧</Text>
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Email</Text>
                <Text style={styles.infoValue}>{email || "Chưa cập nhật"}</Text>
              </View>
            </View>

            <View style={styles.infoRow}>
              <View style={styles.infoIcon}>
                <Text style={styles.iconText}>📱</Text>
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Số điện thoại</Text>
                <Text style={styles.infoValue}>{phone || "Chưa cập nhật"}</Text>
              </View>
            </View>
          </>
        )}
      </View>

      {/* Các tùy chọn */}
      <View style={styles.optionsCard}>
        <Text style={styles.cardTitle}>Tùy chọn</Text>
        
        <TouchableOpacity 
          style={styles.optionButton} 
          onPress={handleEditProfile}
          disabled={error}
        >
          <View style={styles.optionIcon}>
            <Text style={styles.iconText}>✏️</Text>
          </View>
          <View style={styles.optionContent}>
            <Text style={styles.optionText}>Chỉnh sửa thông tin</Text>
            <Text style={styles.optionSubtext}>Cập nhật thông tin cá nhân</Text>
          </View>
          <Text style={styles.optionArrow}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionButton} onPress={handleLogout}>
          <View style={styles.optionIcon}>
            <Text style={styles.iconText}>🚪</Text>
          </View>
          <View style={styles.optionContent}>
            <Text style={[styles.optionText, styles.logoutText]}>Đăng xuất</Text>
            <Text style={styles.optionSubtext}>Thoát khỏi tài khoản</Text>
          </View>
          <Text style={styles.optionArrow}>›</Text>
        </TouchableOpacity>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Phiên bản 1.0.0</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
  },
  headerContainer: {
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 30,
    backgroundColor: '#fff',
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
  },
  nameText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  refreshButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 16,
  },
  refreshText: {
    fontSize: 14,
    color: '#666',
  },
  // Packages Section Styles
  packagesSection: {
    backgroundColor: '#fff',
    marginTop: 8,
    paddingVertical: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 16,
    marginBottom: 16,
  },
  packagesContainer: {
    paddingHorizontal: 16,
  },
  packageItem: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 16,
    marginRight: 12,
    minWidth: 200,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  activePackageItem: {
    backgroundColor: '#d4edda',
    borderColor: '#34c759',
    borderWidth: 2,
  },
  packageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  packageName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  activePackageText: {
    color: '#155724',
  },
  checkmarkContainer: {
    backgroundColor: '#34c759',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  checkmark: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  packagePrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 8,
  },
  packageDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 6,
    lineHeight: 20,
  },
  activePackageSubtext: {
    color: '#155724',
  },
  packageDuration: {
    fontSize: 12,
    color: '#999',
    fontStyle: 'italic',
  },
  noPackagesContainer: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  noPackagesText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  infoCard: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 12,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  errorContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  errorText: {
    fontSize: 16,
    color: '#ff3b30',
    marginBottom: 12,
    textAlign: 'center',
  },
  retryButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#007AFF',
    borderRadius: 8,
  },
  retryText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  infoIcon: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    borderRadius: 20,
    marginRight: 16,
  },
  iconText: {
    fontSize: 18,
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  optionsCard: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 12,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  optionIcon: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    borderRadius: 20,
    marginRight: 16,
  },
  optionContent: {
    flex: 1,
  },
  optionText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
    marginBottom: 4,
  },
  logoutText: {
    color: '#ff3b30',
  },
  optionSubtext: {
    fontSize: 14,
    color: '#666',
  },
  optionArrow: {
    fontSize: 20,
    color: '#ccc',
    fontWeight: 'bold',
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 20,
    marginTop: 20,
  },
  footerText: {
    fontSize: 14,
    color: '#999',
  },
});

export default ProfileScreen;