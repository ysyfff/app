import React, {Component} from 'react'
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native'
import ViewContainer from '../common/ViewContainer'
import Btn from '../../component/Btn'
import Skin from '../common/Skin'


export default class Kit extends Component {
    constructor(props) {
        super(props)
    }
    _speed() {
        this.props.navigators.push({
            ident: 'Kit.speed'
        });
    }
    _memo() {
        this.props.navigators.push({
            ident: 'Kit.memo'
        });
    }
    render() {
        return (
            <ViewContainer>
                <View style={style.gridContainer}>
                    <View style={style.gridRow}>
                        <View style={style.grid}>
                            <TouchableOpacity style={style.opacity} onPress={this._speed.bind(this)}>
                                <Text>
                                    速度
                                </Text>
                            </TouchableOpacity>
                        </View>

                        <View style={style.grid}>
                            <TouchableOpacity style={style.opacity} onPress={this._memo.bind(this)}>
                                <Text>
                                    备忘录
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={[style.grid, style.gridLast]}>
                            <TouchableOpacity style={style.opacity}>
                                <Text>
                                    测速
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={style.gridRow}>
                        <View style={style.grid}>
                            <TouchableOpacity style={style.opacity}>
                                <Text>
                                    测速
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={style.grid}>
                            <TouchableOpacity style={style.opacity}>
                                <Text>
                                    测速
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={[style.grid, style.gridLast]}>
                            <TouchableOpacity style={style.opacity}>
                                <Text>
                                    测速
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>

            </ViewContainer>
        )
    }
}

const style = StyleSheet.create({
    gridContainer: {
        borderBottomWidth: 1,
        borderBottomColor: Skin.baseColor,
    },
    gridRow: {
        flexDirection: 'row',
    },
    grid: {
        flex: 1,
        borderTopWidth: 1,
        borderTopColor: Skin.baseColor,
        borderRightWidth: 1,
        borderRightColor: Skin.baseColor
    },
    opacity: {
        paddingTop: 20,
        paddingBottom: 20,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    gridLast: {
        borderRightWidth: 0
    }
})
