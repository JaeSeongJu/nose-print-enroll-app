import React from "react";
import { FlatList, Image, Text, View } from "react-native";
import photos from "../photos";

const CheckRegister = () => {
  return (
    <>
      {photos.map((item) => (
        <Image
          style={{ width: 50, height: 50 }}
          source={{
            uri: item,
          }}
        />
      ))}
    </>
  );
};

export default CheckRegister;
