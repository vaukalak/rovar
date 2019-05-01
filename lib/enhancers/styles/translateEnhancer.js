import React from 'react';
import Animated from 'react-native-reanimated';
import styleEnhancer from '../styleEnhancer';

const { multiply } = Animated;

export const translateStyleCreator = ({ anim }, props, children) => ({
  transform: [
    { translateY: multiply(anim, 2) },
  ],
});

export default styleEnhancer(translateStyleCreator);

