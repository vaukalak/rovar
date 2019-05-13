import React from 'react';

const identity = v => v;

const functorize = transformer => (children, ...rest) =>
  transformer({ element: children }, ...rest).element;

const createEnhancedComponent = (Component, baseEnhancer) => ({
  children,
  enhancer,
  ...props,
}) => (
  <Component {...props} >
    {(animationState) =>
      functorize(enhancer || baseEnhancer)(
        children,
        props,
        animationState,
      )
    }
  </Component>
);

export default createEnhancedComponent;
