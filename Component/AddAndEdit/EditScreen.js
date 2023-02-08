import {
  Alert,
  Animated,
  Easing,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Checkbox, TextInput } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

const RegisterScreen = (props) => {
  const { navigation, route } = props;
  const { goBack } = navigation;
  const { id } = route.params;

  const maxlengthName = useRef(null);
  const maxlengthAddress = useRef(null);
  const [nameShop, setNameShop] = useState("");
  const [Address, setAddress] = useState("");
  const [Phonenumber, setPhonenumber] = useState("");
  const [linkLogo, setlinkLogo] = useState("");
  const [Status, setStatus] = useState(true);

  const [listShop, setlistShop] = useState([]);

  const animatedValue = useRef(new Animated.Value(-1000)).current;
  const [disable, setdisable] = useState(true);

  const checkDisableButton = () => {
    let condition = nameShop && Address && Phonenumber && linkLogo;
    setdisable(!condition);
  };
  useEffect(() => {
    checkDisableButton();
  }, [linkLogo, nameShop, Address, Phonenumber]);
  useEffect(() => {
    GetData();
  }, []);
  const SaveToList = async () => {
    let arrnew =  [...listShop].map((item) => {
      if (item.id == id) {
        item = {
          id: id,
          nameShop: nameShop,
          Address: Address,
          Phonenumber: Phonenumber,
          linkLogo: linkLogo,
        };
      }
      return item
    });
    setlistShop(arrnew);
    console.log(arrnew);
    try {
        await AsyncStorage.setItem("ListShop", JSON.stringify([...arrnew]));
    } catch (error) {}
  };

  const GetData = async () => {
    try {
      let list = await AsyncStorage.getItem("ListShop");
      setlistShop(list ? JSON.parse(list) : []);
      console.log(list);

      let a = JSON.parse(list).find((item) => item.id == id);
      console.log(a.id);
      setAddress(a.Address);
      setNameShop(a.nameShop);
      setlinkLogo(a.linkLogo);
      setPhonenumber(a.Phonenumber);
    } catch (error) {
      setlinkLogo([]);
    }
  };

  const LabelTextinput = (props) => {
    return (
      <Text
        style={{ color: "black", fontSize: 15, backgroundColor: "#FFECAA" }}
      >
        {props.label}
      </Text>
    );
  };
  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: 0,
      duration: 700,
      useNativeDriver: false,
      easing: Easing.inOut(Easing.ease),
    }).start();
  }, []);

  const styles = StyleSheet.create({
    container: {
      position: "absolute",
      height: "100%",
      width: "100%",
      backgroundColor: "#FFECAA",
      bottom: animatedValue,

      paddingTop: 20,
      paddingHorizontal: 25,
    },
    inputboder: {
      borderRadius: 10,
      borderWidth: 2,
      borderColor: "#050522",
    },
    input: {
      paddingVertical: 5,
      marginVertical: 10,
      fontSize: 15,
      backgroundColor: "#FFECAA",
    },
    button: {
      width: "100%",
      backgroundColor: "#FFDE69",
      marginVertical: 15,
      fontSize: 20,
      textAlign: "center",
      paddingVertical: 10,
      borderRadius: 15,
      fontWeight: "600",
    },
    button2: {
      backgroundColor: "#050522",
      borderWidth: 3,
      color: "#FFDE69",
      overflow: "hidden",
    },
  });

  return (
    <Animated.View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View>
            <Text style={{ fontSize: 20 }}>Hello...</Text>
            <Text style={{ fontSize: 30, fontWeight: "700" }}>EDIT SHOP</Text>
          </View>
          <TouchableOpacity onPress={null}>
            {/* <Image source={require("../../assets/img/Close.png")}></Image> */}
          </TouchableOpacity>
        </View>
        <TextInput
          mode="outlined"
          value={nameShop}
          onChangeText={(text) => {
            maxlengthName.current = text.length;
            setNameShop(text);
          }}
          dense={true}
          outlineStyle={styles.inputboder}
          label={<LabelTextinput label="Shop name" />}
          style={styles.input}
        />
        {maxlengthName.current == 0 ? (
          <Text style={{ fontSize: 13, color: "red" }}>
            Không được đẻ trống username
          </Text>
        ) : null}
        <TextInput
          value={Address}
          onChangeText={(text) => {
            maxlengthAddress.current = text.length;

            setAddress(text);
          }}
          mode="outlined"
          outlineStyle={styles.inputboder}
          label={<LabelTextinput label="Address" />}
          style={styles.input}
        />
        {maxlengthAddress.current == 0 ? (
          <Text style={{ fontSize: 13, color: "red" }}>
            Không được để trống mật khẩu{" "}
          </Text>
        ) : null}
        <TextInput
          value={Phonenumber}
          onChangeText={(text) => {
            setPhonenumber(text);
          }}
          mode="outlined"
          outlineStyle={[styles.inputboder]}
          label={<LabelTextinput label="Phonenumber" />}
          style={styles.input}
        />
        <TextInput
          value={linkLogo}
          onChangeText={(text) => {
            setlinkLogo(text);
          }}
          mode="outlined"
          outlineStyle={[styles.inputboder]}
          label={<LabelTextinput label="Link logo" />}
          style={styles.input}
        />
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Checkbox
            color="black"
            status={Status ? "checked" : "unchecked"}
            onPress={() => setStatus(!Status)}
          />
          <Text style={{ fontWeight: "600", fontSize: 16 }}> Status</Text>
        </View>

        <TouchableOpacity disabled={disable} onPress={SaveToList}>
          <Text
            style={[
              styles.button,
              styles.button2,
              {
                backgroundColor: disable ? "#474E68" : "#050522",
                borderColor: disable ? "#474E68" : "#050522",
              },
            ]}
          >
            Edit Shop
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            goBack();
          }}
        >
          <Text
            style={[
              styles.button,
              styles.button2,
              {
                backgroundColor: "#050522",
                borderColor: "#050522",
              },
            ]}
          >
            Cancel
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </Animated.View>
  );
};

export default RegisterScreen;
