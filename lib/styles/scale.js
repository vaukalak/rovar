import React, { useState } from 'react';
import Animated from 'react-native-reanimated';

const { Value, sub, cond, add, greaterThan, interpolate, multiply } = Animated;

const scale = (from, to, align = 'center') => ({ anim }, props, children) => {
  const scaleValue = interpolate(
    anim,
    {
      inputRange: [0, 1],
      outputRange: [
        from,
        to,
      ],
    },
  );
  if (align === 'center') {
    return {
      value: {
        transform: [{ scale: scaleValue }],
      }
    }
  }
  const [widthNode] = useState(() => new Value(0));
  let translateXInterpolate = interpolate(
    anim,
    {
      inputRange: [0, 1],
      outputRange: [
        0,
        multiply(
          widthNode,
          sub(to, from),
          0.5
        ),
      ],
    },
  );
  return {
    props: {
      onLayout: ({ nativeEvent }) => {
        widthNode.setValue(nativeEvent.layout.width);
      }
    },
    value: {
      transform: [
        {
          translateX:
            cond(
              greaterThan(to, from),
              add(
                multiply(sub(0, widthNode), 0.5),
                translateXInterpolate,
              ),
              translateXInterpolate,
            ),
        },
        {
          scale: scaleValue,
        },
      ],
    },
  }
};

export default scale;

