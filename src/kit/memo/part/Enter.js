import React, {Component} from 'react'
import {Text, View, StyleSheet, TouchableOpacity, TextInput, ListView, AsyncStorage} from 'react-native'
import ViewContainer from '../../../common/ViewContainer'
import Icon from 'react-native-vector-icons/FontAwesome'
import _ from 'lodash'
import Skin from '../../../common/Skin'
import If from '../../../../component/If'

export default class Enter extends Component {
    constructor(props) {
        super(props);

        this.state = {
            text: ''
        }
    }

    render() {
        return (
            <View style={enterStyle.container}>
                <View style={enterStyle.enter}>
                    <TextInput style={enterStyle.input}
                        onChangeText={(text)=> {
                            this.setState({text});
                        }}
                        value={this.state.text}
                    />
                </View>
                <TouchableOpacity style={enterStyle.add} onPress={()=>{
                    if(_.trim(this.state.text)) {
                        if(this.props.onAddEvent) {
                            this.props.onAddEvent(this.state.text);
                            this.setState({text: ''});
                        }
                    }else{
                        this.setState({text: ''});
                    }

                    return true;
                }}>
                    <Icon  name="plus-circle" color='blue' size={18} />
                </TouchableOpacity>
            </View>
        )
    }
}


const enterStyle = StyleSheet.create({
    container: {
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
        paddingLeft: 10,
        fontSize: 13
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
