import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet, TouchableOpacity, View, Image, Text,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
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

const Player = ({ track }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackInstance, setplaybackInstance] = useState(null);
  const [currentIndex, setcurrentIndex] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isBuffering, setisBuffering] = useState(false);

  return (
    <View style={styles.player}>
      <View style={styles.meta}>
        <Text style={commonStyles.trackName}>Cuitas les bananas</Text>
        <Text style={commonStyles.artistName}>Philippe Risoli</Text>
      </View>
      <View style={styles.controls}>
        <TouchableOpacity style={styles.control} onPress={() => alert('')}>
          <Ionicons name="ios-skip-backward" size={24} color="green" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.control} onPress={() => setIsPlaying(!isPlaying)}>
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
  );
};

Player.propTypes = {

};

export default Player;
