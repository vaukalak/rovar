import React from 'react';
import Animated from 'react-native-reanimated';
import interpolateColor from './lib/interpolateColor';
import createTouchableComponent from './lib/createTouchableComponent';
import mergeStyles from './lib/mergeStyles';

const { concat, multiply } = Animated;

export const childrenEnhancer = (children, props, animationState) => {
  const { children: subChildren } = children.props;
  const {
    backgroundColor,
    backgroundTintColor,
    textColor,
    textTintColor,
  } = props;
  const {
    constrainedAnim,
    anim,
  } = animationState;
  React.Children.only(subChildren);

  const { style: subChildStyle, ...subChildProps } = subChildren.props;

  return React.cloneElement(
    children,
    {},
    React.cloneElement(
      subChildren,
      {
        ...subChildProps,
        style: [
          {
            color: interpolateColor(
              constrainedAnim,
              textColor,
              textTintColor,
            ),
            transform: [
              { rotate: concat(multiply(anim, -180), 'deg') },
              { perspective: 100 },
              { rotateX: concat(multiply(constrainedAnim, 360), 'deg') },
            ],
          },
          subChildStyle,
        ]
      }
    ),
  )
};

export default createTouchableComponent(childrenEnhancer);
