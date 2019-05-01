const compose = (a, b) => (child, props, animationState) =>
  a(b(child, props, animationState), props, animationState);

export default compose;
