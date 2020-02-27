import React from 'react';
import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import { YellowBox,View,Text } from 'react-native';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import thunk from "redux-thunk";
import rootReducers from './src/Redux/indexRedux';

import 'react-native-gesture-handler';


YellowBox.ignoreWarnings([
    'Warning: componentWillMount is deprecated',
    'Warning: componentWillReceiveProps is deprecated',
    'Warning: componentWillReceiveProps has been renamed',
    'Module RCTImageLoader requires',
]);
const store = createStore(rootReducers,applyMiddleware(thunk));


const OrtExam = () =>
  <Provider store={store}>
    <App/>
  </Provider>
AppRegistry.registerComponent(appName, () => OrtExam );