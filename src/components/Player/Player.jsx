import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Audio } from 'expo-av';
import {
  StyleSheet, TouchableOpacity, View, Text,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { set } from 'react-native-reanimated';
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

  const onPlaybackStatusUpdate = (status) => {
    setIsBuffering(status.isBuffering);
  };

  const loadAudio = async (track) => {
    try {
      const instance = new Audio.Sound();
      const source = {
        uri: track ? track.preview_url : currentTrack.preview_url,
      };

      const status = {
        shouldPlay: isPlaying,
        volume,
      };

      instance.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);

      playbackInstance && await playbackInstance.unloadAsync();
      await instance.loadAsync(source, status, false);

      setPlaybackInstance(instance);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    const playTrack = async () => {
      try {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: false,
          interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
          playsInSilentModeIOS: true,
          interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
          shouldDuckAndroid: true,
          staysActiveInBackground: true,
          playThroughEarpieceAndroid: true,
        });
        currentTrack && loadAudio();
      } catch (e) {
        console.log(e);
      }
    };

    playTrack();
  }, [currentTrack]);

  const handlePlayPause = async () => {
    if (isPlaying) {
      await playbackInstance.pauseAsync();
    } else if (!isBuffering) {
      await playbackInstance.playAsync();
    }
    setIsPlaying(!isPlaying);
  };

  const handlePrevious = () => {
    const playables = currentPlaylist.tracks.items.filter((item) => item.track.preview_url);
    let index = playables.findIndex((item) => item.track.id === currentTrack.id);
    if (index === 0) {
      index = playables.length;
    }
    setCurrentTrack(playables[index - 1].track);
  };

  const handleNext = () => {
    const playables = currentPlaylist.tracks.items.filter((item) => item.track.preview_url);
    let index = playables.findIndex((item) => item.track.id === currentTrack.id);
    if (index === playables.length - 1) {
      index = -1;
    }
    setCurrentTrack(playables[index + 1].track);
  };

  return (
    <>
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

Player.propTypes = {

};

export default Player;
