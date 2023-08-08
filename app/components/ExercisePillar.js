import { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, FlatList } from "react-native";

import WeightRepSelector from "./WeightRepSelector";
import LastWeightRepSession from "./LastWeightRepSession";
import Database from "../classes/DatabaseClass";

function ExercisePillar(props) {
  const db = new Database();
  const [lastWeightRepSession, setLastWeightRepSession] = useState([]);
  const [display, setDisplay] = useState(false);

  useEffect(() => {
    if (props.editable == false) {
      // Grab session ID
      let statement = "SELECT MAX(id) AS max_id FROM session";
      db.sql(statement, (resultSet) => {
        let sessionId = resultSet.rows._array[0].max_id - 1 || null;
        if (sessionId) {
          statement =
            "SELECT rp.rep_count AS reps_in_set, wp.weight_kg AS weight_in_set " +
            "FROM sets s " +
            "JOIN reps_per_set rp ON s.id = rp.sets_id " +
            "JOIN weight_per_set wp ON s.id = wp.sets_id " +
            "WHERE s.session_id = " +
            sessionId +
            " AND s.exercise_id = " +
            props.exercise.id;
          db.sql(statement, (resultSet) => {
            let results = resultSet.rows._array;
            if (results.length == 0) {
              // This is the first time doing this lift
              setDisplay(false);
            } else {
              setLastWeightRepSession(results);
              setDisplay(true);
            }
          });
        }
      });
    }
  }, []);


  const WeightRepSelectorRenderer = () => {
    let setCount = props.exercise.sets;
    let repCount = props.exercise.reps;
    let weightRepSelectorArray = new Array(setCount).fill({});
    return (
      <FlatList
        style={{ flex: 1 }}
        data={weightRepSelectorArray}
        renderItem={({ index }) => {
          return (
            <>
              <WeightRepSelector
                repCount={repCount}
                key={index}
                index={index}
                newReps={props.newReps}
                setNewReps={props.setNewReps}
                newWeight={props.newWeight}
                setNewWeight={props.setNewWeight}
              />
            </>
          );
        }}
      />
    );
  };

  const LastWeightRepSessionRenderer = () => {
    if (display) {
      return (
        <FlatList
          style={{ flex: 1 }}
          data={lastWeightRepSession}
          renderItem={({ item, index }) => {
            let reps = parseInt(item.reps_in_set);
            let weight = parseInt(item.weight_in_set);
            return (
              <>
                <LastWeightRepSession reps={reps} weight={weight} key={index} />
              </>
            );
          }}
        />
      );
    } else {
      return null;
    }
  };

  return (
    <View style={styles.greenPillars}>
      <Text style={styles.headerText}>{props.headerText}</Text>
      <View style={{ alignItems: "center" }}>
        <View style={styles.underline} />
      </View>
      <Image
        style={styles.image}
        source={require("../../assets/shading-1.png")}
        defaultSource={require("../../assets/shading-1.png")}
      />
      {props.editable ? (
        <WeightRepSelectorRenderer />
      ) : (
        <LastWeightRepSessionRenderer />
      )}
    </View>
  );
}

export default ExercisePillar;

const styles = StyleSheet.create({
  headerText: {
    textAlign: "center",
    color: "#e6e6e6",
    fontWeight: 600,
    fontSize: 30,
  },
  underline: {
    backgroundColor: "#e6e6e6",
    borderRadius: 10,
    height: 4,
    width: "90%",
  },
  image: {
    position: "absolute",
    height: "100%",
    opacity: 0.05,
    zIndex: -1,
  },
  greenPillars: {
    flex: 1,
    backgroundColor: "#93c244",
    borderRadius: 10,
    borderColor: "#e6e6e6",
    borderWidth: 5,
    margin: 5,
  },
});
