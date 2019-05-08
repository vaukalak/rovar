import React, { useState } from 'react';
import Animated, { Easing } from "react-native-reanimated";
import compose from './compose';
import {styleEnhancer} from './enhancers/styleEnhancer';
import {backgroundColorStyleCreator} from './enhancers/styles/backgroundColorEnhancer';
import touchEnhancer from './enhancers/touchEnhancer';
import Touchable from './Touchable';
import useStateTransition from './transitions/useStateTransition';
import selectedEnhancer from './enhancers/selectedEnhancer';
import firstChildEnhancer from './enhancers/firstChildEnhancer';
import { scaleStyleCreator } from './enhancers/styles/scaleEnhancer';
import {rotateStyleCreator} from './enhancers/styles/rotateEnhancer';

const { cond, not } = Animated;

const enhancer = compose(
  touchEnhancer(
    styleEnhancer(
      scaleStyleCreator(1, 0.9),
      backgroundColorStyleCreator('#EEEEEE'),
    ),
  ),
  selectedEnhancer(
    compose(
      styleEnhancer(
        backgroundColorStyleCreator('#000000'),
        rotateStyleCreator(180),
      ),
      firstChildEnhancer(
        styleEnhancer(
          scaleStyleCreator(0, 1),
        ),
      ),
    ),
  ),
);

const easeDefault = Easing.in(Easing.ease);

const Checkbox = (props) => {

  const [selected, setSelected] = useState(false);

  const [
    selectedNode,
    selectedTransition,
    selectedAnim,
  ] = useStateTransition(selected, 500, Easing.out(Easing.back(1)));

  return (
    <>
      <Animated.Code>
        {() => cond(
          not(selectedNode),
          selectedTransition.out,
          selectedTransition.in,
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
              selectedAnimation: { anim: selectedAnim },
              ...touchable
            },
          ).element
        }
      </Touchable>
    </>
  );
};

export default Checkbox;
