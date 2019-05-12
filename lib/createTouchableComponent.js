import React from 'react';
import Touchable from './Touchable';

const functorize = op => (v, ...rest) =>
  op({ element: v }, ...rest).element;
const identity = v => v;

const createTouchableComponent = (transformer = identity) => ({
  children,
  ...props,
}) => (
  <Touchable {...props}>
    {({ touchAnimation }) =>
      functorize(transformer)(
        children,
        props,
        { animation: touchAnimation },
      )
    }
  </Touchable>
);

export default createTouchableComponent;
