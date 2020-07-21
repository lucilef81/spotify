import { StyleSheet } from 'react-native';

import theme from './index';

export default StyleSheet.create({
  container: {
    paddingTop: theme.topPadding,
    paddingBottom: theme.sizes.large,
    backgroundColor: theme.colors.black,
    flex: 1,
  },

  textLight: {
    color: theme.colors.light,
  },

  trackName: {
    color: theme.colors.light,
  },

  artistName: {
    color: theme.colors.grey,
  },

  disabled: {
    color: '#666',
  },

  title: {
    fontWeight: 'bold',
    fontSize: theme.sizes.medium,
  },
});
