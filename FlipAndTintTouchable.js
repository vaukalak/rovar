import React from 'react';
import Animated from 'react-native-reanimated';
import interpolateColor from './lib/interpolateColor';
import Touchable from './lib/Touchable';

const { concat, multiply, sub } = Animated;

const FlipAndTintTouchable = ({
  children,
  backgroundColor,
  backgroundTintColor,
  textColor,
  textTintColor,
  ...touchableProps,
}) => {
  React.Children.only(children);
  return (
    <Touchable {...touchableProps}>
      {({ anim, constrainedAnim }) => {
        const { style, children: subChildren, ...childProps } = children.props;
        React.Children.only(subChildren);

        const { style: subChildStyle, ...subChildProps } = subChildren.props;

        return React.cloneElement(
          children,
          {
            ...childProps,
            style: [
              {
                backgroundColor: interpolateColor(
                  constrainedAnim,
                  backgroundColor,
                  backgroundTintColor,
                ),
                transform: [
                  { scale: sub(1, multiply(anim, 0.02)) },
                  { rotate: concat(multiply(anim, 180), 'deg') },
                ],
              },
              style,
            ],
          },
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
      }}
    </Touchable>
  );
};

export default FlipAndTintTouchable;
