import React, { useState } from 'react';
import Animated, { Easing} from "react-native-reanimated";
import { BaseTouchable } from './Touchable';
import useStateTransition from '../transitions/useStateTransition';
import createEnhancedComponent from './createEnhancedComponent';

const { cond, not } = Animated;

const BaseCheckbox = (props) => {
  const [selected, setSelected] = useState(false);
  const [
    selectedNode,
    selectedTransition,
    selectedAnim,
  ] = useStateTransition(selected, 300, props.easing);
  return (
    <>
      <Animated.Code>
        {() => cond(
          not(selectedNode),
          selectedTransition.outTransition,
          selectedTransition.inTransition,
        )}
      </Animated.Code>
      <BaseTouchable
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
      </BaseTouchable>
    </>
  );
};

export const createCheckboxComponent = enhancer =>
  createCheckboxComponent(BaseCheckbox, enhancer);

export default createEnhancedComponent(BaseCheckbox);
