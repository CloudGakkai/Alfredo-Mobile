import React from 'react'
import { SafeAreaView, ActivityIndicator, ScrollView, Image, View, Text } from 'react-native'
import { connect } from 'react-redux'
import ArrowBack from '../Components/ArrowBack'

import styles from './Styles/ProductDetailStyle'
import HeaderStyle from '../Navigation/Styles/NavigationStyles'
import { apply } from '../Lib/OsmiProvider'

const ProductDetail = props => {
  const { detail } = props
  const { data } = detail

  return (
    <SafeAreaView style={{flex:1}}>
      {detail?.fetching ? (
        <View style={styles.loading}>
          <ActivityIndicator size={large} color={apply('gray-900')} />
        </View>
      ) : (
        <View style={styles.container}>
          <Image style={styles.thumb} source={{ uri: data.thumbnail }} />
          <Text style={styles.price}>{data.price}</Text>
          <Text style={styles.title}>{data.title}</Text>
          <Text style={styles.stock}>{data.stock}</Text>
          <Text style={styles.desc}>{data.desc}</Text>
        </View>
      )}
    </SafeAreaView>
  )
}

const mapStateToProps = (state) => ({
  detail: state.products.list
})

const mapDispatchToProps = (dispatch) => ({

})

ProductDetail.navigationOptions = ({ navigation }) => {
  const { params = {} } = navigation.state

  return {
    headerStyle: HeaderStyle.default,
    headerTitle: 'Product Detail',
    headerLeft: () => <ArrowBack />
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail)
