import React, { useState, useCallback, useMemo, useRef } from 'react';
import { View, TextInput as RNTextInput, StyleSheet } from 'react-native';
import Animated, { Easing } from 'react-native-reanimated';
import Touchable from '../lib/components/Touchable';
import TextInput from '../lib/components/TextInput';
import { backgroundColorStyleCreator } from '../lib/enhancers/styles/backgroundColorEnhancer';
import styleEnhancer from '../lib/enhancers/styleEnhancer';
import touchEnhancer from '../lib/enhancers/touchEnhancer';
import compose from '../lib/compose';
import disabledEnhancer from '../lib/enhancers/disabledEnhancer';
import { opacityStyleCreator } from '../lib/enhancers/styles/opacityEnhancer';
import selectedEnhancer from '../lib/enhancers/selectedEnhancer';
import getChildEnhancer from '../lib/enhancers/getChildEnhancer';
import {rotateStyleCreator} from '../lib/enhancers/styles/rotateEnhancer';
import {scaleStyleCreator} from '../lib/enhancers/styles/scaleEnhancer';
import conditionalColor from '../lib/utils/colors/conditionalColor';
import Checkbox from '../lib/components/Checkbox';
import expandedEnhancer from '../lib/enhancers/expandedEnhancer';
import {translateStyleCreator} from '../lib/enhancers/styles/translateEnhancer';

const easing = Easing.out(Easing.ease);

const { clockRunning, or } = Animated;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEEEEE',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingTop: 100,
  },
  button: {
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: '#FFFFFF',
    padding: 10,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  label: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

const GreenCheckbox = ({ onPress, enabled = true, children }) => {
  const enhancer = useMemo(
    () => compose(
      selectedEnhancer(
        compose(
          getChildEnhancer('background')(
            styleEnhancer(
              backgroundColorStyleCreator('rgba(0, 150, 3)'),
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
                ({ selectedAnimation }) =>
                  conditionalColor(
                    or(
                      selectedAnimation.transitionState.endState,
                      clockRunning(selectedAnimation.transitionState.clockOut),
                    ),
                    'rgba(0, 150, 3)',
                    'rgba(0, 122, 2)',
                  ),
              ),
            ),
          ),
          styleEnhancer(
            scaleStyleCreator(1, 0.9),
          ),
        ),
      ),
    ),
    []
  );

  return (
    <Checkbox
      easing={Easing.in(Easing.elastic(1))}
      enhancer={enhancer}
      onPress={onPress}
      enabled={enhancer}
    >
      {children}
    </Checkbox>
  )
};

const Input = () => {
  const [enhancer] = useState(
    () => compose(
      expandedEnhancer(
        compose(
          getChildEnhancer('label')(
            styleEnhancer(
              scaleStyleCreator(1, 0.5, 'left'),
              translateStyleCreator(-20),
            ),
          ),
        ),
      ),
      selectedEnhancer(
        compose(
          styleEnhancer(
            backgroundColorStyleCreator(
              'rgba(240, 208, 0, 0.7)',
            ),
            opacityStyleCreator(0.9),
          ),
          getChildEnhancer('bottomLine')(
            styleEnhancer(
              scaleStyleCreator(0, 1, 'left'),
            ),
          ),
        ),
      ),
    ),
  );
  return (
    <TextInput
      enabled
      easing={easing}
      duration={500}
      enhancer={enhancer}
      onPress={() => {}}
    >
      {(inputProps) => (
        <Animated.View
          pointerEvents={'box-only'}
        >
          <RNTextInput
            style={{ fontSize: 16, height: 16, marginTop: 14, width: 200 }}
            {...inputProps}
          />
          <Animated.Text
            key="label"
            style={{ fontSize: 26, position: 'absolute' }}
          >
            INPUT BRO
          </Animated.Text>
          <Animated.View
            key={'bottomLine'}
            style={{
              backgroundColor: 'black',
              position: 'absolute',
              height: 1,
              bottom: 0,
              left: 0,
              right: 0,
            }}
          />
        </Animated.View>
      )}
    </TextInput>
  );
};

const Button = ({ onPress, enabled = true, children }) => {
  const [enhancer] = useState(
    () => compose(
      touchEnhancer(
        styleEnhancer(
          backgroundColorStyleCreator(
            'rgba(240, 208, 0, 0.7)',
          ),
          opacityStyleCreator(0.9),
        ),
      ),
      disabledEnhancer(
        styleEnhancer(
          backgroundColorStyleCreator(
            '#AAAAAA',
          ),
          opacityStyleCreator(0.6),
        ),
      ),
    ),
  );
  return (
    <Touchable
      enabled={enabled}
      easing={easing}
      duration={500}
      enhancer={enhancer}
      onPress={onPress}
    >
      <Animated.View style={styles.button}>
        <Animated.Text style={styles.label}>
          {children}
        </Animated.Text>
      </Animated.View>
    </Touchable>
  );
};

const HooksTouchableExamples = () => {
  const [firstEnabled, setEnabled] = useState(true);
  const onPressOne = useCallback(
    () => {
      setEnabled(!firstEnabled);
    },
    [firstEnabled],
  );
  const onPressTwo = useCallback(
    ([x, y]) => {
      setEnabled(!firstEnabled);
    },
    [firstEnabled],
  );
  return (
    <View style={styles.container}>
      <Button onPress={onPressOne} enabled={firstEnabled}>
        {`ENABLE SECOND\n`}
        {firstEnabled ? `(ENABLED)` : `(DISABLED)`}
      </Button>
      <Button onPress={onPressTwo} enabled={!firstEnabled}>
        {`ENABLE FIRST\n`}
        {!firstEnabled ? `(ENABLED)` : `(DISABLED)`}
      </Button>
      <GreenCheckbox>
        <Animated.View
          style={{
            width: 36,
            height: 36,
          }}
        >
          <Animated.View
            key="background"
            style={[
              StyleSheet.absoluteFill,
              {
                borderColor: 'black',
                borderWidth: 3,
                backgroundColor: '#FFFFFF',
                borderRadius: 5,
              },
            ]}
          />
          <Animated.View
            key="icon"
            style={{
              backgroundColor: 'black',
              flex: 1,
              borderRadius: 5,
              margin: 8,
            }}
          />
        </Animated.View>
      </GreenCheckbox>
      <Input />
      <Input />
    </View>
  );

};

export default HooksTouchableExamples;
