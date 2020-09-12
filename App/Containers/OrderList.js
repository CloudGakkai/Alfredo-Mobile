import React, {useEffect, useState} from 'react'
import { SafeAreaView, FlatList, View, TouchableOpacity, RefreshControl, Text, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import ArrowBack from '../Components/ArrowBack'

import InvoiceActions from '../Redux/InvoiceRedux'

import Format from '../Lib/NumberFormat'

// Styles
import { apply } from '../Lib/OsmiProvider'
import styles from './Styles/OrderListStyle'
import HeaderStyle from '../Navigation/Styles/NavigationStyles'

const { formatMoney } = new Format()

const OS = Platform.OS

const OrderList = (props) => {
  const [refreshing, setRefreshing] = useState(false)
  const { list, navigation } = props

  useEffect(() => {
    props.getInvoice({params: 1})
  }, [])

  const renderItem = ({item, index}) => {
    const status = item?.status.replace('_', ' ')
    return (
      <TouchableOpacity style={styles.list} activeOpacity={0.9}>
        <Text style={apply('flex-4 p-1')}>{item?.invoice_id}</Text>
        <Text style={apply('flex-3 p-1')}>Rp{formatMoney(item?.total)}</Text>
        <Text style={apply('flex-5 p-1 text-center')}>{status.toUpperCase()}</Text>
      </TouchableOpacity>
    )
  }

  const pullRefresh = () => {
    props.getInvoice({params: 1})
  }

  const onEndReached = () => {
    const { page, lastPage, isLoadMore } = props.list

    if(!isLoadMore && (page < lastPage)) {
      const newPage = page+1

      props.moreInvoice({params: newPage, page: newPage})
    }
  }

  return (
    <SafeAreaView style={apply('bg-white py-3')}>
      <FlatList 
        data={list.data}
        keyExtractor={(item, index) => index.toString()}
        initialNumToRender={10}
        contentContainerStyle={apply('bg-gray-200 mx-2')}
        renderItem={renderItem}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={() => pullRefresh()} />
        }
        onEndReached={onEndReached}
        onEndReachedThreshold={0.1}
        ListEmptyComponent={() =>
          <View style={styles.emptyState}>
            <Text style={apply('text-center')}>No data</Text>
          </View>
        }
        ListHeaderComponent={() =>
          <View style={[styles.list, apply('bg-gray-500')]}>
            <Text style={apply('flex-4 p-1 font-bold text-base')}>INVOICE</Text>
            <Text style={apply('flex-3 p-1 font-bold text-base')}>PRICE</Text>
            <Text style={apply('flex-5 p-1 font-bold text-base text-center')}>STATUS</Text>
          </View>
        }
        ListFooterComponent={() =>
          list?.isLoadMore && (
            <View style={styles.emptyState}>
              <ActivityIndicator size="large" style={apply('gray-900')} />
            </View>
          )
        }
      />
    </SafeAreaView>
  )
}

const mapStateToProps = (state) => ({
  list: state.invoice.list
})

const mapDispatchToProps = (dispatch) => ({
  getInvoice: (value) => dispatch(InvoiceActions.getInvoiceRequest(value)),
  moreInvoice: (value) => dispatch(InvoiceActions.moreInvoiceRequest(value))
})

OrderList.navigationOptions = ({ navigation }) => {
  const { params = {} } = navigation.state

  return {
    headerStyle: HeaderStyle.default,
    headerTitle: navigation.getParam('title', 'Order List'),
    headerLeft: () => <ArrowBack />,
    headerRight: () => <View />,
    headerTitleContainerStyle: {left: OS === 'ios' ? 0 : 55}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderList)
