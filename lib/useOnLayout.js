import React, { useState, useCallback } from 'react';
import Animated from "react-native-reanimated";

const useOnLayout = () => {
  const [layoutWidth] = useState(() => new Animated.Value(0));
  const [layoutHeight] = useState(() => new Animated.Value(0));
  const onLayout = useCallback(({ nativeEvent }) => {
    console.log('onLayout: ', nativeEvent);
    layoutWidth.setValue(nativeEvent.layout.width);
    layoutHeight.setValue(nativeEvent.layout.height);
  }, []);
  return {
    layoutWidth,
    layoutHeight,
    onLayout,
  };
};

export default useOnLayout;
