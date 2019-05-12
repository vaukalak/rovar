import React from 'react';
import Animated from 'react-native-reanimated';
import styleEnhancer from '../styleEnhancer';

const { interpolate } = Animated;

export const opacityStyleCreator = (opacity = 0.2) => ({ anim }, props, children) => {
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

const opacityEnhancer = styleEnhancer(opacityStyleCreator);

export default opacityEnhancer;
