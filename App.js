import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, { Easing } from 'react-native-reanimated';
import createTouchableComponent from './lib/createTouchableComponent';
import circleAnimationEnhancer from './lib/enhancers/circleAnimationEnhancer';
import { backgroundColorStyleCreator } from './lib/enhancers/styles/backgroundColorEnhancer';
import { colorStyleCreator } from './lib/enhancers/styles/colorStyleEnhancer';
import { opacityStyleCreator } from './lib/enhancers/styles/opacityEnhancer';
import { rotateStyleCreator } from './lib/enhancers/styles/rotateEnhancer';
import firstChildEnhancer from './lib/enhancers/firstChildEnhancer';
import scaleEnhancer, { scaleStyleCreator } from './lib/enhancers/styles/scaleEnhancer';
import compose from './lib/compose';
import composeStyleCreators from './lib/composeStyleCreators';
import styleEnhancer from './lib/enhancers/styleEnhancer';
import {translateStyleCreator} from './lib/enhancers/styles/translateEnhancer';

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

const CircleAnimationTouchable = createTouchableComponent(
  compose(
    circleAnimationEnhancer('#8f0013'),
    firstChildEnhancer(
      styleEnhancer(
        composeStyleCreators(
          scaleStyleCreator,
          composeStyleCreators(
            translateStyleCreator,
            colorStyleCreator('#000000', '#FFFFFF'),
          ),
        ),
      ),
    ),
  ),
);

const ScaleOpacityTouchable = createTouchableComponent(
  styleEnhancer(
    composeStyleCreators(
      opacityStyleCreator,
      scaleStyleCreator,
    ),
  ),
);

const FlipAndTintTouchable = createTouchableComponent(
  compose(
    firstChildEnhancer(
      styleEnhancer(
        composeStyleCreators(
          colorStyleCreator('#000000', '#FFFFFF'),
          rotateStyleCreator,
        )
      )
    ),
    styleEnhancer(
      composeStyleCreators(
        scaleStyleCreator,
        composeStyleCreators(
          backgroundColorStyleCreator,
          rotateStyleCreator,
        ),
      ),
    ),
  ),
);

const App = () => {
  const [handlers] = useState(() => ({
    onPressIn: () => { console.log('onPressIn'); },
    onPressOut: () => { console.log('onPressOut'); },
    onPress: () => { console.log('onPress'); },
  }));
  return (
    <View style={styles.container}>
      <ScaleOpacityTouchable
        easing={easing}
        duration={200}
        {...handlers}
      >
        <Animated.View style={styles.button}>
          <Animated.Text style={styles.label}>
            TOUCHABLE OPACITY
          </Animated.Text>
        </Animated.View>
      </ScaleOpacityTouchable>
      <FlipAndTintTouchable
        easing={easing}
        duration={400}
        backgroundColor="#FFFFFF"
        backgroundTintColor="#000000"
        textColor="#000000"
        textTintColor="#FFFFFF"
        {...handlers}
      >
        <Animated.View style={styles.button}>
          <Animated.Text style={styles.label}>
            GO
          </Animated.Text>
        </Animated.View>
      </FlipAndTintTouchable>
      <View style={{ flexDirection: 'row' }}>
        <CircleAnimationTouchable
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
        </CircleAnimationTouchable>
        <CircleAnimationTouchable
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
        </CircleAnimationTouchable>
      </View>
    </View>
  );
};

export default App;
