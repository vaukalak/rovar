import React, { useMemo, useState, useEffect } from 'react';
import {State, BaseButton, TapGestureHandler} from "react-native-gesture-handler";
import Animated, { Easing } from "react-native-reanimated";
import { useHandler } from 'react-use-handler';

const { concat, call, max, min, Clock, debug, timing, stopClock, clockRunning, startClock, Value, block, set, event, eq, cond, and } = Animated;

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
  return event([
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
            ], cond(
              eq(enabled, true),
              [
                set(isPressed, 1),
                onPressIn && call([], onPressIn),
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
          ], [
            cond(
              and(eq(state, State.END), eq(isPressed, 1)),
              [
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
                    // TODO: ensure it can't be invoked twice!!!
                    onPress && call([stateX, stateY], onPress),
                  ]
                )),
                timing(clockOut, animationState, config),
                cond(animationState.finished, block([
                  stopClock(clockOut),
                  set(isPressed, 0),
                ])),

                set(anim, animationState.position),
              ]
            ),
          ]),
        ]);
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
