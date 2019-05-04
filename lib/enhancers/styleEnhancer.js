import React from 'react';
import mergeStyles from '../mergeStyles';
import composeStyleCreators from '../composeStyleCreators';

export const styleEnhancer = (...styleCreators) => (children, props, animationState) => {
  return React.cloneElement(
    children,
    {
      style: mergeStyles(
        children.props.style,
        (
          styleCreators.length === 1 ?
            styleCreators[0] :
            composeStyleCreators(...styleCreators)
        )(animationState, props, children)
      ),
    },
  );
};

export default styleEnhancer;

