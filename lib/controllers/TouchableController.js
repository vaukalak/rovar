import React, { useMemo, useState } from 'react';
import { State, TapGestureHandler } from 'react-native-gesture-handler';
import Animated, { Easing } from 'react-native-reanimated';
import { useHandler } from 'react-use-handler';
import { addCase, doSwitch } from '../utils/nodes';
import { useInOutTransition } from '../transitions';
import useStateTransition from '../transitions/useStateTransition';
import createEnhancedComponent from './createEnhancedComponent';

const {
  not, and, call, Value, set, event, eq, cond,
} = Animated;

const createEventHandler = ({
  duration,
  easing,
  onPress,
  onPressIn,
  disabled,
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
        const {
          inTransition,
          outTransition,
        } = useInOutTransition(
          anim,
          config,
          node => cond(
            eq(disabled, false),
            [
              set(isPressed, 1),
              set(stateX, x),
              set(stateY, y),
              typeof onPressIn === 'function'
                ? call([], onPressIn)
                : onPressIn,
              node,
            ],
          ),
          node => cond(
            and(eq(disabled, false), eq(isPressed, 1)),
            [
              set(isPressed, 0),
              typeof onPress === 'function'
                ? call([stateX, stateY], onPress)
                : onPress,
              node,
            ],
          ),
        );
        return doSwitch(
          state,
          addCase(State.BEGAN, inTransition),
          // addCase(State.FAILED, outTransition),
          addCase(State.END, outTransition),
          // addCase(State.CANCELLED, outTransition),
        );
      },
    },
  ]);
  return {
    anim,
    handler,
    x: stateX,
    y: stateY,
  };
};

const easeDefault = Easing.in(Easing.ease);

export const BaseTouchableController = ({
  children,
  duration = 500,
  easing = easeDefault,
  onPress,
  hitSlop,
  onPressIn,
  enabled = true,
}) => {
  const [
    disabledNode,
    disabledTransition,
    disabledAnim,
  ] = useStateTransition(!enabled, duration, easing);

  const {
    anim, handler, x, y,
  } = createEventHandler({
    duration,
    easing,
    onPress: typeof onPress === 'function' ? useHandler(onPress) : onPress,
    onPressIn: typeof onPressIn === 'function' ? useHandler(onPressIn) : onPressIn,
    disabled: disabledNode,
  });

  return (
    <>
      <Animated.Code>
        {() => cond(
          not(disabledNode),
          disabledTransition.outTransition,
          disabledTransition.inTransition,
        )}
      </Animated.Code>
      <TapGestureHandler
        maxDurationMs={500000}
        hitSlop={hitSlop}
        onHandlerStateChange={handler}
      >
        {children({
          touchAnimation: { anim, x, y },
          disabledAnimation: {
            anim: disabledAnim,
            transitionState: disabledTransition.transitionState,
          },
        })}
      </TapGestureHandler>
    </>
  );
};

export const createTouchableComponent = enhancer => createEnhancedComponent(BaseTouchableController, enhancer);

export default createEnhancedComponent(BaseTouchableController);
