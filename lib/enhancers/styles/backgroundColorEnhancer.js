import React from 'react';
import Animated from 'react-native-reanimated';
import styleEnhancer from '../styleEnhancer';
import interpolateColor from '../../interpolateColor';

const { multiply, sub } = Animated;

export const backgroundColorStyleCreator = ([
  from,
  to,
] = ['#FFFFFF', '#000000']) =>
  ({ constrainedAnim }, props, children) => ({
    backgroundColor: interpolateColor(
      constrainedAnim,
      from,
      to,
    )
  });

export const backgroundColorEnhancer = styleEnhancer(backgroundColorStyleCreator);

export default backgroundColorEnhancer;

