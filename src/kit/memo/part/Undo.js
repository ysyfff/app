import React, {Component} from 'react'
import {Text, View, StyleSheet, TouchableOpacity, TextInput, ListView, AsyncStorage} from 'react-native'
import ViewContainer from '../../../common/ViewContainer'
import Icon from 'react-native-vector-icons/FontAwesome'
import _ from 'lodash'
import D from '../../../common/D'
import Skin from '../../../common/Skin'
import If from '../../../../component/If'
import Enter from './Enter'

const LINE_HEIGHT = 50;

export default class Undo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showOper: false,
            showPlus: false,
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
                                <View style={{flex: 1}}>
                                    <View style={{flexDirection: 'row', flex: 1}}>
                                        <View style={undoStyle.textContainer}>
                                            <Text>
                                                {row.text}
                                            </Text>
                                        </View>

                                        {/*时间显示*/}
                                        <View style={undoStyle.info}>
                                            <View style={undoStyle.timeContainer}>
                                                <Text style={undoStyle.time}>
                                                    {D.format(row.time, 'MM-DD')}
                                                </Text>
                                            </View>
                                        </View>
                                    </View>

                                    {/*记录待办结果Button*/}
                                    <TouchableOpacity
                                        style={undoStyle.plusBtn}
                                        onPress={() => {
                                            if(index == this.state.nth) {
                                                this.setState({showPlus: !this.state.showPlus});
                                            }else{
                                                this.setState({ nth: index, showPlus: true});
                                            }

                                         }}>
                                         <Icon name="plus" size={10} color={Skin.lightBlue}/>
                                     </TouchableOpacity>
                                </View>

                                {/*按钮显示*/}
                                <View style={undoStyle.btnContainer}>
                                   <TouchableOpacity style={undoStyle.btn} onPress={() => {
                                            this.setState({showPlus: false});

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
                        <View style={[undoStyle.oper, {top: this.state.nth * LINE_HEIGHT}]}>
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

                    <If v={this.state.showPlus}>
                        <View style={[undoStyle.plus, {top: this.state.nth * LINE_HEIGHT + 25}]}>
                            <Enter
                                inputStyle={{height: 20}}
                                iconName='check'
                                iconColor='black'
                                iconSize={12}
                                placeholder='记录待办结果'
                            />
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
        height: LINE_HEIGHT,
        paddingLeft: 8,
        borderBottomWidth: 1,
        borderBottomColor: Skin.lightBlue,
    },
    textContainer: {
        flex: 1,
        marginTop: 5
    },
    btnContainer: {
        alignItems: 'center',
        width: 30,
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
        height: LINE_HEIGHT,
        justifyContent: 'center',
    },
    operBtn: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 30,
        width: 30,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#eee',
        marginLeft: 3,
    },
    info: {

    },
    timeContainer: {
        marginTop: 8
    },
    time: {
        fontSize: 8,
        color: '#aaa'
    },
    plusBtn: {
        padding: 5,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        width: 22,
        height: 22,
        marginBottom: 2,
    },
    plus: {
        position: 'absolute',
        left: 40,
        right: 60
    }
});
