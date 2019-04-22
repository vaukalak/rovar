import React from 'react';
import Animated from 'react-native-reanimated';
import Touchable from './lib/Touchable';

const { interpolate } = Animated;

const TouchableOpacity = ({ children, ...touchableProps }) => {
  React.Children.only(children);
  return (
    <Touchable {...touchableProps}>
      {({ anim }) => {
        const { style, ...childProps } = children.props;

        return React.cloneElement(
          children,
          {
            ...childProps,
            style: [
              {
                opacity: interpolate(
                  anim,
                  {
                    inputRange: [0, 1],
                    outputRange: [1, 0.2],
                  },
                ),
              },
              style,
            ],
          },
        )
      }}
    </Touchable>
  );
};

export default TouchableOpacity;
