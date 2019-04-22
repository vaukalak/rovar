import Animated from 'react-native-reanimated';
import colorParser from 'color';

const { interpolate, color, round } = Animated;

const interpolateColor = (anim, from, to) => {
  const colorFrom = colorParser(from).object();
  const colorTo = colorParser(to).object();
  return color(
    round(interpolate(anim, {
      inputRange: [0, 1],
      outputRange: [colorFrom.r, colorTo.r],
    })),
    round(interpolate(anim, {
      inputRange: [0, 1],
      outputRange: [colorFrom.g, colorTo.g],
    })),
    round(interpolate(anim, {
      inputRange: [0, 1],
      outputRange: [colorFrom.b, colorTo.b],
    })),
  );
};

export default interpolateColor;
