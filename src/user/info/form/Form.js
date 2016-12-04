//管理Form的子元素


import React, {Component} from 'react'
import {View, Text, TextInput, StyleSheet} from 'react-native'

class If extends Component {
    render() {
        return this.props.v ? this.props.children : null;
    }
}

export default class Form extends Component {
    constructor(props) {
        super(props)
    }
    render() {

        return (
            <View style={this.props.style}>

                {this.props.children.map(function(field, i) {

                    // 错误的做法
                    // 在渲染之前增加props属性
                    // field.props.showerror = i % 2 == 0 ? true : false;

                    return (
                        <View key={i}>

                            {/*Form Field*/}
                            {field}

                            {/*Error Message*/}
                            <If v={field.props.showerror}>
                                <View style={style.error}>
                                    <Text>
                                        {field.props.errormsg}
                                    </Text>
                                </View>
                            </If>
                        </View>
                    );
                })}

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
