import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Manager = (props) => {
  const { navigation } = props;
  const { navigate, goBack } = navigation;
  const [listShop, setlistShop] = useState([]);

  useEffect(() => {
    GetData();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      GetData();
    });
  }, [navigation]);

  const Delete = async (itemId) => {
    const newArr = listShop.filter((item) => item.id != itemId);
    await AsyncStorage.setItem("ListShop", JSON.stringify(newArr));
    setlistShop(newArr);
  };

  const GetData = async () => {
    let Arr = await AsyncStorage.getItem("ListShop");
    setlistShop(Arr ? JSON.parse(Arr) : []);
  };

  const RenderItem = (props) => {
    let logoDefaut =
      "https://wowmart.vn/wp-content/uploads/2020/10/null-image.png";

    const { item } = props;
    const [linkimage, setlinkimage] = useState(item.linkLogo);

    return (
      <View
        style={{
          borderRadius: 15,
          paddingHorizontal: 10,
          width: "100%",
          flexDirection: "row",
          backgroundColor: "#50577A",
          marginVertical: 10,
          paddingVertical: 5,
        }}
      >
        <View
          style={{
            backgroundColor: "white",
            padding: 3,
            borderRadius: 10,
            justifyContent: "center",
          }}
        >
          <Image
            onError={() => setlinkimage(logoDefaut)}
            source={{ uri: linkimage }}
            style={{
              width: 50,
              height: 50,
              borderRadius: 5000,
              overflow: "hidden",
            }}
          />
        </View>
        <View style={{ marginHorizontal: 10 }}>
          <Text style={{ color: "#EEEEEE", fontWeight: "700", fontSize: 20 }}>
            name shop: {item.nameShop}
          </Text>
          <Text style={{ color: "#EEEEEE", fontWeight: "700", fontSize: 17 }}>
            Address: {item.Address}
          </Text>
          <Text style={{ color: "#EEEEEE", fontWeight: "700", fontSize: 17 }}>
            Phonenumber: {item.Phonenumber}
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            alignItems: "flex-end",
            justifyContent: "center",
          }}
        >
          <TouchableOpacity
            style={{ marginBottom: 10 }}
            onPress={() => Delete(item.id)}
          >
            <Image
              source={require("../assets/trash.png")}
              style={{ width: 25, height: 25 }}
            ></Image>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigate("Edit", { id: item.id });
            }}
          >
            <Image
              source={require("../assets/edit.png")}
              style={{ width: 25, height: 25 }}
            ></Image>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          style={{ width: "40%" }}
          onPress={() => navigate("Add")}
        >
          <Text style={styles.button}>Thêm</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ width: "40%" }} onPress={() => goBack()}>
          <Text style={styles.button}>Back</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        style={{ width: "90%" }}
        data={listShop}
        renderItem={({ item }) => <RenderItem item={item} />}
      />
    </View>
  );
};

export default Manager;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#050522",
    alignItems: "center",
    paddingTop: 20,
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
  },
});
