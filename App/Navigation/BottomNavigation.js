import React from 'react'
import {createStackNavigator} from 'react-navigation-stack'
import { createBottomTabNavigator } from "react-navigation-tabs"
import { apply } from "../Lib/OsmiProvider"

import {
    View
} from "react-native";

import HomeScreen from "../Containers/Home";
import ProductsScreen from "../Containers/Products";
import CartScreen from "../Containers/Cart";
import AccountScreen from "../Containers/Account";

export default createBottomTabNavigator({
    Home: {
        screen: createStackNavigator({HomeScreen}, {
            headerMode: 'screen',
            navigationOptions: navigation => ({
                tabBarIcon: ({focused, tintColor}) => <View></View>
            })
        })
    },
    Products: {
        screen: createStackNavigator({ProductsScreen}, {
            headerMode: 'screen',
            navigationOptions: navigation => ({
                tabBarIcon: ({focused, tintColor}) => <View></View>
            })
        })
    },
    Cart: {
        screen: createStackNavigator({CartScreen}, {
            headerMode: 'screen',
            navigationOptions: navigation => ({
                tabBarIcon: ({focused, tintColor}) => <View></View>
            })
        })
    },
    Account: {
        screen: createStackNavigator({AccountScreen}, {
            headerMode: 'screen',
            navigationOptions: navigation => ({
                tabBarIcon: ({focused, tintColor}) => <View></View>
            })
        })
    }
}, {
    initalRouteName: 'Home',
    tabBarOptions: {
        activeTintColor: apply('blue-500'),
        inactiveTintColor: apply('gray-900'),
        style: apply('bg-white p-4 border-t-0 border-0 shadow-lg'),
        labelStyle: apply('text-sm')
    },
    allowFontScaling: false
})