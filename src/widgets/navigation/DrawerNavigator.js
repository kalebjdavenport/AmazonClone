import { createDrawerNavigator } from 'react-navigation-drawer';

import MainTabNavigator from './MainTabNavigator';
import OrdersStack from './OrdersNavigator'
import UserProductsStack from './UserProductsNavigator'


export default createDrawerNavigator({
  Home: MainTabNavigator,
  Orders: OrdersStack,
  UserProducts: {
    screen: UserProductsStack,
    navigationOptions: {
      drawerLabel: 'My Products',
    }
  }
});
