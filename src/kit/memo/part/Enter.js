import React, {Component} from 'react'
import {Text, View, StyleSheet, TouchableOpacity, TextInput, ListView, AsyncStorage} from 'react-native'
import ViewContainer from '../../../common/ViewContainer'
import Icon from 'react-native-vector-icons/FontAwesome'
import _ from 'lodash'
import Skin from '../../../common/Skin'
import If from '../../../../component/If'


const DefaultProps = {
  iconName: 'plus-circle',
  iconColor: 'blue',
  iconSize: 18,
  placeholder: '添加待办事项',
  placeholderTextColor: '#aaa',
  enterStyle: '',
  inputStyle: '',
  btnStyle: ''
}

export default class Enter extends Component {
    static defaultProps = DefaultProps;

    constructor(props) {
        super(props);

        this.state = {
            text: ''
        }
    }

    componentDidMount() {
        this.setState({text: this.props.value || ''});
    }

    render() {

        return (
            <View style={enterStyle.container}>
                <View style={[enterStyle.enter, this.props.enterStyle]}>
                    <TextInput style={[enterStyle.input, this.props.inputStyle]}
                        onChangeText={(text)=> {
                            this.setState({text});
                        }}
                        placeholder={this.props.placeholder}
                        placeholderTextColor={this.props.placeholderTextColor}
                        value={this.state.text}
                    />
                </View>
                <TouchableOpacity style={[enterStyle.btn, this.props.btnStyle]} onPress={()=>{
                    if(this.props.onAddEvent) {
                        this.props.onAddEvent(this.state.text);
                        this.setState({text: ''});
                    }

                    return true;
                }}>
                    <Icon  name={this.props.iconName} color={this.props.iconColor} size={this.props.iconSize} />
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
