import styled from "@emotion/native";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Select = ({ navigation }) => {
  return (
    <Container>
      <TouchableOpacity>
        <View>
          <Text onPress={() => navigation.navigate("Album")}>Album</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity>
        <View>
          <Text onPress={() => navigation.navigate("Snap")}>Snap</Text>
        </View>
      </TouchableOpacity>
    </Container>
  );
};

export default Select;

const Container = styled(SafeAreaView)`
  flex: 1;
  flex-direction: row;
  padding-bottom: 30px;
`;
