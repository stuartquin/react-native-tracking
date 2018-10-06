import React from 'react';
import { createStackNavigator } from 'react-navigation';

import LandingScreen from './app/screens/Landing'
import TrackScreen from './app/screens/Track'

export default createStackNavigator({
  Landing: LandingScreen,
  Track: TrackScreen,
});

