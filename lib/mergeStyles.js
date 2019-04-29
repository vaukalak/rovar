import { StyleSheet } from 'react-native';

const mergeStyles = (a, b) => {
  const { transform: transformA = [], ...flatA } = StyleSheet.flatten(a);
  const { transform: transformB = [], ...flatB } = StyleSheet.flatten(b);
  return {
    ...flatA,
    ...flatB,
    transform: [
      ...transformA,
      ...transformB,
    ],
  };
};

export default mergeStyles;
