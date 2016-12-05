// 对默认的Form Compoent进行加工
// 1. 增加校验相关的props属性
// 2. 增加error的展示

import React from 'react'
import {StyleSheet, View, Text} from 'react-native'

class If extends React.Component {
    render() {
        return this.props.v ? this.props.children : null;
    }
}

//在这里能够直接读取到加强后的Component上的props
export default ComposedComponent => class extends React.Component {

    static displayName = 'FormEnhanceClass';

    constructor(props) {
        super(props);
        /* @param showerr 是否展示错误
        */
        this.state = {
            showerr: true
        }
    }

    componentDidMount() {

    }

    componentWillUnmount() {
    }

    render() {
        return (
            <View>
                <ComposedComponent
                    {...this.props}
                    {...this.state}
                />

                <If v={this.state.showerr}>
                    <View style={style.error}>
                        <Text>
                            {this.props.errormsg}
                        </Text>
                    </View>
                </If>
            </View>
        )
    }
};

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
