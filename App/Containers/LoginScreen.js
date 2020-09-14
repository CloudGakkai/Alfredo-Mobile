import React, {useState} from 'react'
import {
  Platform,
  SafeAreaView,
  KeyboardAvoidingView,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  TextInput,
  StatusBar,
  View,
  Text
} from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import { connect } from 'react-redux'
import { Formik } from 'formik'
import * as Yup from 'yup'
import ArrowBack from '../Components/ArrowBack'
import AuthActions from '../Redux/AuthRedux'

import styles from './Styles/LoginScreenStyle'
import HeaderStyle from '../Navigation/Styles/NavigationStyles'
import { apply } from '../Lib/OsmiProvider'

const OS = Platform.OS

const LoginScreen = (props) => {
  const [isSecure, setIsSecure] = useState(true)

  const event = props.navigation.getParam('event', null)

  const Scheme = Yup.object().shape({
    email: Yup.string()
            .email("Your email isn't valid")
            .required("*required"),
    password: Yup.string()
            .min(6, "Password must contain at least 6 characters")
            .required("*required")
  })

  const handleSubmit = (values, actions) => {
    actions.setSubmitting(false)

    props.doLogin({
      email: values.email,
      password: values.password,
      event
    })

    return false
  }

  const renderForm = formProps => {
    return (
      <KeyboardAvoidingView>
        <View style={styles.inputView}>
          <View style={styles.inputForm}>
            <Icon name="mail" size={20} />
            <TextInput
              placeholder="Email"
              onChangeText={(value) => formProps.setFieldValue('email', value)}
              value={formProps.values.email}
              style={styles.inputText}
              autoCapitalize="none"
              keyboardType="email-address"
              autoCompleteType="off"
            />
          </View>
          <Text style={styles.error}>{formProps?.errors?.email}</Text>
          <View style={styles.inputForm}>
            <Icon name="lock" size={20} />
            <TextInput
              placeholder="Password"
              onChangeText={(value) => formProps.setFieldValue('password', value)}
              secureTextEntry={isSecure}
              value={formProps.values.password}
              style={styles.inputText}
            />
            {isSecure ? (
              <TouchableOpacity onPress={() => setIsSecure(false)}>
                <Icon name="eye" size={20} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => setIsSecure(true)}>
                <Icon name="eye-off" size={20} />
              </TouchableOpacity>
            )}
          </View>
          <Text style={styles.error}>{formProps?.errors?.password}</Text>
          <TouchableOpacity
          style={[styles.btnLogin, props?.statusLogin?.fetching && apply('bg-blue-400')]}
          activeOpacity={0.9}
          onPress={(e) => {formProps.handleSubmit(e)}}
          disabled={props?.statusLogin?.fetching ?? false}>
            {props?.statusLogin?.fetching ? (
              <View style={apply('flex items-center justify-center')}>
                <ActivityIndicator color="#fff" />
              </View>
            ) : (
              <Text style={styles.btnLoginText}>Login</Text>
            )}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={apply("blue-500")} barStyle='light-content' />
      <ScrollView contentContainerStyle={apply('p-5')}>
        <Text style={styles.hello}>Welcome back</Text>
        <Text style={styles.caption}>Login to your account</Text>
        <Formik
          onSubmit={handleSubmit}
          validationSchema={Scheme}
          validateOnChange={false}
          initialValues={{ email: '', password: '' }}
        >
          {formProps => renderForm(formProps)}
        </Formik>
        <Text style={apply("self-center")}>Don't have an account?</Text>
        <TouchableOpacity style={styles.btnRegister} activeOpacity={0.9} onPress={() => {props.navigation.goBack(), props.navigation.navigate('RegisterScreen', { event })}}>
          <Text style={styles.btnRegisterText}>Register</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  )
}

const mapStateToProps = (state) => {
  return {
    statusLogin: state.auth.doLogin
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    doLogin: (value) => dispatch(AuthActions.doLoginRequest(value))
  }
}

LoginScreen.navigationOptions = ({ navigation }) => {
  const { params = {} } = navigation.state

  return {
    headerStyle: HeaderStyle.default,
    headerTitle: 'Login',
    headerLeft: () => <ArrowBack />,
    headerRight: () => <View />,
    headerTitleContainerStyle: {left: OS === 'ios' ? 0 : 55}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
