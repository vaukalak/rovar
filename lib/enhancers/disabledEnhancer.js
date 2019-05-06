import React from 'react';

const touchEnhancer = enhancer => (children, props, { disabledAnimation }) => {
  return enhancer(
    children,
    props,
    disabledAnimation,
  );
};

export default touchEnhancer;
