import React from 'react'
import { SafeAreaView, TouchableOpacity, Text } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/AccountStyle'

const Account = (props) => {
  return (
    <SafeAreaView>
    <TouchableOpacity style={{marginVertical: 15}} onPress={() => props.navigation.navigate('LoginScreen')}>
      <Text>Login</Text>
    </TouchableOpacity>
      <TouchableOpacity onPress={() => props.navigation.navigate('RegisterScreen')}>
        <Text>Register</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Account)
