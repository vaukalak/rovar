import React from 'react';

const firstChildEnhancer = enhancer => ({ element }, props, animationState) => {
  const { children: subChildren } = element.props;
  React.Children.only(subChildren);

  return {
    element: React.cloneElement(
      element,
      {},
      enhancer(
        { element: subChildren },
        props,
        animationState,
      ).element,
    ),
  };
};

export default firstChildEnhancer;
