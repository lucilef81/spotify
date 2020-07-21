import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import useCurrentTrack from '../../contexts/TrackContext';

import commonStyles from '../../styles/commonStyles';
import theme from '../../styles';

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    height: 150,
    alignItems: 'center',
    paddingHorizontal: 10,
  },

  meta: {
    width: '60%',
  },

  tracks: {
    paddingTop: 30,
    paddingBottom: 150,
    paddingHorizontal: theme.sizes.medium,
  },

  track: {
    marginBottom: theme.sizes.small,
  },

  cover: {
    width: 120,
    height: 120,
    marginBottom: theme.sizes.small,
    marginRight: theme.sizes.small,
  },
});

const Playlist = ({ route }) => {
  const [playlist, setPlaylist] = useState(null);
  const { playlistId } = route.params;
  const { setCurrentTrack } = useCurrentTrack();

  useEffect(() => {
    const getPlaylist = async () => {
      const res = await fetch(
        `https://afternoon-waters-49321.herokuapp.com/v1/playlists/${playlistId}`,
      );
      const data = await res.json();

      setPlaylist(data);
    };

    getPlaylist();
  }, []);

  return (
    <View style={commonStyles.container}>
      {playlist && (
        <View>
          <View style={styles.header}>
            <LinearGradient
              colors={['black', 'green']}
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                right: 0,
                height: 150,
              }}
            />
            <Image
              style={styles.cover}
              source={{ uri: playlist.images[0].url }}
            />
            <View style={styles.meta}>
              <Text style={[commonStyles.textLight, commonStyles.title]}>{playlist.name}</Text>
              <Text style={commonStyles.textLight}>{`Playlist by ${playlist.owner.display_name}`}</Text>

              <Text style={commonStyles.textLight}>{playlist.description}</Text>
              <Text style={commonStyles.textLight}>
                {`${playlist.followers.total} followers`}
              </Text>
            </View>
          </View>
          <ScrollView>
            <View style={styles.tracks}>
              {playlist.tracks.items.map((item) => (
                <TouchableOpacity onPress={() => setCurrentTrack(item.track)}>
                  <View style={styles.track} key={`track-${item.track.id}`}>
                    <Text
                      style={
                        item.track.preview_url
                          ? commonStyles.trackName
                          : commonStyles.disabled
                      }
                    >
                      {item.track.name}
                    </Text>
                    <Text
                      style={
                        item.track.preview_url
                          ? commonStyles.artistName
                          : commonStyles.disabled
                      }
                    >
                      {item.track.artists[0].name}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>
      )}
    </View>
  );
};

Playlist.propTypes = {
  route: PropTypes.object.isRequired,
};

export default Playlist;
