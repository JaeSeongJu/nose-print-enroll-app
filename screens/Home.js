import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import axios from "axios";
import { baseUrl, userId } from "../utils/api";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";

const ListButton = ({ title, color, onPress, onDelete, onOptions }) => {
  const logoPath = require("../assets/dog.png");
  return (
    <TouchableOpacity
      style={[styles.itemContainer, { backgroundColor: color }]}
      onPress={onPress}
    >
      <View>
        <Text style={styles.itemTitle}> {title} </Text>
      </View>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity onPress={onOptions}>
          <Image style={styles.image} source={logoPath} />
        </TouchableOpacity>
        <TouchableOpacity onPress={onDelete}>
          <Ionicons name="trash-outline" size={24} color="#000000" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const renderAddListIcon = (navigation, addItemToLists) => {
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("Edit", { saveChanges: addItemToLists })
      }
    >
      <Text style={styles.icon}> + </Text>
    </TouchableOpacity>
  );
}; // +버튼

export default ({ navigation }) => {
  const [lists, setLists] = useState([]);

  const addItemToLists = (item) => {
    lists.push(item);
    setLists([...lists]);
  };

  const removeItemFromLists = async (index, petID) => {
    await axios.delete(`${baseUrl}/pet/${petID}`);
    lists.splice(index, 1);
    setLists([...lists]);
  };

  const updateItemFromLists = (index, item) => {
    lists[index] = item;
    setLists([...lists]);
  };

  useLayoutEffect(() => {
    // navigation.setOptions({
    //   headerRight: () => renderAddListIcon(navigation, addItemToLists),
    // });
  });

  useEffect(() => {
    async function fetchPetList() {
      const res = await axios.get(`${baseUrl}/user/mypets/${userId}`);
      setLists([...res.data]);
      return res;
    }
    fetchPetList();
  }, [lists]);

  return (
    <SafeAreaView style={styles.container}>
      <Ionicons name="menu" size={24} color="black" />
      <Text>My Pet</Text>
      <FlatList
        data={lists}
        keyExtractor={(item) => item.petID}
        renderItem={({ item: { name, petID }, index }) => {
          return (
            <ListButton
              title={name}
              color={Colors.gray}
              navigation={navigation}
              onPress={() => {
                navigation.navigate("ToDoList", { name });
              }}
              onOptions={() => {
                navigation.navigate("Edit", {
                  name,
                  saveChanges: (item) => updateItemFromLists(index, item),
                });
              }} //editLISt navigation
              onDelete={() => removeItemFromLists(index, petID)} // delete 기능
            />
          );
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  itemTitle: { fontSize: 24, padding: 5, color: "black" },
  image: {
    width: 40,
    height: 40,
    flex: 1,
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 100,
    flex: 1,
    borderRadius: 20,
    marginHorizontal: 20,
    marginVertical: 10,
    padding: 15,
  },
  icon: {
    padding: 5,
    fontSize: 24,
  },
  centeredView: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
