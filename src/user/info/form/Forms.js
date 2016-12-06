import React, {Component} from 'react'
import {View, Text, StyleSheet, TextInput, Switch, DatePickerIOS, Picker} from 'react-native'

import ViewContainer from '../../../common/ViewContainer'
import AutoExpandingTextInput from './InputComponent/AutoExpanding'
import LimitLengthTextInput from './InputComponent/LimitLength'
import Form from './Form.js'
import CartItem from '../../../../learn/highorder/CartItem'
// import {} from './Enhance'
// import TextInput from './Enhance'
import {TextInputV} from './Enhance'


import _ from 'lodash'

let format = (...args) => {
    let ans = [];
    args.map(arg => {
        if(_.isString(arg)){
            ans.push(arg);
        }else{
            ans.push(arg[0] + ':[' + arg[1] + ',' + arg[2] + ']');
        }
    });
    return ans.join(',');
}

export default class Forms extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            limittext: '呦西',
            ptext: '哈哈',
            date: new Date(),
            selected1: 'key1',
            timeZoneOffsetInHours: (-1) * (new Date()).getTimezoneOffset() / 60,
            swh: false,
            max: 15,
            textarea: 'React Native enables you to build world-class application experiences on native platforms using a consistent developer experience based on JavaScript and React.',
        }
    }
    onDateChange(date) {
       this.setState({date});
    }
    handleNameChange(event) {
        this.setState({text:  event.nativeEvent.text.toUpperCase()});
    }
    componentDidMount() {
        this.setState({
            max: 20
        })
    }
    onValueChange(key: string, value: string){
        const newState = {};
        newState[key] = value;
        this.setState(newState);
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
                    <Form style={{backgroundColor: '#eee', padding: 20}}>
                        <TextInputV
                            style={style.input}
                            validation="required"
                            errormsg="1"
                        />
                        <TextInputV
                            style={style.input}
                            validation={format('required', ['length', 1, this.state.max])}
                            errormsg="2"
                        />

                    </Form>
                </View>

                {/*
                    <View style={style.block}>
                        <Text>
                            5. CartItem
                        </Text>
                        <CartItem/>
                    </View>
                    <View style={style.block}>
                        <Text>
                            5. CartItem
                        </Text>
                        <CartItem start={1000}/>
                    </View>

                    <Switch
                        validation="required"
                        onValueChange={(swh) => this.setState({swh})}
                        value={this.state.swh}
                    />
                    <Picker
                        style={[style.picker, { backgroundColor: '#555'}]}
                        selectedValue={this.state.selected1}
                        onValueChange={this.onValueChange.bind(this, 'selected1')}
                        mode="dialog">
                        <Picker.Item label="hello" value="key0" />
                        <Picker.Item label="world" value="key1" />
                     </Picker>
                    <DatePickerIOS
                      date={this.state.date}
                      mode="date"
                      timeZoneOffsetInMinutes={this.state.timeZoneOffsetInHours * 60}
                      onDateChange={this.onDateChange.bind(this)}
                    />
                */}
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
    picker: {
        width: 100,
    },
    textarea: {
        height: 30
    }
})
