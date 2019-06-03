import React, { useState, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import Checkbox from '../lib/components/Checkbox';
import TextInput from '../lib/components/TextInput';
import Button from '../lib/components/Button';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEEEEE',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingTop: 100,
  },
});

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
      <View style={{ flexDirection: 'row'}}>
        <Checkbox />
        <Checkbox />
        <Checkbox />
        <Checkbox />
        <Checkbox />
        <Checkbox />
        <Checkbox />
        <Checkbox />
      </View>
      <View style={{ flexDirection: 'row'}}>
        <Checkbox />
        <Checkbox />
        <Checkbox />
        <Checkbox />
        <Checkbox />
        <Checkbox />
        <Checkbox />
        <Checkbox />
      </View>
      <View style={{ flexDirection: 'row'}}>
        <Checkbox />
        <Checkbox />
        <Checkbox />
        <Checkbox />
        <Checkbox />
        <Checkbox />
        <Checkbox />
        <Checkbox />
      </View>
      <View style={{ flexDirection: 'row'}}>
        <Checkbox />
        <Checkbox />
        <Checkbox />
        <Checkbox />
        <Checkbox />
        <Checkbox />
        <Checkbox />
        <Checkbox />
      </View>
      <View style={{ flexDirection: 'row'}}>
        <Checkbox />
        <Checkbox />
        <Checkbox />
        <Checkbox />
        <Checkbox />
        <Checkbox />
        <Checkbox />
        <Checkbox />
      </View>
      <View style={{ flexDirection: 'row'}}>
        <Checkbox />
        <Checkbox />
        <Checkbox />
        <Checkbox />
        <Checkbox />
        <Checkbox />
        <Checkbox />
        <Checkbox />
      </View>
      <TextInput />
      <TextInput />
    </View>
  );

};

export default HooksTouchableExamples;
