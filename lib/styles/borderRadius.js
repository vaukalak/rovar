import React from 'react';
import Animated from 'react-native-reanimated';

const { multiply, sub } = Animated;

export const borderRadius = ([
  from,
  to,
] = [0, 3]) => ({ anim }) => ({
  borderRadius: sub(from, multiply(anim, 1 - to)),
});

export default borderRadius;
