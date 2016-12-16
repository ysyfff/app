import React, {Component} from 'react'
import {Text, View, StyleSheet, TouchableOpacity, TextInput, ListView, AsyncStorage} from 'react-native'
import ViewContainer from '../../common/ViewContainer'
import Icon from 'react-native-vector-icons/FontAwesome'
import _ from 'lodash'
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
                    <Icon  name="plus-circle" color='blue' size={18} />
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
            dataSource: this.ds.cloneWithRows([])
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
                                        <Icon name="close" size={18} color={Skin.baseColor}/>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={undoStyle.btn} onPress={() => {
                                            this.props.onFinish && this.props.onFinish(index);
                                        }}>
                                        <Icon name="check" size={18} color={Skin.baseColor}/>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )
                    })}

                </View>
            </View>
        )
    }
}

class Done extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={undoStyle.container}>
                <View>
                    <Text>
                        已办事项
                    </Text>
                </View>
                <View>
                    {this.props.dataSource.map((row, index)=>{
                        return (
                            <View style={undoStyle.row} key={index}>
                                <View style={undoStyle.textContainer}>
                                    <Text>
                                        {row.text}
                                    </Text>
                                </View>
                            </View>
                        )
                    })}
                </View>
            </View>
        )
    }
}

export default class Memo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            undo: [],
            done: []
        }
        this.undo = [];
        this.done = [];
    }

    componentDidMount() {
        let me = this;
        AsyncStorage.getItem('@undo', (err, undo)=>{
            if(err === null) {
                undo = JSON.parse(undo) || [];
                me.undo = _.assign([], undo);
                me.setState({undo});
            }
        });
        AsyncStorage.getItem('@done', (err, done)=>{
            if(err === null) {
                done = JSON.parse(done) || [];
                me.done = _.assign([], done);
                me.setState({done})
            }
        });

    }

    render() {
        return (
            <ViewContainer style={memoStyle.container}>
                <Enter
                    onAddEvent={(text) => {
                        //新增undo
                        this.undo.push({text: text, time: new Date()});
                        AsyncStorage.setItem('@undo', JSON.stringify(this.undo));
                        this.setState({undo: this.undo});
                    }}
                />

                <Done
                    dataSource={this.state.done}
                />

                <Undo
                    dataSource={this.state.undo}
                    onFinish={(index)=>{
                        let done = this.undo.splice(index, 1);
                        //新增done
                        this.done.push(done[0]);
                        AsyncStorage.setItem('@done', JSON.stringify(this.done));
                        this.setState({undo: this.undo, done: this.done});
                    }}
                    onDelete={(index)=>{
                        //删除undo
                        this.undo.splice(index, 1);
                        AsyncStorage.setItem('@undo', JSON.stringify(this.undo));
                        this.setState({undo: this.undo});
                    }}
                />
            </ViewContainer>
        )
    }
}

const doneStyle = StyleSheet.create({

});

const undoStyle = StyleSheet.create({
    container: {
        marginTop: 15
    },
    row: {
        flexDirection: 'row'
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
