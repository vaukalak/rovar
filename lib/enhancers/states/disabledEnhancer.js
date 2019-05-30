import React from 'react';

const disabledEnhancer = enhancer => (children, props, animation) => enhancer(
  children,
  props,
  {
    ...animation,
    animation: animation.disabledAnimation,
  },
);

export default disabledEnhancer;
