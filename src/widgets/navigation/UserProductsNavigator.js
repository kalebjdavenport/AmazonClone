import React from 'react'
import { Image, TouchableOpacity, StyleSheet } from 'react-native'
import { createStackNavigator } from 'react-navigation-stack'
import UserProduts from '../userProducts/UserProducts'
import EditProduct from '../editProduct/EditProduct'


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

const UserProductsNavigator = createStackNavigator(
  {
    UserProducts: {
      screen: UserProduts,
      navigationOptions: ({ navigation }) => ({
        headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.toggleDrawer()} style={styles.headerIconMenu}>
            <EvilIcons name='navicon' size={32} color={Colors.primaryColor} />
          </TouchableOpacity>
        ),
        headerRight: () => (
          <TouchableOpacity onPress={() => navigation.navigate('Edit')} style={styles.headerIconMenu}>
            <EvilIcons name='plus' size={32} color={Colors.primaryColor} />
          </TouchableOpacity>
        ),
      })
    },
    Edit: {
      screen: EditProduct,
      navigationOptions: ({ navigation }) => ({
        headerRight: () => (
          <TouchableOpacity onPress={navigation.getParam('submit')} style={styles.headerIconMenu}>
            <EvilIcons name='check' size={32} color={Colors.primaryColor} />
          </TouchableOpacity>
        ),
      })
    },
  },
  config
);

UserProductsNavigator.path = '';

const styles = StyleSheet.create({
  headerIconMenu: {
    padding: 10,
  },
})


export default UserProductsNavigator
