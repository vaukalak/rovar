import React from 'react';
import Animated from 'react-native-reanimated';
import styleEnhancer from '../styleEnhancer';

const { multiply, sub } = Animated;

export const scaleStyleCreator = ({ anim }, props, children) => ({
  transform: [
    { scale: sub(1, multiply(anim, 0.05)) },
  ]
});

export const scaleEnhancer = styleEnhancer(scaleStyleCreator);

export default scaleEnhancer;

