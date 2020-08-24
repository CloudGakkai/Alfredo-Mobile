import React, { memo, useContext } from 'react'
import { TouchableOpacity,Image, View, Text } from 'react-native'
import styles from './Styles/CardProduct'
import { NavigationContext } from "react-navigation"
import Format from '../Lib/NumberFormat'

const CardProduct = (props) => {
  const {item, ...restProps} = props
  const navigation = useContext(NavigationContext)
  const { thumbnail, title, price } = item

  return (
    <TouchableOpacity activeOpacity={0.9} style={styles.card} {...restProps}>
      <Image source={{ uri: thumbnail }} style={styles.thumb} resizeMode="cover" />
      <View style={styles.content}>
        <Text style={styles.title}>{item?.title}</Text>
        <Text style={styles.price}>{'Rp' + new Format().formatMoney(item?.price ?? 0)}</Text>
        <TouchableOpacity activeOpacity={0.9} style={styles.btnBuy}>
          <Text style={styles.btnBuyLabel}>Detail</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  )
}

export default memo(CardProduct)
