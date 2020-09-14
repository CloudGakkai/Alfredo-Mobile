import React, {useEffect, useState} from 'react'
import {
  SafeAreaView,
  FlatList,
  View,
  ActivityIndicator,
  RefreshControl,
  Text,
  Platform,
  StatusBar
} from 'react-native'
import { connect } from 'react-redux'
import CardProduct from '../Components/CardProduct'
import ArrowBack from '../Components/ArrowBack'

import CategoryActions from '../Redux/CategoryRedux'
import ProductsActions from '../Redux/ProductsRedux'

// Styles
import styles from './Styles/CategoryScreenStyle'
import { apply } from '../Lib/OsmiProvider';
import HeaderStyle from '../Navigation/Styles/NavigationStyles'

const OS = Platform.OS

const CategoryScreen = (props) => {
  const [refreshing, setRefreshing] = useState(false)
  const { products, navigation } = props

  const slug = navigation.getParam('slug', '')

  useEffect(() => {
    props.showCategory(slug)
  }, [])

  const pullRefresh = () => {
    props.showCategory(slug)
  }

  const renderItem = ({ item, index }) => (
    <CardProduct
      item={item}
      onPress={() => onPress(item)}
    />
  )

  const onPress = (item) => {
    props.getDetail('/' + item?.slug)
    navigation.navigate('ProductDetail', {title: item.title, stock: item.stock})
  }

  return (
    <SafeAreaView style={apply('flex bg-gray-100')}>
      <StatusBar backgroundColor={apply("blue-500")} barStyle='light-content' />
      {products?.fetching ? (
        <View style={styles.emptyState}>
          <ActivityIndicator size="large" color={apply('gray-900')} />
        </View>
      ) : (
        <FlatList
          data={products?.data[0]?.product}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          initialNumToRender={6}
          contentContainerStyle={apply('bg-gray-100 py-2')}
          renderItem={renderItem}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={() => pullRefresh()} />
          }
          horizontal={false}
          numColumns={2}
          key={2}
          onEndReachedThreshold={0.1}
          ListEmptyComponent={() =>
            <View style={styles.emptyState}>
              <Text>No data.</Text>
            </View>
          }
        />
      )}
    </SafeAreaView>
  )
}

const mapStateToProps = (state) => ({
  products: state.category.category
})

const mapDispatchToProps = (dispatch) => ({
  showCategory: (value) => dispatch(CategoryActions.showCategoryRequest(value)),
  moreCategory: (value) => dispatch(CategoryActions.moreCategoryRequest(value)),
  getDetail: value => dispatch(ProductsActions.getDetailRequest(value))
})

CategoryScreen.navigationOptions = ({ navigation }) => {
  const { params = {} } = navigation.state

  return {
    headerStyle: HeaderStyle.default,
    headerTitle: navigation.getParam('title', 'Category'),
    headerLeft: () => <ArrowBack />,
    headerRight: () => <View />,
    headerTitleContainerStyle: {left: OS === 'ios' ? 0 : 55}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryScreen)
