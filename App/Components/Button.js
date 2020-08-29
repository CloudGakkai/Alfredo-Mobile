import React from 'react'
import { TouchableOpacity, Text } from 'react-native'

const Button = (props) => {
  const { textStyle, text, ...restProps } = props

  return (
    <TouchableOpacity activeOpacity={0.9} {...restProps}>
      <Text style={textStyle}>{text}</Text>
    </TouchableOpacity>
  )
}

export default Button