import React, { useState, useEffect } from 'react'
import {
  SafeAreaView,
  ActivityIndicator,
  TouchableOpacity,
  RefreshControl,
  FlatList,
  Image,
  View,
  Text
} from 'react-native'
import { connect } from "react-redux";
import ProductsActions from "../Redux/ProductsRedux";
import CardProduct from '../Components/CardProduct'

import styles from './Styles/HomeStyle'
import HeaderStyle from "../Navigation/Styles/NavigationStyles";
import { apply } from '../Lib/OsmiProvider'

const Home = props => {
  const { products, navigation } = props
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    props.getProductsList({ params: '?page=1' })
  }, [])

  const pullRefresh = () => {
    props.getProductsList({ params: '?page=1' })
  }

  const renderItem = ({ item, index }) => (
    <CardProduct
      item={item}
      onPress={() => onPress(item)}
    />
  )

  const onEndReached = async() => {
    const { page, lastPage, isLoadMore } = props.products

    if (!isLoadMore && (page < lastPage)) {
      const newPage = page + 1

      props.moreProducts({ params: `?page=${newPage}`, page: newPage })
    }
  }

  const onPress = (item) => {
    props.getDetail('/' + item?.slug)
    navigation.navigate('ProductDetail', {title: item.title, stock: item.stock})
  }

  return (
    <SafeAreaView style={apply('flex bg-gray-100')}>
      {products?.fetching ? (
        <View style={styles.emptyState}>
          <ActivityIndicator size="large" color={apply('gray-900')} />
        </View>
      ) : (
        <FlatList
          data={products.data}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          initialNumToRender={8}
          contentContainerStyle={apply('bg-gray-100 py-2')}
          renderItem={renderItem}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={() => pullRefresh()} />
          }
          onEndReached={onEndReached}
          horizontal={false}
          numColumns={2}
          key={2}
          onEndReachedThreshold={0.1}
          ListEmptyComponent={() =>
            <View style={styles.emptyState}>
              <Text>No data.</Text>
            </View>
          }
          ListFooterComponent={() =>
            products?.isLoadMore && (
              <View style={styles.emptyState}>
                <ActivityIndicator size="large" color={apply("gray-900")} />
              </View>
            )
          }
        />
      )}
    </SafeAreaView>
  )
}

const mapStateToProps = (state) => ({
  products: state.products.list,
  detail: state.products.detail
})

const mapDispatchToProps = (dispatch) => ({
  getProductsList: value => dispatch(ProductsActions.getProductsRequest(value)),
  moreProducts: value => dispatch(ProductsActions.moreProductsRequest(value)),
  getDetail: value => dispatch(ProductsActions.getDetailRequest(value))
})

Home.navigationOptions = ({ navigation }) => {
  const { params = {} } = navigation.state

  return {
    headerStyle: HeaderStyle.default,
    headerTitle: 'Home'
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
