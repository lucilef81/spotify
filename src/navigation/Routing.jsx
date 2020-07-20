import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Playlists from '../pages/Playlists/Playlists';

const Stack = createStackNavigator();

const Routing = () => (
  <NavigationContainer>
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="playlists"
        component={Playlists}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

export default Routing;
