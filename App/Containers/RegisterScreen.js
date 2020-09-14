import React, {useState} from 'react'
import {
  KeyboardAvoidingView,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  TextInput,
  Platform,
  StatusBar,
  ActivityIndicator,
  View,
  Text } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import CheckBox from '@react-native-community/checkbox'
import { connect } from 'react-redux'
import AuthActions from '../Redux/AuthRedux'

import { Formik } from 'formik'
import * as Yup from 'yup'
import ArrowBack from '../Components/ArrowBack'

// Styles
import styles from './Styles/RegisterScreenStyle'
import HeaderStyle from '../Navigation/Styles/NavigationStyles'
import { apply } from '../Lib/OsmiProvider'

const OS = Platform.OS

const RegisterScreen = (props) => {
  const [isSecure1, setIsSecure1] = useState(true)
  const [isSecure2, setIsSecure2] = useState(true)

  const event = props.navigation.getParam('event', null)

  const Scheme = Yup.object().shape({
    fullName: Yup.string()
            .required("*required"),
    username: Yup.string()
            .min(6, "Username must contain at least 6 characters")
            .required("*required"),
    phone: Yup.string()
            .required("*required"),
    email: Yup.string()
            .email("Your email isn't valid")
            .required("*required"),
    password: Yup.string()
            .min(6, "Password must contain at least 6 characters")
            .oneOf([Yup.ref('confirm')], "Password doesn't match")
            .required("*required"),
    confirm: Yup.string()
            .min(6, "Password must contain at least 6 characters")
            .oneOf([Yup.ref('password')], "Password doesn't match")
            .required("*required"),
    check: Yup.boolean()
            .oneOf([true], "You must agree to Terms & Conditions")
  })

  const handleSubmit = (values, actions) => {
    actions.setSubmitting(false)

    props.doRegister({
      name: values.fullName,
      username: values.username,
      phone_number: values.phone,
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
            <Icon name="user" size={20} />
            <TextInput
              placeholder="Full Name"
              onChangeText={(value) => formProps.setFieldValue('fullName', value)}
              value={formProps.values.fullName}
              style={styles.inputText}
              autoCapitalize="words"
              autoCompleteType="off"
            />
          </View>
          <Text style={styles.error}>{formProps?.errors?.fullName}</Text>
          <View style={styles.inputForm}>
            <Icon name="user" size={20} />
            <TextInput
              placeholder="Username"
              onChangeText={(value) => formProps.setFieldValue('username', value)}
              value={formProps.values.username}
              style={styles.inputText}
              autoCapitalize="none"
              autoCompleteType="off"
            />
          </View>
          <Text style={styles.error}>{formProps?.errors?.username}</Text>
          <View style={styles.inputForm}>
            <Icon name="phone" size={20} />
            <TextInput
              placeholder="Phone Number"
              onChangeText={(value) => formProps.setFieldValue('phone', value)}
              value={formProps.values.phone}
              style={styles.inputText}
              keyboardType="phone-pad"
              autoCapitalize="none"
              autoCompleteType="off"
            />
          </View>
          <Text style={styles.error}>{formProps?.errors?.phone}</Text>
          <View style={styles.inputForm}>
            <Icon name="mail" size={20} />
            <TextInput
              placeholder="Email"
              onChangeText={(value) => formProps.setFieldValue('email', value)}
              value={formProps.values.email}
              style={styles.inputText}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCompleteType="off"
            />
          </View>
          <Text style={styles.error}>{formProps?.errors?.email}</Text>
          <View style={styles.inputForm}>
            <Icon name="lock" size={20} />
            <TextInput
              placeholder="Password"
              onChangeText={(value) => formProps.setFieldValue('password', value)}
              secureTextEntry={isSecure1}
              value={formProps.values.password}
              style={styles.inputText}
            />
            {isSecure1 ? (
              <TouchableOpacity onPress={() => setIsSecure1(false)}>
                <Icon name="eye" size={20} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => setIsSecure1(true)}>
                <Icon name="eye-off" size={20} />
              </TouchableOpacity>
            )}
          </View>
          <Text style={styles.error}>{formProps?.errors?.password}</Text>
          <View style={styles.inputForm}>
            <Icon name="lock" size={20} />
            <TextInput
              placeholder="Confirm Password"
              onChangeText={(value) => formProps.setFieldValue('confirm', value)}
              secureTextEntry={isSecure2}
              value={formProps.values.confirm}
              style={styles.inputText}
            />
            {isSecure2 ? (
              <TouchableOpacity onPress={() => setIsSecure2(false)}>
                <Icon name="eye" size={20} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => setIsSecure2(true)}>
                <Icon name="eye-off" size={20} />
              </TouchableOpacity>
            )}
          </View>
          <Text style={styles.error}>{formProps?.errors?.confirm}</Text>
          <View style={styles.check}>
            <CheckBox
              value={formProps.values.check}
              onValueChange={(newValue) => formProps.setFieldValue('check', newValue)}
              tintColor={apply('blue-500')}
            />
            <Text style={styles.textAgreement}>I agree to Terms & Conditions</Text>
          </View>
          <Text style={styles.error}>{formProps?.errors?.check}</Text>
          <TouchableOpacity
          style={[styles.btnRegister, props?.statusRegister?.fetching && apply('bg-blue-400')]}
          activeOpacity={0.9}
          onPress={(e) => {formProps.handleSubmit(e)}}
          disabled={props?.statusRegister?.fetching ?? false}>
            {props?.statusRegister?.fetching ? (
              <View style={apply('flex items-center justify-center')}>
                <ActivityIndicator color="#fff" />
              </View>
            ) : (
              <Text style={styles.btnRegisterText}>Register</Text>
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
        <Text style={styles.hello}>Hello</Text>
        <Text style={styles.caption}>Create new account</Text>
        <Formik
          onSubmit={handleSubmit}
          validationSchema={Scheme}
          validateOnChange={false}
          initialValues={{
            fullName: '',
            username: '',
            phone: '',
            email: '',
            password: '',
            confirm: '',
            check: false
          }}
        >
          {formProps => renderForm(formProps)}
        </Formik>
        <Text style={apply("text-base self-center")}>Have an account?</Text>
        <TouchableOpacity style={styles.btnLogin} activeOpacity={0.9} onPress={() => {props.navigation.goBack(), props.navigation.navigate('LoginScreen', { event })}}>
          <Text style={styles.btnLoginText}>Login</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  )
}

const mapStateToProps = (state) => {
  return {
    statusRegister: state.auth.doRegister
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    doRegister: (value) => dispatch(AuthActions.doRegisterRequest(value))
  }
}

RegisterScreen.navigationOptions = ({ navigation }) => {
  const { params = {} } = navigation.state

  return {
    headerStyle: HeaderStyle.default,
    headerTitle: 'Register',
    headerLeft: () => <ArrowBack />,
    headerRight: () => <View />,
    headerTitleContainerStyle: {left: OS === 'ios' ? 0 : 55}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreen)
