import React, { useMemo, useState, useEffect } from 'react';
import {State, TapGestureHandler} from "react-native-gesture-handler";
import Animated, { Easing } from "react-native-reanimated";
import { useHandler } from 'react-use-handler';
import {addCase, doSwitch} from './nodes';
import {useInOutTransition} from './transitions';

const { and, call, Value, set, event, eq, cond } = Animated;

const createEventHandler = ({
  duration,
  easing,
  onPress,
  onPressIn,
  enabled,
}) => {

  const [anim] = useState(() => new Animated.Value(0));

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
    anim,
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
  const [enabledNode] = useState(() => new Animated.Value(enabled ? 1 : 0));

  useEffect(() => {
    enabledNode.setValue(enabled ? 1 : 0);
  }, [enabled]);

  const { anim, handler, x, y } = createEventHandler({
    duration,
    easing,
    onPress: useHandler(onPress),
    onPressIn: useHandler(onPressIn),
    enabled: enabledNode,
  });


  const [disabledAnim] = useState(() => new Animated.Value(enabled ? 0 : 1));
  const disabledConfig = useMemo(() => ({
    duration,
    toValue: new Value(1),
    easing,
  }), [duration, easing]);

  const disabledTransition = useInOutTransition(
    disabledAnim,
    disabledConfig,
    node => node,
    node => node,
    enabled ? 0 : 1,
  );

  return (
    <>
      <Animated.Code>
        {() => cond(
          enabledNode,
          disabledTransition.out,
          disabledTransition.in,
        )}
      </Animated.Code>
      <TapGestureHandler
        onHandlerStateChange={handler}
      >
        {children({
          touchAnimation: {anim, x, y},
          disabledAnimation: {
            anim: disabledAnim,
          },
        })}
      </TapGestureHandler>
    </>
  )
};

export default Touchable;
