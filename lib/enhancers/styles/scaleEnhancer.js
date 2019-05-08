import React from 'react';
import Animated from 'react-native-reanimated';
import styleEnhancer from '../styleEnhancer';

const { interpolate } = Animated;

export const scaleStyleCreator = (from, to) => ({ anim }, props, children) => {
  return {
    value: {
      transform: [
        { scale: interpolate(
            anim,
            {
              inputRange: [0, 1],
              outputRange: [
                from,
                to,
              ],
            },
          )}
      ],
    },
  }
};

export const scaleEnhancer = styleEnhancer(scaleStyleCreator);

export default scaleEnhancer;

