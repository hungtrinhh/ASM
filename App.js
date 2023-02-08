import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import AddScreen from "./Component/AddAndEdit/AddScreen";
import Home from "./Component/Home";
import Manager from "./Component/Manager";
import Profile from "./Component/Profile";
import EditScreen from "./Component/AddAndEdit/EditScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" hidden={true} />
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="Manager" component={Manager} />
          <Stack.Screen name="Add" component={AddScreen} />
          <Stack.Screen name="Edit" component={EditScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
