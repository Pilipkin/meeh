import React, { useRef, useState } from "react";
import { Dimensions, ImageStyle, StyleSheet, ViewStyle } from "react-native";
import {
  Transition,
  Transitioning,
  TransitioningView
} from "react-native-reanimated";
import Selection from "../components/Selection";
import Card, { cards } from "../components/Cards";

interface Layout {
  id: string;
  name: string;
  layout: {
    container: ViewStyle;
    child?: ImageStyle;
  };
}
const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});

const layouts: Layout[] = [
  {
    id: "column",
    name: "Column",
    layout: {
      container: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
      }
    }
  },
  {
    id: "row",
    name: "Row",
    layout: {
      container: {
        flexDirection: "row",
        alignItems: "center"
      },
      child: {
        width: width / 10 - 8
      }
    }
  },
  {
    id: "wrap",
    name: "Wrap",
    layout: {
      container: {
        flexDirection: "row",
        flexWrap: "wrap"
      },
      child: {
        flex: 0,
        width: width / 2
      }
    }
  }
];

const transition = (
  <Transition.Change durationMs={400} interpolation="easeInOut" />
);

export default () => {
  const ref = useRef<TransitioningView>(null);
  const [selectedLayout, setLayout] = useState(layouts[0].layout);

  return (
    <>
      <Transitioning.View
        style={[styles.container, selectedLayout.container]}
        {...{ ref, transition }}
      >
        {cards.map(card => (
          <Card key={card.id} {...{ card }} />
        ))}
      </Transitioning.View>
      {layouts.map(({ id, name, layout }) => (
        <Selection
          key={id}
          name={name}
          onPress={() => {
            if (ref.current) {
              ref.current.animateNextTransition();
            }
            setLayout(layout);
          }}
          isSelected={selectedLayout === layout}
        />
      ))}
    </>
  );
};
