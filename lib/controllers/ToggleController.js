import React, { useState } from 'react';
import Animated from "react-native-reanimated";
import { BaseTouchableController } from './TouchableController';
import useStateTransition from '../transitions/useStateTransition';
import createEnhancedComponent from './createEnhancedComponent';

const { cond, not } = Animated;

export const BaseToggleController = (props) => {
  const [selected, setSelected] = useState(false);
  const [
    selectedNode,
    selectedTransition,
    selectedAnim,
  ] = useStateTransition(
    selected,
    300,
    props.easing,
    props.onInTransitionFinish
  );
  return (
    <>
      <Animated.Code>
        {() => cond(
          not(selectedNode),
          selectedTransition.outTransition,
          selectedTransition.inTransition,
        )}
      </Animated.Code>
      <BaseTouchableController
        duration={300}
        onPress={() => { setSelected(!selected); }}
      >
        {(touchable) =>
          props.children({
            selectedAnimation: {
              anim: selectedAnim,
              transitionState: selectedTransition.transitionState,
            },
            ...touchable
          })
        }
      </BaseTouchableController>
    </>
  );
};

export const createCheckboxComponent = enhancer =>
  createCheckboxComponent(BaseToggleController, enhancer);

export default createEnhancedComponent(BaseToggleController);
