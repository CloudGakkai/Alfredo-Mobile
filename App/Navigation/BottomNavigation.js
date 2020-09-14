import React from 'react'
import Icon from 'react-native-vector-icons/Feather'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from "react-navigation-tabs"
import { apply } from "../Lib/OsmiProvider"

import HomeScreen from "../Containers/Home";
import ProductsScreen from "../Containers/Products";
import AccountScreen from "../Containers/Account";

export default createBottomTabNavigator({
    Home: {
        screen: createStackNavigator({HomeScreen}, {
            headerMode: 'screen',
            navigationOptions: navigation => ({
                tabBarIcon: ({focused, tintColor}) => <Icon style={apply("mt-2")} name="home" size={25} color={tintColor} />
            })
        })
    },
    Category: {
        screen: createStackNavigator({ProductsScreen}, {
            headerMode: 'screen',
            navigationOptions: navigation => ({
                tabBarIcon: ({focused, tintColor}) => <Icon style={apply("mt-2")} name="grid" size={25} color={tintColor} />
            })
        })
    },
    Account: {
        screen: createStackNavigator({AccountScreen}, {
            headerMode: 'screen',
            navigationOptions: navigation => ({
                tabBarIcon: ({focused, tintColor}) => <Icon style={apply("mt-2")} name="user" size={25} color={tintColor} />
            })
        })
    }
}, {
    initalRouteName: 'Home',
    tabBarOptions: {
        activeTintColor: apply('blue-500'),
        inactiveTintColor: apply('gray-900'),
        style: apply('bg-white items-center justify-center p-0 border-t-0 border-0 shadow-lg'),
        labelStyle: apply('text-sm')
    },
    allowFontScaling: false
})
