import React from 'react';
import styleEnhancer from '../styleEnhancer';
import interpolateColor from '../../interpolateColor';

export const colorStyleCreator = (from, to) => ({ constrainedAnim }) => ({
  color: interpolateColor(
    constrainedAnim,
    from,
    to,
  )
});

export const colorEnhancer = styleEnhancer(colorStyleCreator);

export default colorEnhancer;

