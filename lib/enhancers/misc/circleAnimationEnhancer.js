import React from 'react';
import Animated from 'react-native-reanimated';
import useOnLayout from '../../utils/styles/useOnLayout';
import Circle from './Circle';
import mergeStyles from '../../utils/styles/mergeStyles';

const { max, multiply, divide } = Animated;

const circleAnimationEnhancer = backgroundColor => ({ element: children }, props, animationState) => {
  const { children: subChildren, ...childrenProps } = children.props;
  const { anim, x, y } = animationState.animation;
  const {
    layoutWidth,
    layoutHeight,
    onLayout,
  } = useOnLayout();
  const size = multiply(max(layoutWidth, layoutHeight), anim, 2);
  return {
    element: React.cloneElement(
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
          backgroundColor={backgroundColor}
          radius={divide(size, 2)}
          x={x}
          y={y}
        />
        {subChildren}
      </>,
    ),
  };
};

export default circleAnimationEnhancer;
