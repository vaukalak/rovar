import React from 'react';

const touchEnhancer = enhancer => (children, props, animation) => {
  return enhancer(
    children,
    props,
    {
      ...animation,
      animation: animation.touchAnimation,
    },
  );
};

export default touchEnhancer;
