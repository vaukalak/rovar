import React from 'react';
import mergeStyles from '../mergeStyles';

export const styleEnhancer = createStyle => (children, props, animationState) => {
  return React.cloneElement(
    children,
    {
      style: mergeStyles(
        children.props.style,
        createStyle(animationState, props, children),
      ),
    }
  );
};

export default styleEnhancer;

