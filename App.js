import React, { useState, useEffect } from 'react';
import { View, Dimensions, Text, Animated as RNAnimated } from 'react-native';
import Animated, { Easing } from 'react-native-reanimated';
import { TapGestureHandler, State } from 'react-native-gesture-handler';

const { add, multiply, color, max, min, round, sub, Clock, timing, stopClock, clockRunning, startClock, Value, block, set, event, eq, cond } = Animated;

const opacity = new Animated.Value(0);

const clockIn = new Clock();
const clockOut = new Clock();
// const clockOut = clockIn;

const animationState = {
  finished: new Value(0),
  position: new Value(0),
  time: new Value(0),
  frameTime: new Value(0),
};

const config = {
  duration: 300,
  toValue: new Value(0),
  easing: Easing.in(Easing.quad),
  // easing: Easing.ease,
};

const handler = event([
  {
    nativeEvent: ({ state }) => {
      return block([
        cond(eq(state, State.BEGAN), [
          cond(clockRunning(clockIn), [
            stopClock(clockOut),
            set(config.toValue, 1),
          ], [
            set(animationState.finished, 0),
            set(animationState.time, 0),
            set(animationState.frameTime, 0),
            set(config.toValue, 1),
            startClock(clockIn),
          ]),
          timing(clockIn, animationState, config),
          cond(state.finished, stopClock(clockIn)),

          set(opacity, animationState.position),
        ], [
          cond(
            eq(state, State.END),
            [
              stopClock(clockIn),

              cond(clockRunning(clockOut), [
                set(config.toValue, 0),
              ], [
                set(animationState.finished, 0),
                set(animationState.time, 0),
                set(animationState.frameTime, 0),
                set(config.toValue, 0),
                startClock(clockOut),
              ]),
              timing(clockOut, animationState, config),
              cond(state.finished, stopClock(clockOut)),

              set(opacity, animationState.position),
            ]
          ),
        ]),
      ]);
    }
  }
]);

const App = () => {
  const constrainedAnim = min(1, max(0, opacity ));
  return (
    <View style={{ flex: 1, alignItems: 'center', paddingTop: 100 }}>
      <TapGestureHandler
        onHandlerStateChange={handler}
      >
        <Animated.View
          style={{
            backgroundColor: color(
              round(multiply(sub(1, constrainedAnim), 255)),
              0,
              0,
              1,
            ),
            width: 200,
            height: 60,
            borderRadius: 20,
            transform: [
              { scale: add(1, multiply(opacity, 0.05)) },
            ],
            justifyContent: 'space-around',
            alignItems: 'center',
          }}
        >
          <Animated.Text
            style={{
              color: color(
                255,
                sub(255, round(multiply(constrainedAnim, 81))),
                round(multiply(sub(1, constrainedAnim), 255)),
                1,
              ),
              fontSize: 26,
              fontWeight: 'bold',
            }}
          >
            HELLO THERE
          </Animated.Text>
        </Animated.View>
      </TapGestureHandler>
    </View>
  );
}

export default App;
