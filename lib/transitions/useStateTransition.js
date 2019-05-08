import { useState, useMemo, useEffect } from 'react';
import Animated from "react-native-reanimated";
import {useInOutTransition} from './index';

const { Value } = Animated;

const useStateTransition = (condition, duration, easing) => {
  const [stateNode] = useState(() => new Animated.Value(condition ? 1 : 0));

  useEffect(() => {
    stateNode.setValue(condition ? 1 : 0);
  }, [condition]);

  const [stateAnim] = useState(() => new Animated.Value(condition ? 1 : 0));
  const stateConfig = useMemo(() => ({
    duration,
    toValue: new Value(1),
    easing,
  }), [duration, easing]);

  const stateTransition = useInOutTransition(
    stateAnim,
    stateConfig,
    node => node,
    node => node,
    condition ? 1 : 0,
  );

  return [
    stateNode,
    stateTransition,
    stateAnim,
  ];
};

export default useStateTransition;
