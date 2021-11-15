import { CommonActions } from "@react-navigation/routers";
import axios from "axios";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import Colors from "../constants/Colors";
import { baseUrl, userId } from "../utils/api";
import { LogBox } from "react-native";

LogBox.ignoreLogs([
  "Non-serializable values were found in the navigation state",
]);

export default ({ navigation, route }) => {
  const [title, setTitle] = useState(route.params.title || "");
  const [color, setTColor] = useState(route.params.color || Colors.gray);
  const [isValid, setvalidity] = useState(true);

  return (
    <View style={styles.container}>
      <View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.label}> Profile Name </Text>
          {!isValid && (
            <Text style={{ marginLeft: 8, color: Colors.red, fontSize: 16 }}>
              *Dog name cannot be empty{" "}
            </Text>
          )}
        </View>
        <Text style={styles.label}>강아지 이름</Text>
        <TextInput
          underlineColorAndroid={"transparent"}
          selectionColor={"transparent"}
          autoFocus={true}
          value={title}
          onChangeText={(text) => {
            setTitle(text);
            setvalidity(true);
          }}
          placeholder={"New name"}
          maxLength={30}
          style={styles.input}
        />
      </View>
      <TouchableOpacity
        style={styles.saveButton}
        onPress={async () => {
          if (title.length >= 1) {
            await axios.post(`${baseUrl}/pet`, {
              userID: userId,
              name: title,
            });
            // route.params.saveChanges({ title, color });
            navigation.dispatch(CommonActions.goBack());
          } else {
            setvalidity(false);
          }
        }}
      >
        <Text style={{ color: "black", fontWeight: "bold" }}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 5,
    justifyContent: "space-between",
  },
  input: {
    color: Colors.darkGray,
    borderBottomColor: Colors.lightGray,
    borderBottomWidth: 0.5,
    marginHorizontal: 5,
    padding: 3,
    height: 30,
    fontSize: 24,
  },
  saveButton: {
    borderRadius: 25,
    backgroundColor: "#FCA098",
    height: 48,
    margin: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    color: Colors.black,
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 8,
  },
});
