import mergeStyles from './mergeStyles';

const composeStyleCreators = (a, b) => (animationState, props, child) =>
  mergeStyles(
    b(animationState, props, child),
    a(animationState, props, child),
  );

export default composeStyleCreators;
