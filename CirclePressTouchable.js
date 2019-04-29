import React from 'react';
import Animated from 'react-native-reanimated';
import createTouchableComponent from './lib/createTouchableComponent';
import useOnLayout from './lib/useOnLayout';
import Circle from './lib/Circle';
import mergeStyles from './lib/mergeStyles';

const { max, multiply, divide } = Animated;

const childrenEnhancer = (children, props, animationState) => {
  const { children: subChildren, ...childrenProps } = children.props;
  const { anim, x, y } = animationState;
  const {
    layoutWidth,
    layoutHeight,
    onLayout,
  } = useOnLayout();
  const size = multiply(max(layoutWidth, layoutHeight), anim, 2);
  return React.cloneElement(
    children,
    {
      ...childrenProps,
      onLayout,
      style: mergeStyles(
        childrenProps.style,
        { overflow: 'hidden' },
      ),
    },
    <>
      <Circle
        radius={divide(size, 2)}
        x={x}
        y={y}
      />
      {subChildren}
    </>
  );
};

export default createTouchableComponent(childrenEnhancer);

