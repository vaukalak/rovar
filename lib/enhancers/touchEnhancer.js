import React from 'react';

const touchEnhancer = enhancer => (children, props, { touchAnimation }) => {
  return enhancer(
    children,
    props,
    touchAnimation,
  );
};

export default touchEnhancer;
