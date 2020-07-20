import React, { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, Image, ScrollView,
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

const Playlists = () => {
  const [playlists, setPlaylists] = useState([]);
  const [title, setTitle] = useState('');

  useEffect(() => {
    const getPlaylists = async () => {
      const res = await fetch('https://afternoon-waters-49321.herokuapp.com/v1/browse/featured-playlists');
      const data = await res.json();

      setPlaylists(data.playlists.items);
      setTitle(data.message);
    };

    getPlaylists();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <ScrollView>
        <View style={styles.covers}>
          {playlists.map((p) => (
            <Image style={styles.cover} source={{ uri: p.images[0].url }} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default Playlists;
