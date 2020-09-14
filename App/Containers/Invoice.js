import React, {useState, useEffect} from 'react'
import {
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  View,
  Text,
  ActivityIndicator,
  Platform,
  StatusBar
} from 'react-native'
import { connect } from 'react-redux'
import ArrowBack from '../Components/ArrowBack'
import Images from '../Themes/Images'
import Collapsible from 'react-native-collapsible'
import Icon from 'react-native-vector-icons/Feather'

import InvoiceActions from '../Redux/InvoiceRedux'

import Format from '../Lib/NumberFormat'

// Styles
import styles from './Styles/InvoiceStyle'
import HeaderStyle from '../Navigation/Styles/NavigationStyles'
import { apply } from '../Lib/OsmiProvider'

const { formatMoney } = new Format ()

const OS = Platform.OS

const Invoice = (props) => {
  const [atm, setAtm] = useState(false)
  const [mbca, setMbca] = useState(true)
  const [ibank, setIbank] = useState(true)

  const { navigation, invoice } = props
  const { data } = invoice

  const inv = navigation.getParam('inv', 'Invoice').toLowerCase()

  useEffect(() => {
    props.showInvoice(inv)
  }, [])

  const status = data?.status.replace('_', ' ')
  const price = formatMoney(data?.total ?? 0)

  const panduan = {
    atm: [
      '1. Masukkan Kartu ATM & PIN',
      '2. Pilih "Transaksi Lainnya"',
      '3. Pilih "Transfer"',
      '4. Pilih "Ke Rek Bank Lain"',
      '5. Masukkan kode bank 014',
      '6. Masukkan nomor rekening tujuan 80770822619',
      '7. Masukkan jumlah transfer Rp' + price,
      '8. Baca kembali detail pembayaran dan konfirmasi transaksi'
    ],
    mbca: [
      '1. Log in pada aplikasi BCA Mobile',
      '2. Pilih menu m-BCA, kemudian masukkan kode akses m-BCA',
      '3. Pilih "m-Transfer" kemudian "Daftar Transfer - Antar Rekening"',
      '4. Masukkan nomor rekening 80770822619',
      '5. Klik "Send" dan masukkan PIN untuk mendaftarkan nomor rekening tujuan anda',
      '6. Pilih "Transfer - Antar Rekening"',
      '7. Pilih nomor rekening tujuan',
      '8. Masukkan jumlah uang Rp' + price,
      '9. Klik "Send" dan masukkan PIN'
    ],
    ibank: [
      '1. Login ke website Mandiri Online dengan memasukkan user ID dan PIN',
      '2. Pilih menu "Transfer"',
      '3. Lalu pilih "Ke Bank Lain"',
      '4. Masukkan kode bank 014',
      '5. Masukkan rekening tujuan 80770822619',
      '6. Masukkan jumlah transfer Rp' + price,
      '7. Klik Lanjut',
      '8. Periksa kembali transaksi, kemudian klik Kirim'
    ]
  }

  const atmClick = () => {
    if(!atm) {
      setAtm(true)
    } else {
      setAtm(false)
      setMbca(true)
      setIbank(true)
    }
  }

  const mbcaClick = () => {
    if(!mbca) {
      setMbca(true)
    } else {
      setAtm(true)
      setMbca(false)
      setIbank(true)
    }
  }

  const ibankClick = () => {
    if(!ibank) {
      setIbank(true)
    } else {
      setAtm(true)
      setMbca(true)
      setIbank(false)
    }
  }

  if(invoice?.fetching){
    return (
      <SafeAreaView style={styles.emptyState}>
        <StatusBar backgroundColor={apply("blue-500")} barStyle='light-content' />
        <ActivityIndicator size="large" color="#000" />
      </SafeAreaView>
    )
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor={apply("blue-500")} barStyle='light-content' />
        <ScrollView showsVerticalScrollIndicator={false} style={apply("py-3")}>
          <View style={styles.secA}>
            <Text style={styles.price}>Rp{price}</Text>
            <Text style={status == 'done' ? [styles.status, apply('bg-green-500')] : styles.status}>{status.toUpperCase()}</Text>
            {status == 'done' ? <View /> : <Text style={styles.alert}><Text style={apply("text-red-500")}>*</Text>Pastikan jumlah nominal yang ditransfer sama seperti yang tercantum di atas.</Text>}
          </View>
          {status == 'done' ? <View /> :
            <View>
              <View style={styles.pay}>
                <Text>Transfer Pembayaran ke:</Text>
                <Image source={Images.bca} resizeMode="cover" />
                <Text style={styles.rekening}>1234567890 (CloudGakkai)</Text>
              </View>
              <View style={styles.panduanBox}>
                <Text style={styles.panduanTitle}>Petunjuk Pembayaran</Text>
                <View style={styles.panduan}>
                  <TouchableOpacity style={styles.collapse} onPress={() => atmClick()}>
                    <View style={styles.panduanLabelParent}>
                      <Text style={styles.panduanLabel}>Melalui ATM</Text>
                      <Icon color={apply("gray-500")} style={apply("flex-end")} name={atm ? "chevron-right" : "chevron-down"} size={20} />
                    </View>
                    <Collapsible style={apply("pt-2")} collapsed={atm}>
                      {panduan.atm.map((item, index) => (
                        <Text key={index}>{item}</Text>
                      ))}
                    </Collapsible>
                  </TouchableOpacity>
                </View>
                <View style={styles.panduan}>
                  <TouchableOpacity style={styles.collapse} onPress={() => mbcaClick()}>
                    <View style={styles.panduanLabelParent}>
                      <Text style={styles.panduanLabel}>m-BCA (BCA Mobile)</Text>
                      <Icon color={apply("gray-500")} style={apply("flex-end")} name={mbca ? "chevron-right" : "chevron-down"} size={20} />
                    </View>
                    <Collapsible style={apply("pt-2")} collapsed={mbca}>
                      {panduan.mbca.map((item, index) => (
                        <Text key={index}>{item}</Text>
                      ))}
                    </Collapsible>
                  </TouchableOpacity>
                </View>
                <View style={styles.panduan}>
                  <TouchableOpacity style={styles.collapse} onPress={() => ibankClick()}>
                    <View style={styles.panduanLabelParent}>
                      <Text style={styles.panduanLabel}>Internet Banking</Text>
                      <Icon color={apply("gray-500")} style={apply("flex-end")} name={ibank ? "chevron-right" : "chevron-down"} size={20} />
                    </View>
                    <Collapsible style={apply("pt-2")} collapsed={ibank}>
                      {panduan.ibank.map((item, index) => (
                        <Text key={index}>{item}</Text>
                      ))}
                    </Collapsible>
                  </TouchableOpacity>
                </View>
              </View>
              <TouchableOpacity style={styles.btnConfirm} onPress={() => navigation.navigate('ConfirmPayment', { price: data?.total, inv: inv.toUpperCase() })} activeOpacity={0.9}>
                <Text style={styles.btnConfirmText}>Confirm Payment</Text>
              </TouchableOpacity>
            </View>
          }
        </ScrollView>
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
