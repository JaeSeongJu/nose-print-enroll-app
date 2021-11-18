import { FontAwesome, Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Dimensions, Keyboard, StyleSheet, Text, View } from "react-native";
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Avatar } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import FloatingLabel from "../components/FloatingLabel";
import { baseUrl, userId } from "../utils/api";

const windowWidth = Dimensions.get("window").width;

// const renderAddListIcon = (addItem) => {
//   return (
//     <TouchableOpacity
//       onPress={() => addItem({ text: "", isChecked: false, isNewItem: true })}
//     >
//       <Text style={styles.icon}> + </Text>
//     </TouchableOpacity>
//   );
// }; // +버튼

export default ({ navigation, route }) => {
  const { pet, updateItemFromLists } = route.params;

  const [petNoseId, setPetNoseId] = useState(pet.noseID);
  const [petName, setPetName] = useState(pet.name);
  const [petAge, setPetAge] = useState(pet.age);
  const [petBreed, setPetBreed] = useState(pet.breed);

  // const [toDoItems, setToDoItems] = useState([
  //   { text: "Memo for your dog", isChecked: false },
  // ]);

  // const addItemToLists = (item) => {
  //   toDoItems.push(item);
  //   setToDoItems([...toDoItems]);
  // };

  // const removeItemFromLists = (index) => {
  //   toDoItems.splice(index, 1);
  //   setToDoItems([...toDoItems]);
  // };

  // const updateItem = (index, item) => {
  //   toDoItems[index] = item;
  //   setToDoItems([...toDoItems]);
  // };

  // useLayoutEffect(() => {
  //   navigation.setOptions({
  //     headerRight: () => renderAddListIcon(addItemToLists),
  //   });
  // });

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
        <View style={styles.header}>
          <Text style={styles.title}>펫 정보</Text>
          <Text style={styles.noseIdCheckText}>
            {pet.noseID ? "비문이 등록되었습니다" : "비문을 등록해주세요"}
          </Text>
        </View>
        <View style={styles.petContainer}>
          <View style={styles.pet}>
            <View>
              <Avatar.Image
                source={require("../assets/권푸근.jpg")}
                size={60}
                style={styles.petImg}
              />
            </View>
            <View>
              <Text style={styles.petName}>{petName}</Text>
              {petAge && petBreed ? (
                <Text style={styles.petDetail}>
                  {petBreed} / {petAge}살
                </Text>
              ) : (
                <></>
              )}
            </View>
            <View style={styles.noseIdCheck}>
              {pet.noseID ? (
                <TouchableOpacity>
                  <FontAwesome name="check" size={30} color="#85CF4E" />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => navigation.navigate("Ref 1", { pet })}
                  style={{ opacity: 1 }}
                >
                  <FontAwesome name="plus" size={30} color="#D65E4E" />
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
        <View style={{ height: "100%" }}>
          <KeyboardAwareScrollView extraHeight={350}>
            <View style={{ marginTop: 15 }}>
              <FloatingLabel
                placeholder={"비문번호"}
                canEdit={false}
                security={pet.noseID ? true : false}
                text={petNoseId ? pet.noseID : ""}
                setText={setPetNoseId}
              ></FloatingLabel>
              <FloatingLabel
                placeholder={"이름"}
                text={petName}
                setText={setPetName}
              />
              <FloatingLabel
                placeholder={"품종"}
                text={petBreed ? petBreed : ""}
                setText={setPetBreed}
              />
              <FloatingLabel
                placeholder={"나이"}
                text={petAge ? petAge : ""}
                setText={setPetAge}
              />
            </View>

            {/* <FlatList
            data={toDoItems}
            renderItem={({ item: { text, isChecked, isNewItem }, index }) => {
              return (
                <ToDoItem
                  text={text}
                  isChecked={isChecked}
                  isNewItem={isNewItem}
                  onChecked={() => {
                    const toDoItem = toDoItems[index];
                    toDoItem.isChecked = !isChecked;
                    updateItem(index, toDoItem);
                  }}
                  onChangeText={(newText) => {
                    const toDoItem = toDoItems[index];
                    toDoItem.text = newText;
                    updateItem(index, toDoItem);
                  }}
                  onDelete={() => {
                    removeItemFromLists(index);
                  }}
                />
              );
            }}
          /> */}

            <View style={styles.enrollBtnContainer}>
              <TouchableOpacity
                style={styles.enrollBtn}
                onPress={async () => {
                  try {
                    const petInfo = await axios.patch(`${baseUrl}/pet`, {
                      petID: pet.petID,
                      userID: userId,
                      age: petAge,
                      breed: petBreed,
                      name: petName,
                      profile: pet.profile,
                    });
                    // updateItemFromLists(petInfo.data);
                    navigation.navigate({
                      name: "My Pet",
                      params: { enroll: petInfo },
                      merge: true,
                    });
                  } catch (error) {
                    console.log(error);
                  }
                }}
              >
                <Text
                  style={{ color: "white", fontSize: 20, fontWeight: "bold" }}
                >
                  저장
                </Text>
              </TouchableOpacity>
            </View>
          </KeyboardAwareScrollView>
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
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  noseIdCheckText: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#C4C4C4",
    paddingRight: "5%",
  },
  petContainer: {
    width: "100%",
    alignItems: "center",
    marginVertical: 20,
  },
  pet: {
    width: "90%",
    height: 80,
    backgroundColor: "#E8E5E5",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    borderRadius: 13,
    shadowOpacity: 0.09,
    shadowOffset: {
      width: 0,
      height: 17,
    },
    shadowRadius: 10,
  },
  petImg: {
    marginRight: 10,
  },
  petName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 3,
  },
  petDetail: {
    fontSize: 12,
    color: "#717171",
  },
  noseIdCheck: {
    position: "absolute",
    right: 10,
  },
  enrollBtnContainer: {
    width: "100%",
    alignItems: "center",
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
  },
});
