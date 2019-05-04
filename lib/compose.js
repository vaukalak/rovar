const compose = (...enhancers) => (child, props, animationState) =>
  enhancers.reduce(
    (acc, enh) => enh(acc, props, animationState),
    child,
  );

export default compose;
