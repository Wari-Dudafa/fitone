import { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Feather } from "@expo/vector-icons";

import Exercise from "../classes/ExerciseClass";
import Database from "../classes/DatabaseClass";
import NewExerciseSelector from "../components/NewExerciseSelector";

function EditDayPage({ navigation, route }) {
  const db = new Database();
  const day = route.params.day;
  const [newName, setNewName] = useState("");
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    let day_id = day.id;

    statement = "SELECT * FROM exercises WHERE day_id = " + day_id;
    db.sql(
      statement,
      (resultSet) => {
        let temp = [...resultSet.rows._array];
        let newArray = [];
        for (let index = 0; index < temp.length; index++) {
          let exercise = new Exercise(temp[index]);
          newArray.push(exercise);
        }
        setExercises(newArray);
      },
      (error) => {
        Alert.alert("An error occured, please try again later");
        console.log(error);
      }
    );
  }, []);

  const AddExercise = () => {
    // Create a new array with the existing exercises and the new exercise
    let newExcercise = new Exercise({
      name: "New Exercise",
      reps: 1,
      sets: 1,
    });
    const updatedExercises = [...exercises, newExcercise];
    // Update the state with the new array
    setExercises(updatedExercises);
  };

  const SaveDay = () => {
    if (newName.length == 0) {
      setNewName(day.name);
    }
    navigation.pop();
    // Saving logic
  };

  const DeleteDay = () => {
    Alert.alert(
      "Confirmation",
      "Are you sure you want to delete this day?",
      [
        { text: "No", style: "cancel" },
        {
          text: "Yes",
          onPress: () => {
            navigation.pop();
            // Deleting logic
            Alert.alert("Day Deleted");
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <TouchableOpacity style={styles.plus} onPress={AddExercise}>
          <Feather name="plus" size={50} color="#e6e6e6" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.plus} onPress={DeleteDay}>
          <Feather name="trash" size={45} color="#e6e6e6" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.check} onPress={SaveDay}>
          <Feather name="check" size={50} color="#e6e6e6" />
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.dayName}
        placeholder={day.name}
        value={newName}
        onChangeText={setNewName}
      />

      <NewExerciseSelector exercises={exercises} setExercises={setExercises} />
    </View>
  );
}

export default EditDayPage;

const styles = StyleSheet.create({
  check: {
    marginTop: 10,
    marginRight: 10,
  },
  plus: {
    marginTop: 10,
    marginLeft: 10,
  },
  dayName: {
    fontSize: 55,
    color: "#e6e6e6",
    marginLeft: 10,
    textAlign: "center",
    marginBottom: 20,
  },
  container: {
    flex: 1,
    backgroundColor: "#0f1824",
  },
});
