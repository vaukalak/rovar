import mergeStyles from './mergeStyles';

const composeStyleCreators = (...creators) => (animationState, props, child) =>
  creators.reduce(
    (prev, current) => mergeStyles(
      prev && (
        typeof prev === 'function' ?
          prev(animationState, props, child) :
          prev
      ),
      current(animationState, props, child),
    ),
    undefined,
  );

export default composeStyleCreators;
