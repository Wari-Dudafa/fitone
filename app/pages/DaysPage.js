import { useState, useCallback } from "react";
import { View, Alert } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";

import SwipingContainer from "../components/SwipingContainer";
import Database from "../classes/DatabaseClass";
import Button from "../components/Button";

function DaysPage({ navigation }) {
  const db = new Database();
  const [days, setDays] = useState([]);

  useFocusEffect(
    useCallback(() => {
      db.sql(
        "SELECT * FROM days",
        (resultSet) => {
          setDays(resultSet.rows._array);
        },
        (error) => {
          Alert.alert("An error occured");
          console.log(error);
        }
      );
    }, [])
  );

  return (
    <View style={{ flex: 1, backgroundColor: "#0f1824" }}>
      <Button
        onPress={() => {
          navigation.navigate("AddDaysPage");
        }}
        style={{
          position: "absolute",
          bottom: 15,
          right: 15,
          backgroundColor: "#4490c2",
          borderRadius: 5,
          padding: 5,
        }}
      >
        <Feather name="plus" size={55} color="#e6e6e6" />
      </Button>
      <SwipingContainer days={days} navigation={navigation} />
    </View>
  );
}

export default DaysPage;
