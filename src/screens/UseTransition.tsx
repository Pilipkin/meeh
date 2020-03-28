import React, { useRef, useState } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import Animated, {
  Transition,
  Transitioning,
  TransitioningView
} from "react-native-reanimated";
import { useTransition } from "react-native-redash";
import Button from "../components/Button";

const { height, width } = Dimensions.get("window");

const { multiply, interpolate } = Animated;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingVertical: 50
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center"
  },
  card: {
    height: height * 0.3,
    width: width * 0.8,
    alignItems: "flex-start",
    flexDirection: "row",
    justifyContent: "flex-end",
    backgroundColor: "white",
    borderWidth: 5,
    borderColor: "pink"
  },
  cardText: {
    fontSize: 50,
    fontWeight: "900"
  }
});

const transformOrigin = width / 2 - width * 0.1;
const darkTransition = (
  <Transition.Together>
    <Transition.In type="fade" durationMs={400} />
    <Transition.Out type="fade" durationMs={400} />
  </Transition.Together>
);
export default () => {
  const ref = useRef<TransitioningView>(null);
  const [dark, setDark] = useState(false);
  const [toggled, setToggled] = useState<0 | 1>(0);
  const transition = useTransition(toggled);
  return (
    <View style={styles.container}>
      {["1", "2", "<3"].map((text, index) => {
        const direction = interpolate(index, {
          inputRange: [0, 1, 2],
          outputRange: [-1, 0, 1]
        });
        const rotate = multiply(
          direction,
          interpolate(transition, {
            inputRange: [0, 1],
            outputRange: [0, Math.PI / 3]
          })
        );

        return (
          <Animated.View
            style={[
              styles.overlay,
              {
                transform: [
                  { translateX: -transformOrigin },
                  { rotate },
                  { translateX: transformOrigin }
                ]
              }
            ]}
            key={text}
          >
            <Transitioning.View
              style={styles.card}
              {...{
                ref,
                transition: darkTransition
              }}
            >
              {dark && (
                <View
                  style={{
                    ...StyleSheet.absoluteFillObject,
                    backgroundColor: "#000"
                  }}
                />
              )}
              <Text
                style={[styles.cardText, { color: dark ? "white" : "#000" }]}
              >
                {text}
              </Text>
            </Transitioning.View>
          </Animated.View>
        );
      })}
      <Button
        text="switch"
        onPress={() => {
          if (ref.current) {
            ref.current.animateNextTransition();
          }
          setDark(!dark);
        }}
      />

      <Button text="rotate" onPress={() => setToggled(toggled ^ 1)} />
    </View>
  );
};
