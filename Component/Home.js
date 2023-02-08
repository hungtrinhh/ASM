import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

const Home = (props) => {
  let logo = "https://i.imgur.com/5EK1lFm.png";
  const { navigation } = props;
  const { navigate } = navigation;
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: logo,
        }}
        style={{ width: "40%", height: "20%", resizeMode: "contain" }}
      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          width: "100%",
        }}
      >
        <TouchableOpacity onPress={() => navigate("Profile")}>
          <Text style={styles.button}>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigate("Manager")}>
          <Text style={[styles.button]}>Manager</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Home;
 const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#050522",
    alignItems: "center",
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#FFDE69",
    borderRadius: 15,
    color: "#050522",
    fontWeight: "600",
    width: 100,
    textAlign: "center",
  },
});
