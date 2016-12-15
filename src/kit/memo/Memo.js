import React, {Component} from 'react'
import {Text, View, StyleSheet, TouchableOpacity, TextInput, ListView} from 'react-native'
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
                    debugger
                    if(this.props.onAddEvent) {
                        this.props.onAddEvent(this.state.text);
                        this.setState({text: ''});
                    }

                    return true;
                }}>
                    <Icon  name="plus-circle" color='white' size={18} />
                </TouchableOpacity>
            </View>
        )
    }
}

class Undo extends Component {
    constructor(props) {
        super(props)
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: this.ds.cloneWithRows([{text: 1}])
        }
    }

    render() {

        return (
            <View style={undoStyle.container}>
                <View>
                    <Text>
                        待办事项
                    </Text>
                </View>
                <View>
                    <ListView
                        enableEmptySections={true}
                        dataSource={this.ds.cloneWithRows(this.props.dataSource)}
                        renderRow={(row)=>{
                            return (
                                <Text>
                                    {row.text}
                                </Text>
                            )
                        }}
                    />
                </View>
            </View>
        )
    }
}

export default class Memo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            undo: []
        }
        this.undo = [];
    }

    render() {
        return (
            <ViewContainer style={memoStyle.container}>
                <Enter onAddEvent={(text) => {
                    this.undo.push({text: text, time: new Date()});
                    this.setState({undo: this.undo});
                }}/>

                <Undo dataSource={this.state.undo} />
            </ViewContainer>
        )
    }
}


const undoStyle = StyleSheet.create({
    container: {
        marginTop: 15
    }
});

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


const memoStyle = StyleSheet.create({
    container: {
        paddingLeft: 10,
        paddingRight: 10
    }
})
