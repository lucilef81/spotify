import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  View, Text, StyleSheet, Image, ScrollView, TouchableOpacity,
} from 'react-native';

import useCurrentTrack from '../../contexts/TrackContext';

import commonStyles from '../../styles/commonStyles';
import theme from '../../styles';

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: theme.sizes.medium,
  },
  title: {
    color: theme.colors.light,
    fontSize: theme.sizes.medium,
    marginBottom: theme.sizes.medium,
  },

  cover: {
    width: 150,
    height: 150,
    marginBottom: theme.sizes.small,
  },

  covers: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  },
});

const Playlists = ({ navigation }) => {
  const [playlists, setPlaylists] = useState([]);
  const [title, setTitle] = useState('');
  const { setCurrentPlaylist } = useCurrentTrack();

  useEffect(() => {
    const getPlaylists = async () => {
      const res = await fetch('https://afternoon-waters-49321.herokuapp.com/v1/browse/featured-playlists');
      const data = await res.json();

      setPlaylists(data.playlists.items);
      setTitle(data.message);
    };

    getPlaylists();
  }, []);

  const onPlaylistPress = (playlist) => {
    setCurrentPlaylist(playlist);
    navigation.navigate('playlist', { playlistId: playlist.id });
  };

  return (
    <View style={[commonStyles.container, styles.wrapper]}>
      <Text style={styles.title}>{title}</Text>
      <ScrollView>
        <View style={styles.covers}>
          {playlists.map((p) => (
            <TouchableOpacity onPress={() => onPlaylistPress(p)}>
              <Image
                style={styles.cover}
                source={{ uri: p.images[0].url }}
              />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

Playlists.propTypes = {
  navigation: PropTypes.object.isRequired,
};

Playlists.defaultProps = {
};

export default Playlists;
