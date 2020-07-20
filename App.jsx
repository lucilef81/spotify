import React from 'react';

import { StatusBar } from 'expo-status-bar';
import Routing from './src/navigation/Routing';

export default () => (
  <>
    <Routing />
    {/* eslint-disable-next-line react/style-prop-object */}
    <StatusBar style="light" />
  </>

);
