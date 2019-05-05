import React, { useMemo, useState, useEffect } from 'react';
import {State, BaseButton, TapGestureHandler} from "react-native-gesture-handler";
import Animated, { Easing } from "react-native-reanimated";
import { useHandler } from 'react-use-handler';

const { concat, call, max, min, Clock, debug, timing, stopClock, clockRunning, startClock, Value, block, set, event, eq, cond, and } = Animated;

const addCase = (condition, conditionCase) => ({
  condition,
  conditionCase,
});

const doSwitch = (state, ...cases) =>
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

const createEventHandler = ({
  isPressed,
  anim,
  x: stateX,
  y: stateY,
  clockIn,
  clockOut,
  animationState,
  config,
  onPress,
  onPressIn,
  enabled,
}) => {
  const inTransition = (onStart) => [
    cond(clockRunning(clockIn), [
      stopClock(clockOut),
      set(config.toValue, 1),
    ], cond(
      eq(enabled, true),
      [
        set(isPressed, 1),
        onStart,
        set(animationState.finished, 0),
        set(animationState.time, 0),
        set(animationState.frameTime, 0),
        set(config.toValue, 1),
        startClock(clockIn),
      ],
    )),
    timing(clockIn, animationState, config),
    cond(animationState.finished, stopClock(clockIn)),

    clockRunning(clockIn),
    set(anim, animationState.position),
  ];
  const outTransition = (onStart) => [
    stopClock(clockIn),

    cond(clockRunning(clockOut), [
      set(config.toValue, 0),
    ], cond(
      eq(enabled, true),
      [
        set(animationState.finished, 0),
        set(animationState.time, 0),
        set(animationState.frameTime, 0),
        set(config.toValue, 0),
        startClock(clockOut),
        onStart,
      ]
    )),
    timing(clockOut, animationState, config),
    cond(animationState.finished, block([
      stopClock(clockOut),
      set(isPressed, 0),
    ])),

    set(anim, animationState.position),
  ];
  return event([
    {
      nativeEvent: (event) => {
        const { state, x, y } = event;
        return doSwitch(
          state,
          addCase(State.BEGAN, inTransition(
            block([
              set(stateX, x),
              set(stateY, y),
              onPressIn && call([], onPressIn),
            ]),
          )),
          addCase(State.END,
            cond(
              eq(isPressed, 1),
              outTransition(
                onPress && call([stateX, stateY], onPress),
              ),
            ),
          ),
        );
      }
    }
  ]);
}

const easeDefault = Easing.in(Easing.ease);

const Touchable = ({
  children,
  duration = 500,
  easing = easeDefault,
  onPress,
  onPressIn,
  enabled = true,
}) => {
  const [isPressed] = useState(() => new Animated.Value(0));
  const [anim] = useState(() => new Animated.Value(0));
  const [x] = useState(() => new Animated.Value(0));
  const [y] = useState(() => new Animated.Value(0));
  const [enabledAnimated] = useState(() => new Animated.Value(enabled ? 1 : 0));
  const [clockIn] = useState(() => new Clock());
  const [clockOut] = useState(() => new Clock());
  const onPressHandler = useHandler(onPress);
  const onPressInHandler = useHandler(onPressIn);

  useEffect(() => {
    enabledAnimated.setValue(enabled ? 1 : 0);
  }, [enabled]);

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

  const handler = useMemo(() => createEventHandler({
    anim,
    x,
    y,
    clockIn,
    clockOut,
    animationState,
    config,
    onPress: onPressHandler,
    onPressIn: onPressInHandler,
    enabled: enabledAnimated,
    isPressed,
  }), [config]);

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
