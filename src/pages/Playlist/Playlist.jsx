import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import {
  View, Text, ScrollView, StyleSheet,
} from 'react-native';

import theme from '../../styles';

const styles = StyleSheet.create({
  container: {
    paddingTop: theme.topPadding,
    paddingHorizontal: theme.sizes.medium,
    paddingBottom: theme.sizes.large,
    backgroundColor: theme.colors.black,
    flex: 1,
  },

  text: {
    color: theme.colors.light,
  },
});

const Playlist = ({ route }) => {
  const [playlist, setPlaylist] = useState(null);
  const { playlistId } = route.params;

  useEffect(() => {
    const getPlaylist = async () => {
      const res = await fetch(`https://afternoon-waters-49321.herokuapp.com/v1/playlists/${playlistId}`);
      const data = await res.json();

      setPlaylist(data);
    };

    getPlaylist();
  }, []);

  return (
    <View style={styles.container}>
      {playlist && (
        <ScrollView>
          <View>
            <Text style={styles.text}>{playlist.name}</Text>
          </View>
        </ScrollView>
      )}
    </View>
  );
};

Playlist.propTypes = {
  route: PropTypes.object.isRequired,
};

export default Playlist;
