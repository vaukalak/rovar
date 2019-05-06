import mergeStyles from './mergeStyles';

const composeStyleCreators = (...creators) => (animationState, props, child) => {
  const result = creators.reduce(
    ({ value, specs }, current) => ({
      value: mergeStyles(
        value && (
          typeof value === 'function' ?
            value(animationState, props, child) :
            value
        ),
        current(animationState, props, child).value,
      ),
      specs: mergeStyles(
        specs,
        current(animationState, props, child).specs,
      )
    }),
    { value: {}, specs: {} },
  );
  return result;
};

export default composeStyleCreators;
