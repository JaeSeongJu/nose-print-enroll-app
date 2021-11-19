import { Ionicons } from "@expo/vector-icons";
import { CommonActions } from "@react-navigation/routers";
import axios from "axios";
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
import photos from "../photos";
import { flaskUrl, path } from "../utils/api";

const windowWidth = Dimensions.get("window").width;

const PhotoResult = ({ navigation, route }) => {
  const { selectedPhoto, pet, snap } = route.params;
  const selectedPhotos = [...selectedPhoto];
  photos.length = 0;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}
      >
        <Ionicons name="chevron-back" size={35} color="black" />
      </TouchableOpacity>
      <View style={styles.refContainer}>
        <Process
          process={"정면"}
          images={[selectedPhotos[0], selectedPhotos[1]]}
          snap={snap}
        />
        <Process
          process={"오른쪽"}
          images={[selectedPhotos[2], selectedPhotos[3]]}
          snap={snap}
        />
        <Process
          process={"왼쪽"}
          images={[selectedPhotos[4], selectedPhotos[5]]}
          snap={snap}
        />
        <Process
          process={"얼굴"}
          images={[selectedPhotos[6]]}
          face
          snap={snap}
        />
      </View>
      <View style={styles.refSkipBtnContainer}>
        <TouchableOpacity
          style={styles.refSkipButton}
          onPress={async () => {
            const res = await axios.post(`${flaskUrl}/register`, {
              path,
              petID: pet.petID,
            });
            console.log(res.data);
            // navigation.dispatch(
            //   CommonActions.reset({
            //     index: 1,
            //     routes: [{ name: "My Pet" }],
            //   })
            // );
          }}
        >
          <Text style={{ color: "white", fontSize: 24, fontWeight: "bold" }}>
            비문 등록하기
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const Process = ({ process, images, face, snap }) => {
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
          {images.map((image, index) => {
            return (
              <Image
                source={snap ? { uri: image } : image}
                key={snap ? index + 1 : image.id}
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

export default PhotoResult;
