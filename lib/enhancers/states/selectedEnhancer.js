import React from 'react';

const selectedEnhancer = enhancer => (children, props, animation) => {
  return enhancer(
    children,
    props,
    {
      ...animation,
      animation: animation.selectedAnimation,
    },
  );
};

export default selectedEnhancer;
