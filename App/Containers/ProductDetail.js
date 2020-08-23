import React from 'react'
import { ScrollView, Text } from 'react-native'
import { connect } from 'react-redux'
import styles from './Styles/ProductDetailStyle'

const ProductDetail = () => {
  return (
    <ScrollView style={styles.container}>
      <Text>ProductDetail Container</Text>
    </ScrollView>
  )
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail)
