import React from 'react';

const functorize = transformer => (children, ...rest) => transformer({ element: children }, ...rest).element;

const createEnhancedComponent = (Component, baseEnhancer) => ({
  children,
  enhancer,
  ...props
}) => (
  <Component {...props}>
    {(animationState, additionalProps) => functorize(enhancer || baseEnhancer)(
      typeof children === 'function' ? children(additionalProps) : children,
      props,
      animationState,
    )
    }
  </Component>
);

export default createEnhancedComponent;
