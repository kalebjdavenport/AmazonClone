import React from 'react';
import { TouchableOpacity } from 'react-native';
import { createDrawerNavigator } from 'react-navigation-drawer';

import MainTabNavigator from './MainTabNavigator';
import OrdersView from '../orders/OrdersView'

import { EvilIcons } from '@expo/vector-icons'
import Colors from '../../../constants/Colors'

export default createDrawerNavigator({
  Home: {
    screen: MainTabNavigator,
    navigationOptions: {
      drawerLabel: "Home"
    },
    Orders: OrdersView
  }
});
