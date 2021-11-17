import { FontAwesome, Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { StatusBar } from "expo-status-bar";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import { Avatar } from "react-native-paper";
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { baseUrl, userId } from "../utils/api";
import { EnrollIcon } from "../utils/svg";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const TRANSLATE_X_THRESHOLD = -SCREEN_WIDTH * 0.75;

export default ({ navigation, route }) => {
  const [lists, setLists] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const addItemToLists = (item) => {
    lists.push(item);
    setLists([...lists]);
  };

  // const updateItemFromLists = (index, item) => {
  //   lists[index] = item;
  //   setLists([...lists]);
  // };

  // useLayoutEffect(() => {});

  useEffect(() => {
    async function fetchPetList() {
      try {
        const res = await axios.get(`${baseUrl}/user/mypets/${userId}`);
        setLists([...res.data]);
        // console.log(lists);
        setLoading(false);
        // if (route.params?.enroll) {

        // }
        // return res;
      } catch (error) {
        console.error(error);
      }
    }
    fetchPetList();
  }, [route.params?.enroll]);

  const onDismiss = useCallback(async (pet) => {
    setLists((lists) => lists.filter((item) => item["petID"] !== pet.petID));
    await axios.delete(`${baseUrl}/pet/${pet.petID}`);
  });

  const scrollRef = useRef(null);

  const renderItem = (item) => {
    return (
      <ListButton
        pet={item}
        simultaneousHandlers={scrollRef}
        onDismiss={onDismiss}
        onEdit={async () => {
          navigation.navigate("Pet Info", { name: item.name });
        }}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <Ionicons
        name="menu"
        size={40}
        color="black"
        style={{ paddingLeft: "3%" }}
      />
      <Text style={styles.title}>My Pet</Text>
      <View>
        {lists.length !== 0 && isLoading ? (
          <>
            <ActivityIndicator />
            <View
              style={[
                styles.enrollContainer,
                { marginTop: lists.length === 0 ? 10 : 20 },
              ]}
            >
              <Text
                style={{ fontWeight: "bold", color: "#C4C4C4", fontSize: 13 }}
              >
                펫을 등록하고, 정보를 입력해 보세요
              </Text>
              <Text
                style={{ fontWeight: "bold", fontSize: 15, marginVertical: 5 }}
              >
                펫 등록하기
              </Text>
              <TouchableOpacity
                style={styles.enrollBtn}
                onPress={() =>
                  navigation.navigate("Enroll Pet", { addItemToLists })
                }
              >
                <EnrollIcon />
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <>
            <FlatList
              ref={scrollRef}
              style={{
                flexGrow: 0,
                minHeight: lists.length === 0 ? 0 : 80,
                maxHeight: 400,
              }}
              data={lists}
              keyExtractor={(item) => item["petID"]}
              renderItem={({ item, index }) => renderItem(item, index)}
              showsHorizontalScrollIndicator={false}
            />
            <View
              style={[
                styles.enrollContainer,
                { marginTop: lists.length === 0 ? 0 : 20 },
              ]}
            >
              <Text
                style={{ fontWeight: "bold", color: "#C4C4C4", fontSize: 13 }}
              >
                펫을 등록하고, 정보를 입력해 보세요
              </Text>
              <Text
                style={{ fontWeight: "bold", fontSize: 15, marginVertical: 5 }}
              >
                펫 등록하기
              </Text>
              <TouchableOpacity
                style={styles.enrollBtn}
                onPress={() =>
                  navigation.navigate("Enroll Pet", { addItemToLists })
                }
              >
                <EnrollIcon />
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
      <Ionicons
        name="person-circle"
        size={50}
        color="#FCA098"
        style={styles.userInfo}
      />
    </SafeAreaView>
  );
};

const ListButton = ({ pet, onEdit, onDismiss, simultaneousHandlers }) => {
  const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

  const translateX = useSharedValue(0);
  const itemHeight = useSharedValue(80);
  const marginVertical = useSharedValue(10);
  const opacity = useSharedValue(1);

  const panGesture = useAnimatedGestureHandler({
    onActive: (event) => {
      translateX.value = event.translationX;
    },
    onEnd: () => {
      let shouldBeDismissed = translateX.value < TRANSLATE_X_THRESHOLD;
      if (shouldBeDismissed) {
        translateX.value = withTiming(-SCREEN_WIDTH);
        itemHeight.value = withTiming(0);
        marginVertical.value = withTiming(0);
        opacity.value = withTiming(0, undefined, (isFinished) => {
          if (isFinished && onDismiss) {
            runOnJS(onDismiss)(pet);
          }
        });
      } else {
        translateX.value = withTiming(0);
      }
    },
  });

  const rStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: translateX.value,
      },
    ],
  }));

  const rIconContainerStyle = useAnimatedStyle(() => {
    const opacity = withTiming(
      translateX.value < TRANSLATE_X_THRESHOLD ? 1 : 0
    );
    return { opacity };
  });

  const rTaskContainerStyle = useAnimatedStyle(() => {
    return {
      height: itemHeight.value,
      marginVertical: marginVertical.value,
      opacity: opacity.value,
    };
  });

  return (
    <Animated.View style={[styles.petContainer, rTaskContainerStyle]}>
      <View style={[styles.removeIconContainer, rIconContainerStyle]}>
        <Text style={{ fontSize: 20, marginRight: 10 }}>
          밀어서 펫 정보를 삭제하세요
        </Text>
        <FontAwesome name="trash" size={25} color="black" />
      </View>
      <PanGestureHandler
        simultaneousHandlers={simultaneousHandlers}
        onGestureEvent={panGesture}
      >
        <AnimatedTouchable
          style={[styles.pet, rStyle]}
          onPress={onEdit}
          activeOpacity={0.93}
        >
          <View>
            <Avatar.Image
              source={require("../assets/권푸근.jpg")}
              size={60}
              style={styles.petImg}
            />
          </View>
          <View>
            <Text style={styles.petName}>{pet.name}</Text>
            {pet.age && pet.breed ? (
              <Text style={styles.petDetail}>
                {pet.breed} / {pet.age}살
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
              <TouchableOpacity>
                <FontAwesome name="plus" size={30} color="#D65E4E" />
              </TouchableOpacity>
            )}
          </View>
        </AnimatedTouchable>
      </PanGestureHandler>
    </Animated.View>
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
  petContainer: {
    width: "100%",
    alignItems: "center",
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
  enrollContainer: { width: "100%", alignItems: "center" },
  enrollBtn: {
    width: "90%",
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
  userInfo: {
    position: "absolute",
    bottom: 20,
    right: "5%",
    shadowOpacity: 0.15,
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowRadius: 10,
  },
  removeIconContainer: {
    height: 80,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    right: "10%",
  },
});
