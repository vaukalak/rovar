import React, { useState, useMemo } from 'react';
import Animated, { Easing } from "react-native-reanimated";
import compose from './compose';
import {styleEnhancer} from './enhancers/styleEnhancer';
import {backgroundColorStyleCreator} from './enhancers/styles/backgroundColorEnhancer';
import touchEnhancer from './enhancers/touchEnhancer';
import Touchable from './Touchable';
import useStateTransition from './transitions/useStateTransition';
import selectedEnhancer from './enhancers/selectedEnhancer';
import { scaleStyleCreator } from './enhancers/styles/scaleEnhancer';
import {rotateStyleCreator} from './enhancers/styles/rotateEnhancer';
import getChildEnhancer from './enhancers/getChildEnhancer';

const { cond, not } = Animated;

const useEnhancer = (selected) => {
  return useMemo(
    () => compose(
      selectedEnhancer(
        compose(
          getChildEnhancer('background')(
            styleEnhancer(
              backgroundColorStyleCreator('#000000'),
              rotateStyleCreator(180),
            ),
          ),
          getChildEnhancer('icon')(
            styleEnhancer(
              scaleStyleCreator(0, 1),
            ),
          ),
        ),
      ),
      touchEnhancer(
        compose(
          getChildEnhancer('background')(
            styleEnhancer(
              backgroundColorStyleCreator(
                selected ?
                  'red' :
                  'rgba(240, 208, 0, 0.7)'
              ),
            ),
          ),
          styleEnhancer(
            scaleStyleCreator(1, 0.9),
          ),
        ),
      ),
    ),
    [selected]
  );
};

const easeDefault = Easing.in(Easing.ease);

const Checkbox = (props) => {

  const [selected, setSelected] = useState(false);

  const [
    selectedNode,
    selectedTransition,
    selectedAnim,
  ] = useStateTransition(selected, 300, Easing.in(Easing.elastic(1)));

  const enhancer = useEnhancer(selected);

  return (
    <>
      <Animated.Code>
        {() => cond(
          not(selectedNode),
          selectedTransition.outTransition,
          selectedTransition.inTransition,
        )}
      </Animated.Code>
      <Touchable
        duration={300}
        onPress={() => { setSelected(!selected); }}
      >
        {(touchable) =>
          enhancer(
            { element: props.children },
            props,
            {
              selectedAnimation: {
                anim: selectedAnim,
                endState: selectedTransition.endState,
                startState: selectedTransition.startState,
              },
              ...touchable
            },
          ).element
        }
      </Touchable>
    </>
  );
};

export default Checkbox;
