import React from 'react';
import Touchable from './Touchable';

const identity = v => v;

const createTouchableComponent = (transformer = identity) => ({
  children,
  ...props,
}) => (
  <Touchable {...props}>
    {({ anim, constrainedAnim, x, y }) =>
      transformer(
        children,
        props,
        { anim, constrainedAnim, x, y }
      )
    }
  </Touchable>
);

export default createTouchableComponent;
