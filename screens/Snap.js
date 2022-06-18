import { Entypo } from "@expo/vector-icons";
import styled from "@emotion/native";
import { Camera } from "expo-camera";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CacheImage from "../helpers/CacheImage";
import photos from "../photos";
import {
  exface,
  exfront1,
  exfront2,
  exleft1,
  exleft2,
  exright1,
  exright2,
} from "../utils/photo";
import { SnapShotIcon, ViewDirectionIcon } from "../utils/Svg";
import alram from "../assets/alram.mp3";
import { Audio } from "expo-av";

const { width, height } = Dimensions.get("window");

const progressList = [
  { id: "1", progress: "FRONT 1/7", defaultImg: exfront1 },
  { id: "2", progress: "FRONT 2/7", defaultImg: exfront2 },
  { id: "3", progress: "RIGHT 3/7", defaultImg: exright1 },
  { id: "4", progress: "RIGHT 4/7", defaultImg: exright2 },
  { id: "5", progress: "LEFT 5/7", defaultImg: exleft1 },
  { id: "6", progress: "LEFT 6/7", defaultImg: exleft2 },
  { id: "7", progress: "FACE 7/7", defaultImg: exface },
];

export default function Snap({ route, navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const sight = useRef();
  const scrollX = useRef(new Animated.Value(0)).current;
  const progresses = useRef();
  const [progressIdx, setProgressIdx] = useState(0);
  const [sound, setSound] = useState();
  const { pet } = route.params;

  const snap = async () => {
    try {
      if (sight) {
        let { uri } = await sight.current.takePictureAsync({
          quality: 1,
        });
        if (uri) {
          navigation.navigate("Check Photo", { uri, pet });
          // upload(uri)
          //   .then(() => {
          //     alert("success");
          //   })
          //   .catch((error) => {
          //     alert(error);
          //   });
        }
      }
    } catch (error) {
      alert(error);
    }
  };

  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(alram);
    setSound(sound);

    await sound.playAsync();
  }

  const upload = async (uri) => {
    // try {
    //   const response = await fetch(uri);
    //   const blob = await response.blob();
    //   const storageRef = storage.ref();
    //   const spaceRef = storageRef.child("images/" + Date.now());
    //   return spaceRef.put(blob);
    // } catch (error) {
    //   alert(error);
    // }
  };

  useEffect(() => {
    if (route.params) {
      if (route.params?.next) {
        progresses.current.scrollToIndex({
          index: photos.length,
          animated: true,
          viewPosition: 0.5,
        });
      } else {
        photos.length = 0;
      }
    }
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [photos.length, sound]);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <Container>
      <StatusBar style="light" />
      <Preview>
        <CameraView type={type} ref={sight}>
          <FocusingView>
            <FocusingCircle />
          </FocusingView>
          <ProgressLine>
            <ProgressStr>{progressList[progressIdx]?.progress}</ProgressStr>
            <DividingSection>
              <Animated.FlatList
                data={progressList}
                keyExtractor={(item) => item.id}
                ref={progresses}
                horizontal
                decelerationRate={0}
                contentContainerStyle={{
                  paddingHorizontal: width / 2 - width / 10,
                }}
                renderItem={({ item: { progress, defaultImg }, index }) => {
                  const scrollToIndex = () => {
                    progresses.current?.scrollToIndex({
                      index,
                      animated: true,
                      viewPosition: 0.5,
                    });
                  };
                  // const inputRange = [
                  //   (index - 1) * Math.round(width / 5 + width / 20),
                  //   index * Math.round(width / 5 + width / 20),
                  //   (index + 1) * Math.round(width / 5 + width / 20),
                  // ];
                  // const translateY = scrollX.interpolate({
                  //   inputRange,
                  //   outputRange: [0, -50, 0],
                  // });
                  return (
                    <TouchableOpacity onPress={scrollToIndex}>
                      <ProgressCircle
                        style={[
                          {
                            marginHorizontal: width / 40,
                            width: width / 5,
                            height: width / 5,
                          },
                          index === 0 && { marginLeft: 0 },
                          index === 6 && {
                            marginRight: 0,
                          },
                          // { transform: [{ translateY }] },
                        ]}
                      >
                        <CacheImage
                          uri={Image.resolveAssetSource(defaultImg).uri}
                          key={Image.resolveAssetSource(defaultImg).uri}
                          style={{
                            width: "100%",
                            height: "100%",
                            borderRadius: 40,
                            opacity: 0.7,
                          }}
                        />
                      </ProgressCircle>
                    </TouchableOpacity>
                  );
                }}
                bounces={false}
                onScroll={Animated.event(
                  [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                  {
                    useNativeDriver: true,
                    listener: (event) =>
                      setProgressIdx(
                        Math.floor(
                          event.nativeEvent.contentOffset.x /
                            (width / 5 + width / 21)
                        )
                      ),
                  }
                )}
                scrollEventThrottle={16}
                snapToInterval={Math.round(width / 5 + width / 20)}
                showsHorizontalScrollIndicator={false}
              />
            </DividingSection>
          </ProgressLine>
          <FeatureButtons>
            <TouchableOpacity
              style={{ position: "absolute", left: 15 }}
              onPress={playSound}
            >
              <Entypo name="sound" size={40} color="white" />
            </TouchableOpacity>
            <TouchableOpacity onPress={snap}>
              <SnapShotIcon />
            </TouchableOpacity>
            <StyledViewDirectionIcon
              onPress={() => {
                setType(
                  type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
                );
              }}
            >
              <ViewDirectionIcon />
            </StyledViewDirectionIcon>
          </FeatureButtons>
        </CameraView>
      </Preview>
    </Container>
  );
}

const Container = styled(SafeAreaView)`
  flex: 1;
  flex-direction: row;
  padding-bottom: 30px;
  background-color: #000;
`;

const Preview = styled.View`
  flex: 1;
  overflow: hidden;
  border-radius: 20px;
`;

const CameraView = styled(Camera)`
  flex: 1;
`;

const FocusingView = styled.View`
  flex: 7;
  justify-content: center;
  align-items: center;
  /* border: 1px white solid; */
`;

const FocusingCircle = styled.View`
  position: absolute;
  top: 100px;
  width: 300px;
  height: 300px;
  border: 5px #fca098 solid;
  border-radius: 150px;
`;

const ProgressLine = styled.View`
  flex: 1.7;
  /* border: 1px white solid; */
  align-items: center;
`;

const ProgressStr = styled.Text`
  font-size: 16px;
  color: white;
  font-weight: bold;
`;

const DividingSection = styled.View``;

const ProgressCircle = styled(Animated.View)`
  border: 2px #fff solid;
  border-radius: 40px;
`;

const FeatureButtons = styled.View`
  flex: 1.3;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const StyledViewDirectionIcon = styled.TouchableOpacity`
  position: absolute;
  right: 15px;
`;
