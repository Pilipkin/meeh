import React from "react";
import {
  SafeAreaView,
  SafeAreaViewBase,
  StyleSheet,
  Text,
  View
} from "react-native";
import { RectButton } from "react-native-gesture-handler";

const styles = StyleSheet.create({
  buttonContainer: {
    borderBottomWidth: 1,
    borderColor: "#f4f6f3"
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 55,
    padding: 8
  }
});

interface SelectionProps {
  name: string;
  onPress: () => void;
  isSelected: boolean;
}
export default ({ name, onPress, isSelected }: SelectionProps) => {
  return (
    <SafeAreaView style={styles.buttonContainer}>
      <RectButton {...{ onPress }}>
        <View
          style={[styles.button, isSelected && { backgroundColor: "blue" }]}
          accessible
        >
          <Text style={isSelected && { color: "white" }}>{name}</Text>
        </View>
      </RectButton>
    </SafeAreaView>
  );
};
