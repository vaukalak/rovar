import React, { useState } from 'react';
import Animated from 'react-native-reanimated';
import interpolateColor from '../utils/colors/interpolateColor';

const { min, max } = Animated;

const color = to => ({ anim }, props, children) => {
  const [constrainedAnim] = useState(() => min(1, max(0, anim)));
  if (children?.props?.specs?.color) {
    const { color, spec } = interpolateColor(
      constrainedAnim,
        children?.props?.specs?.color,
        to,
    );
    return {
      specs: {
        color: spec,
      },
      value: {
        color,
      },
    };
  }
  const { color, spec } = interpolateColor(
    constrainedAnim,
      children?.props?.style?.color || '#000000',
      to,
  );
  return {
    specs: {
      color: spec,
    },
    value: {
      color,
    },
  };
};

export default color;
