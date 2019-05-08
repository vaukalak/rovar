import React from 'react';

const disabledEnhancer = enhancer => (children, props, { disabledAnimation }) => {
  return enhancer(
    children,
    props,
    disabledAnimation,
  );
};

export default disabledEnhancer;
