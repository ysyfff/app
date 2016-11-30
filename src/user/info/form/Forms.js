import React, {Component} from 'react'
import {View, Text, TextInput, StyleSheet} from 'react-native'

import ViewContainer from '../../../common/ViewContainer'
import AutoExpandingTextInput from './AutoExpanding'
import LimitLengthTextInput from './LimitLength'
export default class Forms extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            limittext: 'You xi',
            textarea: 'React Native enables you to build world-class application experiences on native platforms using a consistent developer experience based on JavaScript and React. The focus of React Native is on developer efficiency across all the platforms you care about — learn once, write anywhere. Facebook uses React Native in multiple production apps and will continue investing in React Native.',
        }


    }
    handleNameChange(event) {
        this.setState({text:  event.nativeEvent.text.toUpperCase()});
    }
    render() {
        return (
            <ViewContainer>
                <View style={style.block}>
                    <Text>
                        1. 通过this.state.text来控制text的内容
                    </Text>
                    <TextInput
                        style={style.input}
                        placeholder="英文字符都会转化成大写"
                        onChange={this.handleNameChange.bind(this)}
                        value={this.state.text}
                    />
                </View>

                <View style={style.block}>
                    <Text>
                        2. AutoExpandingTextInput
                    </Text>
                    <AutoExpandingTextInput
                        placeholder="height increases with content"
                        enablesReturnKeyAutomatically={true}
                        returnKeyType="done"
                        onChangeText={(textarea) => {this.setState({textarea})}}
                        value={this.state.textarea}
                    />
                </View>

                <View style={style.block}>
                    <Text>
                        2. LimitLengthTextInput
                    </Text>
                    <LimitLengthTextInput
                        maxLength={100}
                        onChangeText={(limittext) => {this.setState({limittext})}}
                        value={this.state.limittext}
                    />
                </View>

            </ViewContainer>
        )
    }
}

const style = StyleSheet.create({
    block: {
        margin: 10,
    },
    input: {
        paddingLeft: 5,
        borderColor: 'blue',
        borderWidth: 1,
        height: 30,
        fontSize: 13,
    },
    textarea: {
        height: 30
    }
})
