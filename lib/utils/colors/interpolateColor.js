import { useMemo } from 'react';
import Animated from 'react-native-reanimated';
import colorParser from 'color';

const { interpolate, color, round } = Animated;

const interpolateColor = (anim, from, to) => useMemo(() => {
  const colorFrom = typeof from === 'string'
    ? colorParser(from).object()
    : from;
  const colorTo = typeof to === 'string'
    ? colorParser(to).object()
    : to;
  const spec = {
    r: round(interpolate(anim, {
      inputRange: [0, 1],
      outputRange: [colorFrom.r, colorTo.r],
    })),
    g: round(interpolate(anim, {
      inputRange: [0, 1],
      outputRange: [colorFrom.g, colorTo.g],
    })),
    b: round(interpolate(anim, {
      inputRange: [0, 1],
      outputRange: [colorFrom.b, colorTo.b],
    })),
  };
  return {
    spec,
    color: color(
      spec.r,
      spec.g,
      spec.b,
    ),
  };
}, [anim, from, to]);

export default interpolateColor;
