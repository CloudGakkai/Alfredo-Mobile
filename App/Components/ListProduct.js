import React, { memo, useContext } from 'react'
import { TouchableOpacity,Image, View, Text } from 'react-native'
import styles from './Styles/ListProductStyle'
import { NavigationContext } from "react-navigation"
import Format from '../Lib/NumberFormat'

const ListProduct = (props) => {
  const {item, ...restProps} = props
  const navigation = useContext(NavigationContext)
  const { thumbnail, title, price } = item

  return (
    <TouchableOpacity activeOpacity={0.9} style={styles.card} {...restProps}>
      <Image source={{ uri: thumbnail }} style={styles.thumb} resizeMode="cover" />
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.price}>{'Rp' + new Format().formatMoney(price)}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default memo(ListProduct)
