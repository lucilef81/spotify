import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import usePlayer from '../../contexts/PlayerContext';

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

const Playlist = () => {
  const [playlist, setPlaylist] = useState(null);
  const { setCurrentTrack, currentPlaylist } = usePlayer();

  useEffect(() => {
    // Set playlist in state when context playlist is loaded
    currentPlaylist && setPlaylist(currentPlaylist);
  }, [currentPlaylist, setPlaylist]);

  return (
    <View style={commonStyles.container}>
      {/* Display only if current playlist exists */}
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
              <Text style={[commonStyles.textLight, commonStyles.title]}>
                {playlist.name}
              </Text>
              <Text style={commonStyles.textLight}>{`playlist by ${playlist.owner.display_name}`}</Text>

              <Text style={commonStyles.textLight}>{playlist.description}</Text>
              <Text style={commonStyles.textLight}>
                {`${playlist.followers.total} followers`}
              </Text>
            </View>
          </View>
          <ScrollView>
            <View style={styles.tracks}>
              {playlist.tracks.items.map((item, index) => (
                <>
                  {/* Track is clickable only if playable */}
                  {item.track.preview_url ? (
                    <TouchableOpacity onPress={() => setCurrentTrack({ ...item.track, index })}>
                      <View style={styles.track} key={`track-${item.track.id}`}>
                        <Text
                          style={commonStyles.trackName}
                        >
                          {item.track.name}
                        </Text>
                        <Text
                          style={commonStyles.artistName}
                        >
                          {item.track.artists[0].name}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  ) : (
                    <View style={styles.track} key={`track-${item.track.id}`}>
                      <Text
                        style={commonStyles.disabled}
                      >
                        {item.track.name}
                      </Text>
                      <Text
                        style={commonStyles.disabled}
                      >
                        {item.track.artists[0].name}
                      </Text>
                    </View>
                  )}
                </>
              ))}
            </View>
          </ScrollView>
        </View>
      )}
    </View>
  );
};

export default Playlist;
