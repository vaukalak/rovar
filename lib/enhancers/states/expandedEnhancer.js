import React from 'react';

const expandedEnhancer = enhancer => (children, props, animation) => enhancer(
  children,
  props,
  {
    ...animation,
    animation: animation.expandedAnimation,
  },
);

export default expandedEnhancer;
