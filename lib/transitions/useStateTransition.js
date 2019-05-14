import { useState, useMemo, useEffect } from 'react';
import Animated from "react-native-reanimated";
import {useInOutTransition} from './index';

const { Value } = Animated;

export const useStateNodeTransition = (
  initialAnimateValue,
  duration,
  easing,
  onInTransitionStart = node => node,
  onOutTransitionStart = node => node,
) => {
  const [stateNode] = useState(() => new Animated.Value(initialAnimateValue));
  const [stateAnim] = useState(() => new Animated.Value(initialAnimateValue));
  const stateConfig = useMemo(() => ({
    duration,
    toValue: new Value(1),
    easing,
  }), [duration, easing]);

  const stateTransition = useInOutTransition(
    stateAnim,
    stateConfig,
    onInTransitionStart,
    onOutTransitionStart,
    initialAnimateValue,
  );

  return [
    stateNode,
    stateTransition,
    stateAnim,
  ];
}

const useStateTransition = (condition, duration, easing, onInTransitionStart, onOutTransitionStart) => {
  let initialAnimateValue = condition ? 1 : 0;

  const transition =  useStateNodeTransition(
    initialAnimateValue,
    duration,
    easing,
    onInTransitionStart,
    onOutTransitionStart,
  );

  useEffect(() => {
    transition[0].setValue(condition ? 1 : 0);
  }, [condition]);

  return transition;
};

export default useStateTransition;
