import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, { Easing } from 'react-native-reanimated';
import circleAnimationEnhancer from '../lib/enhancers/misc/circleAnimationEnhancer';
import backgroundColor from '../lib/styles/backgroundColor';
import color from '../lib/styles/color';
import opacity from '../lib/styles/opacity';
import rotate from '../lib/styles/rotate';
import firstChildEnhancer from '../lib/enhancers/children/firstChildEnhancer';
import scale from '../lib/styles/scale';
import compose from '../lib/enhancers/compose';
import styleEnhancer from '../lib/enhancers/styleEnhancer';
import translateY from '../lib/styles/translateY';
import { createTouchableComponent } from '../lib/controllers/TouchableController';
import touchEnhancer from '../lib/enhancers/states/touchEnhancer';

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
  touchEnhancer(
    compose(
      styleEnhancer(
        scale(1, 0.95),
      ),
      firstChildEnhancer(
        styleEnhancer(
          scale(1, 0.95),
          translateY(3),
          color('#FFFFFF'),
        ),
      ),
      circleAnimationEnhancer('#8f0013'),
    ),
  ),
);

const ScaleOpacityTouchable = createTouchableComponent(
  compose(
    touchEnhancer(
      styleEnhancer(
        opacity(0.4),
        scale(1, 0.94),
      ),
    ),
  ),
);

const FlipAndTintTouchable = createTouchableComponent(
  touchEnhancer(
    compose(
      styleEnhancer(
        scale(1, 1.2),
        backgroundColor(),
        rotate(10),
      ),
      firstChildEnhancer(
        styleEnhancer(
          color('#FFFFFF'),
          scale(1, 0.5),
          rotate(-20),
        ),
      ),
    ),
  ),
);

const TouchableExamples = () => {
  const [handlers] = useState(() => ({
    onPressIn: () => { console.log('onPressIn'); },
    onPressOut: () => { console.log('onPressOut'); },
    onPress: () => { console.log('onPress'); },
  }));
  return (
    <View style={styles.container}>
      <ScaleOpacityTouchable
        easing={easing}
        duration={500}
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

export default TouchableExamples;
