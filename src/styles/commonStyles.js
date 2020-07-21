import { StyleSheet } from 'react-native';

import theme from './index';

export default StyleSheet.create({
  textLight: {
    color: theme.colors.light,
  },

  title: {
    fontWeight: 'bold',
    fontSize: theme.sizes.medium,
  },
});
