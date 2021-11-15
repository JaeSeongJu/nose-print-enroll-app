import styled from "@emotion/native";
import { Camera } from "expo-camera";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import storage from "./firebase";
import photos from "./photos";
import { SnapShotIcon, ViewDirectionIcon } from "./Svg";

const { width, height } = Dimensions.get("window");

const progressList = [
  { id: "1", progress: "FRONT 1/7" },
  { id: "2", progress: "FRONT 2/7" },
  { id: "3", progress: "RIGHT 3/7" },
  { id: "4", progress: "RIGHT 4/7" },
  { id: "5", progress: "LEFT 5/7" },
  { id: "6", progress: "LEFT 6/7" },
  { id: "7", progress: "FACE 7/7" },
];

export default function Snap({ route, navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const sight = useRef();
  const scrollX = useRef(new Animated.Value(0)).current;
  const progresses = useRef();
  const [progressIdx, setProgressIdx] = useState(0);

  const snap = async () => {
    try {
      if (sight) {
        let { uri } = await sight.current.takePictureAsync({
          quality: 1,
        });
        if (uri) {
          navigation.navigate("CheckPhoto", { uri });
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

  const upload = async (uri) => {
    try {
      const response = await fetch(uri);
      const blob = await response.blob();
      const storageRef = storage.ref();
      const spaceRef = storageRef.child("images/" + Date.now());
      return spaceRef.put(blob);
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    if (route.params) {
      if (route.params?.next) {
        progresses.current.scrollToIndex({
          index: photos.length,
          animated: true,
          viewPosition: 0.5,
        });
      }
    } else {
      photos.length = 0;
    }
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, [photos.length]);

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
                renderItem={({ item: { progress }, index }) => {
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
                      ></ProgressCircle>
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
  border: 1px white solid;
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
  border: 1px white solid;
  align-items: center;
`;

const ProgressStr = styled.Text`
  font-size: 16px;
  color: white;
  font-weight: bold;
`;

const DividingSection = styled.View``;

const ProgressCircle = styled(Animated.View)`
  border: 1px #fff solid;
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
