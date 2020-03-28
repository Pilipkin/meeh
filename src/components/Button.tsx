import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

type ButtonProps = { text: string; onPress: (boolean) => void };

const styles = StyleSheet.create({
  container: {
    height: 50,
    width: "70%",
    backgroundColor: "blue",
    alignItems: "center",
    justifyContent: "center"
  },
  text: {
    color: "white"
  }
});

export default ({ text, onPress }: ButtonProps) => (
  <TouchableOpacity style={styles.container} onPress={onPress}>
    <Text style={styles.text}>{text}</Text>
  </TouchableOpacity>
);
