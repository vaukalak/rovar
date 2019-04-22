import { AppRegistry } from 'react-native';
import { getStorybookUI, configure } from '@storybook/react-native';

import './rn-addons';

configure(() => {
  require('./stories');
}, module);

const StorybookUIRoot = getStorybookUI({});

AppRegistry.registerComponent('easy-button', () => StorybookUIRoot);

export default StorybookUIRoot;
