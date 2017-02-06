import React, {Component} from 'react'
import {Text, View, StyleSheet} from 'react-native'
import Nav from '../../component/Nav'
import Icon from 'react-native-vector-icons/FontAwesome'
import Skin from '../common/Skin'

import PathTabBar from '../tabbar/PathTabBar'
import Basic from '../me/info/basic/Basic'
import History from '../me/info/history/History'
import Walk from '../me/info/walk/Walk'
import Forms from '../me/info/form/Forms'
import If from '../../component/If'
import Speed from '../kit/speed/Speed'
import Memo from '../kit/memo/Memo'


export default class PathNav extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showNav: true
        }
    }
    componentDidMount() {
        console.log('mount')
    }
    render() {
        let me = this;
        const NavDataSource = {
            initialRoute: 'Myself', //初始路由
            route: {
                Myself: {
                    renderScene: function(route, navigators) {
                        return (
                            <PathTabBar navigators={navigators} initialTab='我' nav={me}/>
                        )
                    },
                    NavBar: {
                        routeMapper: {
                            LeftButton: '',
                            RightButton: '',
                            Title: (
                                <Text style={{fontSize: 18}}>我</Text>
                            )
                        },
                        style: {backgroundColor: Skin.baseColor}
                    }
                },
                'Map': {
                    renderScene: function(route, navigators) {
                        return <PathTabBar navigators={navigators} initialTab='足迹' nav={me}/>;
                    },
                    NavBar: {
                        routeMapper: {
                            LeftButton: '',
                            RightButton: '',
                            Title: (
                                <Text style={{fontSize: 18}}>足迹</Text>
                            )
                        },
                        style: {backgroundColor: Skin.baseColor}
                    }
                },
                'Kit': {
                    renderScene: function(route, navigators) {
                        return <PathTabBar navigators={navigators} initialTab='工具' nav={me}/>;
                    },
                    NavBar: {
                        routeMapper: {
                            LeftButton: '',
                            RightButton: '',
                            Title: (
                                <Text style={{fontSize: 18}}>常用工具</Text>
                            )
                        },
                        style: {backgroundColor: Skin.baseColor}
                    }
                },
                'Kit.speed': {
                    renderScene: function(route, navigators) {
                        return (<Speed />)
                    },
                    NavBar: {
                        routeMapper: {
                            LeftButton: (
                                <View style={style.leftButton}>
                                    <Icon name="angle-left" color="black" size={26} />
                                </View>

                            ),
                            RightButton: '',
                            Title: (
                                <Text style={{fontSize: 18}}>实时速度</Text>
                            )
                        },
                        style: {backgroundColor: 'gray'}
                    }
                },
                'Kit.memo': {
                    renderScene: function(route, navigators) {
                        return (<Memo />)
                    },
                    NavBar: {
                        routeMapper: {
                            LeftButton: (
                                <View style={style.leftButton}>
                                    <Icon name="angle-left" color="black" size={26} />
                                </View>

                            ),
                            RightButton: '',
                            Title: (
                                <Text style={{fontSize: 18}}>备忘录</Text>
                            )
                        },
                        style: {backgroundColor: 'gray'}
                    }
                },
                'Myself.basicInfo': {
                    renderScene: function(route, navigators) {
                        return (<Basic />)
                    },
                    NavBar: {
                        routeMapper: {
                            LeftButton: (
                                <View style={style.leftButton}>
                                    <Icon name="angle-left" color="black" size={26} />
                                </View>

                            ),
                            RightButton: '',
                            Title: (
                                <Text style={{fontSize: 18}}>Flexbox布局</Text>
                            )
                        },
                        style: {backgroundColor: 'gray'}
                    }
                },
                'Myself.historyInfo': {
                    renderScene: function(route, navigators) {
                        return (<History />)
                    },
                    NavBar: {
                        routeMapper: {
                            LeftButton: (
                                <View style={style.leftButton}>
                                    <Icon name="angle-left" color="black" size={26} />
                                </View>
                            ),
                            RightButton: '',
                            Title: (
                                <Text style={{fontSize: 18}}>历史记录</Text>
                            )
                        },
                        style: {backgroundColor: 'gray'}
                    }
                },
                'Myself.walkInfo': {
                    renderScene: function(route, navigators) {
                        return (<Walk />)
                    },
                    NavBar: {
                        routeMapper: {
                            LeftButton: (
                                <View style={style.leftButton}>
                                    <Icon name="angle-left" color="black" size={26} />
                                </View>
                            ),
                            RightButton: '',
                            Title: (
                                <Text style={{fontSize: 18}}>步行记录</Text>
                            )
                        },
                        style: {backgroundColor: 'gray'}
                    }
                },
                'Myself.formInfo': {
                    renderScene: function(route, navigators) {
                        return (<Forms />)
                    },
                    NavBar: {
                        routeMapper: {
                            LeftButton: (
                                <View style={style.leftButton}>
                                    <Icon name="angle-left" color="black" size={26} />
                                </View>
                            ),
                            RightButton: '',
                            Title: (
                                <Text style={{fontSize: 18}}>Form表单</Text>
                            )
                        },
                        style: {backgroundColor: 'gray'}
                    }
                }
            }
        }

        return (
            <Nav dataSource={NavDataSource} showNav={this.state.showNav}/>
        )
    }
}

const style = StyleSheet.create({
    leftButton: {
        paddingLeft: 15,
        paddingRight: 10,
        paddingTop: 0,
        paddingBottom: 5
    }
})
