import { View, Text ,TextInput , StyleSheet } from 'react-native'
import React from 'react'


const CustomInput = ({value , setValue , placeholder , secureTextEntry}) => {
  return (
    <View  style={Styles.container}>
<TextInput  placeholder={placeholder}  secureTextEntry={secureTextEntry} onChangeText={setValue}   style={Styles.input}  value={value} />
    </View>
  )
}
const Styles = StyleSheet.create({
    container:{
        backgroundColor:"#fff",
        width:"100%",
        borderWidth:1,
        borderColor:"#e8e8e8",
        borderRadius:5,
        padding:10,
        marginVertical:10
    },
    input:{}
})
export default CustomInput;