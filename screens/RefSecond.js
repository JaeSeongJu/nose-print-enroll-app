import { Ionicons } from "@expo/vector-icons";
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
import CacheImage from "../helpers/CacheImage";
import {
  exface,
  exfront1,
  exfront2,
  exleft1,
  exleft2,
  exright1,
  exright2,
} from "../utils/photo";

const windowWidth = Dimensions.get("window").width;

export default function RefSecond({ navigation, route }) {
  const { pet } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back" size={35} color="black" />
      </TouchableOpacity>
      <View style={styles.refContainer}>
        <Process process={"정면"} images={[exfront1, exfront2]} />
        <Process process={"오른쪽"} images={[exleft1, exleft2]} />
        <Process process={"왼쪽"} images={[exright1, exright2]} />
        <Process process={"얼굴"} images={[exface]} face />
      </View>
      <View style={styles.refSkipBtnContainer}>
        <TouchableOpacity
          style={styles.refSkipButton}
          onPress={() => {
            navigation.navigate("Photo Option", { pet });
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

const Process = ({ process, images, face }) => {
  return (
    <>
      <View
        style={[
          styles.processContainer,
          face
            ? { justifyContent: "center" }
            : { justifyContent: "space-between" },
        ]}
      >
        <Text style={styles.processText}> {process} </Text>
        <View style={styles.processPhotoContainer}>
          {images.map((image) => {
            const uri = Image.resolveAssetSource(image).uri;
            return (
              <CacheImage
                uri={uri}
                key={uri}
                style={{
                  width: 100,
                  height: 100,
                  marginLeft: "5%",
                  borderRadius: 50,
                }}
              />
            );
          })}
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  refContainer: {
    flex: 1,
    width: "100%",
    alignItems: "center",
  },
  processContainer: {
    width: "95%",
    paddingHorizontal: "5%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 5,
    borderWidth: 2,
    borderColor: "#FCA098",
    paddingVertical: 10,
    borderRadius: windowWidth * 0.9,
  },
  processText: {
    fontSize: 24,
    fontWeight: "bold",
    justifyContent: "center",
  },
  processPhotoContainer: {
    flexDirection: "row",
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
