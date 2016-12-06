//管理Form的子元素


import React, {Component} from 'react'
import {View, Text, TextInput, StyleSheet} from 'react-native'



export default class Form extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        debugger
        return (
            <View style={this.props.style}>
                {this.props.children}
            </View>
        )
    }
}

const style = StyleSheet.create({
    error: {
        position: 'absolute',
        bottom: -3,
        paddingLeft:4,
        paddingRight:4,
        borderWidth: 1,
        borderColor: 'rgba(255,0,0,.5)',
        backgroundColor: 'rgba(255,0,0,.5)',
    }
})
