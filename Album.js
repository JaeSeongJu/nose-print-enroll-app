import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import { AssetsSelector } from "expo-images-picker";
import { MediaType } from "expo-media-library";
import React, { useMemo } from "react";
import { Alert } from "react-native";
import storage from "./firebase";

export default function Album() {
  const navigation = useNavigation();

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

  const onSuccess = (data) => {
    Alert.alert("Done", data.length + "Images selected");
    data.forEach(async (info) => await upload(info.uri));
    navigation.navigate("Home", { data });
  };

  const _textStyle = {
    color: "white",
  };

  const _buttonStyle = {
    backgroundColor: "orange",
    borderRadius: 5,
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
        finish: "finish",
        back: "back",
        selected: "selected",
      },
      midTextColor: "black",
      minSelection: 1,
      buttonTextStyle: _textStyle,
      buttonStyle: _buttonStyle,
      onBack: () => {},
      onSuccess: (e) => onSuccess(e),
    }),
    []
  );

  return (
    <AssetsSelector
      Settings={widgetSettings}
      Errors={widgetErrors}
      Styles={widgetStyles}
      Navigator={widgetNavigator}
    />
  );
}
