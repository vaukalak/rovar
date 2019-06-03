import React, { useState } from 'react';
import Animated, { Easing } from 'react-native-reanimated';
import { StyleSheet } from 'react-native';
import compose from '../enhancers/compose';
import touchEnhancer from '../enhancers/states/touchEnhancer';
import styleEnhancer from '../enhancers/styleEnhancer';
import backgroundColor from '../styles/backgroundColor';
import opacity from '../styles/opacity';
import disabledEnhancer from '../enhancers/states/disabledEnhancer';
import TouchableController from '../controllers/TouchableController';

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
          backgroundColor('rgba(240, 208, 0, 0.7)'),
          opacity(0.9),
        ),
      ),
      disabledEnhancer(
        styleEnhancer(
          backgroundColor('#AAAAAA'),
          opacity(0.6),
        ),
      ),
    ),
  );
  return (
    <TouchableController
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
    </TouchableController>
  );
};

export default React.memo(Button);
