import Animated from "react-native-reanimated";

const { block, eq, cond } = Animated;

export const addCase = (condition, conditionCase) => ({
  condition,
  conditionCase,
});

export const doSwitch = (state, ...cases) =>
  block([
    cond(
      eq(state, cases[0].condition),
      cases[0].conditionCase,
      [
        cond(
          eq(state, cases[1].condition),
          cases[1].conditionCase,
        ),
      ]),
  ]);
