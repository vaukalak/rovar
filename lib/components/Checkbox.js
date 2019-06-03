import React, { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import Animated, { Easing } from 'react-native-reanimated';
import ToggleController from '../controllers/ToggleController';
import compose from '../enhancers/compose';
import selectedEnhancer from '../enhancers/states/selectedEnhancer';
import getChildEnhancer from '../enhancers/children/getChildEnhancer';
import styleEnhancer from '../enhancers/styleEnhancer';
import backgroundColor from '../styles/backgroundColor';
import rotate from '../styles/rotate';
import scale from '../styles/scale';
import touchEnhancer from '../enhancers/states/touchEnhancer';
import conditionalColor from '../utils/colors/conditionalColor';

const { or, clockRunning } = Animated;

const styles = StyleSheet.create({
  container: {
    width: 36,
    height: 36,
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    borderColor: 'black',
    borderWidth: 3,
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
  },
  icon: {
    backgroundColor: 'black',
    flex: 1,
    borderRadius: 5,
    margin: 8,
  },
});

const elastic = Easing.in(Easing.elastic(1));

const Checkbox = () => {
  const enhancer = useMemo(
    () => compose(
      selectedEnhancer(
        compose(
          getChildEnhancer('background')(
            styleEnhancer(
              backgroundColor('rgba(0, 150, 3)'),
              rotate(180),
            ),
          ),
          getChildEnhancer('icon')(
            styleEnhancer(
              scale(0.01, 1),
            ),
          ),
        ),
      ),
      touchEnhancer(
        compose(
          getChildEnhancer('background')(
            styleEnhancer(
              backgroundColor(
                ({ selectedAnimation }) => useMemo(
                  () => {
                    return conditionalColor(
                      or(
                        selectedAnimation.transitionState.endState,
                        clockRunning(selectedAnimation.transitionState.clockOut),
                      ),
                      'rgba(0, 150, 3)',
                      'rgba(0, 122, 2)',
                    );
                  },
                  [selectedAnimation],
                ),
              ),
            ),
          ),
          styleEnhancer(
            scale(1, 0.9),
          ),
        ),
      ),
    ),
    [],
  );
  return (
    <ToggleController
      easing={elastic}
      enhancer={enhancer}
      hitSlop={{ horizontal: 10, vertical: 10 }}
      onPress={() => {}}
      enabled
    >
      <Animated.View
        style={styles.container}
      >
        <Animated.View
          key="background"
          style={styles.background}
        />
        <Animated.View
          key="icon"
          style={styles.icon}
        />
      </Animated.View>
    </ToggleController>
  );
};

export default React.memo(Checkbox);
