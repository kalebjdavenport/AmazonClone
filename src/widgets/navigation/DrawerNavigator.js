import React from 'react'
import { SafeAreaView, Button, View } from 'react-native'
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';

import MainTabNavigator from './MainTabNavigator';
import OrdersStack from './OrdersNavigator'
import UserProductsStack from './UserProductsNavigator'

import { useDispatch } from 'react-redux'
import * as AuthActions from '../../redux/actions/auth'


export default createDrawerNavigator({
  Home: MainTabNavigator,
  Orders: OrdersStack,
  UserProducts: {
    screen: UserProductsStack,
    navigationOptions: {
      drawerLabel: 'My Products',
    }
  }
}, {
  contentComponent: props => {

    const dispatch = useDispatch()

    return (<View style={{ flex: 1, height: '100%' }}>
      <SafeAreaView style={{ justifyContent: 'space-between' }} forceInset={{ top: 'always', horizontal: 'never' }}>
        <DrawerItems {...props} />
        <Button style={{ position: 'absolute', bottom: 20, right: 0, left: 0 }} title='log out' onPress={() => dispatch(AuthActions.logout())} />
      </SafeAreaView>
    </View>)
  }
});
