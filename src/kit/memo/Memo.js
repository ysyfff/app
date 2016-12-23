import React, {Component} from 'react'
import {Text, View, StyleSheet, TouchableOpacity, TextInput, ListView, AsyncStorage} from 'react-native'
import ViewContainer from '../../common/ViewContainer'
import Icon from 'react-native-vector-icons/FontAwesome'
import _ from 'lodash'
import Skin from '../../common/Skin'
import If from '../../../component/If'

import Enter from './part/Enter'
import Undo from './part/Undo'
import Done from './part/Done'

export default class Memo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            undo: [],
            done: []
        }
        // undo: {
        //   text:
        //   time:
        //   result,
        // }

        // done: {
        //   text:
        //   time:
        //   result,
        //   solveTime:
        // }
        this.undo = [];
        this.done = [];
    }

    componentDidMount() {
        let me = this;
        AsyncStorage.getItem('@undo', (err, undo)=>{
            if(err === null) {
                undo = JSON.parse(undo) || [];
                me.undo = _.assign([], undo);
                me.setState({undo});
            }
        });
        AsyncStorage.getItem('@done', (err, done)=>{
            if(err === null) {
                done = JSON.parse(done) || [];
                me.done = _.assign([], done);
                me.setState({done})
            }
        });

    }

    render() {
        return (
            <ViewContainer style={memoStyle.container}>
                <Enter
                    onAddEvent={(text) => {
                        //新增undo
                        this.undo.unshift({text: text, time: new Date()});
                        AsyncStorage.setItem('@undo', JSON.stringify(this.undo));
                        this.setState({undo: this.undo});
                    }}
                />

                <Done
                    dataSource={this.state.done}
                />

                <Undo
                    dataSource={this.state.undo}
                    onFinish={(index)=>{
                        let done = this.undo.splice(index, 1);
                        //新增done
                        //添加解决时间
                        done[0].solveTime = new Date();
                        this.done.unshift(done[0]);
                        //存储新增的done
                        AsyncStorage.setItem('@done', JSON.stringify(this.done));
                        //存储改变后的undo
                        AsyncStorage.setItem('@undo', JSON.stringify(this.undo));
                        this.setState({undo: this.undo, done: this.done});
                    }}
                    onDelete={(index)=>{
                        //删除undo
                        this.undo.splice(index, 1);
                        AsyncStorage.setItem('@undo', JSON.stringify(this.undo));
                        this.setState({undo: this.undo});
                    }}
                    onPlus={(index, result)=>{
                        let me = this;
                        AsyncStorage.getItem('@undo', (err, undo) => {
                            if(err === null) {
                                undo = JSON.parse(undo) || [];
                                undo[index].result = result;
                                me.undo = undo;
                                AsyncStorage.setItem('@undo', JSON.stringify(undo));
                                me.setState({undo});
                            }
                        })
                    }}
                />
            </ViewContainer>
        )
    }
}


const memoStyle = StyleSheet.create({
    container: {
        paddingLeft: 10,
        paddingRight: 10
    }
})
