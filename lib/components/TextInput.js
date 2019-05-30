import React, { useState } from 'react';
import { TextInput as RNTextInput, StyleSheet } from 'react-native';
import Animated, { Easing } from 'react-native-reanimated';
import compose from '../enhancers/compose';
import expandedEnhancer from '../enhancers/states/expandedEnhancer';
import getChildEnhancer from '../enhancers/children/getChildEnhancer';
import styleEnhancer from '../enhancers/styleEnhancer';
import scale from '../styles/scale';
import translateY from '../styles/translateY';
import selectedEnhancer from '../enhancers/states/selectedEnhancer';
import backgroundColor from '../styles/backgroundColor';
import opacity from '../styles/opacity';
import TextInputController from '../controllers/TextInputController';

const easing = Easing.out(Easing.ease);

const styles = StyleSheet.create({
  input: {
    fontSize: 16, height: 16, padding: 0, marginTop: 14, width: 200,
  },
  label: { fontSize: 26, position: 'absolute' },
  bottomLine: {
    backgroundColor: 'black',
    position: 'absolute',
    height: 1,
    bottom: 0,
    left: 0,
    right: 0,
  },
});

const TextInput = () => {
  const [enhancer] = useState(
    () => compose(
      expandedEnhancer(
        compose(
          getChildEnhancer('label')(
            styleEnhancer(
              scale(1, 0.5, 'left'),
              translateY(-20),
            ),
          ),
        ),
      ),
      selectedEnhancer(
        compose(
          styleEnhancer(
            backgroundColor(
              'rgba(240, 208, 0, 0.7)',
            ),
            opacity(0.9),
          ),
          getChildEnhancer('bottomLine')(
            styleEnhancer(
              scale(0, 1, 'left'),
            ),
          ),
        ),
      ),
    ),
  );
  return (
    <TextInputController
      enabled
      easing={easing}
      duration={500}
      enhancer={enhancer}
      onPress={() => {}}
    >
      {inputProps => (
        <Animated.View
          pointerEvents="box-only"
        >
          <RNTextInput
            style={styles.input}
            {...inputProps}
          />
          <Animated.Text
            key="label"
            style={styles.label}
          >
            INPUT BRO
          </Animated.Text>
          <Animated.View
            key="bottomLine"
            style={styles.bottomLine}
          />
        </Animated.View>
      )}
    </TextInputController>
  );
};

export default TextInput;
