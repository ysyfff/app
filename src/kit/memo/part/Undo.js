import React, {Component} from 'react'
import {Text, View, StyleSheet, TouchableOpacity, TextInput, ListView, AsyncStorage} from 'react-native'
import ViewContainer from '../../../common/ViewContainer'
import Icon from 'react-native-vector-icons/FontAwesome'
import _ from 'lodash'
import Skin from '../../../common/Skin'
import If from '../../../../component/If'



export default class Undo extends Component {
    constructor(props) {
        super(props)
    }

    render() {

        return (
            <View style={undoStyle.container}>
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

                                <View style={undoStyle.btnContainer}>
                                   <TouchableOpacity style={undoStyle.btn} onPress={() => {
                                           this.props.onDelete && this.props.onDelete(index);
                                       }}>
                                       <Icon name="cog" size={18} color={Skin.baseColor}/>
                                   </TouchableOpacity>
                                </View>
                                {/*
                                <View style={undoStyle.btnContainer}>
                                   <TouchableOpacity style={undoStyle.btn} onPress={() => {
                                           this.props.onDelete && this.props.onDelete(index);
                                       }}>
                                       <Icon name="close" size={18} color={Skin.baseColor}/>
                                   </TouchableOpacity>

                                   <TouchableOpacity style={undoStyle.btn} onPress={() => {
                                           this.props.onFinish && this.props.onFinish(index);
                                       }}>
                                       <Icon name="check" size={18} color={Skin.baseColor}/>
                                   </TouchableOpacity>
                                </View>
                                */}

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
        borderTopColor: 'pink'
    },
    row: {
        flexDirection: 'row',
        height: 35,
        alignItems: 'center',
        paddingLeft: 8,
        borderBottomWidth: 1,
        borderBottomColor: 'pink',
    },
    textContainer: {
        flex: 5,
    },
    btnContainer: {
        flex: 1,
        flexDirection: 'row',

    },
    btn: {
        flex: 1,
    }
});
