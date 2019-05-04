import React from 'react';
import Touchable from './Touchable';

const EnhancedTouchable = ({ enhancer, ...props }) => {
  return (
    <Touchable {...props}>
      {({ anim, constrainedAnim, x, y }) =>
        enhancer(
          props.children,
          props,
          { anim, constrainedAnim, x, y }
        )
      }
    </Touchable>
  );
};

export default EnhancedTouchable
