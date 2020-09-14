import React from 'react'
import { SafeAreaView, ScrollView, TouchableOpacity, View, Text, StatusBar } from 'react-native'
import { connect } from 'react-redux'
import AuthActions from '../Redux/AuthRedux'

// Styles
import styles from './Styles/AccountStyle'
import { apply } from '../Lib/OsmiProvider';
import HeaderStyle from '../Navigation/Styles/NavigationStyles'

const Account = (props) => {
  const guestView = () => {
    return (
      <ScrollView contentContainerStyle={styles.content}>
        <StatusBar backgroundColor={apply("blue-500")} barStyle='light-content' />
        <View style={styles.helloContainer}>
          <Text style={styles.helloText}>Hi!</Text>
        </View>
        <View style={styles.btnContainer}>
          <View style={apply('flex')}>
            <TouchableOpacity style={styles.btnAuth} activeOpacity={0.9} onPress={() => props.navigation.navigate('LoginScreen')}>
              <Text style={styles.btnAuthLabel}>Login</Text>
            </TouchableOpacity>
          </View>
          <View style={apply('flex ml-5')}>
            <TouchableOpacity style={styles.btnAuth} activeOpacity={0.9} onPress={() => props.navigation.navigate('RegisterScreen')}>
              <Text style={styles.btnAuthLabel}>Register</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    )
  }

  const userView = () => {
    const { data } = props.profile

    return (
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.helloContainer}>
          <Text style={styles.helloText}>Hi, {data?.username}!</Text>
        </View>
        <View style={styles.btnContainer}>
          <View style={apply('flex')}>
            <TouchableOpacity style={styles.btnAuth} activeOpacity={0.9} onPress={() => props.navigation.navigate('OrderList')}>
              <Text style={styles.btnAuthLabel}>Orders</Text>
            </TouchableOpacity>
          </View>
          <View style={apply('flex ml-5')}>
            <TouchableOpacity style={[styles.btnAuth, apply('bg-red-500')]} activeOpacity={0.9} onPress={() => props.doLogout()}>
              <Text style={styles.btnAuthLabel}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      {props.user ? userView() : guestView()}
    </SafeAreaView>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.session.user,
    profile: state.session.profile
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    doLogout: value => dispatch(AuthActions.doLogoutRequest(value))
  }
}

Account.navigationOptions = ({ navigation }) => {
  const { params = {} } = navigation.state

  return {
    headerStyle: HeaderStyle.default,
    headerTitle: navigation.getParam('title', 'Account'),
    headerTitleStyle: apply("text-center"),
    headerLayoutPreset: 'center'
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Account)
