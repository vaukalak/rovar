import React from 'react';

const getChildEnhancer = key => enhancer => ({ element }, props, animationState) => {
  const { children: subChildren } = element.props;

  const subChildrenMapped = subChildren.map(
    child => child.key === key ?
      enhancer(
        { element: child },
        props,
        animationState,
      ).element :
      child
  );

  return {
    element: React.cloneElement(
      element,
      {},
      subChildrenMapped,
    )
  };
};

export default getChildEnhancer;
