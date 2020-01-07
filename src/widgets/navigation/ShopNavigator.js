import React from 'react';
import { createStackNavigator } from 'react-navigation-stack'
import { Image, View, TouchableOpacity, StyleSheet, Platform } from 'react-native';

import { EvilIcons } from '@expo/vector-icons'
import Colors from '../../../constants/Colors';

import Home from '../Home'
import Cart from '../cart/Cart'
import ProductsCardList from '../../components/ProductsCardList'
import ProductDetails from '../../components/ProductDetails'

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {
    defaultNavigationOptions: ({ navigation }) => ({
      headerTitle: () => (
        <Image source={require('../../../assets/logo/Congo.png')} />
      ),
      headerRight: () => (
        <View style={styles.headerIconsRight}>
          <TouchableOpacity style={styles.headerIconSearch}>
            <EvilIcons name='search' size={32} color={Colors.primaryColor} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerIconCart} onPress={() => navigation.navigate('Cart')}>
            <EvilIcons name='cart' size={32} color={Colors.primaryColor} />
          </TouchableOpacity>
        </View>
      ),
    }),
  },
});

const ShopStack = createStackNavigator(
  {
    Shop: {
      screen: Home,
      navigationOptions: ({ navigation }) => ({
        headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.toggleDrawer()} style={styles.headerIconMenu}>
            <EvilIcons name='navicon' size={32} color={Colors.primaryColor} />
          </TouchableOpacity>
        ),
      })
    },
    Cart,
    Details: ProductDetails
  },
  config
);

ShopStack.path = '';

const styles = StyleSheet.create({
  headerIconMenu: {
    padding: 10,
  },
  headerIconsRight: {
    flexDirection: 'row'
  },
  headerIconCart: {
    paddingRight: 15,
    padding: 10,
  },
  headerIconSearch: {
    paddingTop: 8,
  }
})

export default ShopStack
