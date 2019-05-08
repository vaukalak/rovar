import React from 'react';

const selectedEnhancer = enhancer => (children, props, { selectedAnimation }) => {
  return enhancer(
    children,
    props,
    selectedAnimation,
  );
};

export default selectedEnhancer;
