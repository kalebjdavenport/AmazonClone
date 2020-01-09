import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import DrawerNavigator from './DrawerNavigator';
import AuthNavigator from './AuthNavigator'
import StartupScreen from '../welcome/StartupScreen'

export default createAppContainer(
  createSwitchNavigator({
    Startup: StartupScreen,
    Auth: AuthNavigator,
    Main: DrawerNavigator,
  })
);
