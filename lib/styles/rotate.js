import React from 'react';
import Animated from 'react-native-reanimated';

const { multiply, concat } = Animated;

export const rotate = (rotate = 180) => ({ anim }, props, children) => ({
  value: {
    transform: [
      { rotate: concat(multiply(anim, rotate), 'deg') },
    ],
  },
});

export default rotate;

