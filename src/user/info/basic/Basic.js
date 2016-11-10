import React, {Component} from 'react'
import {View} from 'react-native'

import ViewContainer from '../../../common/ViewContainer'
import Btn from '../../../../component/Btn'

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
    render() {
        return (
            <ViewContainer>
                <Btn style={[{backgroundColor: 'red'}]}
                    disabled={this.state.disableRight} onPress={() => this.disableRight.bind(this)()}>
                    Right
                </Btn>
                <Btn type="highlight" activeOpacity={0.2}>
                    Done
                </Btn>
                <View style={{flexDirection: 'row'}}>
                        <Btn type="opacity" bg="blue" c="white" style={{width: 100}}>
                            Submit
                        </Btn>
                        <View style={{flex: 1}}>
                        </View>
                        <Btn type="opacity" bg="pink" c="black" style={{width: 100 }} onPress={() => this.disableRight.bind(this)()}>
                            Cancel
                        </Btn>
                </View>
            </ViewContainer>
        )
    }
}
