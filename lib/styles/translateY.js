import React from 'react';
import Animated from 'react-native-reanimated';

const { multiply } = Animated;

const translateY = (to = 10) => ({ anim }, props, children) => ({
  value: {
    transform: [
      { translateY: multiply(anim, to) },
    ],
  },
});

export default translateY;
