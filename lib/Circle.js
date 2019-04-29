import React from 'react';
import Animated from 'react-native-reanimated';

const { sub, multiply } = Animated;

const Circle = ({ radius, x, y }) => (
  <Animated.View
    style={{
      position: 'absolute',
      top: sub(y, radius),
      left: sub(x, radius),
      width: multiply(radius, 2),
      height: multiply(radius, 2),
      borderRadius: radius,
      backgroundColor: 'rgba(240, 208, 0, 0.7)',
    }}
  />
);

export default Circle;
