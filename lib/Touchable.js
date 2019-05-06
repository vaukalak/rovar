import React, { useMemo, useState, useEffect } from 'react';
import {State, TapGestureHandler} from "react-native-gesture-handler";
import Animated, { Easing } from "react-native-reanimated";
import { useHandler } from 'react-use-handler';
import {addCase, doSwitch} from './nodes';
import {useInOutTransition} from './transitions';

const { and, call, max, min, Value, set, event, eq, cond } = Animated;

const createEventHandler = ({
  anim,
  duration,
  easing,
  onPress,
  onPressIn,
  enabled,
}) => {

  const [isPressed] = useState(() => new Animated.Value(0));

  const [stateX] = useState(() => new Animated.Value(0));
  const [stateY] = useState(() => new Animated.Value(0));

  const config = useMemo(() => ({
    duration,
    toValue: new Value(0),
    easing,
  }), [duration, easing]);

  const handler = event([
    {
      nativeEvent: (event) => {
        const { state, x, y } = event;

        const transition = useInOutTransition(
          anim,
          config,
          (node) => cond(
            eq(enabled, true),
            [
              set(isPressed, 1),
              set(stateX, x),
              set(stateY, y),
              onPressIn && call([], onPressIn),
              node,
            ],
          ),
          (node) => cond(
            and(eq(enabled, true), eq(isPressed, 1)),
            [
              set(isPressed, 0),
              onPress && call([stateX, stateY], onPress),
              node,
            ]
          ),
        );
        return doSwitch(
          state,
          addCase(State.BEGAN, transition.in),
          addCase(State.END, transition.out),
        );
      }
    }
  ]);
  return {
    handler,
    x: stateX,
    y: stateY,
  }
};

const easeDefault = Easing.in(Easing.ease);

const Touchable = ({
  children,
  duration = 500,
  easing = easeDefault,
  onPress,
  onPressIn,
  enabled = true,
}) => {
  const [anim] = useState(() => new Animated.Value(0));
  const [enabledAnimated] = useState(() => new Animated.Value(enabled ? 1 : 0));
  const onPressHandler = useHandler(onPress);
  const onPressInHandler = useHandler(onPressIn);

  useEffect(() => {
    enabledAnimated.setValue(enabled ? 1 : 0);
  }, [enabled]);

  const { handler, x, y } = createEventHandler({
    anim,
    duration,
    easing,
    onPress: onPressHandler,
    onPressIn: onPressInHandler,
    enabled: enabledAnimated,
  });

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
