import { useState } from "react";
import { Text, View } from "react-native";
import Collapsible from "react-native-collapsible";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import Button from "./Button";
import colours from "../utils/colours";

function StartExercise(props) {
  const [isCollapsed, setIsCollapsed] = useState(true);

  return (
    <>
      <View
        style={{
          padding: 10,
          width: "100%",
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Button
          textStyle={{ fontFamily: "quicksand-medium", fontSize: 20 }}
          text={props.exercise.name}
          onPress={() => {
            setIsCollapsed(!isCollapsed);
          }}
        ></Button>
        <Button
          onPress={() => {
            setIsCollapsed(!isCollapsed);
          }}
          icon={isCollapsed ? "chevron-left" : "chevron-down"}
          iconColor={colours.text}
        />
      </View>
      <Collapsible
        collapsed={isCollapsed}
        style={{
          padding: 10,
          backgroundColor: "red",
          width: "100%",
        }}
        renderChildrenCollapsed
      >
        <View>
          <Text>{props.exercise.name}</Text>
        </View>
      </Collapsible>
    </>
  );
}

export default StartExercise;
