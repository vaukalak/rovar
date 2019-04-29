import React from 'react';
import Animated from 'react-native-reanimated';
import createTouchableComponent from './lib/createTouchableComponent';
import mergeStyles from './lib/mergeStyles';

const { multiply } = Animated;

export const childrenEnhancer = (children, props, animationState) => {
  const { anim } = animationState;
  return React.cloneElement(
    children,
    {
      style: mergeStyles(
        children.props.style,
        {
          transform: [
            { translateY: multiply(anim, 1) },
          ]
        }
      ),
    }
  );
};

export default createTouchableComponent(childrenEnhancer);

