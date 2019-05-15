import React from 'react';
import Animated from 'react-native-reanimated';

const { multiply, concat } = Animated;

const rotateX = ({ constrainedAnim }, props, children) => ({
  transform: [
    { perspective: 100 },
    { rotateX: concat(multiply(constrainedAnim, 360), 'deg') },
  ]
});

export default rotateX;

