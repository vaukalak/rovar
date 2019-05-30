import mergeColors from '../utils/colors/mergeColors';

const backgroundColor = (to = '#000000') => ({ anim }, props, children, fullAnimationState) => {
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
  };
};

export default backgroundColor;
