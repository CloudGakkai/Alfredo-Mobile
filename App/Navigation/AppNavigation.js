import { createAppContainer } from 'react-navigation'
import Account from '../Containers/Account'
import Cart from '../Containers/Cart'
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
  Cart: { screen: Cart },
  Products: { screen: Products },
  Home: { screen: Home }
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'Main',
  navigationOptions: {
    headerStyle: styles.header
  }
})

export default createAppContainer(PrimaryNav)
