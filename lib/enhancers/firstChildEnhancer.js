import React from 'react';

const firstChildEnhancer = enhancer => (children, props, animationState) => {
  const { children: subChildren } = children.props;
  React.Children.only(subChildren);

  return React.cloneElement(
    children,
    {},
    enhancer(
      subChildren,
      props,
      animationState,
    ),
  );
};

export default firstChildEnhancer;
