import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, { Easing } from 'react-native-reanimated';
import FlipAndTintTouchable from './FlipAndTintTouchable';
import CirclePressTouchable from './CirclePressTouchable';
import TouchableOpacity from './TouchableOpacity';

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
    borderRadius: 5,
    padding: 10,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  label: {
    fontSize: 26,
    fontWeight: 'bold',
  },
});

const App = () => {
  const [handlers] = useState(() => ({
    onPressIn: () => { console.log('onPressIn'); },
    onPressOut: () => { console.log('onPressOut'); },
    onPress: () => { console.log('onPress'); },
  }));
  return (
    <View style={styles.container}>
      <TouchableOpacity
        easing={easing}
        duration={200}
        {...handlers}
      >
        <Animated.View style={styles.button}>
          <Animated.Text style={styles.label}>
            TOUCHABLE OPACITY
          </Animated.Text>
        </Animated.View>
      </TouchableOpacity>
      <FlipAndTintTouchable
        easing={easing}
        duration={400}
        {...handlers}
      >
        <Animated.View style={styles.button}>
          <Animated.Text style={styles.label}>
            GO
          </Animated.Text>
        </Animated.View>
      </FlipAndTintTouchable>
      <CirclePressTouchable
        easing={easing}
        duration={400}
        {...handlers}
      >
        <Animated.View style={styles.button}>
          <Animated.Text style={styles.label}>
            HELLO THERE
          </Animated.Text>
        </Animated.View>
      </CirclePressTouchable>
    </View>
  );
};

export default App;
