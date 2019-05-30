import React from 'react';
import mergeStyles from '../utils/styles/mergeStyles';
import composeStyleCreators from '../utils/styles/composeStyleCreators';

export const styleEnhancer = (...styleCreators) => ({ element: children }, componentProps, animationState) => {
  const { value, specs, props } = (
    styleCreators.length === 1
      ? styleCreators[0]
      : composeStyleCreators(...styleCreators)
  )(animationState.animation, componentProps, children, animationState);
  return {
    element: React.cloneElement(
      children,
      {
        specs: mergeStyles(
          children.props.specs,
          specs,
        ),
        style: mergeStyles(
          children.props.style,
          value,
        ),
        ...props,
      },
    ),
  };
};

export default styleEnhancer;
