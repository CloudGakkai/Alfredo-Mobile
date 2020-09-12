import React from 'react'
import { SafeAreaView, ScrollView, View, TextInput, Text, KeyboardAvoidingView, TouchableOpacity, Platform } from 'react-native'
import { connect } from 'react-redux'
import ArrowBack from '../Components/ArrowBack'

import { Formik } from 'formik'
import * as Yup from 'yup'

import Format from '../Lib/NumberFormat'

// Styles
import styles from './Styles/ConfirmPaymentStyle'
import HeaderStyle from '../Navigation/Styles/NavigationStyles'
import { apply } from '../Lib/OsmiProvider'

const OS = Platform.OS

const ConfirmPayment = () => {
  return (
    <SafeAreaView>
      <ScrollView>
        <KeyboardAvoidingView>

        </KeyboardAvoidingView>
      </ScrollView>
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

ConfirmPayment.navigationOptions = ({ navigation }) => {
  const { params = {} } = navigation.state

  return {
    headerStyle: HeaderStyle.default,
    headerTitle: 'Confirm Payment',
    headerLeft: () => <ArrowBack />,
    headerRight: () => <View />,
    headerTitleContainerStyle: {left: OS === 'ios' ? 0 : 55}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmPayment)
