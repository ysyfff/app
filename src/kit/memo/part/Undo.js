import React, {Component} from 'react'
import {Text, View, StyleSheet, TouchableOpacity, TextInput, ListView, AsyncStorage} from 'react-native'
import ViewContainer from '../../../common/ViewContainer'
import Icon from 'react-native-vector-icons/FontAwesome'
import _ from 'lodash'
import D from '../../../common/D'
import Skin from '../../../common/Skin'
import If from '../../../../component/If'

alert(D.format(new Date(), 'YYYY-M-D hh:m:ss SS'));

export default class Undo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showOper: false,
            nth: 0
        }
    }

    render() {

        return (
            <View
                style={undoStyle.container}
                >
                <View style={undoStyle.title}>
                    <Text>
                        待办事项 ({this.props.dataSource.length})
                    </Text>
                </View>
                <View style={undoStyle.content}>
                    {this.props.dataSource.map((row, index)=>{
                        return (
                            <View style={undoStyle.row} key={index}>
                                <View style={undoStyle.textContainer}>
                                    <Text>
                                        {row.text}
                                    </Text>
                                </View>
                                <View style={undoStyle.info}>
                                    <View style={undoStyle.timeContainer}>
                                        <Text style={undoStyle.time}>
                                            {row.time}
                                        </Text>
                                    </View>
                                </View>
                                <View style={undoStyle.btnContainer}>
                                   <TouchableOpacity style={undoStyle.btn} onPress={() => {
                                            if(index == this.state.nth) {
                                                this.setState({showOper: !this.state.showOper});
                                            }else{
                                                this.setState({showOper: true});
                                            }
                                            this.setState({nth: index});
                                       }}>
                                       <Icon name="angle-right" size={18} color={Skin.baseColor}/>
                                   </TouchableOpacity>

                                </View>
                            </View>
                        )
                    })}
                    <If v={this.state.showOper}>
                        <View style={[undoStyle.oper, {top: this.state.nth * 35}]}>
                             <TouchableOpacity style={undoStyle.operBtn} onPress={() => {
                                     this.props.onFinish && this.props.onFinish(this.state.nth);
                                     this.setState({showOper: false});
                                 }}>
                                 <Icon name="check" size={16} color={Skin.baseColor}/>
                             </TouchableOpacity>
                             <TouchableOpacity style={undoStyle.operBtn} onPress={() => {
                                     this.props.onDelete && this.props.onDelete(this.state.nth);
                                     this.setState({showOper: false});
                                 }}>
                                 <Icon name="close" size={16} color={Skin.baseColor}/>
                             </TouchableOpacity>
                        </View>
                    </If>
                </View>
            </View>
        )
    }
}

const undoStyle = StyleSheet.create({
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
        height: 35,
        alignItems: 'center',
        paddingLeft: 8,
        borderBottomWidth: 1,
        borderBottomColor: Skin.lightBlue,
    },
    textContainer: {
        flex: 1,
    },
    btnContainer: {
        alignItems: 'center',
    },
    btn: {
        padding: 8
    },
    oper: {
        // position: 'absolute',
        // bottom: -200,
        // left: 100
        position: 'absolute',
        top: 0,
        right: 40,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        height: 35,
        justifyContent: 'center',
    },
    operBtn: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 30,
        width: 26,
        height: 26,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#eee',
        marginLeft: 3,
    },
    info: {
        alignItems: 'flex-start',
        justifyContent: 'flex-start'
    },
    timeContainer: {
        padding: 2
    },
    time: {
        fontSize: 8,
        color: '#aaa'
    }
});
