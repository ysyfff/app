import React, {Component} from 'react'
import {View, Text, StyleSheet, MapView, TouchableOpacity} from 'react-native'

import ViewContainer from '../../../common/ViewContainer'
import Skin from '../../../common/Skin'
import RNMapViews from '../../../example/test/testReactNativeMaps'
import Icon from 'react-native-vector-icons/FontAwesome'
import If from '../../../../component/If'
import _ from 'lodash'

export default class Walk extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataSource: [

            ],
        }
    }
    componentDidMount() {
        let dataSource = [
            {
                place: '北京',
                date: '2016-10-18',
                distance: '2KM'
            },
            {
                place: '上海',
                date: '2016-10-18',
                distance: '2KM'
            },
            {
                place: '南京',
                date: '2016-10-18',
                distance: '2KM'
            }
        ];

        //给数据增加show属性
        dataSource.map((item, i) => {
            item.show = false;
        });

        this.setState({
            dataSource: dataSource
        })
    }
    render() {


        let createItem = (item, i) => {

            return (
                <View style={style.container} key={i}>
                    <TouchableOpacity onPress={
                            (event) => {
                                //setState还可以接收函数参数
                                this.setState((prevState, currProps) => {
                                    prevState.dataSource.map((item, j) => {
                                        item.show = i == j ? !item.show : false;
                                    });
                                    return {
                                        dataSource: prevState.dataSource
                                    }
                                });
                            }
                        }>
                        <View style={style.text}>
                            <View style={{flexDirection: 'row', flex: 1, justifyContent: 'center'}}>
                                    <View style={{marginRight: 5}}><Icon name="map-marker" color="#333" size={18} /></View>
                                    <Text style={style.font}>{item.place}</Text>
                            </View>

                            <View style={{flexDirection: 'row', flex: 1, justifyContent: 'center'}}>
                                    <View style={{marginRight: 5}}><Icon name="location-arrow" color="#333" size={18} /></View>
                                    <Text style={style.font}>{item.distance}</Text>
                            </View>

                            <View style={{flexDirection: 'row', flex: 2, justifyContent: 'center'}}>
                                    <View style={{marginRight: 5}}><Icon name="clock-o" color="#333" size={18} /></View>
                                    <Text style={style.font}>{item.date}</Text>
                            </View>

                            <View style={{flexDirection: 'row', width: 30,  justifyContent: 'center'}}>
                                <If v={this.state.dataSource[i].show}>
                                    <Icon name="angle-double-down" color="dodgerblue" size={18} />
                                </If>
                                <If v={!this.state.dataSource[i].show}>
                                    <Icon name="angle-double-up" color="dodgerblue" size={18} />
                                </If>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <If v={this.state.dataSource[i].show}>
                        <MapView
                            style={{flex: 1, height: 120}}
                            showsUserLocation={true}
                            followsUserLocation={true}
                        />
                    </If>
                </View>
            )
        };

        return (
            <ViewContainer>
                {this.state.dataSource.map(createItem)}
            </ViewContainer>
        )
    }
}

const style = StyleSheet.create({
    container: {
        marginTop: 20,
        marginLeft: 15,
        marginRight: 15,
        borderWidth: 1,
        borderColor: Skin.baseColor,
        backgroundColor: Skin.backgroundColor
    },
    text: {
        flexDirection: 'row',
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 8,
        paddingRight: 8,
        borderBottomWidth: 1,
        borderBottomColor: Skin.baseColor
    },
    font: {
        fontSize: 14,
    },
    map: {
        flex: 1,
        height: 120
    }
})
