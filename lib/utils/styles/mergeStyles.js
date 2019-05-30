import { useMemo } from 'react';
import { StyleSheet } from 'react-native';

const mergeStyles = (a, b) => {
  if (!a) {
    return b;
  }
  if (!b) {
    return a;
  }
  const { transform: transformA = [], ...flatA } = StyleSheet.flatten(a);
  const { transform: transformB = [], ...flatB } = StyleSheet.flatten(b);
  const result = {
    ...flatA,
    ...flatB,
    transform: [
      ...transformA,
      ...transformB,
    ],
  };

  return result;
};

export default mergeStyles;
