import React, {Component} from 'react'
import {StyleSheet,TextInput,View,Text} from 'react-native'

import AutoExpandingTextInput from './AutoExpanding';

export default class LimitLengthTextInput extends Component {
    constructor(props) {
        super(props)
        this.state = {
            height: 0
        }
    }
    render() {
        var maxLength = this.props.maxLength || 20;
        var limitLength = this.props.limitLength || 5;
        var remainderLength = maxLength - this.props.value.length;
        var remainderColor = remainderLength >  limitLength? 'blue' : 'red';

        return (
            <View>
                <AutoExpandingTextInput
                    {...this.props}
                />
                <Text style={[style.remainder, {color: remainderColor}]}>
                     remained: {remainderLength}
                </Text>
            </View>
        )
    }
}

// 组件的属性可以接受任意值，字符串、对象、函数等等都可以。
// 有时，我们需要一种机制，验证别人使用组件时，提供的参数是否符合要求。

LimitLengthTextInput.propTypes = {
    limitLength: React.PropTypes.number.isRequired
}

const style = StyleSheet.create({
    remainder: {
        textAlign: 'right',
    }
})
