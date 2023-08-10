import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  View,
  Alert,
  StyleSheet,
  Switch,
  Text,
  ScrollView,
} from "react-native";
import { useTheme } from "react-native-paper";

import Database from "../classes/DatabaseClass";
import Button from "../components/Button";

function SettingsPage() {
  const theme = useTheme();
  const db = new Database();
  const [hapticSetting, setHapticSetting] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  const storeData = async () => {
    const newHapticSetting = !hapticSetting;
    setHapticSetting(newHapticSetting);
    try {
      await AsyncStorage.setItem("hapticSetting", newHapticSetting.toString());
    } catch (error) {
      Alert.alert("An error occured, please try again later");
      console.error(error);
    }
  };

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("hapticSetting");
      if (value == "true") {
        // Setting is true so set the setting to true
        setHapticSetting(true);
      } else if (value == "false") {
        // Setting is false so set the setting to false
        setHapticSetting(false);
      }
    } catch (error) {
      Alert.alert("An error occured, please try again later");
      console.error(error);
    }
  };

  const deleteData = () => {
    Alert.alert(
      "Confirmation",
      "Are you sure you want to delete all your data?",
      [
        { text: "No", style: "cancel" },
        {
          text: "Yes",
          style: "destructive",
          onPress: () => {
            db.wipeDatabase();
            Alert.alert("Confirmation", "Data deleted successfully");
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <ScrollView>
        <View
          style={{
            justifyContent: "space-between",
            flexDirection: "row",
            alignItems: "center",
            padding: 10,
          }}
        >
          <Text style={{ color: theme.colors.onBackground }}>
            Haptic feeback (Only one that works)
          </Text>
          <Switch onValueChange={storeData} value={hapticSetting} />
        </View>

        <View
          style={{
            justifyContent: "space-between",
            flexDirection: "row",
            alignItems: "center",
            padding: 10,
          }}
        >
          <Text style={{ color: theme.colors.onBackground }}>
            Kilograms (Pounds support coming soon)
          </Text>
          <Switch value={true} />
        </View>

        <Button title="Delete data" onPress={deleteData} />
      </ScrollView>
    </View>
  );
}

export default SettingsPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
