import React, {Component} from 'react'
import {Text, View, StyleSheet, TouchableOpacity, TextInput, ListView, AsyncStorage} from 'react-native'
import ViewContainer from '../../../common/ViewContainer'
import Icon from 'react-native-vector-icons/FontAwesome'
import _ from 'lodash'
import Skin from '../../../common/Skin'
import If from '../../../../component/If'



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

                                    {/* 展开收起按钮 */}
                                    <If v={index == 0}>
                                        <View>
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
        borderTopColor: 'pink'
    },
    row: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: 'pink',
        height: 35,
        alignItems: 'center',
        paddingLeft: 8
    },
    textContainer: {
        flex: 5,
    },
    showAll: {
        padding: 8
    }
});
