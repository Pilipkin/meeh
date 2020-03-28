import React, { useRef, useState } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import Animated, {
  Transition,
  Transitioning,
  TransitioningView
} from "react-native-reanimated";
import { useTransition } from "react-native-redash";
import { RectButton } from "react-native-gesture-handler";
import Button from "../components/Button";

const { height, width } = Dimensions.get("window");

const { multiply, interpolate } = Animated;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
    paddingVertical: 50
  }
});

const testTransition = <Transition.Change durationMs={400} />;
export default () => {
  const ref = useRef<TransitioningView>(null);
  const testRef = useRef<TransitioningView>(null);
  const [toggled, setToggled] = useState<number>(0);
  return (
    <Transitioning.View
      ref={testRef}
      transition={testTransition}
      style={[
        styles.container,
        {
          justifyContent: toggled ? "center" : "space-between",
          alignItems: toggled ? "center" : "center"
        }
      ]}
    >
      <Transitioning.View
        ref={ref}
        transition={testTransition}
        style={{
          width: toggled ? width * 0.1 : width * 0.8,
          height: toggled ? width * 0.1 : width * 0.8,
          backgroundColor: "pink",
          borderRadius: toggled ? (width * 0.1) / 2 : (width * 0.8) / 2
        }}
      />
      <Button
        text="TEST"
        onPress={() => {
          if (ref.current && testRef.current) {
            ref.current.animateNextTransition();
            testRef.current.animateNextTransition();
            setToggled(toggled ^ 1);
          }
        }}
      />
    </Transitioning.View>
  );
};
