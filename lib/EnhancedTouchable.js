import React from 'react';
import Touchable from './Touchable';

const EnhancedTouchable = ({ enhancer, ...props }) => {
  return (
    <Touchable {...props}>
      {(animations) =>
        enhancer(
          { element: props.children },
          props,
          animations,
        ).element
      }
    </Touchable>
  );
};

export default EnhancedTouchable
