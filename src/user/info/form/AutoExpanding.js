import React, {Component} from 'react'
import {StyleSheet,TextInput} from 'react-native'

export default class AutoExpandingTextInput extends Component {
    constructor(props) {
        super(props)
        this.state = {
            height: 0
        }
    }
    render() {
        return (
            <TextInput
                {...this.props}
                multiline={true}
                onContentSizeChange={(event) => {
                    this.setState({height: event.nativeEvent.contentSize.height});
                }}
                style={[style.default, {height: Math.max(30, this.state.height)}]}
            />
        )
    }
}

const style = StyleSheet.create({
    default: {
        height: 30,
        borderWidth: 1,
        borderColor: '#0f0f0f',
        fontSize: 13,
        paddingLeft: 5
    }
})
