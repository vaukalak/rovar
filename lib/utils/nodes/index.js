import Animated from 'react-native-reanimated';

const { eq, cond } = Animated;

export const addCase = (condition, conditionCase) => ({
  condition,
  conditionCase,
});

export const doSwitch = (state, ...cases) => cases.reverse().reduce(
  (prev, { condition, conditionCase }) => cond(
    eq(state, condition),
    conditionCase,
    prev,
  ),
  undefined,
);
