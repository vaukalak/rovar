import React from 'react';
import Animated from 'react-native-reanimated';
import styleEnhancer from '../styleEnhancer';
import interpolateColor from '../../interpolateColor';

const { multiply, sub } = Animated;

export const borderRadiusStyleCreator = ([
  from,
  to,
] = [0, 3]) =>
  ({ anim }) => ({
    borderRadius: sub(from, multiply(anim, 1 - to)),
  });

export const borderRadiusEnhancer = styleEnhancer(borderRadiusStyleCreator);

export default borderRadiusEnhancer;

