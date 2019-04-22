import React, { useMemo, useState } from 'react';
import {State, TapGestureHandler} from "react-native-gesture-handler";
import Animated, { Easing } from "react-native-reanimated";

const { call, debug, max, min, Clock, timing, stopClock, clockRunning, startClock, Value, block, set, event, eq, cond } = Animated;

const createEventHandler = (
  anim,
  stateX,
  stateY,
  clockIn,
  clockOut,
  animationState,
  config,
  onPress,
  onPressIn,
) => event([
  {
    nativeEvent: (event) => {
      const { state, x, y } = event;
      return block([
        cond(eq(state, State.BEGAN), [
          cond(clockRunning(clockIn), [
            set(stateX, x),
            set(stateY, y),
            stopClock(clockOut),
            set(config.toValue, 1),
          ], [
            onPressIn && call([], onPressIn),
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
                onPress && call([], onPress),
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

const Touchable = ({
  children,
  duration = 500,
  easing = easeDefault,
  onPress,
  onPressIn,
  onPressOut,
}) => {
  const [anim] = useState(() => new Animated.Value(0));
  const [x] = useState(() => new Animated.Value(0));
  const [y] = useState(() => new Animated.Value(0));
  const [clockIn] = useState(() => new Clock());
  const [clockOut] = useState(() => new Clock());

  const [animationState] = useState(() => ({
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
    x,
    y,
    clockIn,
    clockOut,
    animationState,
    config,
    onPress,
    onPressIn,
    onPressOut,
  ), [config, onPress, onPressIn, onPressOut]);

  const constrainedAnim = useMemo(() => min(1, max(0, anim )), []);
  return (
    <TapGestureHandler
      onHandlerStateChange={handler}
    >
      {children({ anim, constrainedAnim, x, y })}
    </TapGestureHandler>
  )
};

export default Touchable;
