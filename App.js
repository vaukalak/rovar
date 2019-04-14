import React from 'react';
import { View } from 'react-native';
import Animated, { Easing } from 'react-native-reanimated';
import colorParser from 'color';
import Touchable from './lib/Touchable';

const { add, debug, concat, interpolate, multiply, color, round, sub } = Animated;

const interpolateColor = (anim, from, to) => {
  const colorFrom = colorParser(from).object();
  const colorTo = colorParser(to).object();
  return color(
    round(interpolate(anim, {
      inputRange: [0, 1],
      outputRange: [colorFrom.r, colorTo.r],
    })),
    round(interpolate(anim, {
      inputRange: [0, 1],
      outputRange: [colorFrom.g, colorTo.g],
    })),
    round(interpolate(anim, {
      inputRange: [0, 1],
      outputRange: [colorFrom.b, colorTo.b],
    })),
  );
};

const easing = Easing.out(Easing.back(1));

const App = () => {
  return (
    <View style={{ flex: 1, alignItems: 'center', paddingTop: 100 }}>
      <Touchable easing={easing} duration={400}>
        {({ anim, constrainedAnim }) => (
          <Animated.View
            style={{
              backgroundColor: interpolateColor(
                constrainedAnim,
                '#FFFFFF',
                '#000000',
              ),
              borderWidth: 1,
              borderColor: 'black',
              width: 200,
              height: 60,
              borderRadius: 5,
              transform: [
                { scale: sub(1, multiply(anim, 0.02)) },
                { rotate: concat(multiply(anim, 180), 'deg') },
              ],
              justifyContent: 'space-around',
              alignItems: 'center',
            }}
          >
            <Animated.Text
              style={{
                color: interpolateColor(
                  constrainedAnim,
                  '#000000',
                  '#FFFFFF',
                ),
                transform: [
                  { rotate: concat(multiply(anim, -180), 'deg') },
                  { perspective: 100 },
                  { rotateX: concat(multiply(constrainedAnim, 360), 'deg') },
                ],
                fontSize: 26,
                fontWeight: 'bold',
              }}
            >
              HELLO THERE
            </Animated.Text>
          </Animated.View>
        )}
      </Touchable>
    </View>
  );
}

export default App;
