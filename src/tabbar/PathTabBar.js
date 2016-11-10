'use strict'

import React, {Component} from 'react'
import {Text, StyleSheet, View} from 'react-native'

import TabBar from '../../component/TabBar'

import Info from '../user/info/Info'
import Foot from '../foot/Foot'
import Skin from '../common/Skin'

export default class PathTabBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            personCount: 0
        }
    }
    componentDidMount() {
        //Map刚初始化的时候就不showNav了
        this.props.initialTab=='足迹' && this.props.nav.setState({showNav: false})
    }
    _createTabBar() {
        var me = this
        return {
            tabBarProps: {
                tintColor: Skin.baseColor,
            },
            tabBarItemsProps: [
                {
                    title: '足迹',
                    iconName: 'ios-paw-outline', //flag
                    selectedIconName: 'ios-paw',
                    onPress: () => {
                        // console.log('what??')
                        me.props.navigators.resetTo({ident: 'Map'})
                        me.props.nav.setState({showNav: false})
                        // me.props.navigators.immediatelyResetRouteStack([]);
                    },
                    renderedContent: <Foot navigators={me.props.navigators} nav={me.props.nav}/>
                },
                {
                    title: '我',
                    iconName:'ios-person-outline',
                    selectedIconName:'ios-person',
                    defaultSelected: true,
                    onPress: () => {
                        me.props.navigators.resetTo({ident: 'Myself'})
                        me.props.nav.setState({showNav: true});
                    },
                    renderedContent: <Info navigators={me.props.navigators}/>
                },
            ]
        }
    }
    render() {
        return (
            <TabBar dataSource={this._createTabBar()} initialTab={this.props.initialTab} />
        )
    }
}
