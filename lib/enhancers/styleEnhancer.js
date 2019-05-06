import React from 'react';
import mergeStyles from '../mergeStyles';
import composeStyleCreators from '../composeStyleCreators';

export const styleEnhancer = (...styleCreators) => ({ element: children }, props, animationState) => {
  let { value, specs } = (
    styleCreators.length === 1 ?
      styleCreators[0] :
      composeStyleCreators(...styleCreators)
  )(animationState, props, children);
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
        )
      },
    ),
  };
};

export default styleEnhancer;

