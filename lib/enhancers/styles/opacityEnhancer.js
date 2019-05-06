import React from 'react';
import Animated from 'react-native-reanimated';
import styleEnhancer from '../styleEnhancer';

const { interpolate } = Animated;

export const opacityStyleCreator = (opacity = 0.2) => ({ anim }, props, children) => ({
  value: {
    opacity: interpolate(
      anim,
      {
        inputRange: [0, 1],
        outputRange: [1, opacity],
      },
    ),
  },
});

const opacityEnhancer = styleEnhancer(opacityStyleCreator);

export default opacityEnhancer;
