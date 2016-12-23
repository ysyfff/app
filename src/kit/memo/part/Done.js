import React, {Component} from 'react'
import {Text, View, StyleSheet, TouchableOpacity, TextInput, ListView, AsyncStorage} from 'react-native'
import ViewContainer from '../../../common/ViewContainer'
import Icon from 'react-native-vector-icons/FontAwesome'
import _ from 'lodash'
import Skin from '../../../common/Skin'
import If from '../../../../component/If'
import D from '../../../common/D'
import Styles from './Style'

export default class Done extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showAll: false
        }
    }

    render() {
        return (
            <View style={doneStyle.container}>
                <View style={doneStyle.title}>
                    <Text>
                        已办事项 ({this.props.dataSource.length})
                    </Text>
                </View>
                <View style={doneStyle.content}>
                    {this.props.dataSource.map((row, index)=>{

                        return (
                            <If v={index ==0 || this.state.showAll} key={index}>
                              <View style={Styles.rowWrapper}>
                                <View style={Styles.rowInner}>

                                  <View style={Styles.rows} >
                                    <View style={Styles.textWrapper}>
                                        <Text style={Styles.mainText}>
                                            {row.text}
                                        </Text>
                                    </View>

                                    {/*时间显示*/}
                                    <View style={Styles.infoWrapper}>
                                      <Text style={Styles.timeText}>
                                          {D.format(row.time, 'MM-DD')}
                                      </Text>
                                      <If v={row.solveTime}>
                                        <Text style={Styles.timeText}>
                                          ~
                                        </Text>
                                      </If>
                                      <Text style={doneStyle.solveTimeText}>
                                          {D.format(row.solveTime, 'MM-DD')}
                                      </Text>
                                    </View>
                                  </View>

                                  <View style={Styles.rows}>
                                      {/*展示记录的待办结果*/}
                                      <View style={Styles.resultWrapper}>
                                          <Text style={Styles.resultText}>
                                              {row.result}
                                          </Text>
                                      </View>

                                      <View style={Styles.operWrapper}>
                                        <If v={index == 0}>
                                          <TouchableOpacity style={[Styles.operBtn, Styles.lastOperBtn]} onPress={()=>{
                                              this.setState({
                                                  showAll: !this.state.showAll
                                              })
                                          }}>
                                              <If v={this.state.showAll}>
                                                  <Icon name="angle-down" size={14} color={Skin.lightBlue} />
                                              </If>
                                              <If v={!this.state.showAll}>
                                                  <Icon name="angle-right" size={14} color={Skin.lightBlue} />
                                              </If>
                                          </TouchableOpacity>
                                        </If>
                                      </View>
                                  </View>
                                </View>
                              </View>
                            </If>
                        )
                    })}
                </View>
            </View>
        )
    }
}

// {/* 展开收起按钮 */}

// <If v={index != 0}>
//     <View style={{width: 30}}>
//     </View>
// </If>

const doneStyle = StyleSheet.create({
    container: {
        marginTop: 25
    },
    title: {
        marginBottom: 5
    },
    content: {
        borderTopWidth: 1,
        borderTopColor: Skin.lightBlue,
    },
    row: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: Skin.lightBlue,
        height: 40,
        paddingLeft: 8
    },
    textContainer: {
        flex: 5,
        justifyContent: 'center',
    },
    showAll: {
        padding: 8
    },
    solveTimeText: {
      fontSize: 8,
      color: Skin.baseColor
    }
});
