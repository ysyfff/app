import React, {Component} from 'react'
import {View, TextInput, Text, StyleSheet, Dimensions} from 'react-native'

export default class Dlg extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }
  render() {
    return (
      <View style={style.dlgWrapper}>
        {this.props.children}
      </View>
    )
  }
}
const {width: WIDTH, height: HEIGHT} = Dimensions.get('window');
const style = StyleSheet.create({
  dlgWrapper: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    width: WIDTH,
    height: HEIGHT,
    zIndex: 1000,
    backgroundColor: 'rgba(0,0,0,.2)'
  }
})
