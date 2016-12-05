import React from 'react';
import {View, Text, TextInput} from 'react-native'
import {IntervalEnhance} from './IntervalEnhance'

class CartItem extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            msg: '223'
        }
    }
    render() {
        debugger
        return (
            <View>
                <Text>
                    {this.state.msg}
                </Text>
                <Text>
                    {this.props.seconds} ms
                </Text>
            </View>
        )
    }
}

export default IntervalEnhance(CartItem)
// export var TextInput IntervalEnhance(TextInput)
