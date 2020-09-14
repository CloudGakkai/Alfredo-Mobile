import React, { useState } from 'react'
import {
  KeyboardAvoidingView,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  TextInput,
  StatusBar,
  Platform,
  Image,
  Modal,
  View,
  Text,
} from 'react-native'
import { connect } from 'react-redux'
import ConfirmPaymentActions from '../Redux/ConfirmPaymentRedux'
import ArrowBack from '../Components/ArrowBack'
import ImagePicker from 'react-native-image-crop-picker'
import Icon from 'react-native-vector-icons/Feather'

import { Formik } from 'formik'
import * as Yup from 'yup'

import Format from '../Lib/NumberFormat'

// Styles
import styles from './Styles/ConfirmPaymentStyle'
import HeaderStyle from '../Navigation/Styles/NavigationStyles'
import { apply } from '../Lib/OsmiProvider'

const OS = Platform.OS
const { formatMoney, moneytoInt } = new Format()

const ConfirmPayment = props => {
  const [showModal, setShowModal] = useState(false)

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
    image: Yup.object()
              .required("*required")
  })

  const handleSubmit = (values, actions) => {
    actions.setSubmitting(false)

    const dataToSend = new FormData()
    dataToSend.append("proof[proof]", {
      uri: values?.image?.image?.path,
      type: "image/jpeg",
      name: values?.image?.image?.path?.match(/[-_\w]+[.][\w]+$/i)[0]
    })
    dataToSend.append("amount", moneytoInt(values.nominal))
    dataToSend.append("sender_name", values.nama)
    dataToSend.append("sender_bank", values.rekening)
    dataToSend.append("invoice_id", values.invoice)

    props.doConfirm(dataToSend)

    return false
  }

  const handleGallery = formProps => {
    setShowModal(false)
    ImagePicker.openPicker({
      includeExif: true,
      includeBase64: true,
    }).then(image => {
      const uri = { uri: `data:${image.mime};base64,` + image.data, width: image.width, height: image.height }
      const img = {
        uri: uri,
        image: image
      }
      formProps.setFieldValue("image", img)
    });
  }

  const handleCamera = formProps => {
    setShowModal(false)
    ImagePicker.openCamera({
      includeExif: true,
      includeBase64: true,
    }).then(image => {
      const uri = { uri: `data:${image.mime};base64,` + image.data, width: image.width, height: image.height }
      const img = {
        uri: uri,
        image: image
      }
      formProps.setFieldValue("image", img)
    });
  }

  const renderModal = formProps => (
    <Modal
    transparent={true}
    visible={showModal}
    onRequestClose={() => setShowModal(false)}>
      <TouchableOpacity activeOpacity={1} style={styles.backDrop} onPress={() => setShowModal(false)}>
        <View style={styles.modalUpload}>
          <Text style={styles.modalTitle}>Select From</Text>

          <View style={styles.optionGroup}>
            <TouchableOpacity activeOpacity={1} style={[styles.optionColumn, apply("mr-8")]} onPress={() => handleCamera(formProps)}>
              <Icon name='camera' size={70} color={apply("gray-800")} />
              <Text style={styles.optionLabel}>Camera</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={1} style={[styles.optionColumn, apply("ml-8")]} onPress={() => handleGallery(formProps)}>
              <Icon name='image' size={70} color={apply("gray-800")} />
              <Text style={styles.optionLabel}>Gallery</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  )

  const renderForm = formProps => {
    return (
      <KeyboardAvoidingView>
        {renderModal(formProps)}

        <View style={styles.inputView}>
          <Text style={styles.label}>Invoice ID:</Text>
          <View style={styles.inputForm}>
            <Text>#</Text>
            <TextInput
              placeholder="INV-XXXXX"
              onChangeText={(value) => formProps.setFieldValue('invoice', value)}
              value={formProps.values.invoice}
              style={styles.inputText}
              autoCapitalize="none"
              keyboardType="default"
              autoCompleteType="off"
            />
          </View>
          <Text style={styles.error}>{formProps?.errors?.invoice}</Text>

          <Text style={styles.label}>Nominal:</Text>
          <View style={styles.inputForm}>
            <Text>Rp</Text>
            <TextInput
              placeholder="0"
              onChangeText={(value) => formProps.setFieldValue('nominal', formatMoney(value))}
              value={formProps.values.nominal}
              style={styles.inputText}
              autoCapitalize="none"
              keyboardType="numeric"
              autoCompleteType="off"
            />
          </View>
          <Text style={styles.error}>{formProps?.errors?.nominal}</Text>

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
          <Text style={styles.error}>{formProps?.errors?.nama}</Text>

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
          <Text style={styles.error}>{formProps?.errors?.rekening}</Text>

          <Text style={styles.label}>Payment Proof:</Text>
          {formProps.values.image ? (
            <View style={apply("flex flex-wrap bg-red-800")}>
              <TouchableOpacity activeOpacity={1} style={styles.deleteImage} onPress={() => formProps.setFieldValue("image", null)}>
                <Icon name="x" size={25} color={apply("white")} />
              </TouchableOpacity>

              <Image
                source={formProps.values.image?.uri ? formProps.values.image.uri : {uri: formProps.values.image}}
                style={styles.previewImage}
                resizeMode='cover'
              />
            </View>
          ) : (
            <TouchableOpacity activeOpacity={0.9} style={styles.btnUpload} onPress={() => setShowModal(true)}>
              <Text style={styles.btnUploadLabel}>Upload File</Text>
              <Icon name='upload' size={20} />
            </TouchableOpacity>
          )}
          <Text style={styles.error}>{formProps?.errors?.image}</Text>

          {props?.confirmPayment?.fetching ? (
            <View style={[styles.btnConfirm, apply("bg-blue-300")]}>
              <Text style={styles.btnConfirmText}>Sending...</Text>
            </View>
          ) : (
            <TouchableOpacity style={styles.btnConfirm} activeOpacity={0.2} onPress={(e) => {formProps.handleSubmit(e)}}>
              <Text style={styles.btnConfirmText}>Confirm Payment</Text>
            </TouchableOpacity>
          )}
        </View>
      </KeyboardAvoidingView>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={apply("blue-500")} barStyle='light-content' />
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
  confirmPayment: state.confirm
})

const mapDispatchToProps = (dispatch) => ({
  doConfirm: value => dispatch(ConfirmPaymentActions.confirmPaymentRequest(value))
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
