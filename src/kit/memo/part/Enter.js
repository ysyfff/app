import React, {Component} from 'react'
import {Text, View, StyleSheet, TouchableOpacity, TextInput, ListView, AsyncStorage} from 'react-native'
import ViewContainer from '../../../common/ViewContainer'
import Icon from 'react-native-vector-icons/FontAwesome'
import _ from 'lodash'
import Skin from '../../../common/Skin'
import If from '../../../../component/If'


/*
@props enterStyle
@props inputStyle
@props btnStyle
@props iconName
@props iconColor
@props placeholder
*/
export default class Enter extends Component {
    constructor(props) {
        super(props);

        this.state = {
            text: ''
        }
    }

    render() {
        let iconName = this.props.iconName || 'plus-circle';
        let iconColor = this.props.iconColor || 'blue';
        let iconSize = this.props.iconSize || 18;
        let placeholder = this.props.placeholder || '添加待办事项';
        let placeholderTextColor  = this.props.placeholderTextColor || '';
        
        return (
            <View style={enterStyle.container}>
                <View style={[enterStyle.enter, this.props.enterStyle]}>
                    <TextInput style={[enterStyle.input, this.props.inputStyle]}
                        onChangeText={(text)=> {
                            this.setState({text});
                        }}
                        placeholder={placeholder}
                        value={this.state.text}
                    />
                </View>
                <TouchableOpacity style={[enterStyle.btn, this.props.btnStyle]} onPress={()=>{
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
                    <Icon  name={iconName} color={iconColor} size={iconSize} />
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
    btn: {
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
