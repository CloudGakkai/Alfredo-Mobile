import React, {useContext} from 'react'
import { View, TouchableOpacity } from 'react-native'
import Icon from "react-native-vector-icons/Feather"
import {NavigationContext} from "react-navigation";

import { apply } from "../Lib/OsmiProvider";
import styles from './Styles/ArrowBackStyle'

const ArrowBack = (props) => {
  const {...restProps} = props
  const navigation = useContext(NavigationContext)

  return (
    <TouchableOpacity activeOpacity={0.9} style={styles.container} onPress={() => navigation.goBack()}>
      <Icon name="chevron-left" size={35} color={apply('gray-900')} />
    </TouchableOpacity>
  )
}

export default ArrowBack
