import React from "react";
import { Dimensions, Image, ImageStyle, StyleSheet } from "react-native";
import Animated from "react-native-reanimated";

interface Card {
  id: number;
  source: number;
}

export const cards: Card[] = [
  { id: 0, source: require("../../assets/0.jpg") },
  { id: 1, source: require("../../assets/1.jpg") },
  { id: 2, source: require("../../assets/2.jpg") },
  { id: 3, source: require("../../assets/3.jpg") }
];

const { width } = Dimensions.get("window");
const CARD_ASPECT_RATIO = 1324 / 863;
export const CARD_WIDTH = width - 250;
export const CARD_HEIGHT = CARD_WIDTH / CARD_ASPECT_RATIO;

const styles = StyleSheet.create({
  container: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 18,
    margin: 8
  },
  flexibleContainer: {
    flex: 1,
    maxWidth: "100%",
    aspectRatio: CARD_ASPECT_RATIO,
    margin: 8,
    borderRadius: 18,
    resizeMode: "contain"
  }
});

export interface CardProps {
  card: Card;
}

interface FlexibleCardProps extends CardProps {
  style?: Animated.AnimateStyle<ImageStyle>;
}

export const FlexibleCard = ({ card, style }: FlexibleCardProps) => (
  <Animated.Image
    style={[styles.flexibleContainer, style]}
    source={card.source}
  />
);

export default ({ card }: CardProps) => {
  return <Image style={[styles.container]} source={card.source} />;
};
