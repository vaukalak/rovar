import React, { useMemo } from 'react';
import Animated from 'react-native-reanimated';
import styleEnhancer from '../styleEnhancer';
import interpolateColor from '../../interpolateColor';

const { min, max } = Animated;

const isPlainValue = (spec) =>
  spec === undefined || typeof spec === 'string';

const mergeColors = ({ anim }, props, prevSpec, to) => {
    const constrainedAnim = useMemo(() => min(1, max(0, anim )), []);
    if (!isPlainValue(prevSpec)) {
      const { color, spec } = interpolateColor(
        constrainedAnim,
        prevSpec,
        to,
      );
      return {
        spec,
        value: color,
      }
    }
    const { color, spec } = interpolateColor(
      constrainedAnim,
      prevSpec || '#FFFFFF',
      to,
    );
    return {
      spec,
      value: color,
    }
  };

export const backgroundColorStyleCreator = (to = '#000000') =>
  ({ anim }, props, children) => {
    const { spec, value } = mergeColors(
      { anim },
      props,
      children?.props?.specs?.backgroundColor,
      to,
    );
    return {
      specs: {
        backgroundColor: spec,
      },
      value: {
        backgroundColor: value,
      },
    }
  };

export const backgroundColorEnhancer = styleEnhancer(backgroundColorStyleCreator);

export default backgroundColorEnhancer;

