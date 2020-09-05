/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
//import Navigation from './src/component/Navigation';
import Home from './src/component/Home';
import Navigation from './src/component/Navigation';

//AppRegistry.registerComponent(appName, () => App);
AppRegistry.registerComponent(appName, () => Navigation);
