import React, {Component} from 'react'
import {View} from 'react-native'

import ViewContainer from '../../../common/ViewContainer'
import Btn from '../../../../component/Btn'
import codePush from 'react-native-code-push'

export default class Basic extends Component {
    constructor(props) {
        super(props)
        this.state = {
            disableRight: false
        }
        // this.disableRight = this.disableRight.bind(this)
    }
    disableRight() {
        this.setState({disableRight: !this.state.disableRight})
    }
    restartApp() {
        codePush.restartApp();
    }
    checkForUpdate() {
        codePush.checkForUpdate().then((update) => {
            if(!update) {
                console.log('The app is up to date!!!');
            }else {
                console.log('An update is available! Shuold we download it?');
            }
        });
    }
    render() {
        return (
            <ViewContainer>
                <Btn type="highlight" activeOpacity={0.2} onPress={() => this.restartApp.bind(this)()}>
                    codePush.restartApp
                </Btn>
                <Btn type="highlight" activeOpacity={0.2} onPress={() => this.checkForUpdate.bind(this)()}>
                    codePush.checkForUpdate
                </Btn>
                <Btn style={[{backgroundColor: 'red'}]}
                    disabled={this.state.disableRight} onPress={() => this.disableRight.bind(this)()}>
                    非常正确
                </Btn>
                <Btn type="highlight" activeOpacity={0.2}>
                    Done
                </Btn>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Btn type="opacity" bg="blue" c="white" style={{width: 100}} onPress={() => this.restartApp.bind(this)()}>
                            Submit
                        </Btn>

                        <Btn type="opacity" bg="pink" c="black" style={{width: 100 }} onPress={() => this.disableRight.bind(this)()}>
                            Cancel
                        </Btn>
                </View>
            </ViewContainer>
        )
    }
}
