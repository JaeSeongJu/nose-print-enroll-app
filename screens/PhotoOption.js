import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  Alert,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const windowWidth = Dimensions.get("window").width;

export default function PhotoOption({ navigation, route }) {
  const { pet } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back" size={35} color="black" />
      </TouchableOpacity>
      <View style={styles.refContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.refTextBox1}>Upload</Text>
          <Text style={styles.refTextBox2}>비문 사진 등록을 위한</Text>
          <Text style={styles.refTextBox2}>방법을 선택해주세요</Text>
        </View>
        <View style={styles.optionBtnContainer}>
          <TouchableOpacity
            style={styles.touchableBtnDropOffItem}
            onPress={() => {
              navigation.navigate("Album", { pet });
              Alert.alert(
                "1.정면 2.우측 3.좌측 4.얼굴",
                "2장씩 순서대로 골라주세요! (얼굴은 1장)"
              );
            }}
          >
            <Text style={{ color: "#ffffff", fontSize: 30, marginBottom: 10 }}>
              GALLARY
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.touchableBtnDropOffItem}
            onPress={() => {
              navigation.navigate("Snap", { pet, next: false });
            }}
          >
            <Ionicons style={styles.camera} name="camera" size={90} />
          </TouchableOpacity>
        </View>
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
    flex: 0.7,
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
  optionBtnContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
  },
  touchableBtnDropOffItem: {
    flex: 0.45,
    height: windowWidth * 0.45,
    borderRadius: 20,
    backgroundColor: "#FCA098",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 5,
  },
  camera: {
    color: "#FFFFFF",
  },
});
