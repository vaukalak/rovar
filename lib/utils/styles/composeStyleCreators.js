import { useMemo } from 'react';
import mergeStyles from './mergeStyles';

const initialValue = { value: {}, specs: {} };

const composeStyleCreators = (...creators) => (animationState, componentProps, child) => {
  const result = creators.reduce(
    ({ value, specs, props }, current) => {
      const newStyle = current(animationState, componentProps, child);
      const calculatedValue = value && (
        typeof value === 'function'
          ? value(animationState, componentProps, child)
          : value
      );
      return useMemo(() => ({
        props: {
          ...props,
          ...newStyle.props,
        },
        value: mergeStyles(
          calculatedValue,
          newStyle.value,
        ),
        specs: mergeStyles(
          specs,
          newStyle.specs,
        ),
      }), [props, specs, newStyle, calculatedValue]);
    },
    initialValue,
  );
  return result;
};

export default composeStyleCreators;
