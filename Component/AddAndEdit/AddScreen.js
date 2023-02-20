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
import { POST } from "../../APIconfig";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";

const RegisterScreen = (props) => {
  const { navigation } = props;
  const { goBack } = navigation;

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
  }, [linkLogo, nameShop, Address, Phonenumber, Status]);

  const SaveToList = async () => {
    let newObj = {
      nameShop: nameShop,
      Address: Address,
      Phonenumber: Phonenumber,
      linkLogo: linkLogo,
      status: Status,
    };
    POST(newObj);
    handleShowAlert();
  };

  const handleShowAlert = () => {
    Alert.alert(
      "Success!",
      "Your action was successful.",
      [
        {
          text: "OK",
          onPress: () => navigation.goBack(),
        },
      ],
      {
        type: "success", // set the alert type to success
        style: { backgroundColor: "green", color: "white" }, // customize the alert style
      }
    );
  };
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    console.log(result);

    if (!result.canceled) {
      const base64 = await FileSystem.readAsStringAsync(result.assets[0].uri, {
        encoding: "base64",
      });
      setlinkLogo(`data:image/jpg;base64,` + base64);
      console.log(`data:image/jpg;base64,` + base64);
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
  // const closeScreen = (nameScreen) => {
  //   Animated.timing(animatedValue, {
  //     toValue: -1000,
  //     duration: 700,
  //     useNativeDriver: false,
  //     easing: Easing.inOut(Easing.ease),
  //   }).start();

  //   setTimeout(() => {
  //     setshowScreen(nameScreen);
  //   }, 700);
  // };

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
      width: "100%",
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
            <Text style={{ fontSize: 30, fontWeight: "700" }}>ADD SHOP</Text>
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
        <View
          style={{ flexDirection: "row", width: "100%", alignItems: "center" }}
        >
          <TouchableOpacity
            style={{
              width: "25%",
              backgroundColor: "#4D455D",
              paddingHorizontal: 10,
              paddingVertical: 10,
              marginRight: 5,
              borderRadius: 5,
            }}
            onPress={(event) => {
              pickImage();
            }}
          >
            <Text style={{ color: "white", textAlign: "center" }}>Chose</Text>
          </TouchableOpacity>
          <TextInput
            value={linkLogo}
            onChangeText={(text) => {
              setlinkLogo(text);
            }}
            mode="outlined"
            outlineStyle={[styles.inputboder, { width: "73%" }]}
            label={<LabelTextinput label="Link logo" />}
            style={styles.input}
          />
        </View>

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
            Add Shop
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
