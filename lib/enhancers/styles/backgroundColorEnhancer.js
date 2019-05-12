import React, { useMemo } from 'react';
import Animated from 'react-native-reanimated';
import styleEnhancer from '../styleEnhancer';
import mergeColors from '../../utils/colors/mergeColors';

const { min, max } = Animated;

export const backgroundColorStyleCreator = (to = '#000000') =>
  ({ anim }, props, children, fullAnimationState) => {
    const { spec, value } = mergeColors(
      { anim },
      props,
      children?.props?.specs?.backgroundColor || '#FFFFFF',
      typeof to === 'function' ? to(fullAnimationState) : to,
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

