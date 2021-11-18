import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

const windowWidth = Dimensions.get("window").width;

export default function RefFrist({ navigation, route }) {
  const { pet } = route.params;
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back" size={35} color="black" />
      </TouchableOpacity>
      <View style={styles.refContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.refTextBox1}>Reference</Text>
          <Text style={styles.refTextBox2}>코 주름이 잘보이도록 "최대한"</Text>
          <Text style={styles.refTextBox2}>
            코와 가깝게 찍어주시면 더 좋아요!
          </Text>
        </View>
        <View>
          <Image source={require("../assets/dognosereference.png")} />
        </View>
      </View>
      <View style={styles.refSkipBtnContainer}>
        <TouchableOpacity
          style={styles.refSkipButton}
          onPress={() => {
            navigation.navigate("Ref 2", { pet });
          }}
        >
          <Text style={{ color: "white", fontSize: 24, fontWeight: "bold" }}>
            Skip
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  refContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  refTextBox1: {
    fontSize: 40,
    fontWeight: "bold",
  },
  refTextBox2: {
    fontSize: 20,
    fontWeight: "600",
    color: "#C4C4C4",
  },
  refSkipBtnContainer: {
    flex: 0.1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  refSkipButton: {
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
    marginBottom: 30,
  },
});
