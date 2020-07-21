import React from 'react';
import { StatusBar } from 'expo-status-bar';

import { PlayerProvider } from './src/contexts/PlayerContext';
import Routing from './src/navigation/Routing';
import Player from './src/components/Player/Player';

export default () => (
  <PlayerProvider>
    <Routing />
    <Player />
    {/* eslint-disable-next-line react/style-prop-object */}
    <StatusBar style="light" />
  </PlayerProvider>

);
