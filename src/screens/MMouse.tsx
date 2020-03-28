import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import Button from "../components/Button";
import Card from "../components/Card";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 150
  }
});

export default () => {
  const [show, setShow] = useState(true);
  return (
    <View style={styles.container}>
      <Card show={show} />
      <Button text={show ? "Hide" : "Show"} onPress={() => setShow(!show)} />
    </View>
  );
};
