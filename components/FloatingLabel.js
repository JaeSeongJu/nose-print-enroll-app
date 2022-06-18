import React, { useCallback, useRef } from "react";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { Entypo } from "@expo/vector-icons";

const FloatingLabel = ({ placeholder, canEdit, security, text, setText }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(text);
  const [isSecure, setIsSecure] = useState(security);

  const inputRef = useRef(null);

  const handleInputFocus = useCallback(() => setIsFocused(true), []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
    if (inputRef.current) setIsFilled(!!text);
  }, [text]);

  const handleChangeText = useCallback(
    (value) => {
      if (inputRef.current) {
        setText(value);
      }
    },
    [text]
  );

  return (
    <View style={styles.labelContainer}>
      <Text
        style={[
          styles.placeholderLabel,
          {
            transform: [
              isFocused || isFilled ? { translateY: -25 } : { translateY: 0 },
            ],
          },
          isFocused || isFilled
            ? {
                fontSize: 25,
                fontWeight: "bold",
                backgroundColor: "#fff",
                zIndex: 1,
              }
            : { fontSize: 20, fontWeight: "bold" },
        ]}
      >
        {placeholder}
      </Text>
      {security ? (
        <View style={styles.security}>
          <TouchableOpacity
            onPress={() => {
              setIsSecure((pre) => !pre);
            }}
          >
            {isSecure ? (
              <Entypo name="eye-with-line" size={20} color="black" />
            ) : (
              <Entypo name="eye" size={20} color="black" />
            )}
          </TouchableOpacity>
        </View>
      ) : null}
      <TextInput
        value={text}
        secureTextEntry={security ? isSecure : false}
        editable={canEdit}
        ref={inputRef}
        style={styles.textInput}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        onChangeText={handleChangeText}
      />
    </View>
  );
};

export default FloatingLabel;

const styles = StyleSheet.create({
  labelContainer: {
    marginBottom: 15,
    width: "100%",
    paddingHorizontal: "5%",
    justifyContent: "center",
  },
  placeholderLabel: {
    position: "absolute",
    left: "10%",
    color: "#FCA098",
  },
  textInput: {
    height: 50,
    borderRadius: 30,
    // backgroundColor: "#FFF",
    borderColor: "#FCA098",
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    shadowOpacity: 0.04,
    shadowOffset: {
      width: 0,
      height: 20,
    },
    fontSize: 18,
    fontWeight: "bold",
    paddingHorizontal: "5%",
  },
  security: {
    position: "absolute",
    right: "10%",
    zIndex: 1,
  },
});
