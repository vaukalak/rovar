import React from 'react';
import Animated from 'react-native-reanimated';
import styleEnhancer from '../styleEnhancer';

const { multiply } = Animated;

export const translateStyleCreator = (to = 10) => ({ anim }, props, children) => ({
  value: {
    transform: [
      { translateY: multiply(anim, to) },
    ],
  },
});

export default styleEnhancer(translateStyleCreator);

