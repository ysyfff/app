import React, {Component} from 'react'
import {Text, View, StyleSheet, TouchableOpacity, TextInput} from 'react-native'
import ViewContainer from '../../common/ViewContainer'
import Icon from 'react-native-vector-icons/FontAwesome'

import Skin from '../../common/Skin'

class Enter extends Component {
    constructor(props) {
        super(props);

        this.state = {
            text: ''
        }
    }

    render() {
        return (
            <View style={style.enterContainer}>
                <View style={style.enter}>
                    <TextInput style={style.input}/>
                </View>
                <TouchableOpacity style={style.add}>
                    <Icon  name="plus-circle" color='pink' size={18} />
                </TouchableOpacity>
            </View>
        )
    }
}

const style = StyleSheet.create({
    enterContainer: {
        padding: 10,
        flexDirection: 'row'
    },
    enter: {
        borderWidth: 1,
        borderColor: Skin.baseColor,
        flex: 5,
        borderTopLeftRadius: 30,
        borderBottomLeftRadius: 30
    },
    input: {
        height: 28,
        paddingLeft: 10
    },
    add: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Skin.baseColor,
        borderWidth: 1,
        borderColor: Skin.baseColor,
        borderTopRightRadius: 30,
        borderBottomRightRadius: 30
    }
});

export default class Memo extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <ViewContainer>
                <Enter />
            </ViewContainer>
        )
    }
}
