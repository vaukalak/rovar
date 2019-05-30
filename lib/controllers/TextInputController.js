import React, { useState, useRef } from 'react';
import Animated from 'react-native-reanimated';
import { useHandler } from 'react-use-handler';
import { BaseTouchableController } from './TouchableController';
import createEnhancedComponent from './createEnhancedComponent';
import { useStateNodeTransition } from '../transitions/useStateTransition';

const {
  cond, call, block, set,
} = Animated;

export const BaseTextInputController = (props) => {
  const inputRef = useRef(null);
  const focus = useHandler(() => {
    inputRef.current.focus();
  });
  const [
    expandedNode,
    expandedTransition,
    expandedAnim,
  ] = useStateNodeTransition(
    0,
    300,
    props.easing,
    node => block([
      call([], focus),
      node,
    ]),
  );
  const [
    selectedNode,
    selectedTransition,
    selectedAnim,
  ] = useStateNodeTransition(
    0,
    300,
    props.easing,
  );
  const [value, onChangeText] = useState();
  const onBlur = useHandler(() => {
    selectedNode.setValue(0);
    if (!value) {
      expandedNode.setValue(0);
    }
  });
  return (
    <>
      <Animated.Code>
        {() => cond(
          expandedNode,
          expandedTransition.inTransition,
          expandedTransition.outTransition,
        )}
      </Animated.Code>
      <Animated.Code>
        {() => cond(
          selectedNode,
          selectedTransition.inTransition,
          selectedTransition.outTransition,
        )}
      </Animated.Code>
      <BaseTouchableController
        {...props}
        onPressIn={block([
          set(selectedNode, 1),
          set(expandedNode, 1),
        ])}
      >
        {touchable => (
          props.children({
            ...touchable,
            expandedAnimation: {
              anim: expandedAnim,
              transitionState: expandedTransition.transitionState,
            },
            selectedAnimation: {
              anim: selectedAnim,
              transitionState: selectedTransition.transitionState,
            },
          }, {
            value,
            onChangeText,
            onBlur,
            ref: inputRef,
          })
        )}
      </BaseTouchableController>
    </>
  );
};

export const createTextInputComponent = enhancer => createEnhancedComponent(BaseTextInputController, enhancer);

export default createEnhancedComponent(BaseTextInputController);
