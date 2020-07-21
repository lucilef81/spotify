import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Audio } from 'expo-av';
import {
  StyleSheet, TouchableOpacity, View, Text,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import useCurrentTrack from '../../contexts/TrackContext';

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
  const [isPlaying, setIsPlaying] = useState(true);
  const [playbackInstance, setPlaybackInstance] = useState(null);
  const [volume, setVolume] = useState(1.0);
  const [isBuffering, setIsBuffering] = useState(false);
  const { currentTrack } = useCurrentTrack();

  const onPlaybackStatusUpdate = (status) => {
    setIsBuffering(status.isBuffering);
  };

  const loadAudio = async () => {
    try {
      const instance = new Audio.Sound();
      const source = {
        uri: currentTrack.preview_url,
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
    console.log(isPlaying);
    if (isPlaying) {
      await playbackInstance.pauseAsync();
    } else {
      await playbackInstance.playAsync();
    }
    setIsPlaying(!isPlaying);
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
          <TouchableOpacity style={styles.control} onPress={() => alert('')}>
            <Ionicons name="ios-skip-backward" size={24} color="green" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.control} onPress={() => handlePlayPause()}>
            {isPlaying ? (
              <Ionicons name="ios-pause" size={24} color="green" />
            ) : (
              <Ionicons name="ios-play" size={24} color="green" />
            )}
          </TouchableOpacity>
          <TouchableOpacity style={styles.control} onPress={() => alert('')}>
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
