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
                    onChangeText={(text) => {
                        text = text.replace(/ /g, '_');
                        this.props.onChangeText && this.props.onChangeText(text);

                    }}
                />
                <Text style={[style.remainder, {color: remainderColor}]}>
                    {remainderLength}
                </Text>
            </View>


        )
    }
}

const style = StyleSheet.create({
    remainder: {
        textAlign: 'right',
    }
})
