import React from 'react';
import Animated from 'react-native-reanimated';

const { interpolate } = Animated;

export const opacity = (opacity = 0.2) => ({ anim }, props, children) => {
  let interpolatedOpacity = interpolate(
    anim,
    {
      inputRange: [0, 1],
      outputRange: [
        children?.props?.specs?.opacity || 1,
        opacity
      ],
    },
  );
  return {
    specs: {
      opacity: interpolatedOpacity,
    },
    value: {
      opacity: interpolatedOpacity,
    },
  };
};

export default opacity;
