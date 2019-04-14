import React, { useMemo } from 'react';
import {State, TapGestureHandler} from "react-native-gesture-handler";
import Animated, { Easing } from "react-native-reanimated";

const { max, min, Clock, timing, stopClock, clockRunning, startClock, Value, block, set, event, eq, cond } = Animated;

const createEventHandler = (
  anim,
  clockIn,
  clockOut,
  animationState,
  config,
) => event([
  {
    nativeEvent: ({ state }) => {
      return block([
        cond(eq(state, State.BEGAN), [
          cond(clockRunning(clockIn), [
            stopClock(clockOut),
            set(config.toValue, 1),
          ], [
            set(animationState.finished, 0),
            set(animationState.time, 0),
            set(animationState.frameTime, 0),
            set(config.toValue, 1),
            startClock(clockIn),
          ]),
          timing(clockIn, animationState, config),
          cond(animationState.finished, stopClock(clockIn)),

          clockRunning(clockIn),
          set(anim, animationState.position),
        ], [
          cond(
            eq(state, State.END),
            [
              stopClock(clockIn),

              cond(clockRunning(clockOut), [
                set(config.toValue, 0),
              ], [
                set(animationState.finished, 0),
                set(animationState.time, 0),
                set(animationState.frameTime, 0),
                set(config.toValue, 0),
                startClock(clockOut),
              ]),
              timing(clockOut, animationState, config),
              cond(animationState.finished, stopClock(clockOut)),

              set(anim, animationState.position),
            ]
          ),
        ]),
      ]);
    }
  }
]);

const easeDefault = Easing.in(Easing.ease);

const Touchable = ({ children, duration = 500, easing = easeDefault }) => {
  const anim = useMemo(() => new Animated.Value(0), []);
  const clockIn = new Clock();
  const clockOut = new Clock();

  const animationState = useMemo(() => ({
    finished: new Value(0),
    position: new Value(0),
    time: new Value(0),
    frameTime: new Value(0),
  }));

  const config = useMemo(() => ({
    duration,
    toValue: new Value(0),
    easing,
  }), [duration, easing]);

  const handler = useMemo(() => createEventHandler(
    anim,
    clockIn,
    clockOut,
    animationState,
    config,
  ), [config]);

  const constrainedAnim = useMemo(() => min(1, max(0, anim )), []);
  return (
    <TapGestureHandler
      onHandlerStateChange={handler}
    >
      {children({ anim, constrainedAnim })}
    </TapGestureHandler>
  )
};

export default Touchable;
