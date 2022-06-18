import styled from "@emotion/native";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import photos, { savePhoto } from "../photos";

export default function CheckPhoto({ route, navigation }) {
  const { uri, pet } = route.params;
  // Image.getSize(uri, (height) => console.log(height));

  // console.log(photos.length);
  const usePhoto = () => {
    savePhoto(uri);
    if (photos.length === 7) {
      navigation.navigate("Photo Result", {
        selectedPhoto: photos,
        pet,
        snap: true,
      });
    } else {
      navigation.navigate("Snap", { next: true });
    }
  };

  return (
    <Container>
      <StatusBar style="light" />
      <Preview>
        <PhotoView>
          <Image
            style={{
              width: "100%",
              height: "130%",
              position: "absolute",
              left: 0,
            }}
            source={{
              uri,
            }}
          />
        </PhotoView>
        <MenuBar>
          <Retake onPress={() => navigation.goBack()}>다시 찍기</Retake>
          <UsePhoto onPress={usePhoto}>사진 사용</UsePhoto>
        </MenuBar>
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

const PhotoView = styled.View`
  flex: 8.7;
  overflow: hidden;
`;

const MenuBar = styled.View`
  flex: 1.3;
  background-color: #000;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0px 20px;
`;

const Retake = styled.Text`
  font-weight: bold;
  font-size: 18px;
  color: white;
`;
const UsePhoto = styled.Text`
  font-weight: bold;
  font-size: 18px;
  color: white;
`;
