import React from 'react';
import Touchable from './Touchable';

const EnhancedTouchable = ({ enhancer, ...props }) => {
  return (
    <Touchable {...props}>
      {({ touchAnimation, disabledAnimation }) =>
        enhancer(
          { element: props.children },
          props,
          { touchAnimation, disabledAnimation, },
        ).element
      }
    </Touchable>
  );
};

export default EnhancedTouchable
