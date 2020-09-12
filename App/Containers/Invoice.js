import React, {useState, useEffect} from 'react'
import { SafeAreaView, ScrollView, Image, TouchableOpacity, View, Text, ActivityIndicator, Platform } from 'react-native'
import { connect } from 'react-redux'
import ArrowBack from '../Components/ArrowBack'
import Images from '../Themes/Images'

import InvoiceActions from '../Redux/InvoiceRedux'

import Format from '../Lib/NumberFormat'

// Styles
import styles from './Styles/InvoiceStyle'
import HeaderStyle from '../Navigation/Styles/NavigationStyles'
import { apply } from '../Lib/OsmiProvider'

const { formatMoney } = new Format ()

const OS = Platform.OS

const Invoice = (props) => {
  const [atm, setAtm] = useState(true)
  const [mbank, setMbank] = useState(false)
  const [ibank, setIbank] = useState(false)

  const { navigation, invoice } = props
  const { data } = invoice

  const inv = navigation.getParam('inv', 'Invoice').toLowerCase()

  useEffect(() => {
    props.showInvoice(inv)
  }, [])

  console.log(props.invoice)
  
  const status = data?.status.replace('_', ' ')

  if(invoice?.fetching){
    return (
      <SafeAreaView style={styles.emptyState}>
        <ActivityIndicator size="large" color="#000" />
      </SafeAreaView>
    )
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.secA}>
          <Text style={apply('text-4xl text-red-500 font-bold')}>Rp{formatMoney(data?.total)}</Text>
          <Text style={status == 'done' ? [styles.status, apply('bg-green-500')] : styles.status}>{status.toUpperCase()}</Text>
        </View>
        {status == 'done' ? <View /> : 
          <View>
            <Text style={styles.alert}>Pastikan jumlah nominal yang ditransfer sama seperti yang tercantum di atas.</Text>
            <View style={styles.pay}>
              <Text>Transfer Pembayaran ke:</Text>
              <Image source={Images.bca} resizeMode="cover" />
              <Text style={apply('text-base font-bold')}>80770822619 (Edo Rahayu)</Text>
            </View>
            <TouchableOpacity style={styles.confirm} onPress={() => navigation.navigate('ConfirmPayment')} activeOpacity={0.9}>
              <Text style={apply('text-white font-bold text-base')}>Confirm Payment</Text>
            </TouchableOpacity>
          </View>
        }
      </SafeAreaView>
    )
  }
}

const mapStateToProps = (state) => ({
  invoice: state.invoice.show
})

const mapDispatchToProps = (dispatch) => ({
  showInvoice: (value) => dispatch(InvoiceActions.showInvoiceRequest(value))
})
Invoice.navigationOptions = ({ navigation }) => {
  const { params = {} } = navigation.state

  return {
    headerStyle: HeaderStyle.default,
    headerTitle: '#' + navigation.getParam('inv', 'Invoice'),
    headerLeft: () => <ArrowBack />,
    headerRight: () => <View />,
    headerTitleContainerStyle: {left: OS === 'ios' ? 0 : 55}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Invoice)
