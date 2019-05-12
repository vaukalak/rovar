import React, { useState, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, { Easing } from 'react-native-reanimated';
import EnhancedTouchable from '../lib/EnhancedTouchable';
import { backgroundColorStyleCreator } from '../lib/enhancers/styles/backgroundColorEnhancer';
import styleEnhancer from '../lib/enhancers/styleEnhancer';
import touchEnhancer from '../lib/enhancers/touchEnhancer';
import compose from '../lib/compose';
import disabledEnhancer from '../lib/enhancers/disabledEnhancer';
import { opacityStyleCreator } from '../lib/enhancers/styles/opacityEnhancer';
import Checkbox from '../lib/Checkbox';

const easing = Easing.out(Easing.ease);

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
    <EnhancedTouchable
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
    </EnhancedTouchable>
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
      <Checkbox>
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
      </Checkbox>
    </View>
  );

};

export default HooksTouchableExamples;
