import { useState } from 'react';
import Animated from "react-native-reanimated";
const { Clock, timing, stopClock, clockRunning, startClock, Value, block, set, cond } = Animated;

export const useTransition = (clock, anim, config, animationState, toValue, startWrapper) => {

  return [
    [
      cond(
        clockRunning(clock),
        [
          set(config.toValue, toValue),
        ],
        startWrapper([
          stopClock(clock),
          set(animationState.finished, 0),
          set(animationState.time, 0),
          set(animationState.frameTime, 0),
          set(config.toValue, toValue),
          startClock(clock),
        ]),
      ),
      timing(clock, animationState, config),
      cond(animationState.finished, stopClock(clock)),
      set(anim, animationState.position),
    ],
  ];
};

export const useInOutTransition = (anim, config, inWrapper, outWrapper, position) => {
  const [animationState] = useState(() => ({
    finished: new Value(0),
    position: new Value(position),
    time: new Value(0),
    frameTime: new Value(0),
  }));

  const [clockIn] = useState(() => new Clock());
  const [clockOut] = useState(() => new Clock());

  const [inTransition] = useTransition(
    clockIn, anim, config, animationState, 1,
    (node) => block([
      stopClock(clockOut),
      inWrapper(node),
    ]),
  );
  const [outTransition] = useTransition(
    clockOut, anim, config, animationState, 0,
    (node) => block([
      stopClock(clockIn),
      outWrapper(node),
    ]),
  );
  return {
    in: inTransition,
    out: outTransition,
  }
};
