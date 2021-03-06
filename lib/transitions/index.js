import { useState, useMemo } from 'react';
import { useHandler } from 'react-use-handler';
import Animated from 'react-native-reanimated';

const {
  Clock, timing, stopClock, clockRunning, startClock, Value, block, set, cond,
} = Animated;

export const useTransition = (clock, anim, config, animationState, toValue, startWrapper, endWrapper = e => e) => {
  return useMemo(() => {
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
        cond(animationState.finished, endWrapper(stopClock(clock))),
        set(anim, animationState.position),
      ],
    ];
  }, [clock, anim, config, animationState, toValue, startWrapper, endWrapper]);
};

export const useInOutTransition = (anim, config, inWrapper, outWrapper, position) => {
  const [animationState] = useState(() => ({
    finished: new Value(0),
    position: new Value(position),
    time: new Value(0),
    frameTime: new Value(0),
  }));

  const [endState] = useState(() => new Value(0));
  const [startState] = useState(() => new Value(0));

  const [clockIn] = useState(() => new Clock());
  const [clockOut] = useState(() => new Clock());

  const inTransitionStart = useHandler(
    node => block([
      set(startState, 0),
      stopClock(clockOut),
      inWrapper(node),
    ])
  );

  const inTransitionEnd = useHandler(
    node => [
      set(endState, 1),
      node,
    ]
  );

  const [inTransition] = useTransition(
    clockIn, anim, config, animationState, 1,
    inTransitionStart,
    inTransitionEnd,
  );

  const outTransitionStart = useHandler(
    node => block([
      set(endState, 0),
      stopClock(clockIn),
      outWrapper(node),
    ])
  );

  const outTransitionEnd = useHandler(
    node => [
      set(startState, 1),
      node,
    ]
  );

  const [outTransition] = useTransition(
    clockOut, anim, config, animationState, 0,
    outTransitionStart,
    outTransitionEnd,
  );
  return useMemo(() => {
    return {
      transitionState: {
        clockIn,
        clockOut,
        endState,
        startState,
      },
      inTransition,
      outTransition,
    };
  }, [clockIn, clockOut, endState, startState, inTransition, outTransition]);
};
