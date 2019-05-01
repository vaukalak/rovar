import React from 'react';
import Animated from 'react-native-reanimated';
import styleEnhancer from '../styleEnhancer';

const { multiply, concat } = Animated;

export const rotateXStyleCreator = ({ constrainedAnim }, props, children) => ({
  transform: [
    { perspective: 100 },
    { rotateX: concat(multiply(constrainedAnim, 360), 'deg') },
  ]
});

export const rotateXEnhancer = styleEnhancer(rotateXStyleCreator);

export default rotateXEnhancer;

