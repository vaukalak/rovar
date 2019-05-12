import Animated from 'react-native-reanimated';
import colorParser from 'color';

const { cond } = Animated;

const conditionalColor = (condition, first, second) => {
  const firstParsed = colorParser(first).object();
  const secondParsed = colorParser(second).object();
  return {
    r: cond(
      condition,
      secondParsed.r,
      firstParsed.r,
    ),
    g: cond(
      condition,
      secondParsed.g,
      firstParsed.g,
    ),
    b: cond(
      condition,
      secondParsed.b,
      firstParsed.b,
    ),
  };
};

export default conditionalColor;
