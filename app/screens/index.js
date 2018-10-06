import { Navigation } from 'react-native-navigation';

import LandingScreen from './Track';
import TrackScreen from './Landing';

export default () => {
  Navigation.registerComponent('lifetrack.Landing', () => LandingScreen);
  Navigation.registerComponent('lifetrack.Track', () => TrackScreen);
}
