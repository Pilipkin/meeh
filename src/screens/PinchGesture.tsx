import React from "react";
import { PinchGestureHandler, State } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";
import { Dimensions, StyleSheet, View } from "react-native";
import { onGestureEvent } from "react-native-redash";

const { width, height } = Dimensions.get("window");
const center = { x: width / 2, y: height / 2 };

const { Value, sub, multiply } = Animated;

const styles = StyleSheet.create({
  pinchableImage: {
    ...StyleSheet.absoluteFillObject,
    width,
    height
  }
});

export default () => {
  const scale = new Value(1);
  const focalX = new Value(0);
  const focalY = new Value(0);
  const state = new Value(State.UNDETERMINED);
  const numberOfPointers = new Value(0);

  const pinchGestureHandler = onGestureEvent({
    scale,
    state,
    focalX,
    focalY,
    numberOfPointers
  });
  const fx = focalX;
  const fy = focalY;
  const translateX = multiply(-1, sub(fx, center.x), sub(scale, 1));
  const translateY = multiply(-1, sub(fy, center.y), sub(scale, 1));

  return (
    <PinchGestureHandler {...pinchGestureHandler}>
      <Animated.Image
        source={require("../../assets/3.jpg")}
        style={[
          styles.pinchableImage,
          {
            transform: [{ translateX }, { translateY }, { scale }]
          }
        ]}
      />
    </PinchGestureHandler>
  );
};
