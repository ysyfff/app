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
            show: [],
            nth: 0
        }
    }

    componentDidMount() {

        let show = this.props.dataSource.map((row, index) => {
            return false;
        });

        this.setState({show});
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
                                            <Text style={{fontSize: 20}}>
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

                                    <View style={{flex: 1, flexDirection: 'row'}}>
                                        <View style={{marginTop: 5}}>
                                            <Text style={{color: 'gray', fontSize: 12}}>
                                                {row.result}
                                            </Text>
                                        </View>

                                        {/*记录待办结果Enter*/}
                                        <If v={this.state.show[index]}>
                                            <View style={[undoStyle.plus]}>
                                                <Enter
                                                    inputStyle={{height: 20}}
                                                    enterStyle={{borderColor: Skin.lightBlue}}
                                                    btnStyle={{borderColor: Skin.lightBlue, backgroundColor: Skin.lightBlue}}
                                                    iconName='check'
                                                    iconColor={Skin.baseColor}
                                                    iconSize={12}
                                                    placeholder='记录待办结果'
                                                    value={row.result}
                                                    onAddEvent={(text) => {
                                                        this.props.onPlus && this.props.onPlus(index, text);
                                                        let show = _.assign({}, this.state.show);
                                                        show[index] = !show[index];
                                                        this.setState({show});
                                                    }}
                                                />
                                            </View>
                                        </If>

                                        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end'}}>
                                            {/*记录待办结果Button*/}
                                            <TouchableOpacity
                                                style={undoStyle.plusBtn}
                                                onPress={() => {
                                                    let show = _.assign({}, this.state.show);
                                                    show[index] = !show[index];
                                                    this.setState({show});
                                                 }}>
                                                 <Icon name="plus" size={10} color={Skin.lightBlue}/>
                                             </TouchableOpacity>

                                             {/*完成按钮*/}
                                             <TouchableOpacity style={undoStyle.plusBtn} onPress={() => {
                                                     this.props.onFinish && this.props.onFinish(index);
                                                 }}>
                                                 <Icon name="check" size={10} color={Skin.lightBlue}/>
                                             </TouchableOpacity>

                                             {/*删除按钮*/}
                                             <TouchableOpacity style={undoStyle.plusBtn} onPress={() => {
                                                     this.props.onDelete && this.props.onDelete(index);
                                                 }}>
                                                 <Icon name="close" size={10} color={Skin.lightBlue}/>
                                             </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        )
                    })}
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
        paddingRight: 8,
        borderBottomWidth: 1,
        borderBottomColor: Skin.lightBlue,
    },
    textContainer: {
        flex: 1,
        marginTop: 5
    },
    btnContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        height: LINE_HEIGHT,
        width: 30,
    },
    btn: {
        padding: 8,
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
        position: 'relative',
        top: -1,
        padding: 5,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        width: 24,
        height: 24,
        marginRight: 8
    },
    plus: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 120,
        zIndex: 1,
        backgroundColor: 'white'
    }
});
