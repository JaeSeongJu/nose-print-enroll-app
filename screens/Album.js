import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import { AssetsSelector } from "expo-images-picker";
import { MediaType } from "expo-media-library";
import React, { useMemo } from "react";
import { Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Album({ route }) {
  const navigation = useNavigation();
  const { pet } = route.params;

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

  const onSuccess = (data) => {
    // data.forEach(async (info) => await upload(info.uri));
    navigation.navigate("Photo Result", {
      selectedPhoto: data,
      pet,
      snap: false,
    });
  };

  const _textStyle = {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  };

  const _buttonStyle = {
    backgroundColor: "#FCA098",
    borderRadius: 20,
  };

  const widgetErrors = useMemo(
    () => ({
      errorTextColor: "black",
      errorMessages: {
        hasErrorWithPermissions: "Please Allow media gallery permissions.",
        hasErrorWithLoading: "There was error while loading images.",
        hasErrorWithResizing: "There was error while loading images.",
        hasNoAssets: "No images found.",
      },
    }),
    []
  );

  const widgetSettings = useMemo(
    () => ({
      getImageMetaData: false, // true might perform slower results
      initialLoad: 100,
      assetsType: [MediaType.photo, MediaType.video],
      minSelection: 7,
      maxSelection: 7,
      portraitCols: 4,
      landscapeCols: 4,
    }),
    []
  );

  const widgetStyles = useMemo(
    () => ({
      margin: 2,
      bgColor: "white",
      spinnerColor: "blue",
      widgetWidth: 99,
      videoIcon: {
        Component: Ionicons,
        iconName: "ios-videocam",
        color: "tomato",
        size: 20,
      },
      selectedIcon: {
        Component: Ionicons,
        iconName: "ios-checkmark-circle-outline",
        color: "white",
        bg: "#0eb14970",
        size: 26,
      },
    }),
    []
  );

  const widgetNavigator = useMemo(
    () => ({
      Texts: {
        finish: "선택완료",
        back: "뒤로가기",
        selected: "개 선택됨",
      },
      midTextColor: "#FCA098",
      minSelection: 1,
      buttonTextStyle: _textStyle,
      buttonStyle: _buttonStyle,
      onBack: () => {
        navigation.goBack();
      },
      onSuccess: (e) => onSuccess(e),
    }),
    []
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <AssetsSelector
        Settings={widgetSettings}
        Errors={widgetErrors}
        Styles={widgetStyles}
        Navigator={widgetNavigator}
      />
    </SafeAreaView>
  );
}
