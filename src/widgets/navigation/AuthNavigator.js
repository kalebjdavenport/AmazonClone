import React from 'react'
import { Image } from 'react-native'
import { createStackNavigator } from 'react-navigation-stack'
import Auth from '../welcome/Auth'

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {
    defaultNavigationOptions: () => ({
      headerTitle: () => (
        <Image source={require('../../../assets/logo/Congo.png')} />
      ),
    }),
  },
});

const AuthStack = createStackNavigator(
  {
    Auth: Auth
  },
  config
);

AuthStack.path = '';


export default AuthStack
