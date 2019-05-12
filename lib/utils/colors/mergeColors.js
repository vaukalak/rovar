import { useMemo } from 'react';
import Animated from 'react-native-reanimated';
import interpolateColor from './interpolateColor';

const { min, max } = Animated;

const mergeColors = ({ anim }, props, prevSpec, to) => {
  const constrainedAnim = useMemo(() => min(1, max(0, anim )), []);
  const { color, spec } = interpolateColor(
    constrainedAnim,
    prevSpec,
    to,
  );
  return {
    spec,
    value: color,
  }
};

export default mergeColors;
