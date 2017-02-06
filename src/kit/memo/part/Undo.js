import React, {Component} from 'react'
import {Text, View, StyleSheet, TouchableOpacity, TextInput, ListView, AsyncStorage, Button} from 'react-native'
import ViewContainer from '../../../common/ViewContainer'
import Icon from 'react-native-vector-icons/FontAwesome'
import _ from 'lodash'
import D from '../../../common/D'
import Skin from '../../../common/Skin'
import If from '../../../../component/If'
import Enter from './Enter'
import Styles from './Style'

const LINE_HEIGHT = 50;

export default class Undo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            rshow: [], //edit result show
            eshow: [], //edit show
            nth: 0,
            showDlg: true
        }
    }

    componentDidMount() {

        let rshow = this.props.dataSource.map((row, index) => {
            return false;
        });

        this.setState({rshow});
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
                            <View style={Styles.rowWrapper} key={index}>
                                <View style={Styles.rowInner}>
                                    <View style={Styles.rows}>
                                        {/*展示待办事项*/}
                                        <View style={Styles.textWrapper}>
                                            <Text style={Styles.mainText}>
                                                {row.text}
                                            </Text>
                                        </View>

                                        <If >
                                        </If>

                                        {/*时间显示*/}
                                        <View style={Styles.infoWrapper}>
                                            <Text style={Styles.timeText}>
                                                {D.format(row.time, 'MM-DD')}
                                            </Text>
                                        </View>
                                    </View>

                                    <View style={Styles.rows}>
                                        {/*展示记录的待办结果*/}
                                        <View style={Styles.resultWrapper}>
                                            <Text style={Styles.resultText}>
                                                {row.result}
                                            </Text>
                                        </View>

                                        {/*记录待办结果Enter*/}
                                        <If v={this.state.rshow[index]}>
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
                                                        let rshow = _.assign([], this.state.rshow);
                                                        rshow[index] = !rshow[index];
                                                        this.setState({rshow});
                                                    }}
                                                />
                                            </View>
                                        </If>

                                        <View style={Styles.operWrapper}>
                                            {/*记录待办结果Button*/}
                                            <TouchableOpacity
                                                style={Styles.operBtn}
                                                onPress={() => {
                                                    let rshow = _.assign([], this.state.rshow);
                                                    rshow[index] = !rshow[index];
                                                    this.setState({rshow});
                                                 }}>
                                                 <Icon name="plus" size={10} color={Skin.lightBlue}/>
                                             </TouchableOpacity>

                                             {/*完成按钮*/}
                                             <TouchableOpacity style={Styles.operBtn} onPress={() => {
                                                     this.props.onFinish && this.props.onFinish(index);
                                                 }}>
                                                 <Icon name="check" size={10} color={Skin.lightBlue}/>
                                             </TouchableOpacity>

                                             {/*删除按钮*/}
                                             <TouchableOpacity style={[Styles.operBtn, Styles.lastOperBtn]} onPress={() => {
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
        backgroundColor: Skin.backgroundColor
    }
});
