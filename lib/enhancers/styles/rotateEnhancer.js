import React from 'react';
import Animated from 'react-native-reanimated';
import styleEnhancer from '../styleEnhancer';

const { multiply, concat } = Animated;

export const rotateStyleCreator = (rotate = 180) => ({ anim }, props, children) => ({
  transform: [
    { rotate: concat(multiply(anim, rotate), 'deg') },
  ]
});

export const rotateEnhancer = styleEnhancer(rotateStyleCreator);

export default rotateEnhancer;

