import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  Dimensions,
  Keyboard,
  LogBox,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "../constants/Colors";
import { baseUrl, userId } from "../utils/api";

LogBox.ignoreLogs([
  "Non-serializable values were found in the navigation state",
]);

const windowWidth = Dimensions.get("window").width;

export default ({ navigation, route }) => {
  const [title, setTitle] = useState("");
  const [isValid, setvalidity] = useState(true);
  const { addItemToLists } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <TouchableWithoutFeedback
        onPress={Keyboard.dismiss}
        style={{ height: "100%" }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={35} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>펫 등록</Text>
        <View
          style={{
            marginVertical: 10,
          }}
        >
          <View>
            {!isValid && (
              <Text
                style={{
                  color: Colors.red,
                  fontSize: 13,
                  fontWeight: "bold",
                  paddingLeft: "5%",
                  position: "absolute",
                  right: "5%",
                }}
              >
                * 펫 이름을 입력해주세요
              </Text>
            )}
          </View>
          <Text style={styles.label}>이름</Text>
          <View style={{ width: "100%", alignItems: "center" }}>
            <TextInput
              // underlineColorAndroid={"transparent"}
              selectionColor={"transparent"}
              value={title}
              onChangeText={(text) => {
                setTitle(text);
                setvalidity(true);
              }}
              placeholder={"이름을 입력해주세요"}
              maxLength={30}
              style={styles.input}
            />
          </View>
        </View>
        <View style={styles.enrollBtnContainer}>
          <TouchableOpacity
            style={styles.enrollBtn}
            onPress={async () => {
              try {
                if (title.length >= 1) {
                  const petInfo = await axios.post(`${baseUrl}/pet`, {
                    userID: userId,
                    name: title,
                  });
                  addItemToLists(petInfo.data);
                  navigation.navigate({
                    name: "My Pet",
                    params: { enroll: petInfo["name"] },
                    merge: true,
                  });
                } else {
                  setvalidity(false);
                }
              } catch (error) {
                console.log(error);
              }
            }}
          >
            <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>
              펫 등록
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    paddingLeft: "5%",
    fontWeight: "bold",
  },
  label: {
    fontSize: 18,
    paddingLeft: "5%",
    fontWeight: "500",
    marginBottom: 2,
  },
  input: {
    width: "90%",
    color: Colors.darkGray,
    borderBottomColor: Colors.lightGray,
    borderBottomWidth: 0.5,
    height: 30,
    fontSize: 24,
  },
  enrollBtnContainer: {
    width: "100%",
    alignItems: "center",
    position: "absolute",
    bottom: 40,
  },
  enrollBtn: {
    width: windowWidth * 0.9,
    height: 40,
    borderRadius: 30,
    backgroundColor: "#FCA098",
    justifyContent: "center",
    alignItems: "center",
    shadowOpacity: 0.09,
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowRadius: 10,
  },
});
