import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, { Easing } from 'react-native-reanimated';
import FlipAndTintTouchable from './FlipAndTintTouchable';
import CirclePressTouchable from './CirclePressTouchable';
import ScaleTouchable from './ScaleTouchable';
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
      {/*<TouchableOpacity*/}
        {/*easing={easing}*/}
        {/*duration={200}*/}
        {/*{...handlers}*/}
      {/*>*/}
        {/*<Animated.View style={styles.button}>*/}
          {/*<Animated.Text style={styles.label}>*/}
            {/*TOUCHABLE OPACITY*/}
          {/*</Animated.Text>*/}
        {/*</Animated.View>*/}
      {/*</TouchableOpacity>*/}
      {/*<FlipAndTintTouchable*/}
        {/*easing={easing}*/}
        {/*duration={400}*/}
        {/*backgroundColor="#FFFFFF"*/}
        {/*backgroundTintColor="#000000"*/}
        {/*textColor="#000000"*/}
        {/*textTintColor="#FFFFFF"*/}
        {/*{...handlers}*/}
      {/*>*/}
        {/*<Animated.View style={styles.button}>*/}
          {/*<Animated.Text style={styles.label}>*/}
            {/*GO*/}
          {/*</Animated.Text>*/}
        {/*</Animated.View>*/}
      {/*</FlipAndTintTouchable>*/}
      <View style={{ flexDirection: 'row' }}>
        <CirclePressTouchable
          easing={easing}
          duration={600}
          backgroundColor="rgba(240, 208, 0, 0.7)"
          {...handlers}
        >
          <Animated.View style={styles.button}>
            <Animated.Text style={styles.label}>
              PRESS ONE
            </Animated.Text>
          </Animated.View>
        </CirclePressTouchable>
        <CirclePressTouchable
          easing={easing}
          duration={600}
          backgroundColor="rgba(240, 208, 0, 0.7)"
          {...handlers}
        >
          <Animated.View style={styles.button}>
            <Animated.Text style={styles.label}>
              PRESS TWO
            </Animated.Text>
          </Animated.View>
        </CirclePressTouchable>
      </View>
    </View>
  );
};

export default App;
