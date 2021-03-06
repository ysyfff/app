// 对默认的Form Compoent进行加工
// 1. 增加校验相关的props属性
// 2. 增加error的展示

/*
Validator的组成

module A: Inhance   增加validation，error，check等属性
module B: Valdation 解析validation，校验value
module C: Rule      存储validation以及具体的校验规则
*/

import React from 'react'
import {StyleSheet, View, Text} from 'react-native'
import {R} from './Rule.js'
import _ from 'lodash'

class If extends React.Component {
    render() {
        return this.props.v ? this.props.children : null;
    }
}

class Validation {

    constructor(rules) {
        this.rules = rules;
        /*
        rules: {
            required: [],
            length: [1,2],
            range: [0, 1000]
        }
        */
    }

    parse(validations) {
        let rules = null;
        if(_.isString(validations)) {
            //正则的前瞻 (?!匹配模式)
            rules = validations.split(/\,(?![^{\[]*[}\]])/g).reduce((accumulator, currentValue) => {
                let rules = currentValue.split(':');
                let rule = rules.shift();

                rules = rules.map((arg) => {
                    return JSON.parse(arg);
                });

                accumulator[rule] = _.isArray(rules[0]) ? rules[0] : rules;

                return accumulator;
            }, {});
        }

        return new Validation(rules || {});
    }

    check(value) {
      debugger
    let he = R.check(this.rules, value)
    return he;
    }
}

let V = new Validation();



//在这里能够直接读取到加强后的Component上的props
export default (ComposedComponent, onChange, getter) => class extends React.Component {

    static displayName = 'FormEnhanceClass';

    constructor(props) {
        super(props);
        /* @param passed 是否展示错误
        */
        this._v = null;
        this.state = {
            passed: true,
            errmsg: ''
        }
    }

    componentDidMount() {
        this._v = V.parse(this.props.validation);

    }

    componentWillUnmount() {
    }

    //对值进行check
    check(value) {
        let [passed, errmsg] = this._v.check(value);
        this.setState({passed, errmsg});
    }

    //当值变化的时候，update到原来的component，并进行check
    onChange(value) {
        this.props[onChange] && this.props[onChange](value);
        this.check(value);
    }

    render() {

        let props = _.assign({}, this.props);
        props[onChange] = this.onChange.bind(this);

        return (
            <View>
                {/*
                    Filed
                */}
                <ComposedComponent
                    {...props}
                    {...this.state}
                />
                {/*
                    Filed Error
                */}
                <If v={!this.state.passed}>
                    <View style={style.error}>
                        <Text>
                            {this.props.errmsg || this.state.errmsg}
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
        bottom: 0,
        right: 0,
        paddingLeft:4,
        paddingRight:4,
        borderWidth: 1,
        borderColor: 'rgba(255,0,0,.5)',
        backgroundColor: 'rgba(255,0,0,.5)',
    }
})
