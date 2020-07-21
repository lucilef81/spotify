import React, { useState, useEffect } from 'react';
import { Audio } from 'expo-av';
import {
  StyleSheet, TouchableOpacity, View, Text,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import usePlayer from '../../contexts/PlayerContext';

import commonStyles from '../../styles/commonStyles';

const styles = StyleSheet.create({
  player: {
    borderTopWidth: 2,
    borderTopColor: 'green',
    flexDirection: 'row',
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  meta: {
    flex: 1.25,
  },
  controls: {
    flex: 1,
    flexDirection: 'row',
  },
  control: {
    margin: 20,
  },
});

const Player = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackInstance, setPlaybackInstance] = useState(null);
  const [volume, setVolume] = useState(1.0);
  const [isBuffering, setIsBuffering] = useState(false);
  const { currentTrack, setCurrentTrack, currentPlaylist } = usePlayer();

  // Check if player instance is still loading the track
  const onPlaybackStatusUpdate = (status) => {
    setIsBuffering(status.isBuffering);
  };

  // Load track from context
  const loadAudio = async () => {
    try {
      // Instantiate new player instance
      const instance = new Audio.Sound();

      // Define the source to be the current track in context
      const source = {
        uri: currentTrack.preview_url,
      };

      // Player status props
      const status = {
        shouldPlay: isPlaying,
        volume,
      };

      instance.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);

      // If current playing track, unload it before loading a new one
      // thus avoiding really annoying but funny cacophony
      playbackInstance && await playbackInstance.unloadAsync();

      // Load track in player asynchronously
      await instance.loadAsync(source, status, false);

      // Set player instance in state
      setPlaybackInstance(instance);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    const playTrack = async () => {
      try {
        // Set specific player parameters for both iOS and android
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: false,
          interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
          playsInSilentModeIOS: true,
          interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
          shouldDuckAndroid: true,
          staysActiveInBackground: true,
          playThroughEarpieceAndroid: true,
        });

        // If a current track exists in context, load it in the player
        currentTrack && loadAudio();
      } catch (e) {
        console.log(e);
      }
    };

    playTrack();
  }, [currentTrack]);

  // Play/pause button handling
  const handlePlayPause = async () => {
    if (isPlaying) {
      await playbackInstance.pauseAsync();
    } else if (!isBuffering) {
      await playbackInstance.playAsync();
    }
    setIsPlaying(!isPlaying);
  };

  // Previous track button handling
  const handlePrevious = () => {
    // Filter only tracks with a preview_url
    const playables = currentPlaylist.tracks.items.filter((item) => item.track.preview_url);

    // Get current track index in playables tracks array
    let index = playables.findIndex((item) => item.track.id === currentTrack.id);

    // If index out of bounds, fix it
    if (index === 0) {
      index = playables.length;
    }

    // Set the new current Track to be the previous entry in playables tracks
    setCurrentTrack(playables[index - 1].track);
  };

  // Next track button handling
  const handleNext = () => {
    // Filter only tracks with a preview_url
    const playables = currentPlaylist.tracks.items.filter((item) => item.track.preview_url);

    // Get current track index in playables tracks array
    let index = playables.findIndex((item) => item.track.id === currentTrack.id);

    // If index out of bounds, fix it
    if (index === playables.length - 1) {
      index = -1;
    }

    // Set the new current Track to be the next entry in playables tracks
    setCurrentTrack(playables[index + 1].track);
  };

  return (
    <>
      {/* Don't display player if no current track */}
      {currentTrack && (
      <View style={styles.player}>
        <View style={styles.meta}>
          <Text style={commonStyles.trackName}>{currentTrack.name}</Text>
          <Text style={commonStyles.artistName}>{currentTrack.artists[0].name}</Text>
        </View>
        <View style={styles.controls}>
          <TouchableOpacity style={styles.control} onPress={() => handlePrevious()}>
            <Ionicons name="ios-skip-backward" size={24} color="green" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.control} onPress={() => handlePlayPause()}>
            {/* Change icon based on player status */}
            {isPlaying ? (
              <Ionicons name="ios-pause" size={24} color="green" />
            ) : (
              <Ionicons name="ios-play" size={24} color="green" />
            )}
          </TouchableOpacity>
          <TouchableOpacity style={styles.control} onPress={() => handleNext()}>
            <Ionicons name="ios-skip-forward" size={24} color="green" />
          </TouchableOpacity>
        </View>
      </View>
      )}
    </>
  );
};

export default Player;
