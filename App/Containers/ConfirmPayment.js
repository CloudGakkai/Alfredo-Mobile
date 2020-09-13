import React from 'react'
import { SafeAreaView, ScrollView, View, TextInput, Text, KeyboardAvoidingView, TouchableOpacity, Platform, PermissionAndroid } from 'react-native'
import { connect } from 'react-redux'
import ArrowBack from '../Components/ArrowBack'
import CameraRoll from '@react-native-community/cameraroll'
import ImagePicker from 'react-native-image-crop-picker'

import { Formik } from 'formik'
import * as Yup from 'yup'

import Format from '../Lib/NumberFormat'

// Styles
import styles from './Styles/ConfirmPaymentStyle'
import HeaderStyle from '../Navigation/Styles/NavigationStyles'
import { apply } from '../Lib/OsmiProvider'

const OS = Platform.OS
const { formatMoney } = new Format()

const ConfirmPayment = (props) => {
  const inv = props.navigation.getParam('inv', 'Invoice')
  const price = formatMoney(props.navigation.getParam('price', 0))

  const Scheme = Yup.object().shape({
    nominal: Yup.string()
              .required("*required"),
    nama: Yup.string()
              .required("*required"),
    rekening: Yup.string()
               .required("*required"),
    invoice: Yup.string()
              .required("*required"),
  })

  /*
  async function hasAndroidPermission() {
    const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;
  
    const hasPermission = await PermissionsAndroid.check(permission);
    if (hasPermission) {
      return true;
    }
  
    const status = await PermissionsAndroid.request(permission);
    return status === 'granted';
  }
  
  async function savePicture() {
    if (Platform.OS === "android" && !(await hasAndroidPermission())) {
      return;
    }
  
    CameraRoll.saveToCameraRoll(tag, [type]);
  };
  */

  const handleSubmit = (values, actions) => {
    actions.setSubmitting(false)
    return false
  }

  const renderForm = formProps => {
    return (
      <KeyboardAvoidingView>
        <View style={styles.inputView}>
          <Text style={styles.label}>Nominal:</Text>
          <View style={styles.inputForm}>
            <Text>Rp</Text>
            <TextInput 
              placeholder="100.000"
              onChangeText={(value) => formProps.setFieldValue('nominal', formatMoney(value))}
              value={formProps.values.nominal}
              style={styles.inputText}
              autoCapitalize="none"
              keyboardType="numeric"
              autoCompleteType="off"
            />
          </View>
          <Text style={styles.error}>{formProps?.error?.nominal}</Text>
          
          <Text style={styles.label}>Nama Pengirim:</Text>
          <View style={styles.inputForm}>
            <TextInput 
              placeholder="John Doe"
              onChangeText={(value) => formProps.setFieldValue('nama', value)}
              value={formProps.values.nama}
              style={styles.inputText}
              autoCapitalize="words"
              keyboardType="default"
              autoCompleteType="name"
            />
          </View>
          <Text style={styles.error}>{formProps?.error?.nama}</Text>
          
          <Text style={styles.label}>No. Rekening Pengirim:</Text>
          <View style={styles.inputForm}>
            <TextInput 
              placeholder="123456789"
              onChangeText={(value) => formProps.setFieldValue('rekening', value)}
              value={formProps.values.rekening}
              style={styles.inputText}
              autoCapitalize="none"
              keyboardType="numeric"
              autoCompleteType="off"
            />
          </View>
          <Text style={styles.error}>{formProps?.error?.rekening}</Text>
          
          <Text style={styles.label}>Invoice ID:</Text>
          <View style={styles.inputForm}>
            <Text>#</Text>
            <TextInput 
              placeholder="INV-1234567"
              onChangeText={(value) => formProps.setFieldValue('invoice', value)}
              value={formProps.values.invoice}
              style={styles.inputText}
              autoCapitalize="none"
              keyboardType="default"
              autoCompleteType="off"
            />
          </View>
          <Text style={styles.error}>{formProps?.error?.invoice}</Text>

          <TouchableOpacity style={styles.btnConfirm} activeOpacity={0.9} onPress={(e) => {formProps.handleSubmit(e)}}>
            <Text style={styles.btnConfirmText}>Confirm Payment</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={apply('p-5')}>
        <Formik
          onSubmit={handleSubmit}
          validationSchema={Scheme}
          validateOnChange={false}
          initialValues={{ nominal: price.toString(), nama: '', rekening: '', invoice: inv }}
        >
          {formProps => renderForm(formProps)}
        </Formik>
      </ScrollView>
    </SafeAreaView>
  )
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = (dispatch) => ({
  
})

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
