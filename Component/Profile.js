import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";

const Profile = (props) => {
  const { navigation } = props;
  const { navigate, goBack } = navigation;
  let linkAvt =
    "https://vnn-imgs-a1.vgcloud.vn/image1.ictnews.vn/_Files/2020/03/17/trend-avatar-1.jpg";

  return (
    <View style={styles.container}>
      <Image
        style={{ width: 250, height: 250, borderRadius: 1000 }}
        source={{ uri: linkAvt }}
      />
      <View style={{ height: 30 }} />
      <Text style={styles.text}>Họ và tên: Trịnh Đức Hùng</Text>
      <Text style={styles.text}>MSSV: PH27731</Text>

      <TouchableOpacity
        onPress={() => {
          navigate("Manager");
        }}
        style={{ width: "100%" }}
      >
        <Text style={[styles.button]}>Manager</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          goBack();
        }}
        style={{ width: "100%", marginTop: 20 }}
      >
        <Text style={[styles.button]}>Back</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#050522",
    alignItems: "center",
  },
  text: {
    color: "white",
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 10,
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#FFDE69",
    borderRadius: 15,
    color: "#050522",
    fontWeight: "600",
    width: "90%",
    textAlign: "center",
    alignSelf: "center",
    fontSize: 20,
    fontWeight: "600",
  },
});
