import React, {Component} from 'react'
import {Text, View, StyleSheet, TouchableOpacity, TextInput, ListView, AsyncStorage} from 'react-native'
import ViewContainer from '../../../common/ViewContainer'
import Icon from 'react-native-vector-icons/FontAwesome'
import _ from 'lodash'
import Skin from '../../../common/Skin'
import If from '../../../../component/If'
import D from '../../../common/D'


export default class Done extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showAll: false
        }
    }

    render() {
        return (
            <View style={doneStyle.container}>
                <View style={doneStyle.title}>
                    <Text>
                        已办事项 ({this.props.dataSource.length})
                    </Text>
                </View>
                <View style={doneStyle.content}>
                    {this.props.dataSource.map((row, index)=>{
                        
                        return (
                            <If v={index ==0 || this.state.showAll} key={index}>
                                <View style={doneStyle.row} >
                                    <View style={doneStyle.textContainer}>
                                        <Text>
                                            {row.text}
                                        </Text>
                                    </View>

                                    {/*时间显示*/}
                                    <View style={doneStyle.info}>
                                        <View style={doneStyle.timeContainer}>
                                            <Text style={doneStyle.time}>
                                                {D.format(row.time, 'MM-DD')}
                                            </Text>
                                        </View>
                                    </View>

                                    {/* 展开收起按钮 */}
                                    <If v={index == 0}>
                                        <View style={{width: 30}}>
                                            <TouchableOpacity style={doneStyle.showAll} onPress={()=>{
                                                this.setState({
                                                    showAll: !this.state.showAll
                                                })
                                            }}>
                                                <If v={this.state.showAll}>
                                                    <Icon name="angle-down" size={18} color={Skin.baseColor} />
                                                </If>
                                                <If v={!this.state.showAll}>
                                                    <Icon name="angle-right" size={18} color={Skin.baseColor} />
                                                </If>
                                            </TouchableOpacity>
                                        </View>
                                    </If>
                                    <If v={index != 0}>
                                        <View style={{width: 30}}>

                                        </View>
                                    </If>
                                </View>
                            </If>
                        )
                    })}
                </View>
            </View>
        )
    }
}



const doneStyle = StyleSheet.create({
    container: {
        marginTop: 25
    },
    title: {
        marginBottom: 5
    },
    content: {
        borderTopWidth: 1,
        borderTopColor: Skin.lightBlue,
    },
    row: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: Skin.lightBlue,
        height: 40,
        paddingLeft: 8
    },
    textContainer: {
        flex: 5,
        justifyContent: 'center',
    },
    showAll: {
        padding: 8
    },
    info: {

    },
    timeContainer: {
        marginTop: 8,
    },
    time: {
        fontSize: 8,
        color: '#aaa'
    }
});
