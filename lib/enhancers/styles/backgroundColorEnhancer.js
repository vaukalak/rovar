import React from 'react';
import Animated from 'react-native-reanimated';
import styleEnhancer from '../styleEnhancer';
import interpolateColor from '../../interpolateColor';

const { multiply, sub } = Animated;

export const backgroundColorStyleCreator = ({ constrainedAnim }, props, children) => ({
  backgroundColor: interpolateColor(
    constrainedAnim,
    '#FFFFFF',
    '#000000',
  )
});

export const backgroundColorEnhancer = styleEnhancer(backgroundColorStyleCreator);

export default backgroundColorEnhancer;

