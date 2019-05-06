import React, { useMemo } from 'react';
import Animated from 'react-native-reanimated';
import styleEnhancer from '../styleEnhancer';
import interpolateColor from '../../interpolateColor';

const { min, max } = Animated;

export const backgroundColorStyleCreator = (to = '#000000') =>
  ({ anim }, props, children) => {
    const constrainedAnim = useMemo(() => min(1, max(0, anim )), []);
    if (children?.props?.specs?.backgroundColor) {
      const { color, spec } = interpolateColor(
        constrainedAnim,
        children?.props?.specs?.backgroundColor,
        to,
      );
      return {
        specs: {
          backgroundColor: spec,
        },
        value: {
          backgroundColor: color,
        },
      }
    }
    const { color, spec } = interpolateColor(
      constrainedAnim,
      children?.props?.style?.backgroundColor || '#FFFFFF',
      to,
    );
    return {
      specs: {
        backgroundColor: spec,
      },
      value: {
        backgroundColor: color,
      },
    }
  };

export const backgroundColorEnhancer = styleEnhancer(backgroundColorStyleCreator);

export default backgroundColorEnhancer;

