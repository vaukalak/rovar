import React, { useState, useMemo, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, { Easing } from 'react-native-reanimated';
import EnhancedTouchable from '../lib/EnhancedTouchable';
import { backgroundColorStyleCreator } from '../lib/enhancers/styles/backgroundColorEnhancer';
import { borderRadiusStyleCreator } from '../lib/enhancers/styles/borderRadiusEnhancer';
import { scaleStyleCreator } from '../lib/enhancers/styles/scaleEnhancer';
import styleEnhancer from '../lib/enhancers/styleEnhancer';

const easing = Easing.out(Easing.back(1));

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
  const enhancer = useMemo(
    () => styleEnhancer(
      scaleStyleCreator(0.97),
      borderRadiusStyleCreator([0, 10]),
      backgroundColorStyleCreator(
        enabled ?
          ['#FFFFFF', 'rgba(240, 208, 0, 0.7)'] :
          ['#CCCCCC', '#AAAAAA']
      )
    ),
    [enabled],
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
    </View>
  );

};

export default HooksTouchableExamples;
