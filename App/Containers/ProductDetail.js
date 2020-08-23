import React from 'react'
import { SafeAreaView, ScrollView, View, Text } from 'react-native'
import { connect } from 'react-redux'
import ArrowBack from '../Components/ArrowBack'

import styles from './Styles/ProductDetailStyle'
import HeaderStyle from '../Navigation/Styles/NavigationStyles'

const ProductDetail = props => {
  return (
    <SafeAreaView style={{flex:1}}>
      <View>
        <Text>Hello World!</Text>
      </View>
    </SafeAreaView>
  )
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

ProductDetail.navigationOptions = ({ navigation }) => {
  const { params = {} } = navigation.state

  return {
    headerStyle: HeaderStyle.default,
    headerTitle: 'Product Detail',
    headerLeft: () => <ArrowBack />
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail)
