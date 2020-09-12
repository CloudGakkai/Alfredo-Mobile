import { createAppContainer } from 'react-navigation'
import OrderList from '../Containers/OrderList'
import Invoice from '../Containers/Invoice'
import RegisterScreen from '../Containers/RegisterScreen'
import LoginScreen from '../Containers/LoginScreen'
import ProductDetail from '../Containers/ProductDetail'
import Account from '../Containers/Account'
import Products from '../Containers/Products'
import Home from '../Containers/Home'
import { createStackNavigator } from 'react-navigation-stack';
import LaunchScreen from '../Containers/LaunchScreen'
import BottomNavigation from "./BottomNavigation";

import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const PrimaryNav = createStackNavigator({
  Main: {
    screen: BottomNavigation,
    navigationOptions: ({navigation}) => ({
      headerShown: false
    })
  },
  Account: { screen: Account },
  Products: { screen: Products },
  Home: { screen: Home },
  ProductDetail: { screen: ProductDetail },
  RegisterScreen: { screen: RegisterScreen },
  LoginScreen: { screen: LoginScreen },
  Invoice: { screen: Invoice },
  OrderList: { screen: OrderList },
}, {
  // Default config for all screens
  initialRouteName: 'Main',
  navigationOptions: {
    headerStyle: styles.header
  }
})

export default createAppContainer(PrimaryNav)
