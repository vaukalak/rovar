import mergeStyles from './mergeStyles';

const composeStyleCreators = (...creators) => (animationState, componentProps, child) => {
  const result = creators.reduce(
    ({ value, specs, props }, current) => {
      const newStyle = current(animationState, componentProps, child);
      return {
        props: {
          ...props,
          ...newStyle.props,
        },
        value: mergeStyles(
          value && (
            typeof value === 'function' ?
              value(animationState, componentProps, child) :
              value
          ),
          newStyle.value,
        ),
        specs: mergeStyles(
          specs,
          newStyle.specs,
        ),
      };
    },
    { value: {}, specs: {} },
  );
  return result;
};

export default composeStyleCreators;
