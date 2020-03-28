import React from "react";
import { Image } from "react-native";
import { useMemoOne } from "use-memo-one";
import Animated from "react-native-reanimated";

const {
  Extrapolate,
  Value,
  Clock,
  useCode,
  set,
  block,
  cond,
  not,
  add,
  startClock,
  clockRunning,
  stopClock,
  interpolate,
  eq
} = Animated;
const duration = 2000;
interface Icard {
  show?: boolean;
}

export default ({ show }: Icard) => {
  const { time, clock, progress } = useMemoOne(
    () => ({
      time: new Value(0),
      clock: new Clock(),
      progress: new Value(0)
    }),
    []
  );
  const opacity = interpolate(progress, {
    inputRange: [0, 1],
    outputRange: show ? [0, 1] : [1, 0],
    extrapolate: Extrapolate.CLAMP
  });
  useCode(
    () =>
      block([
        cond(not(clockRunning(clock)), [startClock(clock), set(time, clock)]),
        set(
          progress,
          interpolate(clock, {
            inputRange: [time, add(time, duration)],
            outputRange: [0, 1],
            extrapolate: Extrapolate.CLAMP
          })
        ),
        cond(eq(progress, 1), stopClock(clock))
      ]),
    [clock, progress, time]
  );
  return (
    <Animated.View style={{ opacity }}>
      <Image source={require("../../assets/mmouse.png")} />
    </Animated.View>
  );
};
