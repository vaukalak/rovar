import React, { useMemo } from 'react';
import Animated from 'react-native-reanimated';
import Touchable from './lib/Touchable';

const { max, multiply, sub, divide } = Animated;

const FlipAndTintTouchable = ({ children, ...touchableProps }) => {
  React.Children.only(children);
  const layoutWidth = useMemo(() => new Animated.Value(0), []);
  const layoutHeight = useMemo(() => new Animated.Value(0), []);
  return (
    <Touchable {...touchableProps}>
      {({ anim, constrainedAnim, x, y }) => {
        const { style, children: subChildren, ...childProps } = children.props;
        React.Children.only(subChildren);

        const size = multiply(max(layoutWidth, layoutHeight), anim, 2);

        return React.cloneElement(
          children,
          {
            ...childProps,
            onLayout: ({ nativeEvent }) => {
              layoutWidth.setValue(nativeEvent.layout.width);
              layoutHeight.setValue(nativeEvent.layout.height);
            },
            style: [
              {
                overflow: 'hidden',
                transform: [
                  { scale: sub(1, multiply(anim, 0.01)) },
                  { translateY: multiply(anim, 2) },
                ]
              },
              style,
            ],
          },
          [
            <Animated.View
              key="circle"
              style={{
                position: 'absolute',
                top: sub(y, divide(size, 2)),
                left: sub(x, divide(size, 2)),
                width: size,
                height: size,
                borderRadius: divide(size, 2),
                backgroundColor: 'rgba(240, 208, 0, 0.7)',
              }}
            />,
            subChildren
          ],
        )
      }}
    </Touchable>
  );
};

export default FlipAndTintTouchable;
