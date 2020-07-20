import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';

import Playlists from '../pages/Playlists/Playlists';
import Playlist from '../pages/Playlist/Playlist';

const Stack = createStackNavigator();

const Routing = () => (
  <>
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          ...TransitionPresets.SlideFromRightIOS,
        }}
      >
        <Stack.Screen
          name="playlists"
          component={Playlists}
        />
        <Stack.Screen
          name="playlist"
          initialParams={{ playlistId: null }}
          component={Playlist}
        />
      </Stack.Navigator>
    </NavigationContainer>
  </>
);

export default Routing;
