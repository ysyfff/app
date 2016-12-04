import React, {Component} from 'react'
import {View, Text, TextInput, StyleSheet} from 'react-native'

import ViewContainer from '../../../common/ViewContainer'
import AutoExpandingTextInput from './InputComponent/AutoExpanding'
import LimitLengthTextInput from './InputComponent/LimitLength'
import Form from './Form.js'
import CartItem from '../../../../learn/highorder/CartItem'


export default class Forms extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            limittext: '呦西',
            ptext: '哈哈',
            textarea: 'React Native enables you to build world-class application experiences on native platforms using a consistent developer experience based on JavaScript and React.',
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
                        3. LimitLengthTextInput和propTypes的使用
                    </Text>
                    <LimitLengthTextInput
                        maxLength={100}
                        limitLength={90}
                        onChangeText={(limittext) => {this.setState({limittext})}}
                        value={this.state.limittext}
                    />
                </View>

                <View style={style.block}>
                    <Text>
                        4. Form comes
                    </Text>
                    <Form>
                        <TextInput
                            style={style.input}
                            validation="required"
                            showerror={true}
                            errormsg="1"
                        />
                        <TextInput
                            style={style.input}
                            validation="required"
                            showerror={true}
                            errormsg="2"
                        />
                    </Form>
                </View>
                <View style={style.block}>
                    <Text>
                        5. CartItem
                    </Text>
                    <CartItem/>
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
        borderColor: 'green',
        borderWidth: 1,
        height: 30,
        fontSize: 13,
    },
    textarea: {
        height: 30
    }
})
