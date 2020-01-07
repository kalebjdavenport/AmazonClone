import React from 'react'
import { Image, TouchableOpacity, StyleSheet } from 'react-native'
import { createStackNavigator } from 'react-navigation-stack'
import Orders from '../orders/Orders'

import { EvilIcons } from '@expo/vector-icons'
import Colors from '../../../constants/Colors';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {
    defaultNavigationOptions: ({ navigation }) => ({
      headerTitle: () => (
        <Image source={require('../../../assets/logo/Congo.png')} />
      ),
    }),
  },
});

const OrdersStack = createStackNavigator(
  {
    Orders: {
      screen: Orders,
      navigationOptions: ({ navigation }) => ({
        headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.toggleDrawer()} style={styles.headerIconMenu}>
            <EvilIcons name='navicon' size={32} color={Colors.primaryColor} />
          </TouchableOpacity>
        ),
      })
    },
  },
  config
);

OrdersStack.path = '';

const styles = StyleSheet.create({
  headerIconMenu: {
    padding: 10,
  },
})


export default OrdersStack
